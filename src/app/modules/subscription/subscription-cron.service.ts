import cron from 'node-cron';
import { errorLogger, logger } from '../../../shared/logger';
import { User } from '../user/user.model';

const checkExpiredSubscriptions = () => {
  cron.schedule('* * * * *', async () => {
    logger.info('Cron job started');
    try {
      const usersWithExpiredSubscriptions = await User.find({
        isSubscribed: true,
        role: 'businessman',
        subscriptionExpiryDate: { $lt: new Date() },
      });

      if (usersWithExpiredSubscriptions.length > 0) {
        await User.updateMany(
          { _id: { $in: usersWithExpiredSubscriptions.map(user => user._id) } },
          {
            $set: {
              isSubscribed: false,
              subscription: null,
              subscriptionExpiryDate: null,
            },
          }
        );

        logger.info(
          `${usersWithExpiredSubscriptions.length} users' subscriptions expired and deactivated.`
        );
      }
    } catch (error) {
      errorLogger.error('Error checking expired subscriptions:', error);
      logger.error('Error checking expired subscriptions:', error);
    }
  });
};

export default checkExpiredSubscriptions;
