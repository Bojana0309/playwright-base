import dotenv from 'dotenv';

async function globalSetup() {
  if (process.env.TEST_ENV) {
    dotenv.config({
      path: `.env.${process.env.TEST_ENV}.local`,
      override: true
    });
  }
}

export default globalSetup;
