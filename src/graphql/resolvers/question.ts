/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { withFilter } from 'apollo-server-express';
import type { Question } from 'prytaneum-typings';
import { ObjectId } from 'mongodb';

import { getQuestions, createQuestion } from '@app/modules/questions';
import { ResolverObj, pubSub, isUserLoggedIn, filterDoc, refsHasTownhall } from '../utils';

export default {
    Query: {
        questionsByTownhall: (parent: any, args: any, context: any, info: any) =>
            args?.townhallId ? getQuestions(args.townhallId) : undefined,
    },
    Mutation: {
        createQuestion: async (
            parent,
            args: { question: string; quote?: string; townhallId: string },
            context,
            info
        ) => {
            if (!isUserLoggedIn(context)) return null;
            const { question, quote, townhallId } = args;
            return createQuestion({ question, quoteId: quote }, townhallId, context.user);
        },
    },
    Subscription: {
        questions: {
            subscribe: () => pubSub.asyncIterator('Questions'),
            // subscribe: withFilter(
            //     () => pubSub.asyncIterator('Questions'),
            //     (payload, variables: { townhallId: string }) => true
            //     // filterDoc<Question<ObjectId>>(payload, (question) => {
            //     //     console.log(question);
            //     //     console.log(refsHasTownhall(question, variables.townhallId));
            //     //     return refsHasTownhall(question, variables.townhallId);
            //     // })
            // ),
        },
    },
} as ResolverObj;
