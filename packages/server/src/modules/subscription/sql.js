// Helpers
import { camelizeKeys, decamelizeKeys } from 'humps';
// import knex from '../../sql/connector';
// import { returnId } from '../../sql/helpers';
import models from '../../database/models';

// Actual query fetching and transformation in DB
export default class Subscription {
  // async getSubscription(userId) {
  //   return camelizeKeys(
  //     await knex('subscription')
  //       .select('s.*')
  //       .from('subscription as s')
  //       .where('s.user_id', '=', userId)
  //       .first()
  //   );
  // }
  async getSubscription(userId) {
    return camelizeKeys(
      await models.Subscription.findOne({
        where: { user_id: userId },
        raw: true
      })
    );
  }

  // async getSubscriptionByStripeSubscriptionId(stripeSubscriptionId) {
  //   return camelizeKeys(
  //     await knex('subscription')
  //       .select('s.*')
  //       .from('subscription as s')
  //       .where('s.stripe_subscription_id', '=', stripeSubscriptionId)
  //       .first()
  //   );
  // }
  async getSubscriptionByStripeSubscriptionId(stripeSubscriptionId) {
    return camelizeKeys(
      await models.Subscription.findOne({
        where: { stripe_subscription_id: stripeSubscriptionId },
        raw: true
      })
    );
  }

  // async getSubscriptionByStripeCustomerId(stripeCustomerId) {
  //   return camelizeKeys(
  //     await knex('subscription')
  //       .select('s.*')
  //       .from('subscription as s')
  //       .where('s.stripe_customer_id', '=', stripeCustomerId)
  //       .first()
  //   );
  // }
  async getSubscriptionByStripeCustomerId(stripeCustomerId) {
    return camelizeKeys(
      await models.Subscription.findOne({
        where: { stripe_customer_id: stripeCustomerId },
        raw: true
      })
    );
  }

  // async editSubscription({ userId, subscription }) {
  //   const userSubscription = await knex('subscription')
  //     .select('id')
  //     .where({ user_id: userId })
  //     .first();
  //
  //   if (userSubscription) {
  //     return await returnId(knex('subscription'))
  //       .update(decamelizeKeys(subscription))
  //       .where({ user_id: userId });
  //   } else {
  //     return await returnId(knex('subscription')).insert({ ...decamelizeKeys(subscription), user_id: userId });
  //   }
  // }
  async editSubscription({ userId, subscription }) {
    const userSubscription = await models.Subscription.findOne({
      attributes: ['id'],
      where: { user_id: userId }
    });

    if (userSubscription) {
      return await models.Subscription.update(decamelizeKeys(subscription), { where: { user_id: userId } });
    } else {
      return await models.Subscription.create({ ...decamelizeKeys(subscription), user_id: userId });
    }
  }

  // async getCardInfo(userId) {
  //   return camelizeKeys(
  //     await knex('subscription')
  //       .select('s.expiry_month', 's.expiry_year', 's.last4', 's.brand')
  //       .from('subscription as s')
  //       .where('s.user_id', '=', userId)
  //       .first()
  //   );
  // }
  async getCardInfo(userId) {
    return camelizeKeys(
      await models.Subscription.findOne({
        attributes: ['expiry_month', 'expiry_year', 'last4', 'brand'],
        where: { user_id: userId }
      })
    );
  }
}
