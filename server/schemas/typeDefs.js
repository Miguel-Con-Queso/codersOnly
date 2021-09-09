const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    comments: [Comment]
    friends: [User]
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
    responseCount: Int
    responses: [Response]
  }

  type Response {
    _id: ID
    responseBody: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addComment(commentText: String!): Comment
    addResponse(commentId: ID!, responseBody: String!): Comment
    addFriend(friendId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
