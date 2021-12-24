import { CommandInteraction, CacheType, ApplicationCommandDataResolvable, MessageActionRow, MessageButton } from 'discord.js';

import { Command } from '../../../types';
import { createEmbed, verifyAccount, alpha, finnhub } from '../../../exports';

import { User, Trade } from '../../../db/models';
export class Buy implements Command {
	async execute(interaction: CommandInteraction<CacheType>) {
		const user = await verifyAccount(interaction);
		if (!user) return;

		interface Options {
			type: 'stock' | 'crypto';
			name: string;
			quantity: number;
		}

		const options: Options = {
			type: interaction.options.getString('type') as Options['type'],
			name: interaction.options.getString('name') as string,
			quantity: interaction.options.getInteger('quantity') as number,
		};

		if (options.type === 'stock') {
			const symbol = (await finnhub.symbolLookup(options.name))?.result[0];

			const quote = await finnhub.getQuote(symbol?.symbol || '');
			if (!symbol || !quote.close)
				return interaction.reply({
					embeds: [
						createEmbed({
							title: 'Error: Stock Not Found',
							description: `The stock "${options.name}" was not found.`,
							colour: 0xdd0000,
						}),
					],
				});

			const reg = {
				symbol: symbol.symbol.toUpperCase(),
				name: symbol.description,
				price: quote.close,
				quantity: options.quantity,
				total: quote.close * options.quantity,
			};

			if (reg.total > user.balance) {
				const newQuantity = Math.floor(user.balance / reg.price);
				await interaction.reply({
					embeds: [
						createEmbed({
							title: 'Error: Insufficient Funds',
							description: `You do not have enough funds to buy ${options.quantity} shares of ${reg.symbol} for ❂${reg.total}.
							Your balance is ❂${user.balance}. You need ${(reg.total - user.balance).toFixed(2)} more for this
							 trade, or buy ${newQuantity} shares for ❂${(newQuantity * reg.price).toFixed(2)}.`,
						}),
					],
					components: [
						new MessageActionRow().addComponents(
							new MessageButton()
								.setCustomId('buyNewQuantity')
								.setLabel(`Buy ${newQuantity} shares for ❂${(newQuantity * reg.price).toFixed(2)}`)
								.setStyle('PRIMARY')
						),
					],
				});
			}
		} else if (options.type === 'crypto') {
		}

		interaction.reply(JSON.stringify(options));
	}

	command: ApplicationCommandDataResolvable = {
		name: 'buy',
		description: 'Buy a stock or crypto.',
		options: [
			{
				name: 'type',
				description: 'Select stock or crypto.',
				type: 'STRING',
				required: true,
				choices: [
					{
						name: 'stock',
						value: 'stock',
					},
					{
						name: 'crypto',
						value: 'crypto',
					},
				],
			},
			{
				name: 'name',
				description: 'The symbol or name of the stock or cryptocurrency.',
				type: 'STRING',
				required: true,
			},
			{
				name: 'quantity',
				description: 'How many stocks or coins to buy.',
				type: 'INTEGER',
				required: true,
			},
		],
	};
}
