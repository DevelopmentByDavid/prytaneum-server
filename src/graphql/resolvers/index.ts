import townhallResolvers from './townhall';
import userResolvers from './user';
import questionResolvers from './question';
import chatMessageResolvers from './chat-message';

import Date from './date';

export default {
    Query: {
        ...townhallResolvers.Query,
        ...userResolvers.Query,
        ...questionResolvers.Query,
        ...chatMessageResolvers,
    },
    Mutation: {
        ...townhallResolvers.Mutation,
        ...userResolvers.Mutation,
        ...questionResolvers.Mutation,
    },
    Subscription: {
        ...userResolvers.Subscription,
        ...questionResolvers.Subscription,
    },
    Date,
};
