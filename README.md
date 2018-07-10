[![Build Status](https://travis-ci.org/cjjenkinson/masterykeeper.svg?branch=master)](https://travis-ci.org/cjjenkinson/masterykeeper)

# Mastery Keeper

Daily reports on your progress towards 10,000 hours of skill mastery 🎩

### What is Mastery Keeper?

Mastery Keeper is a personal reporting app that keeps you focused on a long term path of mastery of a particular skill. 

Mastery in the scope of Mastery Keeper is a the total amount of hours spent on a particular activity that is tracked using a time tracking service such as Rescue Time. Every day it will collect the daily summary from the previous day and email the user a report on how they're doing.

The report looks like this:

<div align="center">
  <img src="https://github.com/cjjenkinson/masterykeeper/blob/beta-release-1.0.0/report.png?raw=true" />
</div>

### How to deploy your own Keeper

Three steps:

1. Create a personal Rescue Time API key
2. Define settings in now-secrets.json file
3. Deploy with now

#### 1. Rescue Time API Key

https://www.rescuetime.com/anapi/manage

#### 2. Define Keeper settings

Timezone: http://momentjs.com/timezone/

#### 3. Deploy with now


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

- Refactor keeper.createReport
- Refactor start & init
- Add joi schema validation for logs
- Unique check for avoiding duplicate logs on the same log date
- Configure email delivery time (via cron-job syntax)
- Add worker stats / reports as server routes
- Back up logs after every report
- Add welcome email
- Add weekly summary
- Explore multiple time tracking sources (Toggle, spreadsheets etc)
- Multiple goal tracking
- Enhance insights: best time, best month, difference between days, weeks etc
- Review deployment process

Cameron Jenkinson - camjenkinson@gmail.com
