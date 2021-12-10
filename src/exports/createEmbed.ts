import { MessageEmbed } from 'discord.js';
import { CommandInteraction, CacheType } from 'discord.js';

export function createEmbed(x: {
	colour?: number;
	title: string;
	url?: string;
	author?: {
		name: string;
		image?: string;
		url?: string;
	};
	description?: string;
	thumbnail?: string;
	image?: string;
	timestamp?: {
		enabled: boolean;
		value?: number;
	};
	fields?: Array<{
		name: string;
		value: string;
		inline?: boolean;
	}>;
	footer?: {
		text?: string;
		icon?: string;
	};
}) {
	const embed = new MessageEmbed({
		title: x.title,
		color: x.colour || 0xfff,
		url: x.url,
		author: {
			name: x.author?.name || 'DiscoTrader',
			icon_url: x.author?.image || 'https://cdn.discordapp.com/avatars/915331559081533470/064f680d52194b35192f46bad8f772e5.webp?size=128',
			url: x.author?.url,
		},
		description: x.description,
	});

	x.thumbnail && embed.setThumbnail(x.thumbnail);
	x.image && embed.setImage(x.image);
	x.timestamp?.enabled && embed.setTimestamp(x.timestamp.value);
	x.fields?.forEach((y) => embed.addField(y.name, y.value, y.inline));
	x.footer?.text && embed.setFooter(x.footer?.text, x.footer?.icon);

	return embed;
}

export function createAccountEmbed(interaction: CommandInteraction<CacheType>) {
	return interaction.reply({
		embeds: [
			createEmbed({
				title: 'Error',
				description: 'You must create an account to perform this action.',
			}),
		],
		ephemeral: true,
	});
}
