import jwt from 'jsonwebtoken';
// import User from './sql';
// import { User } from '../../database/models';
import db from '../../database/models';

import settings from '../../../../../settings';

const User = db.User;

export default async (req, res) => {
  try {
    const token = Buffer.from(req.params.token, 'base64').toString();
    const {
      user: { id }
    } = jwt.verify(token, settings.user.secret);

    await User.updateActive(id, true);

    res.redirect('/login');
  } catch (e) {
    res.send('error');
  }
};
