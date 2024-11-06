# Election-Bot

This is a fairly simple discord bot built with Discord JS that on command will pull up the US map and individual state maps for voting totals from the AP.

## How to Run?

- Clone the repo
- `npm install`
- Create a .env file that has:
  - Your bot's token labeled: `BOT_TOKEN`
  - Your application token labeled: `CLIENT_ID`
  - Your guild's id labeled: `GUILD_ID`
- Run `npm run deploy` to setup commands for your server
- Run `npm run start` to start the bot up
- I used pm2 to quickly run the bot in the background but do not officially endorse this package in any way

## Commands

The following are the commands that can be run in Discord:

- `/ping` responds with pong to test that the bot is up and running
- `/map <location>` responds with a screenshot of the AP reporting for this location (this can be a bit slow)
  - locations are the two letter codes for states like `OH`, `VT`, or `DC`
  - to get the overall map use `US`
