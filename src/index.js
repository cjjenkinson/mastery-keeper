const debug = require('debug')('keeper:worker');
const CronJob = require('cron').CronJob;
const monk = require('monk');

import path from 'path';
import axios from 'axios';
import sgMail from '@sendgrid/mail';
import * as utils from './utils';

// Rescuetime
const rescuetimeUrl = `https://www.rescuetime.com/anapi/daily_summary_feed?key=${RESCUE_TIME_KEY}`;

// Setup SendGrid
sgMail.setApiKey(process.env.SEND_GRID_KEY_DEV);

// Setup Database
// const db = monk(url);
// db.then(() => {
//   console.log('> Connected to database...')
// })

const processDailyReportEmail = async () => {
  const goals = db.get('goals');
  const logs = db.get('logs');

  const dailySummary = await axios.get(rescuetimeUrl);
  const logData = dailySummary.data[0];

  const dailyLog = {
    created_at: Date.now(),
    date: logData.date,
    hours_raw: logData.software_development_hours,
  };

  const { date, hours_raw } = dailyLog

  goals.findOne({ userId: '1s' }).then((goal) => {
    const target = goal.target;
    const progress = goal.progress;
    // calculate
    const dailyAverage = 4.5;

    const remaining = target - progress;
    const nextProgress = Number(progress + hours_raw).toFixed(2);

    logs.insert(dailyLog)
      .then(() => {
        console.log('Created new log')
      })
      .then(() => {
        return goals.update({ userId: '1s' }, { $set: { progress: nextProgress } })
      })
      .then((goal) => {
        // Create Insights from new log
        // logged hours formatted using own utility
        const hoursFormatted = utils.formatRawHours(hours_raw);
        // yesterday difference plus / minis percentage -46%
        // get hours from previous log
        // hours from current log
        const percentageDifference = utils.getPercentageDifference(5.5, hours_raw);
        // percentageDifferenceComment

        // update goal with next progresss
        const percentageCompletion = utils.getPercentageCompletion(
          nextProgress,
          target
        );

        // Goal insights
        // time to target based on your average daily of XX hours
        const dailyAverageFormatted = utils.formatRawHours(dailyAverage);
        const timeToCompletion = utils.getTimeToCompletion(
          dailyAverage,
          remaining,
          1
        );

        const { days, months, years } = timeToCompletion;

        const DAILY_REPORT_EMAIL = {
          to: 'camjenkinson@gmail.com',
          from: 'keeper@masterykeeper.com',
          name: 'Mastery Keeper',
          subject: '📈 Your daily mastery report is ready',
          templateId: DAILY_REPORT_EMAIL_TEMPLATE_ID,
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            date: date,
            hours_formatted: hoursFormatted,
            percentange_difference: percentageDifference,
            title: 'Software Engineering',
            target: '10,000',
            progress: progress,
            progress_difference: remaining,
            percentage_completion: percentageCompletion,
            daily_average_formatted: dailyAverageFormatted,
            daily_average_time_to_completion_days: days,
            daily_average_time_to_completion_months: months,
            daily_average_time_to_completion_years: years,
          },
        };

        sgMail.send(DAILY_REPORT_EMAIL);
        console.log(`> Daily report sent succesfully: ${DAILY_REPORT_EMAIL}`);

      })
      .then(() => db.close())
  });
};

const processDailyReport = new CronJob({
  cronTime: '10 1 * * *',
  onTick: () => {
    /*
     * Runs every day at 1:10 AM
     * '10 1 * * *'
     */
     processDailyReportEmail();
  },
  start: false,
  timeZone: 'Europe/Amsterdam'
});

// start the worker
processDailyReport.start();
debug(`> [processDailyReport] worker status: ${processDailyReport.running}`);

console.log('> mastery keeper is starting...');
