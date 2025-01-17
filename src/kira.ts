import { LogLevel, SapphireClient } from "@sapphire/framework";
import "@sapphire/plugin-api/register";
import "@sapphire/plugin-logger/register";
import { Intents } from "discord.js";
import { BOT_TOKEN } from "./config";

import { db } from "./db";
import { guildSettingsInterface } from "./interfaces/guild";
import { Client } from "./lib/client";
import { token, intents as configIntents } from "./private.json";

const client = new Client({
	intents: configIntents,
	defaultPrefix: "=>",
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Trace
	},
	shards: "auto",
	fetchPrefix: async (msg) => {
		let guildSettings: any = (await db.table("guilds").filter({ guild_id: msg.guild.id }).run())[0];

		if (!guildSettings) {
			let newGuildSettings = { guild_id: msg.guild.id, prefix: "=>" };

			await db.table("guilds").insert(newGuildSettings).run();

			client.logger.info(`prefix created for ${msg.guild.id}`);

			guildSettings = newGuildSettings;
		}

		return guildSettings.prefix;
    },
	api: {
		auth: {
			id: "",
			secret: "",
			cookie: "SAPPHIRE_AUTH",
			redirect: "",
			scopes: ["identify"],
			transformers: []
		},
		prefix: "/",
		origin: "*",
		listenOptions: {
			port: 4000
		}
	}
});

async function main() {
	try {
		client.logger.info("Logging in");
		await client.login(token);
		client.logger.info("Logged in");
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
