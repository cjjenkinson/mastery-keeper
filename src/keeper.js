import cron from 'cron';
import axios from 'axios';
import uuidv1 from 'uuid/v1';

import utils from './utils';
import insights from './insights';
import email from './email';

const debug = require('debug')('keeper:worker');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const dbPath = process.env.NODE_ENV !== 'production' ? './db.json' : './build/db.json';

const adapter = new FileSync(dbPath);
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

  async getDailySummaryLog() {
    const url = `https://www.rescuetime.com/anapi/daily_summary_feed?key=${this.rescuetimeKey}`;
    const dailySummary = await axios.get(url);

    const logfromSummary = dailySummary.data[0];

    if (!logfromSummary) {
      throw new Error('Log data could not be retrieved, please check the Rescue Time service.');
    }

    return logfromSummary;
  }

  getUser() {
    const logs = db.get('logs').value();
    const user = db.get('user').value();

    return {
      logs,
      user,
    };
  }

  addLog({ logDate, hoursRaw }) {
    const log = {
      id: uuidv1(),
      createdAt: Date.now(),
      logDate,
      hoursRaw,
    };

    // Check for unique logs from date
    const logCheck = db
      .get('logs')
      .find({ logDate })
      .value();

    if (!logCheck) {
      db.get('logs')
        .push(log)
        .write();
    }

    return log;
  }

  async createReport() {
    const logfromSummary = await this.getDailySummaryLog();

    const logData = {
      logDate: logfromSummary.date,
      hoursRaw: logfromSummary[this.rescuetimeCategory],
    };

    const log = await this.addLog(logData);

    const { logDate, hoursRaw } = log;

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
    const updatedProgress = progress + hoursRaw;

    db.set('user.goal.progress', Number(updatedProgress)).write();

    const insightsRaw = {
      difference: {
        previous: 2.0, // hours from last log
        current: hoursRaw,
      },
      completion: {
        currentProgress: updatedProgress.toFixed(2),
        target,
        dailyAverage,
        progressDifference,
        multiplier: 1,
      },
    };

    const insightsData = await insights.getLogInsights(insightsRaw);

    const { percentageDifference, percentageCompletion, timeToCompletion } = insightsData;

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

    return Promise.resolve(reportData);
  }

  async sendReport() {
    const reportData = await this.createReport();
    const html = email.createHtmlTemplate(reportData);

    const mailOptions = {
      user: { email: this.user.email },
      subject: '📈 Your daily mastery report is ready',
      html,
    };

    const info = await email.send(mailOptions);
    return Promise.resolve(info);
  }

  processDailyReport() {
    const processDailyReportWorker = new cron.CronJob({
      cronTime: '10 6 * * *',
      onTick: async () => {
        /*
        * Runs every day at 6:10 AM
        * '10 6 * * *'
        */
        try {
          const info = await this.sendReport();
          /* eslint-disable no-console */
          console.log(`> Report succesfully processed and sent ${info.messageId}`);
        } catch (err) {
          /* eslint-disable no-console */
          console.error(`> Error in processing daily report: ${err.message}`);
          processDailyReportWorker.stop();
          debug(`> [processDailyReport] worker status: ${processDailyReportWorker.running}`);
        }
      },
      start: false,
      timeZone: this.user.timezone || 'Europe/London',
    });

    // start the worker
    processDailyReportWorker.start();
    debug(`> [processDailyReport] worker status: ${processDailyReportWorker.running}`);
  }
}

export default Keeper;
