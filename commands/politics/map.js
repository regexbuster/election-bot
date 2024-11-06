const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const { Locations, getLocationData, getImage } = require("../../images");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("Get election map")
    .addStringOption((option) =>
      option
        .setName("location")
        .setDescription("The map location")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const target = interaction.options.getString("location");

    if (!getLocationData(target).ok) {
      await interaction.editReply(`There is no valid location named ${target}`);
      return;
    }

    const imageBuffer = await getImage(target);

    const attachment = new AttachmentBuilder(Buffer.from(imageBuffer), {
      name: "map.png",
    });

    const exampleEmbed = new EmbedBuilder().setImage("attachment://map.png");

    await interaction.editReply({
      embeds: [exampleEmbed],
      files: [attachment],
    });
  },
};
