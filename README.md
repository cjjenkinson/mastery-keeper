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
  <img src="https://github.com/cjjenkinson/masterykeeper/blob/beta-release-1.0.0/report.png?raw=true" />
</div>

Check out my logs and progress here: https://masterykeeper-wshpiesdrp.now.sh

### How to deploy your own Keeper

Clone the repo

```bash
git clone https://github.com/cjjenkinson/masterykeeper.git
```

Then follow these three steps:

1. Create a personal Rescue Time API key
2. Define settings in now-secrets.json file
3. Deploy with now

#### 1. Rescue Time API Key

https://www.rescuetime.com/anapi/manage

#### 2. Define Keeper settings

Timezone: http://momentjs.com/timezone/

#### 3. Deploy with now

In the root of the directory

```bash
now
```

Copy the deployed URL and run the now scale command

```bash
now scale https://my-app-replacethis.now.sh 1
```

This creates an instance that ensures the Cron Job will always execute.

An important note:

Since we’re forcing it to keep each instance alive you need to manually delete old instances after new deploys using the ```now rm``` command. You can see a list of all instances using ```now ls```.

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

- Add frontend profile dashboard
- Add goal and account config in frontend
- Move from lowdb to something more robust such as MongoDB / Postgres
- First time setup with RescueTime be able to pull in past summaries up to one month to pre-populate logs avoiding a cold start
- Refactor keeper.createReport
- Refactor start & init
- Add joi schema validation for logs
- Unique check for avoiding duplicate logs on the same log date
- Configure email delivery time (via cron-job syntax)
- Add worker stats / reports as server routes
- Back up logs after every report
- Add welcome email on first time setup
- Add weekly, monthl summary emails
- Add multiple time tracking sources (Toggle, spreadsheets etc)
- Multiple goal tracking
- Enhance insights: best day of the week, difference between days, weeks etc
- Review deployment process
- Marketing / documentation website

Cameron Jenkinson - camjenkinson@gmail.com
