import Discord from 'discord.js';

export class DiscordNotify {
  constructor() {
    this.hook = new Discord.WebhookClient(DiscordConfig.WEBHOOK_ID!, DiscordConfig.WEBHOOK_TOKEN!);
  }

  async notify(message) {
    try {
      await this.hook.send(message);
    } catch (e) {
      console.error([NOTIFY],e);
    }
  }

  async log(title, message) {
    const embedMsg = new Discord.RichEmbed()
      .setTitle(title)
      .setColor(0x939393)
      .setDescription(message);
    try {
      await this.hook.send(embedMsg);
    } catch (e) {
      console.error([NOTIFY],e);
    }
  }

  async error(message) {
    const embedMsg = new Discord.RichEmbed()
      .setTitle('ERROR')
      .setColor(0xFF0000)
      .setDescription(message);
    try {
      await this.hook.send(embedMsg);
    } catch (e) {
      console.error([NOTIFY],e);
    }
  }

  async warning(message) {
    const embedMsg = new Discord.RichEmbed()
      .setTitle('WARN')
      .setColor(0xFF7F24)
      .setDescription(message);
    try {
      await this.hook.send(embedMsg);
    } catch (e) {
      console.error([NOTIFY],e);
    }
  }

  async info(message) {
    const embedMsg = new Discord.RichEmbed()
      .setTitle('INFO')
      .setColor(0x00A50B)
      .setDescription(message);
    try {
      await this.hook.send(embedMsg);
    } catch (e) {
      console.error([NOTIFY],e);
    }
  }
}