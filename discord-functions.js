const Discord = require('discord.js')

// Sorts and identifies the names of all the events from a list and adds them to the embed.
function parseEvents(eventList, embed, ignoreTutorials) {
  let finalEventCount = 0
  eventList.sort(function (a, b) {
    var aDate = new Date(a.StartDateTime).getTime(), bDate = new Date(b.StartDateTime).getTime();
    return aDate - bDate;
  });

  eventList.forEach(event => {
    if (ignoreTutorials == true && event.Description.toUpperCase() == 'TUTORIAL') return
    finalEventCount += 1
    const locations = event.Location.split(', ');
    var locationArray = [];
    locations.forEach(location => {
      locationArray.push(location.split('.')[1]);
    })
    let eventName = event.Name
    if (event.ExtraProperties[0].Name == 'Module Name') eventName = event.ExtraProperties[0].Value;
    embed.addFields(
      {
        name: `${eventName} (${event.Description})`,
        value: `Time: \`${new Date(event.StartDateTime).toLocaleTimeString().slice(0, 5)}\` - \`${new Date(event.EndDateTime).toLocaleTimeString().slice(0, 5)}\`\nLocation: ${locationArray.join(', ')}`
      },
    );
  });
  if (finalEventCount == 0) return
  return embed
};

// Creates a red embed with the addErrorField method to quickly add error info.
// Also you can put in the first field right here.
function buildErrorEmbed(commandName, fieldTitle, fieldValue) {
  let outputEmbed = new Discord.EmbedBuilder()
    .setTitle(`Error*(s)* with command: \`/${commandName}\``)
    .setColor('Red');

  outputEmbed.addErrorField = function (errorTitle, errorValue) {
    this.addFields({
      name: errorTitle,
      value: (errorValue) ? errorValue : '\u200b'
    });
    return this
  };

  if (fieldTitle) {
    outputEmbed = outputEmbed.addErrorField(fieldTitle, fieldValue)
  };
  return outputEmbed
};

exported = {
  parseEvents, buildErrorEmbed
};

module.exports = exported;