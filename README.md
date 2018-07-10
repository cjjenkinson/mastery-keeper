[![Build Status](https://travis-ci.org/cjjenkinson/masterykeeper.svg?branch=master)](https://travis-ci.org/cjjenkinson/masterykeeper)

# Mastery Keeper

### What is Mastery Keeper?

### How does it work?


### Deploy your own Keeper

Three steps:

1. Create a personal Rescue Time API key
2. Define settings in now-secrets.json file
3. Deploy with now

#### 1. Rescue Time API Key

https://www.rescuetime.com/anapi/manage

#### 2. Define Keeper settings

Timezone: http://momentjs.com/timezone/

#### 3. Deploy to now


### Contributing

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
- Multiple goal tracking
- Enhance insights: best time, best month, difference between days, weeks etc

Cameron Jenkinson - camjenkinson@gmail.com