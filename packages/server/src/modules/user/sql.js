// Helpers
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { has } from 'lodash';
import bcrypt from 'bcryptjs';
// import models from '../../database/models';
// import models from '../../database/models';
import models from '../../sql/connector';

// import knex from '../../sql/connector';
// import { returnId } from '../../sql/helpers';

var Sequelize = require('sequelize');

const Op = Sequelize.Op;

// Actual query fetching and transformation in DB
class User {
  // async getUsers(orderBy, filter) {
  //   const queryBuilder = knex
  //     .select(
  //       'u.id as id',
  //       'u.username',
  //       'u.role',
  //       'u.is_active',
  //       'u.email',
  //       'up.first_name',
  //       'up.last_name',
  //       'ca.serial',
  //       'fa.fb_id',
  //       'fa.display_name AS fbDisplayName',
  //       'lna.ln_id',
  //       'lna.display_name AS lnDisplayName',
  //       'gha.gh_id',
  //       'gha.display_name AS ghDisplayName',
  //       'ga.google_id',
  //       'ga.display_name AS googleDisplayName'
  //     )
  //     .from('user AS u')
  //     .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //     .leftJoin('auth_certificate AS ca', 'ca.user_id', 'u.id')
  //     .leftJoin('auth_facebook AS fa', 'fa.user_id', 'u.id')
  //     .leftJoin('auth_google AS ga', 'ga.user_id', 'u.id')
  //     .leftJoin('auth_github AS gha', 'gha.user_id', 'u.id')
  //     .leftJoin('auth_linkedin AS lna', 'lna.user_id', 'u.id');
  //
  //   // add order by
  //   if (orderBy && orderBy.column) {
  //     let column = orderBy.column;
  //     let order = 'asc';
  //     if (orderBy.order) {
  //       order = orderBy.order;
  //     }
  //
  //     queryBuilder.orderBy(decamelize(column), order);
  //   }
  //
  //   // add filter conditions
  //   if (filter) {
  //     if (has(filter, 'role') && filter.role !== '') {
  //       queryBuilder.where(function() {
  //         this.where('u.role', filter.role);
  //       });
  //     }
  //
  //     if (has(filter, 'isActive') && filter.isActive !== null) {
  //       queryBuilder.where(function() {
  //         this.where('u.is_active', filter.isActive);
  //       });
  //     }
  //
  //     if (has(filter, 'searchText') && filter.searchText !== '') {
  //       queryBuilder.where(function() {
  //         this.where('u.username', 'like', `%${filter.searchText}%`)
  //           .orWhere('u.email', 'like', `%${filter.searchText}%`)
  //           .orWhere('up.first_name', 'like', `%${filter.searchText}%`)
  //           .orWhere('up.last_name', 'like', `%${filter.searchText}%`);
  //       });
  //     }
  //   }
  //
  //   return camelizeKeys(await queryBuilder);
  // }
  async getUsers(orderBy, filter) {
    let queryCriteria = {};

    // add order by
    if (orderBy && orderBy.column) {
      let column = orderBy.column;
      let order = 'ASC';

      if (orderBy.order) {
        order = orderBy.order;
      }

      queryCriteria.order = [([decamelize(column)]: order)];
    }

    // add filter conditions
    if (filter) {
      if (has(filter, 'role') && filter.role !== '') {
        queryCriteria.where = { role: filter.role };
      }

      if (has(filter, 'isActive') && filter.isActive !== null) {
        queryCriteria.where = { is_active: filter.isActive };
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        let fields = ['username', 'email', '$UserProfile.first_name$', '$UserProfile.last_name$'];

        queryCriteria.where = {
          [Op.or]: fields.map(field => {
            return { [field]: { [Op.like]: `%${filter.searchText}%` } };
          })
        };
      }
    }

    return camelizeKeys(
      await models.User.findAll({
        ...queryCriteria,
        attributes: [
          'id',
          'username',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name'],
          [Sequelize.col('AuthCertificate.serial'), 'serial'],
          [Sequelize.col('AuthFacebook.fb_id'), 'fb_id'],
          [Sequelize.col('AuthFacebook.display_name'), 'fbDisplayName'],
          [Sequelize.col('AuthLinkedin.ln_id'), 'ln_id'],
          [Sequelize.col('AuthLinkedin.display_name'), 'lnDisplayName'],
          [Sequelize.col('AuthGithub.gh_id'), 'gh_id'],
          [Sequelize.col('AuthGithub.display_name'), 'ghDisplayName'],
          [Sequelize.col('AuthGoogle.google_id'), 'google_id'],
          [Sequelize.col('AuthGoogle.display_name'), 'googleDisplayName']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          },
          {
            model: models.AuthCertificate,
            required: false,
            attributes: []
          },
          {
            model: models.AuthFacebook,
            required: false,
            attributes: []
          },
          {
            model: models.AuthLinkedin,
            required: false,
            attributes: []
          },
          {
            model: models.AuthGithub,
            required: false,
            attributes: []
          },
          {
            model: models.AuthGoogle,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async getUser(id) {
  //   return camelizeKeys(
  //     await knex
  //       .select(
  //         'u.id',
  //         'u.username',
  //         'u.role',
  //         'u.is_active',
  //         'u.email',
  //         'up.first_name',
  //         'up.last_name',
  //         'ca.serial',
  //         'fa.fb_id',
  //         'fa.display_name AS fbDisplayName',
  //         'lna.ln_id',
  //         'lna.display_name AS lnDisplayName',
  //         'gha.gh_id',
  //         'gha.display_name AS ghDisplayName',
  //         'ga.google_id',
  //         'ga.display_name AS googleDisplayName'
  //       )
  //       .from('user AS u')
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .leftJoin('auth_certificate AS ca', 'ca.user_id', 'u.id')
  //       .leftJoin('auth_facebook AS fa', 'fa.user_id', 'u.id')
  //       .leftJoin('auth_google AS ga', 'ga.user_id', 'u.id')
  //       .leftJoin('auth_github AS gha', 'gha.user_id', 'u.id')
  //       .leftJoin('auth_linkedin AS lna', 'lna.user_id', 'u.id')
  //       .where('u.id', '=', id)
  //       .first()
  //   );
  // }
  async getUser(id) {
    return camelizeKeys(
      await models.User.findOne({
        where: { id },
        attributes: [
          'id',
          'username',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name'],
          [Sequelize.col('AuthCertificate.serial'), 'serial'],
          [Sequelize.col('AuthFacebook.fb_id'), 'fb_id'],
          [Sequelize.col('AuthFacebook.display_name'), 'fbDisplayName'],
          [Sequelize.col('AuthLinkedin.ln_id'), 'ln_id'],
          [Sequelize.col('AuthLinkedin.display_name'), 'lnDisplayName'],
          [Sequelize.col('AuthGithub.gh_id'), 'gh_id'],
          [Sequelize.col('AuthGithub.display_name'), 'ghDisplayName'],
          [Sequelize.col('AuthGoogle.google_id'), 'google_id'],
          [Sequelize.col('AuthGoogle.display_name'), 'googleDisplayName']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          },
          {
            model: models.AuthCertificate,
            required: false,
            attributes: []
          },
          {
            model: models.AuthFacebook,
            required: false,
            attributes: []
          },
          {
            model: models.AuthLinkedin,
            required: false,
            attributes: []
          },
          {
            model: models.AuthGithub,
            required: false,
            attributes: []
          },
          {
            model: models.AuthGoogle,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async getUserWithPassword(id) {
  //   return camelizeKeys(
  //     await knex
  //       .select(
  //         'u.id',
  //         'u.username',
  //         'u.password_hash',
  //         'u.role',
  //         'u.is_active',
  //         'u.email',
  //         'up.first_name',
  //         'up.last_name'
  //       )
  //       .from('user AS u')
  //       .where('u.id', '=', id)
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .first()
  //   );
  // }
  async getUserWithPassword(id) {
    return camelizeKeys(
      await models.User.findOne({
        where: { id },
        attributes: [
          'id',
          'username',
          'password_hash',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async getUserWithSerial(serial) {
  //   return camelizeKeys(
  //     await knex
  //       .select('u.id', 'u.username', 'u.role', 'u.is_active', 'ca.serial', 'up.first_name', 'up.last_name')
  //       .from('user AS u')
  //       .leftJoin('auth_certificate AS ca', 'ca.user_id', 'u.id')
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .where('ca.serial', '=', serial)
  //       .first()
  //   );
  // }
  async getUserWithSerial(serial) {
    return camelizeKeys(
      await models.User.findOne({
        where: { '$AuthCertificate.serial$': serial },
        attributes: [
          'id',
          'username',
          'role',
          'is_active',
          [Sequelize.col('AuthCertificate.serial'), 'serial'],
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          },
          {
            model: models.AuthCertificate,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async register({ username, email, password, role, isActive }) {
  //   const passwordHash = await bcrypt.hash(password, 12);
  //
  //   if (role === undefined) {
  //     role = 'user';
  //   }
  //
  //   return returnId(knex('user')).insert({ username, email, role, password_hash: passwordHash, is_active: !!isActive });
  // }
  async register({ username, email, password, role, isActive }) {
    const passwordHash = await bcrypt.hash(password, 12);

    // TODO: fix - potential security vulnerability
    if (role === undefined) {
      role = 'user';
    }

    return await models.User.create({
      username,
      email,
      role,
      password_hash: passwordHash,
      is_active: !!isActive
    });
  }

  // createFacebookAuth({ id, displayName, userId }) {
  //   return returnId(knex('auth_facebook')).insert({ fb_id: id, display_name: displayName, user_id: userId });
  // }
  async createFacebookAuth({ id, displayName, userId }) {
    return await models.AuthFacebook.create({
      fb_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  // createGithubAuth({ id, displayName, userId }) {
  //   return returnId(knex('auth_github')).insert({ gh_id: id, display_name: displayName, user_id: userId });
  // }
  async createGithubAuth({ id, displayName, userId }) {
    return await models.AuthGithub.create({
      gh_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  // createGoogleOAuth({ id, displayName, userId }) {
  //   return returnId(knex('auth_google')).insert({ google_id: id, display_name: displayName, user_id: userId });
  // }
  async createGoogleOAuth({ id, displayName, userId }) {
    return await models.AuthGoogle.create({
      google_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  // createLinkedInAuth({ id, displayName, userId }) {
  //   return returnId(knex('auth_linkedin')).insert({ ln_id: id, display_name: displayName, user_id: userId });
  // }
  async createLinkedInAuth({ id, displayName, userId }) {
    return await models.AuthLinkedin.create({
      ln_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  // async editUser({ id, username, email, role, isActive, password }) {
  //   let localAuthInput = { email };
  //   if (password) {
  //     const passwordHash = await bcrypt.hash(password, 12);
  //     localAuthInput = { email, password_hash: passwordHash };
  //   }
  //
  //   return knex('user')
  //     .update({
  //       username,
  //       role,
  //       is_active: isActive,
  //       ...localAuthInput
  //     })
  //     .where({ id });
  // }

  async editUser({ id, username, email, role, isActive, password }) {
    let localAuthInput = { email };
    if (password) {
      const passwordHash = await bcrypt.hash(password, 12);
      localAuthInput = { email, password_hash: passwordHash };
    }

    return await models.User.update(
      {
        username,
        role,
        is_active: isActive,
        ...localAuthInput
      },
      { where: { id } }
    );
  }

  // async editUserProfile({ id, profile }) {
  //   const userProfile = await knex
  //     .select('id')
  //     .from('user_profile')
  //     .where({ user_id: id })
  //     .first();
  //
  //   if (userProfile) {
  //     return knex('user_profile')
  //       .update(decamelizeKeys(profile))
  //       .where({ user_id: id });
  //   } else {
  //     return returnId(knex('user_profile')).insert({ ...decamelizeKeys(profile), user_id: id });
  //   }
  // }
  async editUserProfile({ id, profile }) {
    const userProfile = await models.UserProfile.findOne({ attributes: ['id'], where: { user_id: id } });

    if (userProfile) {
      return await models.UserProfile.update(
        {
          ...decamelizeKeys(profile)
        },
        {
          where: { user_id: id }
        }
      );
    } else {
      return await models.UserProfile.create({ ...decamelizeKeys(profile), user_id: id });
    }
  }

  // async editAuthCertificate({
  //   id,
  //   auth: {
  //     certificate: { serial }
  //   }
  // }) {
  //   const userProfile = await knex
  //     .select('id')
  //     .from('auth_certificate')
  //     .where({ user_id: id })
  //     .first();
  //
  //   if (userProfile) {
  //     return knex('auth_certificate')
  //       .update({ serial })
  //       .where({ user_id: id });
  //   } else {
  //     return returnId(knex('auth_certificate')).insert({ serial, user_id: id });
  //   }
  // }
  async editAuthCertificate({
    id,
    auth: {
      certificate: { serial }
    }
  }) {
    const userProfile = await models.AuthCertificate.findOne({
      where: { user_id: id }
    });

    if (userProfile) {
      return await models.AuthCertificate.update({ serial }, { where: { user_id: id } });
    } else {
      // return returnId(knex('auth_certificate')).insert({ serial, user_id: id });
      return await models.AuthCertificate.create({ serial, user_id: id });
    }
  }

  // deleteUser(id) {
  //   return knex('user')
  //     .where('id', '=', id)
  //     .del();
  // }
  async deleteUser(id) {
    return await models.User.destroy({
      where: { id }
    });
  }

  // async updatePassword(id, newPassword) {
  //   const passwordHash = await bcrypt.hash(newPassword, 12);
  //
  //   return knex('user')
  //     .update({ password_hash: passwordHash })
  //     .where({ id });
  // }
  async updatePassword(id, newPassword) {
    const passwordHash = await bcrypt.hash(newPassword, 12);

    return await models.User.update({ password_hash: passwordHash }, { where: { id } });
  }

  // updateActive(id, isActive) {
  //   return knex('user')
  //     .update({ is_active: isActive })
  //     .where({ id });
  // }
  async updateActive(id, isActive) {
    return await models.User.update({ is_active: isActive }, { where: { id } });
  }

  // async getUserByEmail(email) {
  //   return camelizeKeys(
  //     await knex
  //       .select(
  //         'u.id',
  //         'u.username',
  //         'u.password_hash',
  //         'u.role',
  //         'u.is_active',
  //         'u.email',
  //         'up.first_name',
  //         'up.last_name'
  //       )
  //       .from('user AS u')
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .where({ email })
  //       .first()
  //   );
  // }

  async getUserByEmail(email) {
    return camelizeKeys(
      await models.User.findOne({
        where: { email },
        attributes: [
          'id',
          'username',
          'password_hash',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async getUserByFbIdOrEmail(id, email) {
  //   return camelizeKeys(
  //     await knex
  //       .select(
  //         'u.id',
  //         'u.username',
  //         'u.role',
  //         'u.is_active',
  //         'fa.fb_id',
  //         'u.email',
  //         'u.password_hash',
  //         'up.first_name',
  //         'up.last_name'
  //       )
  //       .from('user AS u')
  //       .leftJoin('auth_facebook AS fa', 'fa.user_id', 'u.id')
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .where('fa.fb_id', '=', id)
  //       .orWhere('u.email', '=', email)
  //       .first()
  //   );
  // }
  async getUserByFbIdOrEmail(id, email) {
    return camelizeKeys(
      await models.User.findOne({
        where: {
          [Op.or]: [{ '$AuthFacebook.fb_id$': id }, { email }]
        },
        attributes: [
          'id',
          'username',
          'password_hash',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name'],
          [Sequelize.col('AuthFacebook.fb_id'), 'fb_id']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          },
          {
            model: models.AuthFacebook,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async getUserByLnInIdOrEmail(id, email) {
  //   return camelizeKeys(
  //     await knex
  //       .select(
  //         'u.id',
  //         'u.username',
  //         'u.role',
  //         'u.is_active',
  //         'lna.ln_id',
  //         'u.email',
  //         'u.password_hash',
  //         'up.first_name',
  //         'up.last_name'
  //       )
  //       .from('user AS u')
  //       .leftJoin('auth_linkedin AS lna', 'lna.user_id', 'u.id')
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .where('lna.ln_id', '=', id)
  //       .orWhere('u.email', '=', email)
  //       .first()
  //   );
  // }
  async getUserByLnInIdOrEmail(id, email) {
    return camelizeKeys(
      await models.User.findOne({
        where: {
          [Op.or]: [{ '$AuthLinkedin.ln_id$': id }, { email }]
        },
        attributes: [
          'id',
          'username',
          'password_hash',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name'],
          [Sequelize.col('AuthLinkedin.ln_id'), 'ln_id']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          },
          {
            model: models.AuthLinkedin,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async getUserByGHIdOrEmail(id, email) {
  //   return camelizeKeys(
  //     await knex
  //       .select(
  //         'u.id',
  //         'u.username',
  //         'u.role',
  //         'u.is_active',
  //         'gha.gh_id',
  //         'u.email',
  //         'u.password_hash',
  //         'up.first_name',
  //         'up.last_name'
  //       )
  //       .from('user AS u')
  //       .leftJoin('auth_github AS gha', 'gha.user_id', 'u.id')
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .where('gha.gh_id', '=', id)
  //       .orWhere('u.email', '=', email)
  //       .first()
  //   );
  // }
  async getUserByGHIdOrEmail(id, email) {
    return camelizeKeys(
      await models.User.findOne({
        where: {
          [Op.or]: [{ '$AuthGithub.gh_id$': id }, { email }]
        },
        attributes: [
          'id',
          'username',
          'password_hash',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name'],
          [Sequelize.col('AuthGithub.gh_id'), 'gh_id']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          },
          {
            model: models.AuthGithub,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async getUserByGoogleIdOrEmail(id, email) {
  //   return camelizeKeys(
  //     await knex
  //       .select(
  //         'u.id',
  //         'u.username',
  //         'u.role',
  //         'u.is_active',
  //         'ga.google_id',
  //         'u.email',
  //         'u.password_hash',
  //         'up.first_name',
  //         'up.last_name'
  //       )
  //       .from('user AS u')
  //       .leftJoin('auth_google AS ga', 'ga.user_id', 'u.id')
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .where('ga.google_id', '=', id)
  //       .orWhere('u.email', '=', email)
  //       .first()
  //   );
  // }
  async getUserByGoogleIdOrEmail(id, email) {
    return camelizeKeys(
      await models.User.findOne({
        where: {
          [Op.or]: [{ '$AuthGoogle.google_id$': id }, { email }]
        },
        attributes: [
          'id',
          'username',
          'password_hash',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name'],
          [Sequelize.col('AuthGoogle.google_id'), 'google_id']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          },
          {
            model: models.AuthGoogle,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async getUserByUsername(username) {
  //   return camelizeKeys(
  //     await knex
  //       .select('u.id', 'u.username', 'u.role', 'u.is_active', 'u.email', 'up.first_name', 'up.last_name')
  //       .from('user AS u')
  //       .where('u.username', '=', username)
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .first()
  //   );
  // }
  async getUserByUsername(username) {
    return camelizeKeys(
      await models.User.findOne({
        where: {
          username
        },
        attributes: [
          'id',
          'username',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }

  // async getUserByUsernameOrEmail(usernameOrEmail) {
  //   return camelizeKeys(
  //     await knex
  //       .select(
  //         'u.id',
  //         'u.username',
  //         'u.password_hash',
  //         'u.role',
  //         'u.is_active',
  //         'u.email',
  //         'up.first_name',
  //         'up.last_name'
  //       )
  //       .from('user AS u')
  //       .where('u.username', '=', usernameOrEmail)
  //       .orWhere('u.email', '=', usernameOrEmail)
  //       .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
  //       .first()
  //   );
  // }
  async getUserByUsernameOrEmail(usernameOrEmail) {
    return camelizeKeys(
      await models.User.findOne({
        where: {
          [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        },
        attributes: [
          'id',
          'username',
          'password_hash',
          'role',
          'is_active',
          'email',
          [Sequelize.col('UserProfile.first_name'), 'first_name'],
          [Sequelize.col('UserProfile.last_name'), 'last_name']
        ],
        include: [
          {
            model: models.UserProfile,
            required: false,
            attributes: []
          }
        ],
        raw: true
      })
    );
  }
}
const userDAO = new User();

export default userDAO;
