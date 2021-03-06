/*

	Hello there! Please do not adjust any settings in this file. Instead,
	make all changes in your config.yaml file.

*/

const yaml = require('js-yaml');
const fs = require('fs');

let userCfg = {};

// Try for yaml config
try {
	userCfg = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
}
catch (e) {
	console.log(e);
}

// The only required option is token
const requiredOpt = ['token'];

// Default config generation
const defaultCfg = {
	// Public settings
	'token': null,

	'serverIds': [],
	'channelIds': [],

	// Spam settings.
	
	// Everything but receiving MESSAGE_UPDATE & MESSAGE_CREATE. Increases performance.
	// https://abal.moe/Eris/docs/reference#ws-event-names
	'disabledEvents': {
		'CHANNEL_CREATE': true,
		'CHANNEL_DELETE': true,
		'CHANNEL_UPDATE': true,
		'GUILD_BAN_ADD': true,
		'GUILD_BAN_REMOVE': true,
		'GUILD_CREATE': true,
		'GUILD_DELETE': true,
		'GUILD_MEMBER_ADD': true,
		'GUILD_MEMBER_REMOVE': true,
		'GUILD_MEMBER_UPDATE': true,
		'GUILD_ROLE_CREATE': true,
		'GUILD_ROLE_DELETE': true,
		'GUILD_ROLE_UPDATE': true,
		'GUILD_UPDATE': true,
		'MESSAGE_DELETE': true,
		'MESSAGE_DELETE_BULK': true,
		'PRESENCE_UPDATE': true,
		'TYPING_START': true,
		'USER_UPDATE': true,
		'VOICE_STATE_UPDATE': true,
	},
};

// Combine user config with default config to form final config
const finalizedCfg = Object.assign({}, defaultCfg);

// Transfer user options onto the final config
for (const [prop, value] of Object.entries(userCfg)) {
	finalizedCfg[prop] = value;
}

// If channelIds are specified, specChannel gets set to true
if(finalizedCfg.channelIds[0]) {
	finalizedCfg.specChannel = true;
}

// If serverIds are specified, specServer gets set to true
if(finalizedCfg.serverIds[0]) {
	finalizedCfg.specServer = true;
}


// Make sure all of the required config options are present
for (const opt of requiredOpt) {
	if (!finalizedCfg[opt]) {
		console.error('Missing required option: ${opt} in config.yaml');
		process.exit(1);
	}
}

// Export the finalized config
module.exports = finalizedCfg;