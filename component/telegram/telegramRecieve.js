var config = require('../../config/telegram');
var TelegramBot = require('node-telegram-bot-api');

//token
var token = config.token;

//polling options
var opt = {polling: true};

//create Bot
var bot = new TelegramBot(token, opt);
var counter = 1;
//catch Message
bot.on('message', function(msg){
	console.log(msg);

	//get sender id
	var id = msg.chat.id;

	console.log(msg);

	//get text 
	var echo = msg.text;

	if(msg.text =="/id")
	{
		counter += 1;
		//var message = "hallo " + msg.from.first_name + " /Counter: " + counter;
		var message = "Deine Telegram ID lautet: " + msg.chat.id;
		//send message
		}
	else if(msg.text == "/add")
	{
		var message = "Erfolgreich zur Observe IT Gruppe hinzugefügt";
	}
	else if(msg.text == "/group")
	{
		message = "Test an Gruppe";
		id =  -298648417;
	}

	bot.sendMessage(id, message);

});


//erstes Command
bot.onText(/\/hallo/, (msg)=> {
	//get sender id
	var id = msg.chat.id;
	bot.sendMessage(id, "hallo ");
});

//erstes Command
bot.onText(/\/id/, (msg)=> {
	//get sender id
	var id = msg.chat.id;
	bot.sendMessage(id, "Deine Telegram ID lautet: " + msg.chat.id);
});

