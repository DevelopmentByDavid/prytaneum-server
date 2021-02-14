import { IResolverObject, ExpressContext, PubSub } from 'apollo-server-express';
import { ChangeEventCR, ChangeEventUpdate, ChangeEventDelete, ObjectId } from 'mongodb';
import type { User } from 'prytaneum-typings';

export function isUserLoggedIn(obj: ExpressContext): obj is ExpressContext & { user: User<ObjectId> } {
    return ((obj as unknown) as Record<string, unknown>).user !== undefined;
}

export interface ResolverObj {
    Query: IResolverObject<any, ExpressContext>;
    Mutation: IResolverObject<any, ExpressContext>;
    Subscription?: IResolverObject<any, ExpressContext>;
}

export const pubSub = new PubSub();

export function filterDoc<T>(doc: T, cb: (arg: T) => Promise<boolean> | boolean) {
    return cb(doc);
}

export const refsHasTownhall = <T extends { meta: { townhallId: ObjectId } }>(doc: T, townhallId: string) =>
    doc.meta.townhallId.toHexString() === townhallId;

// crud without read
export type CUDChangeEvent<TSchema extends { _id: ObjectId } = { _id: ObjectId }> =
    | (ChangeEventCR<TSchema> & { fullDocument: TSchema })
    | (ChangeEventUpdate<TSchema> & { fullDocument: TSchema });
// | ChangeEventDelete<TSchema>;

// changeStream
//     .then((cursor) =>
//         cursor.on('change', (changEvent) => {
//             // eslint-disable-next-line no-void
//             void pubsub.publish('change', changEvent);
//         })
//     )
//     .catch(console.error);

// class MongoPubSub extends PubSubEngine {
//     stream: ChangeStream;

//     constructor(changeStream: ChangeStream) {
//         super();
//         this.stream = changeStream;
//     }

//     publish(triggerName: string, payload: any) {

//     }

// }
