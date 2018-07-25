import joi from 'joi';

require('dotenv').config();

const envVarsSchema = joi
  .object({
    SMTP_USERNAME: joi.string().required(),
    SMTP_PASSWORD: joi.string().required(),
    RESCUE_TIME_TOKEN: joi.string().required(),
    RESCUE_TIME_CATEGORY: joi
      .string()
      .required()
      .default('software_development_hours'),
    GOAL_TITLE: joi.string().required(),
    GOAL_TARGET: joi.number().default(10000),
    GOAL_EXISTING_PROGRESS: joi.number().default(0),
    USERNAME: joi.string().required(),
    EMAIL: joi
      .string()
      .email()
      .required(),
    TIMEZONE: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  smtp: {
    username: envVars.SMTP_USERNAME,
    password: envVars.SMTP_PASSWORD,
  },
  rescuetime: {
    token: envVars.RESCUE_TIME_TOKEN,
    category: envVars.RESCUE_TIME_CATEGORY,
  },
  user: {
    username: envVars.USERNAME,
    email: envVars.EMAIL,
    timezone: envVars.TIMEZONE,
    goal: {
      title: envVars.GOAL_TITLE,
      target: envVars.GOAL_TARGET,
      existingProgress: envVars.GOAL_EXISTING_PROGRESS,
    },
  },
};
