[![Build Status](https://travis-ci.org/cjjenkinson/masterykeeper.svg?branch=master)](https://travis-ci.org/cjjenkinson/masterykeeper)

# Mastery Keeper

Daily reports on your progress towards 10,000 hours of skill mastery 🎩

### What is Mastery Keeper?

Mastery Keeper is a personal reporting app that keeps you focused on a long term path of mastery of a particular skill. Mastery in the scope of Mastery Keeper is a the total amount of hours spent on a particular activity that is tracked using a time tracking service such as Rescue Time. Every day it will collect the daily summary from the previous day and email the user a report on how they're doing.

The report looks like this:

<div align="center">
  <img src="https://github.com/cjjenkinson/masterykeeper/blob/beta-release-1.0.0/report.png?raw=true" />
</div>

### Why?

10,000 hours is well known to be the amount of hours needed to master a particular skill.

Every morning Mastery Keeper sends me a reminder that helps me focus and hold me accountable to consistently practice to become a better software engineer than I was yesterday.

Although I may not become a master at 10,000 hours I am pretty certain that I'll be better than I was at 1,000, 5,000 hours and so on. Mastery Keeper was created because I am pretty lazy at keeping track of the total amount of hours I spend doing things like programming. I've tried doing it manually but I was not able to do it consistently and reliably.

It dawned on me that I use Rescue Time to track what I do when I'm using my laptop both at work and at home. Any activity related to software engineering is automatically tracked through Rescue Time and it is a great way to measure hours practiced without thinking about it. Mastery Keeper was made to be an extension to these time tracking services and it uses the logs to provide a personalised goal progress tool.

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
