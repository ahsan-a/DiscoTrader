import { CommandInteraction, CacheType, ApplicationCommandDataResolvable } from 'discord.js';
import { Command } from '../../types';
import { createEmbed, createAccountEmbed } from '../../exports';

import { User } from '../../db/models';

export class Buy implements Command {
	async execute(interaction: CommandInteraction<CacheType>) {}

	command: ApplicationCommandDataResolvable = {
		name: 'buy',
		description: 'Buy a stock or crypto.',
	};
}
