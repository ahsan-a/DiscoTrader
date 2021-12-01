import Discord from 'discord.js';
import { Command, CommandBase } from '../../types';

export class Ping extends CommandBase implements Command {
	execute(interaction: Discord.CommandInteraction<Discord.CacheType>) {
		interaction.reply('Pong!');
	}

	constructor() {
		super('ping', 'pong');
	}
}
