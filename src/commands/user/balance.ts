import { CommandInteraction, CacheType, ApplicationCommandDataResolvable } from 'discord.js';
import { Command } from '../../types';
import { createEmbed, createAccountEmbed } from '../../exports';

import { User } from '../../db/models';

export class Balance implements Command {
	async execute(interaction: CommandInteraction<CacheType>) {
		const user = interaction.options.getUser('user');
		let balance: User | null;
		let username: string;
		if (user) {
			balance = await User.findOne({ where: { id: parseInt(user.id) }, attributes: ['balance'] });
			if (!balance)
				return interaction.reply({
					embeds: [
						createEmbed({
							title: 'User not found',
							description: `User ${user.username}#${user.discriminator} does not have an account.`,
						}),
					],
				});
			username = user.username;
		} else {
			balance = await User.findOne({ where: { id: parseInt(interaction.user.id) }, attributes: ['balance'] });
			if (!balance) return createAccountEmbed(interaction);
			username = interaction.user.username;
		}

		return interaction.reply({
			embeds: [
				createEmbed({
					title: `${username}'s Balance`,
					fields: [{ name: 'Balance', value: `❂ ${balance.balance}` }],
				}),
			],
		});
	}
	command: ApplicationCommandDataResolvable = {
		name: 'balance',
		description: "Check your or somebody else's balance.",
		options: [
			{
				type: 'USER',
				name: 'user',
				description: 'The user to check the balance of. Leave blank to check your balance.',
				required: false,
			},
		],
	};
}
