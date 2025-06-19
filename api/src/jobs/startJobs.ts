// src/jobs/startJobs.ts
import { CronJob } from 'cron';

export const startJobs = () => {
  const job = new CronJob('0 * * * * *', () => {
    console.log('Running job every minute', new Date());
  });

  job.stop();
};
