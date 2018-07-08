/*eslint-disable no-unused-vars*/
// import knex from '../../sql/connector';
import models from '../../database/models';

export default class Upload {
  // files() {
  //   return knex('upload').select('*');
  // }
  async files() {
    return await models.Upload.findAll();
  }

  // async file(id) {
  //   return knex('upload')
  //     .select('*')
  //     .where({ id })
  //     .first();
  // }
  async file(id) {
    return await models.Upload.findOne({
      where: { id }
    });
  }

  // saveFiles(files) {
  //   return knex('upload').insert(files);
  // }
  async saveFiles(files) {
    return await models.Upload.bulkCreate(files);
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
