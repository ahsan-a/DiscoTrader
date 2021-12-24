import { CommandInteraction, CacheType, ApplicationCommandDataResolvable } from 'discord.js';
import { Command } from '../../../types';
import { createEmbed, verifyAccount } from '../../../exports';

import { User, Trade } from '../../../db/models';

export class Buy implements Command {
	async execute(interaction: CommandInteraction<CacheType>) {
		verifyAccount(interaction);

		try {
			await Trade.create({
				price: 1.0,
				quantity: 1,
				userId: parseInt(interaction.user.id),
				stock: true,
				symbol: 'AAPL',
			});
		} catch (e) {
			console.log(e);
		}

		interaction.reply('test test test');
	}

	command: ApplicationCommandDataResolvable = {
		name: 'buy',
		description: 'Buy a stock or crypto.',
		options: [
			{
				name: 'type',
				description: 'Buy some stocks or cryptocurrency.',
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
				name: 'symbol',
				description: 'The symbol of the stock or cryptocurrency.',
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
