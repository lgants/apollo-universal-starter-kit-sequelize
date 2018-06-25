// import knex from '../../sql/connector';
import models from '../../database/models';

export default class Counter {
  // counterQuery() {
  //   return knex('counter').first();
  // }
  counterQuery() {
    return models.Counter.findAll({ limit: 1 });
  }

  // addCounter(amount) {
  //   return knex('counter').increment('amount', amount);
  // }
  addCounter(amount) {
    return models.Counter.increment('amount', { where: { amount } });
  }
}
