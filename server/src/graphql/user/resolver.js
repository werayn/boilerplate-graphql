import { Query } from './user.query.js';
import { UserMap } from './user.map.js';
import { Mutation } from './user.mutation.js';

export const resolver = {
    Query: Query,
    User: UserMap,
    Mutation: Mutation,
};
