import jwt from 'jsonwebtoken';

import createTokens from './createTokens';
import resolvers from './resolvers';
import schema from './schema.graphql';
import Feature from '../connector';
import settings from '../../../../../../../settings';

const grant = async user => {
  // console.log('grant jwt', user);
  const refreshSecret = settings.user.secret + user.passwordHash;
  const [accessToken, refreshToken] = await createTokens(user, settings.user.secret, refreshSecret);

  return {
    accessToken,
    refreshToken
  };
};

const getCurrentUser = async ({ req }) => {
  // console.log('getCurrentUser jwt req', req);
  const authorization = req && req.headers['authorization'];
  const parts = authorization && authorization.split(' ');
  const token = parts && parts.length === 2 && parts[1];
  if (token) {
    const { user } = jwt.verify(token, settings.user.secret);
    return user;
  }
};

const createContextFunc = async ({ req, res, connectionParams, webSocket, context }) => {
  try {
    context.user = context.user || (await getCurrentUser({ req, connectionParams, webSocket }));
  } catch (e) {
    res.status(401).end();
    throw e;
  }
};

export default new Feature(
  settings.user.auth.access.jwt.enabled
    ? {
        grant,
        schema,
        createResolversFunc: resolvers,
        createContextFunc
      }
    : {}
);
