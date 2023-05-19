const express = require('express');
const commander = require('commander');
const { App, LogLevel } = require('@slack/bolt');
require('dotenv').config();

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3000;

// Initialize the Slack app
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.INFO,
});

// Define your Express routes
app.get('/', (req, res) => {
  res.send('Hello, I am your chatbot!');
});

// Handle command-line commands
commander
  .version('1.0.0')
  .command('greet')
  .description('Greet the user')
  .action(() => {
    console.log('Hello, user!');
  });

// Handle Slack events
slackApp.event('app_mention', ({ event, say }) => {
  say(`Hi there, <@${event.user}>! How can I assist you?`);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Bot is ready to receive commands!');

  commander.parse(process.argv);
});

// Start the Slack app
(async () => {
  await slackApp.start();
  console.log('Slack app is running!');
})();
