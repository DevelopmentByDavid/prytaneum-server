import { loadTypedefsSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import { ChangeEvent } from 'mongodb';

import { wrapDb } from '@app/db';
import { pubSub, CUDChangeEvent } from './utils';

const makePaths = (path: string[]) => path.map((innerPath) => join(__dirname, innerPath));

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = loadTypedefsSync(makePaths(['./types/*.gql', './queries/*.gql']), {
    loaders: [new GraphQLFileLoader()],
});

export { default as resolvers } from './resolvers';

// crud but without read ops
const isCUD = (arg: ChangeEvent): arg is CUDChangeEvent =>
    arg.operationType === 'insert' || arg.operationType === 'update';

export async function initSubscriptions() {
    const changeStream = await wrapDb((db) => db.watch([], { fullDocument: 'updateLookup' }));
    changeStream.on('change', (changeEvent) => {
        if (!isCUD(changeEvent)) return;
        console.log(changeEvent);
        // eslint-disable-next-line no-void
        void pubSub.publish(changeEvent.ns.coll, { questions: changeEvent.fullDocument });
    });
}
