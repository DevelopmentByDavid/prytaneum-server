/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ResolverFn } from 'apollo-server-express';
import { getTownhall, createTownhall, getTownhalls } from '@app/modules/townhall';

import { ResolverObj, isUserLoggedIn } from '../utils';

export default {
    Query: {
        townhallById: (parent: any, args: any, context: any, info: any) =>
            args?.id ? getTownhall(args.id) : undefined,
        myTownhalls: (parent, args, context, info) => {
            if (!isUserLoggedIn(context)) return [];
            return getTownhalls(context.user._id);
        },
    },
    Mutation: {
        createTownhall: (parent, args, context, info) =>
            args?.townhallForm ? createTownhall(args.townhallForm) : undefined,
    },
} as ResolverObj;
