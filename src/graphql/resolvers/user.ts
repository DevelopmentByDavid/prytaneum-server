/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ApolloError } from 'apollo-server-express';
import { getUser } from '@app/modules/admin';
import isAllowed from '@app/utils/isAllowed';

import { isUserLoggedIn, ResolverObj } from '../utils';

export default {
    Query: {
        userById: (parent: any, args: any, context: any, info: any) => (args?.id ? getUser(args.id) : undefined),
        me: (parent, args, context, info) => {
            if (!isUserLoggedIn(context)) throw new ApolloError('No login');
            return context.user;
        },
    },
    Mutation: {},
} as ResolverObj;
