import Discord, { CommandInteraction, CacheType } from 'discord.js';
import { Command, CommandBase } from '../../types';
import { createEmbed } from '../../exports';
import { User } from '../../db/models';

export class SignUp extends CommandBase implements Command {
	async execute(interaction: CommandInteraction<CacheType>) {
		if (await User.findOne({ where: { id: interaction.user.id } }).then((x) => x)) {
			return interaction.reply('you already have an account.');
		} else {
			await User.create({ id: parseInt(interaction.user.id), balance: 1000 });
			return interaction.reply({
				embeds: [
					createEmbed({
						title: 'Account created',
						description: `Welcome to DiscoTrader, <@${interaction.user.id}>! Use /help to get started, and enjoy!`,
					}),
				],
			});
		}
	}

	constructor() {
		super('signup', 'Create a discotrader account.');
	}
}
