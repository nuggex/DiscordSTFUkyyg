const Eris = require('eris');
const config = require('./config.js');


const bot = new Eris.Client(config.token, {
	disableEvents: config.disabledEvents,
});

bot.once('connect', () => {
	console.log('Bot started.');
});
bot.on('messageCreate', (msg) => {
    
if(msg.author.username == 'kyyg') {
    setTimeout(function() {
        bot.createMessage(msg.channel.id, "STFU KYYG");
    }, 100);
}
});

bot.connect();