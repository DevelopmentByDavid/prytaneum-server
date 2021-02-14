/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ResolverFn } from 'apollo-server-express';
import { getChatMessages } from '@app/modules/chat';

export default {
    chatMessagesByTownhall: (parent: any, args: any, context: any, info: any) =>
        args?.townhallId ? getChatMessages(args.townhallId) : undefined,
};
