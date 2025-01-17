import { Event, Events } from "@sapphire/framework";
import type { Message } from "discord.js";

export class UserEvent extends Event<Events.MentionPrefixOnly> {
	public async run(message: Message) {
		const prefix = "$";
		return message.channel.send(prefix ? `My prefix in this guild is: \`${prefix}\`` : "You do not need a prefix in DMs.");
	}
}
