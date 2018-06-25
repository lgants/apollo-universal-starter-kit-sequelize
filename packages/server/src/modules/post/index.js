// import Post from './sql';
import { Post } from '../../database/models';
import schema from './schema.graphql';
import createResolvers from './resolvers';

import Feature from '../connector';

export default new Feature({
  schema,
  createResolversFunc: createResolvers,
  createContextFunc: () => ({ Post: new Post() })
});
