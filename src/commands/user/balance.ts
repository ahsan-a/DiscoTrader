import { CommandInteraction, CacheType, ApplicationCommandDataResolvable } from 'discord.js';
import { Command } from '../../types';
import { createEmbed, createAccountEmbed } from '../../exports';

import { User, Trade } from '../../db/models';

export class Balance implements Command {
	async execute(interaction: CommandInteraction<CacheType>) {
		const user = interaction.options.getUser('user');
		let dbUser: User | null;
		let username: string;
		if (user) {
			dbUser = await User.findOne({ where: { id: parseInt(user.id) }, include: [Trade] });
			if (!dbUser)
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
			dbUser = await User.findOne({ where: { id: parseInt(interaction.user.id) }, include: [Trade] });
			if (!dbUser) return createAccountEmbed(interaction);
			username = interaction.user.username;
		}

		return interaction.reply({
			embeds: [
				createEmbed({
					title: `${username}'s Balance`,
					fields: [
						{ name: 'Balance', value: `❂${dbUser.balance}`, inline: true },
						{
							name: 'Total Stock Value',
							value: `❂${dbUser.trades.reduce((acc, cur) => acc + cur.price * cur.quantity, 0).toFixed(2)}`,
							inline: true,
						},
					],
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
