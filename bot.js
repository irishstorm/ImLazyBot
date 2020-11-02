//  Requires
const { Client, Message } = require('discord.js');
const { config } = require("dotenv");
const cron = require('cron');



//  Inits
const bot = new Client();

config({
    path: __dirname + "/.env"
});

//  Vars
const token = process.env.TOKEN;
const prefix = "!";
const _id = process.env.ID;

//  Bot Init
bot.on('ready', () => {
    console.log(`${bot.user.tag} is Online!`);

    bot.user.setPresence({
        status: "online",
        game: {
            name : `${prefix}help for info`,
            type: "LISTENING"
        }
    });
});

//  Bot Message
bot.on('message', async message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    switch(cmd){
        case "start":
            let job = new cron.CronJob('0 0 9 * * *', () => {
                ImLazy();
            });

            job.start()
        break;
    }
});

//  Bot Login
bot.login(token);



function ImLazy(){
    const wordList = [ "cute", "adorable", "beautiful", "charming", "pretty", "delightful", "captivating", "sexy", "heavenly", "luscious", "wonderful" ];
    const sentence = ["Good morning my love, I just wanted you to know that i think you have a ", " smile, a ", " body, a "," belly, a ", " face, and "," butt! I hope you have a wonderful day."];
    var str = "";
    var duplicatedNumbers = [];
    
    for(var i = 0; i < sentence.length; i++)
    { 
        var random = rand(0, wordList.length);

        while(duplicatedNumbers.includes(random))
            random = rand(0, wordList.length);
        
        if(i < sentence.length - 1)
            str += sentence[i] + wordList[random];
        else
            str += sentence[i]

        duplicatedNumbers.push(random);
    }

    bot.users.cache.get(_id).send(str)
}

function rand(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}