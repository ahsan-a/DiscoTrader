import Discord, { CommandInteraction, CacheType, ApplicationCommandDataResolvable } from 'discord.js';

export interface Command {
	execute(interaction: CommandInteraction<CacheType>): Promise<void>;
	command: ApplicationCommandDataResolvable;
}
