const { ApolloServer, gql, UserInputError } = require("apollo-server");
const uuid = require("uuid/v1");
const config = require("./utils/config");
const mongoose = require("mongoose");

const Book = require("./models/book");
const Author = require("./models/author");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "world";
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({});
    },
    allAuthors: () => {
      return Author.find({});
    }
  },
  Author: {
    bookCount: root => {
      return books.filter(book => book.author === root.name).length;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({
        title: args.title,
        published: args.published,
        geners: args.geners
      });
      const author = await Author.findOne({ name: args.author });
      if (!author) {
        const author = new Author({
          name: args.author
        });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (author) {
        author.name = args.name;
        author.setBornTo = args.setBornTo;
        return author.save();
      }
      return null;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
