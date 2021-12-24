import { CommandInteraction, CacheType } from 'discord.js';
import { createAccountEmbed } from '.';
import { User } from '../db/models';

export async function verifyAccount(interaction: CommandInteraction<CacheType>, sendCreateAccount = true): Promise<User | false> {
	const user = await User.findOne({ where: { id: parseInt(interaction.user.id) } });
	if (user) return user;
	else {
		if (sendCreateAccount) createAccountEmbed(interaction);
		return false;
	}
}
