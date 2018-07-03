/*eslint-disable no-unused-vars*/
// import knex from '../../sql/connector';
import models from '../../database/models';

export default class Upload {
  async files() {
    // return knex('upload').select('*');
    return await models.Upload.findAll();
  }

  async file(id) {
    // return knex('upload')
    //   .select('*')
    //   .where({ id })
    //   .first();

    return await models.Upload.findOne({
      id
    });
  }

  // saveFiles(files) {
  //   return knex('upload').insert(files);
  // }
  async saveFiles(files) {
    return await models.Upload.create(files);
  }

  // deleteFile(id) {
  //   return knex('upload')
  //     .where({ id })
  //     .del();
  // }
  async deleteFile(id) {
    return await models.Upload.destroy({ where: { id } });
  }
}
