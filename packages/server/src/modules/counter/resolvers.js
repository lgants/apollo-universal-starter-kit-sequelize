const COUNTER_SUBSCRIPTION = 'counter_subscription';

export default pubsub => ({
  Query: {
    async counter(obj, args, context) {
      return await context.Counter.counterQuery();
    }
  },
  Mutation: {
    async addCounter(obj, { amount }, context) {
      await context.Counter.addCounter(amount);
      const counter = await context.Counter.counterQuery();

      pubsub.publish(COUNTER_SUBSCRIPTION, {
        counterUpdated: { amount: counter.amount }
      });

      return counter;
    }
  },
  Subscription: {
    counterUpdated: {
      subscribe: () => pubsub.asyncIterator(COUNTER_SUBSCRIPTION)
    }
  }
});
