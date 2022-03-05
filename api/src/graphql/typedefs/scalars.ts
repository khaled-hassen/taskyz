import { GraphQLScalarType, Kind, ValueNode } from "graphql";

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date scalar type represents date",
  serialize: (value: Date) => value.getTime(),
  parseValue: (value: number) => new Date(value),
  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT) return new Date(parseInt(ast.value, 10));
    return null;
  },
});
