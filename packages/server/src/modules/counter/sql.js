// import knex from '../../sql/connector';
import models from '../../sql/connector';

export default class Counter {
  // counterQuery() {
  //   return knex('counter').first();
  // }
  async counterQuery() {
    // let x = await models.Counter.findAll({ limit: 1 });
    let x = await models.Counter.findOne({});
    // let data = x.get({ plain: true });
    // console.log(data);
    // console.log('dataValues', x.dataValues);
    return x;
  }

  // addCounter(amount) {
  //   return knex('counter').increment('amount', amount);
  // }
  async addCounter(amount) {
    console.log('amount', amount);
    let x = await models.Counter.increment('amount', { where: { amount: amount } });
    let y = await models.Counter.findOne({});
    console.log('Asdfasdf', y.get({ plain: true }));
    return x;
  }
}
