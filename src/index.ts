import commands from './commands';
import Discord from 'discord.js';

require('dotenv').config();

import { initdb } from './db';

(async () => {
	await initdb();

	const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

	client.once('ready', () => {
		const guild = client.guilds.cache.get(process.env.GUILD || '');
		const slashCommands = guild?.commands || client.application?.commands;

		Object.values(commands)
			.map((x) => x.command)
			.forEach((x) => slashCommands!.create(x));

		console.log('Ready!');
	});

	client.on('interactionCreate', async (interaction) => {
		if (!interaction.isCommand()) return;

		try {
			const { commandName } = interaction;
			if (commandName in commands) commands[commandName].execute(interaction);
		} catch (e) {
			console.log(e);
		}
	});

	client.login(process.env.DISCORD_TOKEN);
})();
