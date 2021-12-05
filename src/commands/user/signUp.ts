import Discord, { CommandInteraction, CacheType } from 'discord.js';
import { Command, CommandBase } from '../../types';
import { sequelize } from 'exports';

export class SignUp extends CommandBase implements Command {
	async execute(interaction: CommandInteraction<CacheType>) {}

	constructor() {
		super('signup', 'Create a discotrader account.');
	}
}
