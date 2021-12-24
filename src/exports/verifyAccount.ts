import { CommandInteraction, CacheType } from 'discord.js';
import { createAccountEmbed } from '.';
import { User } from '../db/models';

export async function verifyAccount(interaction: CommandInteraction<CacheType>, sendCreateAccount = true): Promise<boolean> {
	if (await User.findOne({ where: { id: parseInt(interaction.user.id) }, attributes: ['id'] })) return true;
	else {
		if (sendCreateAccount) createAccountEmbed(interaction);
		return false;
	}
}
