import access from './access';
import auth from './auth';
import confirmMiddleware from './confirm';
import schema from './schema.graphql';
import resolvers from './resolvers';
import scopes from './scopes';
import settings from '../../../../../settings';
import User from './sql';
// import db from '../../database/models';
import Feature from '../connector';
import resources from './locales';

// const User = db.User;

const createContextFunc = async ({ context: { user } }) => ({
  User,
  user,
  auth: {
    isAuthenticated: !!user,
    scope: user ? scopes[user.role] : null
  }
});

export default new Feature(access, auth, {
  schema,
  createResolversFunc: resolvers,
  createContextFunc,
  middleware: app => {
    if (settings.user.auth.password.sendConfirmationEmail) {
      app.get('/confirmation/:token', confirmMiddleware);
    }
  },
  localization: { ns: 'user', resources }
});
