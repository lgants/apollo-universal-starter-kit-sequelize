// import knex from '../../sql/connector';
import models from '../../sql/connector';

export default class Counter {
  // counterQuery() {
  //   return knex('counter').first();
  // }
  async counterQuery() {
    return await models.Counter.findOne({});
  }

  // addCounter(amount) {
  //   return knex('counter').increment('amount', amount);
  // }
  async addCounter(amount) {
    let counter = await models.Counter.findOne({});
    let _counter = await counter.increment('amount', { by: amount });
    return await _counter.reload();
  }
}
