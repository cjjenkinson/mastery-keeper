import nodemailer from 'nodemailer';

require('dotenv').config();
const debug = require('debug')('keeper:email');

const transporter = nodemailer.createTransport({
  host: 'mail.smtp2go.com',
  port: 2525, // 8025, 587 and 25 can also be used.
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default {
  send: (options) => {
    const mailOptions = {
      from: '"Mastery Keeper" <keeper@masterykeeper.com>',
      to: options.user.email,
      subject: options.subject,
      html: options.html,
    };

    const emailInfo = transporter
      .sendMail(mailOptions)
      .then((info) => {
        debug(`> Email sent: ${info.messageId}`);
        return info;
      })
      .catch((err) => {
        console.log(err);
      });

    return Promise.resolve(emailInfo);
  },

  createHtmlTemplate: (reportData) => {
    const html = template(reportData);
    return html;
  },
};

const template = data => `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Your daily mastery report is ready</title>
        <style type="text/css" rel="stylesheet" media="all">
        /* Base ------------------------------ */

        *:not(br):not(tr):not(html) {
          font-family: -apple-system, BlinkMacSystemFont, Helvetica, "Segoe", Arial, Helvetica, sans-serif;
          box-sizing: border-box;
        }

        body {
          width: 100% !important;
          height: 100%;
          margin: 0;
          line-height: 1.4;
          background-color: #FFF;
          color: #171a21;
          -webkit-text-size-adjust: none;
        }

        p,
        ul,
        ol,
        blockquote {
          line-height: 1.4;
          text-align: left;
        }

        a {
          color: #7b16ff;
          font-weight: bold;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        a img {
          border: none;
        }

        td {
          word-break: break-word;
        }
        /* Layout ------------------------------ */

        .email-wrapper {
          width: 100%;
          margin: 0;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          background-color: #FFF;
        }

        .email-content {
          width: 100%;
          margin: 0;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
        }

        /* Body ------------------------------ */

        .email-body {
          width: 100%;
          max-width: 560px;
          margin: 0;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          background-color: #FFFFFF;
        }

        .email-body_inner {
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          padding: 0;
          -premailer-width: 560px;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          background-color: #FFFFFF;
        }

        .email-footer {
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          padding: 0;
          -premailer-width: 560px;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          text-align: center;
          background-color: #F2F5F9;
          margin-top: 32px;
        }

        .email-footer p {
          color: #AEAEAE;
          margin-bottom: 0;
        }

        .body-action {
          width: 100%;
          margin: 32px auto;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          text-align: center;
        }

        .body-sub {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #DFE7EF;
        }

        .divider {
          height: 0px;
          border-bottom: 2px solid #DFE7EF;
          display: block;
          width: 100%;
        }

        .post {
          padding: 24px 0 24px;
          border-bottom: 2px solid #DFE7EF;
        }

        .reply-container {
          display: block;
        }

        .header-cell {
          padding: 24px;
        }

        .content-cell {
          padding: 8px 24px;
        }

        .footer-cell {
          padding: 24px;
        }

        .preheader {
          display: none !important;
          visibility: hidden;
          mso-hide: all;
          font-size: 1px;
          line-height: 1px;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
        }

        img.avatar {
          height: 40px;
          width: 40px;
          border-radius: 20px;
          margin-right: 8px;
          vertical-align: middle;
        }

        /* Utilities ------------------------------ */

        .align-right {
          text-align: right;
        }

        .align-left {
          text-align: left;
        }

        .align-center {
          text-align: center;
        }

        .collapse {
          border-collapse: collapse;
        }
        /*Media Queries ------------------------------ */

        @media only screen and (max-width: 600px) {
          .email-body_inner,
          .email-footer {
            width: 100% !important;
          }
        }

        /* Buttons ------------------------------ */

        .button {
          background-color: #7B16FF;
          display: inline-block;
          color: #FFF;
          padding: 12px 16px;
          text-decoration: none;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          -webkit-text-size-adjust: none;
          word-break: keep-all;
          white-space: nowrap;
          font-size: 16px;

          &:hover {
            text-decoration: none;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          }
        }

        /* Type ------------------------------ */

        h1 {
          margin: 0;
          padding: 0;
          color: #171A21;
          font-size: 20px;
          font-weight: bold;
          text-align: left;
        }

        h2 {
          margin: 0;
          padding: 0;
          color: #171A21;
          font-size: 16px;
          font-weight: bold;
          text-align: left;
        }

        h3 {
          margin: 0;
          padding: 0;
          color: #171A21;
          font-size: 14px;
          font-weight: bold;
          text-align: left;
        }

        p {
          margin: 0;
          margin-bottom: 16px;
          padding: 0;
          color: #171A21;
          font-size: 16px;
          line-height: 1.5em;
          text-align: left;
        }

        p.sub {
          color: #747E8D;
          font-size: 14px;
        }

        p.reply {
          font-weight: 400;
          margin-bottom: 16px;
          background: #E6ECF7;
          margin-bottom: 2px;
          padding: 8px 12px;
          border-radius: 12px;
        }

        p.emoji, span.emoji {
          font-size: 32px;
          vertical-align: middle;
          line-height: 1.6;
        }

        p.emoji.large {
          font-size: 48px;
        }

        span.name {
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
          color: #747E8D;
          font-style: normal;
          vertical-align: bottom;
        }

        span.name-large {
          font-size: 16px;
          line-height: 1;
          font-weight: 400;
          color: #222;
          font-style: normal;
          vertical-align: top;
        }

        .custom-message {
          padding: 8px 16px;
          margin: 16px 0 32px 0px;
          border-left: 4px solid #ffd566;
          font-size: 18px;
          display: inline-block;
        }

        .custom-message p {
          color: #222;
          margin-top: 8px;
          margin-left: 8px;
        }

        h1.title {
          margin-bottom: 16px;
        }

        .small-link {
          font-size: 12px;
          font-weight: 500;
        }
        </style>
      </head>
      <body>
        <div style="display: none; max-height: 0px; overflow: hidden;">
          Your daily mastery report is ready...
        </div>

        <!-- Insert &zwnj;&nbsp; hack after hidden preview text -->
        <div style="display: none; max-height: 0px; overflow: hidden;">
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>

        <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                <!-- Email Body -->
                <tr>
                  <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
                    <table class="email-body_inner" align="center" cellpadding="0" cellspacing="0">
                      <!-- Body content -->
                      <tr>
                        <td class="header-cell"></td>
                      </tr>
                      <tr>
                        <td class="content-cell">
                          <p class="emoji large">👋</p>
                          <p><b>Daily Mastery Report: ${data.logDate}</b></p>
                          <p>Hi ${data.username}</p>
                          <p>Yesterday you practiced for ${data.hoursFormatted} (${
  data.percentageDifference
})</p>

                          <h4>🏆 ${data.target} hours of ${data.title} practice</h4>
                          <p>✅ In total you've practiced for ${data.progress} hours</p>
                          <p>⚡️ You are ${data.progressDifference} hours away from your goal of ${
  data.target
} hours (${data.percentageCompletion})</p>

                          <h4>Insights</h4>
                          <p>⏰ Your daily average is ${data.dailyAverageFormatted} per day</p>
                          <p>🚀 Maintain this average and achieve your goal in ${
  data.completionTimeDays
} days (${data.completionTimeMonths} months, ${
  data.completionTimeYears
} years) </p>

                          <p>Well done, Keep it up!</p>
                          <p>Mastery Keeper</p>
                        </td>
                      </tr>

                      <!-- <tr>
                        <td class="footer-cell">
                          <a class="button" href="#">View my progress</a>
                        </td>
                      </tr> -->
                    </table>
                  </td>
                </tr>
              </table>
              <table class="email-footer" align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell">
                    <p class="sub"><strong>Mastery Keeper</strong> is made by <strong>Cameron Jenkinson.</strong><br/>github.com/cjjenkinson/masterykeeper</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
