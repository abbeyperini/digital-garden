## Panini Bot — Making a Discord Bot with Replit, UptimeRobot, Node.js, Express, and Eris

![Tweet by Vax Een @_jovanrb "Replacing the word "pandemic" with incorrect variations is now 90% of how I've been coping with this panasonic"](https://images.abbeyperini.com/panini-bot/twitter.webp)

As soon as I saw [Emi's tweet](https://twitter.com/TheCodePixi/status/1387755394722844672?s=20) about the open source [Pandera package](https://www.npmjs.com/package/pandera), I knew it had to be a Discord bot, so here's how I built a bot that will insert a new word starting with 'p' for every instance of 'pandemic' in a Discord message.

Cover image alt text: "Replacing the word "pandemic" with incorrect variations is 90% of how I've been coping with this panasonic" - [Vax Een](https://twitter.com/_jovanrb)

I'd already used [replit](https://replit.com/) and [UptimeRobot](https://uptimerobot.com/) to make a Python Discord bot that sends my friends pictures of dogs, so I fired up a [Node.js](https://nodejs.org/en/) repl and named it Panini. You can view the [live code here](https://replit.com/@abbeyperini/Panini).

### Making a Discord bot with Replit, UptimeRobot, Node.js, Express, and Eris

For UptimeRobot to keep my bot alive, the first thing I need in my Node.js repl is an [Express](https://expressjs.com/) server. After running `npm install express` in the console, I added the following code to index.js:

```Javascript
// server imports
const express = require('express');
const app = express();
const port = 3000;
// create main route
app.get('/', (req, res) => res.send('Hello World!'));
// instantiate server
app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));
```

When I hit run, I should see a browser window pop up above the console with "Hello World!" and "App is listening at `http://localhost:3000`" in the console. I'll need the URL at the top of the window to connect UptimeRobot and keep Panini Bot alive.

After logging into my UptimeRobot account and clicking 'Add New Monitor' in my dashboard, I set it to HTTP(s) Monitor Type, give it a Friendly Name, enter the URL from my repl browser window, and set the Monitoring Interval to every 5 minutes. It will then ping my Panini Bot server regularly. You can even have your robot email you every time it pings your server and the server is down!

![a screenshot of the UptimeRobot Edit Monitor form with monitor type, friendly name, URL (or IP) and monitoring interval settings](https://images.abbeyperini.com/panini-bot/monitor.png)

Next, I created a bot in Discord, installed the [Eris package](https://www.npmjs.com/package/eris) and brought my Panini Bot online.

To create a bot, I logged into Discord and navigated to `https://discord.com/developers/applications`. I clicked 'new application' and gave my bot application a name.

![Discord developer portal after a new application is created. There's information about the new bot application including the application ID.](https://images.abbeyperini.com/panini-bot/general.png)

I saved the application ID for later - this is the bot token. Afterwards,  I still had to click on 'Bot' in the navigation bar on the left. After adding a bot, I know I'm done when I see a Bot screen with "A wild bot has appeared!"

![The bot screen the Discord developer portal after a new bot is created. A green banner with "A wild bot has appeared!" and information about the bot](https://images.abbeyperini.com/panini-bot/discord.png)

My bot is live and ready to be used. If you want to be sure no one else adds your bot to a server, toggle off 'Public Bot.'

A repl has a secrets tab that works just like a `dotenv` file or secrets manager. All you have to do is click on the lock in the navigation bar on the left and you should see this screen:

![The secrets tab in a repl. A form with a box for key and value with  "add new secret" button and button for putting your secret code into your files.](https://images.abbeyperini.com/panini-bot/secrets.png)

I added my Discord application id to the value field. The key is the variable name you want to use. I used `bot_id`, so I access my bot token with `process.env['bot_id']`. Repl will even insert the code you need to access your secret into your file for you.

Next I ran `npm install eris` and added the initial bot code:

```Javascript
const eris = require('eris');
const bot = new eris.CommandClient(process.env['bot_id'], {}, {
  description: "Returns your message with the word 'pandemic' replaced by a random word starting with the letter 'p.'",
  owner: "Abbey Perini",
  prefix: '!'
});
// what the bot does when it's ready
bot.on('ready', () => {
  console.log('Connected and ready');
});
// error 'handling'
bot.on("error", (err) => {
  console.error(err);
});
// instantiate bot
bot.connect();
```

Now when I hit run, I see 'Connected and ready' in the console. This will also connect my code to my new Discord bot, prefix all commands with an exclamation point, and the !help command will return a message including the `description` and `owner` properties defined above.

Full disclosure: I originally wrote this bot with `eris.Client()` and chained async functions for the !Panini command. After my first round of user testing - aka asking my friends to break it - I leaned into the tools provided by Eris, and there are a few cool benefits to using `eris.CommandClient()` over new `eris.Client()`:

The `description` and `fullDescription` define descriptive text for the !help command to send to users. You only have to `return` whatever you want sent as a message in response to the command being used. The built in arguments are also pretty neat. Not only do you get a `msg` object with useful properties like `username` and `id`, but also the `args` argument, an array of the entire message after the command split by space.

Next, I registered my first command and tested that the bot was online:

```Javascript
const paniniSummon = bot.registerCommand("Panini", (msg, args) => {
  return "Reporting for duty!";
}, {
     description: "Summon Panini Bot",
     fullDescription: "If you want Panini Bot to replace the word 'pandemic' for you, start your message with this command."
    })
```

I [created an invite link](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links) and invited Panini Bot to my bot test server. I suggest making a server or channel for bot testing, especially in the beginning. After adding my bot, I sent a message with '!Panini' and it responded back with a message saying 'Reporting for duty!'

### Making Panini Bot

I want Panini Bot to see a message with the !Panini command, delete that message, and then send a new message. The new message should mention the user, followed by their original message, but a brand new word starting with 'p' will replace every instance of 'pandemic' or 'Pandemic.' When I originally wrote my `createMessage` function, it replaced all instances of 'pandemic' with the same random p-word. For the purposes of this blog, we'll skip ahead to Panini Bot 2.1.

After user testing, I realized I needed to alias commands so users could also use '!panini.' Furthermore, I quickly found I'd need Panini Bot to send an error message if there was no message body after the command or it didn't include at least one instance of 'pandemic.' After struggling a little bit to get the bot up and running in my own established server, I wanted to add a permissions error message. Most importantly, my friends immediately turned it into a Mad Libs bot, so I knew I had to rewrite `createMessage` so that each instance of 'pandemic' would be replaced by a different p-word.

First the new command aliases:

```Javascript
// Alias !halp to !help
bot.registerCommandAlias("halp", "help");
// Alias !panini to !Panini
bot.registerCommandAlias("panini", "Panini")
```

Then, I installed Pandera ( `npm install pandera` ) and added my import statement:

```Javascript
const pandera = require('pandera');
```

When I call `pandera()`, it will return 1 random p-word.

Next I wrote an array so the bot could check if 'pandemic' was in the message body:

```Javascript
const pandemicsArray = ['pandemic', 'Pandemic', 'pandemic!', 'Pandemic!', 'pandemic?', 'Pandemic?', 'pandemic.', 'Pandemic.', 'pandemic,', 'Pandemic,', 'pandemic:', 'Pandemic:', 'pandemic;', 'Pandemic;', '"pandemic"', '"Pandemic"', "'pandemic'", "'Pandemic'"];
```

Now let's rewrite the `paniniSummon` command:

```Javascript
const paniniSummon = bot.registerCommand("Panini", (msg, args) => {
  console.log(msg.id, msg.content, msg.author.username, msg.channel.id);
  let includesPan = false;
  for (i = 0; i < args.length; i++) {
    if (pandemicsArray.includes(args[i])) {
      includesPan = true;
    }
  }
  if (args.length === 0) {
    return "No message to edit. Use the command '!help' for more information.";
  } else if (!includesPan) {
    return "No instance of 'pandemic' to replace. Use the command '!help' for more information.";
  }
  deleteOldMessage(msg)
  return formatNewMessage(msg, args);
}, {
    description: "Summon Panini Bot",
    fullDescription: "If you want Panini Bot to replace the word 'pandemic' for you, start your message with this command."
    })
```

After a couple rounds of user testing, I started `console.log`-ing information about the message before anything is replaced and the message body after it was formatted. `includesPan` is my check for the word 'pandemic.' Because `args` is an array of words, it's easy to iterate through and check each one against my `pandemicsArray`.

The `if` block checks first if there is any message after the command then if my check turned `includesPan` true. If either is not true, an error message with more information for the user is returned. Next I call `deleteOldMessage` and pass the entire `msg` object. Then I call `formatNewMessage` and pass the `msg` object and the `args` array. Whatever I get back from `formatNewMessage` will be returned as a new Discord message.

`deleteOldMessage` stayed pretty much the same from Panini Bot 1.0 to Panini Bot 2.0:

```Javascript
async function deleteOldMessage(msg) {
  const channel = msg.channel.id;
  await bot.deleteMessage(channel, msg.id, "replace the word 'Pandemic'")
    .catch((error) => { // error message
      if (error.message === "Missing Permissions") {
        sendPermissionsError(channel);
      }
    });
}
```

When calling `deleteOldMessage` inside the command, instead of chained in `then()`, I needed the channel id from the `msg` object and I added the `sendPermissionsError` function which looks like this:

```Javascript
async function sendPermissionsError(channel) {
  await bot.createMessage(channel, "Panini Bot needs the Manage Messages permission to delete replaced messages. https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions");
}
```

The Panini Bot will need the 'Manage Messages' permission so it can delete the old message before it is replaced. Any server Panini Bot is in will either have to let users manage other users' messages at a channel level or make Panini an admin. I also added the permission to my discord bot invite link using [this calculator](https://discordapi.com/permissions.html).

Finally, it's time to format Panini Bot's new message to send back - aka Pandemic Mad Libs.

```Javascript
function formatNewMessage(msg, args) {
  const author = msg.author.id;
  let numOfP = 0;
  for (i = 0; i < args.length; i++) {
    if (pandemicsArray.includes(args[i])) {
      numOfP++;
    }
  }
  let pArray = [];
  for (i = 0; i < numOfP; i++) {
    let newP = pandera();
    pArray.push(newP);
  }
  let pIndex = 0;
  for (i = 0; i < args.length; i++) {
    if (pandemicsArray.includes(args[i])) {
      let index = args.indexOf(args[i]);
      let oldArg = args[i];
      let newArg = oldArg.replace(/pandemic/gi, pArray[pIndex]);
      args[index] = newArg;
      pIndex++;
    }
  }
  let messageBody = args.join(" ");
  let fullMessage = `<@${author}> says "${messageBody}"`;
  console.log(fullMessage);
  return fullMessage;
}
```

First, I want to mention the user, so I pull the user's id from the `msg` object. Discord mention syntax is `<@userID>`, so the template literal I'll `return` at the end of the function starts with `<@${author}>`.

Then, I made a `for` loop to get the number of instances of 'pandemic' in the message body using `.includes()` and our old buddy the `pandemicsArray`.

Next, I wrote a `for` loop to populate an array of the same amount of new p-words.

Finally, I wrote a `for` loop to replace each of the instances of 'pandemic' with a unique p-word. The regular expression, `/pandemic/gi`, will replace every instance of pandemic with a word from the `pArray` based on the `pIndex` counter and is case insensitive. This means that it will leave the user's punctuation even if `args[i]` is something like 'pandemic!' or 'pandemic.'

At this point it worked, but I was looking at three `for` loops and knew there had to be other ways. I reached out to two developers who are always willing to walk me through coding concepts, [Kirk](https://twitter.com/KirkCodes) and [Alex](https://github.com/alyons).

Kirk, functional programmer extraordinaire, reminded me that `map`s exist for a reason, and framed it as a transformation of the array. Here's his solution:

```Javascript
function formatNewMessage(msg, args) {
  const author = msg.author.id;
  const pandemicReplacer = (word) => {
    if (pandemicsArray.includes(word)) {
      return word.replace(/pandemic/gi, pandera())
    }
      return word
    }
  const messageBody = args.map(pandemicReplacer).join(" ");
  let fullMessage = `<@${author}> says "${messageBody}"`;
    
  return fullMessage;
}
```

Alex, Senior DevOps Engineer and Cloud Infrastructure wizard, chose to work with the whole message as a string instead of the `args` array of words:

```Javascript
function formatMessageExAid(msg, args) {
  const author = msg.author.id;
  let messageBody = args.join(" ");
  let newMsg = `<@${author}> says "${messageBody}"`;
  while (newMsg.includes('pandemic')) {
    newMsg = newMsg.replace(/pandemic/i, pandera());
  }
  return newMsg;
}
```

### Conclusion

I enjoy working in a repl not only because I can check the bot from my phone, but also because I can invite other developers to collaborate. There are a few features I vacillate on adding to Panini Bot. I chose not to worry about capitalization, but I could add the option to turn off the permissions error message and/or `deleteOldMessage`. If you have thoughts about this or any other part of Panini Bot, share in the comments!

Panini Bot was so fun to build! Super special thanks to [Emi](https://twitter.com/TheCodePixi) and [Yechiel](https://twitter.com/yechielk) for building Pandera in the first place. As always, thanks to Kirk and Alex for being encouraging and educational at the same time.

[Add Panini Bot to your Discord server today!](https://discord.com/oauth2/authorize?client_id=845293659712389120&scope=bot&permissions=8192)
