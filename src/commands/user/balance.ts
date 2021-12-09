import Discord, { CommandInteraction, CacheType } from 'discord.js';
import { Command, CommandBase } from '../../types';
import { createEmbed, createAccountEmbed } from '../../exports';

import { User } from '../../db/models';

export class Balance extends CommandBase implements Command {
	async execute(interaction: CommandInteraction<CacheType>) {
		const balance = await User.findOne({ where: { id: interaction.user.id }, attributes: ['balance'] });
		if (!balance) return createAccountEmbed(interaction);

		return interaction.reply({
			embeds: [
				createEmbed({
					title: `${interaction.user.username}'s Balance`,
					fields: [{ name: 'Balance', value: `${balance.balance}` }],
				}),
			],
		});
	}

	constructor() {
		super('balance', 'View the amount of money in your account.');
	}
}
