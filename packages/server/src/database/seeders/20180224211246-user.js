'use strict';
import bcrypt from 'bcryptjs';

export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'User',
      [
        {
          username: 'admin',
          email: 'admin@example.com',
          password_hash: await bcrypt.hash('admin123', 12),
          role: 'admin',
          is_active: true
        },
        {
          username: 'user',
          email: 'user@example.com',
          password_hash: await bcrypt.hash('user1234', 12),
          role: 'user',
          is_active: true
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
