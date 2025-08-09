// utils/notificationScheduler.js
const cron = require('node-cron');
const notificationService = require('../services/notificationService');

class NotificationScheduler {
  
  /**
   * Start the notification scheduler
   */
  start() {
    console.log('Starting notification scheduler...');
    
    // Run notification checks every 2 hours
    cron.schedule('0 */2 * * *', async () => {
      console.log('Running scheduled notification checks...');
      try {
        await notificationService.runAllChecks();
      } catch (error) {
        console.error('Scheduled notification check failed:', error);
      }
    });

    // Run a check once on startup (after 30 seconds to let DB initialize)
    setTimeout(async () => {
      console.log('Running initial notification checks...');
      try {
        await notificationService.runAllChecks();
      } catch (error) {
        console.error('Initial notification check failed:', error);
      }
    }, 30000);

    console.log('Notification scheduler started');
  }

  /**
   * Stop the scheduler (for graceful shutdown)
   */
  stop() {
    console.log('Stopping notification scheduler...');
    cron.getTasks().forEach(task => task.stop());
  }
}

module.exports = new NotificationScheduler();
