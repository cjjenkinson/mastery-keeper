const debug = require('debug')('keeper:worker');

import cron from 'cron';
import axios from 'axios';
import uuidv1 from 'uuid/v1';

import utils from './utils';
import insights from './insights';
import email from './email';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

class Keeper {
  constructor(defaults) {
    this.rescuetimeKey = defaults.rescuetimeKey;
    this.rescuetimeCategory = defaults.rescuetimeCategory;
    this.user = defaults.user || {};
  }

  start() {
    // check for existing logs to avoid overwrite
    const hasLogs = db.has('logs').value();

    if (!hasLogs) {

      // Setup DB with defaults
      db.defaults({
        logs: [],
        user: {
          username: this.user.username,
          email: this.user.email,
          timezone: this.user.timezone,
          goal: {
            title: this.user.goal.title,
            target: Number(this.user.goal.target),
            progress: Number(this.user.goal.progress),
          },
        },
      }).write();

      debug(`> Initial setup complete for ${this.user.username}`);
    }

    this.processDailyReport();
  }

  async getDailySummary() {
    const url = `https://www.rescuetime.com/anapi/daily_summary_feed?key=${
      this.rescuetimeKey
    }`;
    const dailySummary = await axios.get(url);
    return dailySummary;
  }

  async createReport() {
    const dailySummary = await this.getDailySummary();

    const logData = dailySummary.data[0];

    if (!logData) {
      throw new Error(
        'Log data could not be retrieved, please check the Rescue Time service.'
      );
    }

    const log = {
      id: uuidv1(),
      createdAt: Date.now(),
      logDate: logData.date,
      hoursRaw: logData.software_development_hours,
    };

    const { logDate, hoursRaw } = log;

    // Check for unique logs from date
    db.get('logs')
      .push(log)
      .write();

    const user = db.get('user').value();

    const { username } = user;
    const { title, target, progress } = user.goal;

    const dailyAverage = db
      .get('logs')
      .take(5)
      .map('hoursRaw')
      .mean()
      .value();

    const progressDifference = target - progress;
    const updatedProgress = (progress + hoursRaw).toFixed(2);

    db.set('user.goal.progress', updatedProgress).write();

    const insightsData = await insights.createLogInsights({
      difference: {
        previous: 2.0, // hours from last log
        current: hoursRaw,
      },
      completion: {
        currentProgress: updatedProgress,
        target,
        dailyAverage,
        progressDifference,
        multiplier: 1,
      },
    });

    const {
      percentageDifference,
      percentageCompletion,
      timeToCompletion,
    } = insightsData;

    const hoursFormatted = utils.formatRawHours(log.hoursRaw);
    const dailyAverageFormatted = utils.formatRawHours(dailyAverage);
    const targetFormatted = utils.formatNumber(target);

    const reportData = {
      logDate,
      username,
      hoursFormatted,
      percentageDifference,
      title,
      target: targetFormatted,
      progress: updatedProgress,
      progressDifference,
      percentageCompletion,
      dailyAverageFormatted,
      completionTimeDays: timeToCompletion.days,
      completionTimeMonths: timeToCompletion.months,
      completionTimeYears: timeToCompletion.years,
    };

    return reportData;
  }

  async sendReport() {
    const reportData = await this.createReport();
    const html = email.createHtmlTemplate(reportData);

    const mailOptions = {
      user: { email: this.user.email },
      subject: '📈 Your daily mastery report is ready',
      html,
    };

    email.send(mailOptions);
  }

  getUser() {
    const logs = db.get('logs').value();
    const user = db.get('user').value();

    return {
      logs,
      user,
    };
  }

  processDailyReport() {
    const processDailyReportWorker = new cron.CronJob({
      cronTime: '10 6 * * *',
      onTick: async() => {
        /*
        * Runs every day at 6:10 AM
        * '10 6 * * *'
        */
        try {
          await this.sendReport();
          debug('> Report succesfully processed and sent');
        } catch (err) {
          console.error(`> Error in processing daily report: ${err.message}`);
          processDailyReportWorker.stop();
          debug(
            `> [processDailyReport] worker status: ${
              processDailyReportWorker.running
            }`
          );
        }
      },
      start: false,
      timeZone: this.user.timezone || 'Europe/London',
    });

    // start the worker
    processDailyReportWorker.start();
    debug(
      `> [processDailyReport] worker status: ${
        processDailyReportWorker.running
      }`
    );
  }
}

export default Keeper;
