import { CommandInteraction, CacheType } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export interface Command {
	name: string;
	description: string;
	execute(interaction: CommandInteraction<CacheType>): void;
	slashCommand: SlashCommandBuilder;
}

export class CommandBase {
	slashCommand: SlashCommandBuilder;
	constructor(public name: string, public description: string) {
		this.slashCommand = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
	}
}
