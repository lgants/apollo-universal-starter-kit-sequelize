// import knex from '../../sql/connector';
import models from '../../database/models';

export default class Counter {
  // counterQuery() {
  //   return knex('counter').first();
  // }
  counterQuery() {
    // console.log('models', models.counter);
    return models.counter.findAll({ limit: 1 });
  }

  // addCounter(amount) {
  //   return knex('counter').increment('amount', amount);
  // }
  addCounter(amount) {
    return models.counter.increment('amount', { where: { amount } });
  }
}
