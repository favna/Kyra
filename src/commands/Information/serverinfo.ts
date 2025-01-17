import type { GuildMember, Message } from "discord.js";
import { Command, Args, CommandOptions, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { EmbedConstructor } from "../../lib/embed";

@ApplyOptions<CommandOptions>({
    aliases: ["si"]
})

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
        let owner = await msg.guild.fetchOwner();

        let embed = new EmbedConstructor()
        .setThumbnail(msg.guild.iconURL())
        .addField("Name", msg.guild.name, true)
        .addField("ID", msg.guild.id, true)
        .addField("Owner", owner.user.tag, true)
        .addField("Owner ID", owner.user.id, true)
        .addField("Channels", msg.guild.channels.cache.size.toString(), true)
        .addField("Members", msg.guild.memberCount.toString(), true)
        .addField("Roles", msg.guild.roles.cache.size.toString(), true)
        .setFooter(`${msg.guild.members.cache.size} Members`);

        msg.channel.send({embeds: [embed]});
	}
}
