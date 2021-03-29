var emc = require("earthmc");

async function noTown(emc) {
  return (await emc.getTownless()).map((p) => p.name).join("  ");
}

async function getPlayers() {
  var allPlayers = await emc.getAllPlayers().then((players) => {
    return players;
  });
  var data = [];
  allPlayers.forEach(function (player, i) {
    if (player.town == "Svetlograd") {
      if (player.x != null) {
        data.push(player);
      }
    }
  });

  let reply = "";
  data.forEach(function (player, index) {
    reply += player.name + " ";
  });
  return reply;
}

module.exports = { noTown, getPlayers };
