import { ApolloServerExpressConfig } from 'apollo-server-express';
import { ObjectID } from 'mongodb';
import type { User } from 'prytaneum-typings';

import { typeDefs, resolvers } from '@app/graphql';
import { getCookies } from '@app/middlewares/requireLogin';
import JWT from '@app/lib/jwt';
import { useCollection } from '@app/db';

// instantiate graphql apollo server
export default {
    typeDefs: typeDefs.map(({ rawSDL }) => rawSDL || ''),
    resolvers,
    context: async ({ req }) => {
        if (!req) return {};
        // parse and check cookies
        const cookies = getCookies(req);
        if (!cookies.jwt) return { user: null };

        // validate and decode jwt
        const { _id } = await JWT.verify<Pick<User, '_id'>>(cookies.jwt);

        // find most up-to-date user doc
        const user = await useCollection('Users', (Users) =>
            Users.findOne({
                _id: new ObjectID(_id),
            })
        );

        // if user is not found, then set to null
        if (!user) return { user: null };

        // return user as part of context if needed
        return { user };
    },
    subscriptions: {
        path: '/graphql',
        onConnect: (connectionParams, webSocket, context) => {
            console.log('Client connected');
        },
        onDisconnect: (webSocket, context) => {
            console.log('Client disconnected');
        },
    },
    plugins: [
        {
            requestDidStart() {
                console.log('request started');
                return {
                    didResolveSource() {
                        console.log('resolved source');
                    },
                    parsingDidStart() {
                        console.log('parsing started');
                    },
                    didEncounterErrors(ctx) {
                        console.log('errors', ctx);
                    },
                };
            },
        },
    ],
} as ApolloServerExpressConfig;
