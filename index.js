var emc = require("earthmc");

const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', function () {
  console.log("Je suis connecté !")
})
console.log(bot);
bot.login('ODExNzQ2Mjk5MzMzOTY3OTAz.YC2rpw.bH7HSo6kU2xkq8MHE_0Y_miKyX8').then(() => {
    
    setInterval(async function(){

        var test = await getNearest();
        
        if(test){
            bot.channels.cache.get('812084879100870706').send(test);
        }
        
    },10000)
});

bot.on('message', async function(message){
    if (message.content === '!online') {
        message.reply(await getPlayers());
    }
    if (message.content === '!notown') {
        message.reply(await noTown());
    }
})


async function noTown(){
    var allPlayers = await emc.getTownless().then(players => { return players });
    
    let reply = "";
    allPlayers.forEach(function(player, index){
        reply += player.name + " ";
    })
    
    return reply;
}

async function getPlayers(){
    var allPlayers = await emc.getAllPlayers().then(players => { return players });
    var data = [];
    allPlayers.forEach(function(player, i){
        if(player.town == "Svetlograd"){
            if(player.x != null){
                data.push(player);
            }
        }
    });
    
    let reply = "";
    data.forEach(function(player, index){
        reply += player.name + " ";
    })
    return reply;
}

async function getNearest(){
    var Svetlo = {
        x: 18758,
        z: -12697
    }
    var data = [];

    var allPlayers = await emc.getAllPlayers().then(players => { return players });
    var noTown = await emc.getTownless().then(players => { return players });
    await noTown.forEach(async function(player, i){
        if(Svetlo.x - player.x < 700 && Svetlo.x - player.x > -700){
            if(Svetlo.z - player.z < 700 && Svetlo.z - player.z > -700){
                allPlayers.push(player);
            }
        }
    });
    allPlayers.forEach(function(player, i){
        if(Svetlo.x - player.x < 700 && Svetlo.x - player.x > -700){
            if(Svetlo.z - player.z < 700 && Svetlo.z - player.z > -700){
                if(player.town != "Svetlograd"){
                    data.push(player);
                }
            }
        }
    });
    
    let reply = "Nearby Players : ";
    data.forEach(function(player, index){
        console.log(player);
        if(player.town){
            reply += player.name + ` (${player.town}, ${player.nation}, [x:${player.x}, z:${player.z}]) - ` ;
        }else{
            reply += player.name + ` ([x:${player.x}, z:${player.z}]) - ` ;
        }
        
    })
    if(data.length > 0){
        return reply;
    }else{
        return false;
    }
}
