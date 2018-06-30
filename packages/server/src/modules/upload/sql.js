/*eslint-disable no-unused-vars*/
// import knex from '../../sql/connector';
import models from '../../database/models';

export default class Upload {
  files() {
    // return knex('upload').select('*');
    return models.Upload.findAll();
  }

  file(id) {
    // return knex('upload')
    //   .select('*')
    //   .where({ id })
    //   .first();

    return models.Upload.findOne({
      id
    });
  }

  // saveFiles(files) {
  //   return knex('upload').insert(files);
  // }
  saveFiles(files) {
    return models.Upload.create(files);
  }

  // deleteFile(id) {
  //   return knex('upload')
  //     .where({ id })
  //     .del();
  // }
  deleteFile(id) {
    return models.Upload.destroy({ where: { id } });
  }
}
