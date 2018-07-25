[![Build Status](https://travis-ci.org/cjjenkinson/masterykeeper.svg?branch=master)](https://travis-ci.org/cjjenkinson/masterykeeper)

<div align="center">
  <img src="https://github.com/cjjenkinson/masterykeeper/blob/develop/logo.png?raw=true" width="160px" />
  <h3>Mastery Keeper</h3>
  <h5>Daily reports on your progress towards 10,000 hours of skill mastery 🎩</h5>
</div>

### What is Mastery Keeper?

Mastery Keeper is a personal reporting app that keeps you focused on a long term path of skill mastery.

Mastery Keeper tracks the total amount of hours practiced towards a goal such as 10,000 hours of programming.

Mastery Keeper will use the time logs from Rescue Time a service which automatically tracks time spent on specific activities like Software Engineering meaning all logs are accurate and reliable.

Every morning your Keeper will head out and get the logs from the day before and will create some useful insights on your progress before packaging it all up in a report sent to you via email.

The daily progress report looks like this:

<div align="center">
  <img src="https://github.com/cjjenkinson/masterykeeper/blob/master/report.png?raw=true" />
</div>

### How to deploy your own Keeper

Clone the repo

```bash
git clone https://github.com/cjjenkinson/masterykeeper.git
```

Then follow these three steps:

1. Create a personal Rescue Time API key
2. Define settings in now-secrets.json file
3. Deployment

#### 1. Rescue Time API Key

If you're already using Rescue Time access the API management console through this [link](https://www.rescuetime.com/anapi/manage).

Create an API key and name it Mastery Keeper when prompted.

If you are not using Rescue Time please sign up, download the desktop app, configure your settings and ensure you've added a days worth of activities before setting up Mastery Keeper. This is because Rescue Time will need to understand how to categories the time spent on your computer before adding it to specific categories such as 'software engineering'.

Once you've got a couple of days worth of time on the 'software engineering' category return to deploy your keeper. Also, make sure have configured and labelled what counts as practice such as using your editor, github, stackoverflow or reading specific books this is completely up to you.

#### 2. Define Keeper settings

After succesfully obtaining a Rescue Time API key and cloning the repository it is time to configure your Keeper's settings.

First copy the ```now.example.json``` into ```now.json``` with the env variables defined.

These are my settings with the Rescue Time token omitted.

```javascript
{
  "env": {
    "SMTP_USERNAME": "camjenkinson@gmail.com",
    "SMTP_PASSWORD": "BFqWAEvCi3sc",
    "RESCUE_TIME_TOKEN": "secret-token",
    "RESCUE_TIME_CATEGORY": "software_development_hours",
    "GOAL_TITLE": "Software Engineering",
    "GOAL_TARGET": "10000",
    "GOAL_EXISTING_PROGRESS": "600",
    "USERNAME": "Cameron Jenkinson",
    "EMAIL": "camjenkinson@gmail.com",
    "TIMEZONE": "Europe/London"
  }
}
```

- Update the token with the token you obtained from the Rescue Time API management console.
- Add the category that you're basing your skill practice on such as software engineering, this should be the category returned from Rescue Time
- Add a readable title which is used on the daily reports
- Add the goal target, by default this is 10,000 hours
- Add any existing progress you've tracked elsewhere, by default this will start at 0
- Add your full name as the username
- Your email address where the reports are sent to
- Your timezone for the cron-job to execute correctly, use the Moment notation found [here](http://momentjs.com/timezone/)

Keeper will throw a configuration error if you don't define all of the settings up-front.

#### 3. Deployment

TBC.. undergoing updates

### Contributing

All contributions are welcome, I've put together a list of items I'll be tackling over the coming months so feel free to reach out via email.

### Setup the dev environment

Install the dependencies

```bash
yarn
```

Run with Backpack

```bash
yarn dev
```

Testing

```bash
yarn test
yarn coverage
check-coverage
```

#### TODO

- Add frontend profile snapshot (see design below)
- Add goal and account config in frontend
- Move from lowdb to something more robust such as MongoDB / Postgres
- First time setup with RescueTime be able to pull in past summaries up to one month to pre-populate logs avoiding a cold start
- Refactor keeper.createReport
- Refactor start
- Add joi schema validation for models
- Unique check for avoiding duplicate logs on the same log date
- Configure email delivery time (via cron-job syntax)
- Add worker stats / reports as server routes
- Add frontend dashboard to display progress
- Back up logs after every report
- Add welcome email on first time setup
- Add weekly, monthly summary emails
- Add multiple time tracking sources (Toggle, spreadsheets etc)
- Multiple goal tracking
- Enhance insights: best day of the week, difference between days, weeks etc
- Review deployment process
- Marketing / documentation website

#### Profile Snapshot design

<div align="center">
  <img src="https://github.com/cjjenkinson/masterykeeper/blob/master/profile_snapshot.png?raw=true" />
</div>

Cameron Jenkinson - camjenkinson@gmail.com
