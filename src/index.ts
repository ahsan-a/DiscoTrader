import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import commands from './commands';

import Discord from 'discord.js';

require('dotenv').config();

const slashCommands = Object.values(commands).map((command) => command.slashCommand.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN || '');

rest.put(Routes.applicationGuildCommands(process.env.CLIENT || '', process.env.GUILD || ''), { body: slashCommands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName in commands) commands[commandName].execute(interaction);
});

client.login(process.env.token);
