import { Kind, GraphQLScalarType } from 'graphql';

export default new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: Date | string) {
        if (typeof value === 'string') return value;
        return value.toISOString(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});
