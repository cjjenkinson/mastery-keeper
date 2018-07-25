import Koa from 'koa';
import Router from 'koa-router';
import Keeper from './keeper';
import config from './config';

require('dotenv').config();
const debug = require('debug')('keeper');

const app = new Koa();
const router = new Router();

const PORT = 8181 || process.env.PORT;

const keeper = new Keeper({
  rescuetimeKey: config.rescuetime.token,
  rescuetimeCategory: config.rescuetime.category,
  user: {
    username: config.user.username,
    email: config.user.email,
    timezone: config.user.timezone,
    goal: {
      title: config.user.goal.title,
      target: config.user.goal.target,
      progress: config.user.goal.existingProgress,
    },
  },
});

router.get('/', async (ctx) => {
  ctx.body = await keeper.getUser();
});

router.get('/send', async (ctx) => {
  const info = await keeper.sendReport();
  ctx.body = { status: `Email sent: ${info.messageId}` };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  keeper.start();
  /* eslint-disable no-console */
  console.log('✓ Keeper has started succesfully');
  console.log(`> Access your log data at http://localhost:${PORT}`);
  debug('Keeper started...');
});

module.exports = keeper;
