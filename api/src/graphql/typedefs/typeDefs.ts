import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  type FullName {
    first: String!
    last: String!
  }

  type Token {
    value: String!
    expire: Date!
  }

  type User {
    fullName: FullName!
    token: Token!
  }

  type Collection {
    id: ID!
    name: String!
    tasks: [Task!]!
    updatedAt: Date!
    totalTasks: Int!
    completedTasks: Int!
  }

  type Task {
    id: ID!
    name: String!
    dueDate: Date
    isDone: Boolean!
    collection: ID
  }

  type Overview {
    completedTasks: Int!
    upcomingTasksNumber: Int!
    recentlyModified: [Collection!]!
  }

  type Image {
    url: String!
    alt: String!
    sourceUrl: String!
    creatorName: String!
    creatorUrl: String!
  }

  type HSLColor {
    h: Float!
    s: Float!
    l: Float!
    a: Float
  }

  type Colors {
    textColor: HSLColor!
    primaryColor: HSLColor!
    successColor: HSLColor!
    warningColor: HSLColor!
    dangerColor: HSLColor!
    bgColor: HSLColor!
    cardBgColor: HSLColor!
    bgOpacity: Float!
    blur: Float!
  }

  type Config {
    bgImage: Image
    colors: Colors
  }

  type SearchImageResult {
    images: [Image!]!
    totalPages: Int!
  }

  type Query {
    validateToken: Boolean!
    refreshToken: Token!
    login(email: String!, password: String!): User!
    collections: [Collection!]!
    collection(id: ID!): Collection!
    overview: Overview!
    searchImages(query: String!, page: Int!): SearchImageResult!
    config: Config
  }

  input RegisterData {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input ImageData {
    url: String!
    alt: String!
    sourceUrl: String!
    creatorName: String!
    creatorUrl: String!
  }

  input HSLColorData {
    h: Float!
    s: Float!
    l: Float!
    a: Float
  }

  input ColorsData {
    textColor: HSLColorData!
    primaryColor: HSLColorData!
    successColor: HSLColorData!
    warningColor: HSLColorData!
    dangerColor: HSLColorData!
    bgColor: HSLColorData!
    cardBgColor: HSLColorData!
    bgOpacity: Float!
    blur: Float!
  }

  input ConfigData {
    bgImage: ImageData
    colors: ColorsData
  }

  type Mutation {
    register(data: RegisterData!): User!
    logout: String!
    saveUserConfig(config: ConfigData!): String!
    addCollection(name: String!): Collection!
    updateCollection(id: ID!, newName: String!): Collection!
    deleteCollection(id: ID!): ID!
    addTask(id: ID!, name: String!, dueDate: Date): Task!
    updateTask(id: ID!, newName: String, isDone: Boolean, dueDate: Date): Task!
    deleteTask(id: ID!): ID!
  }
`;

export default typeDefs;
