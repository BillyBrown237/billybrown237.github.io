import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // App
  APP_PORT: Joi.number().default(3000),
  APP_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  //   # Postgres
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  //   # Optional: Frontend
  FRONTEND_URL: Joi.string().uri().default('http://localhost:5173'),

  //    # Optional: Email
  EMAIL_HOST: Joi.string().optional(),
  EMAIL_PORT: Joi.number().optional(),
  EMAIL_USER: Joi.string().optional(),
  EMAIL_PASS: Joi.string().optional(),
});
