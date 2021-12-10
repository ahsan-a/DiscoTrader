import { CommandInteraction, CacheType, ApplicationCommandDataResolvable } from 'discord.js';
import { Command } from '../../types';
import { createEmbed } from '../../exports';
import { User } from '../../db/models';

export class SignUp implements Command {
	async execute(interaction: CommandInteraction<CacheType>) {
		if (await User.findOne({ where: { id: parseInt(interaction.user.id) } })) {
			return interaction.reply({ content: 'you already have an account.', ephemeral: true });
		} else {
			await User.findOrCreate({ where: { id: parseInt(interaction.user.id), balance: 1000 } });
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
	command: ApplicationCommandDataResolvable = {
		name: 'signup',
		description: 'Sign Up to DiscoTrader.',
	};
}
