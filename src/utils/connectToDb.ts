import mongoose from "mongoose";

export default function connectToDb(): Promise<mongoose.Mongoose> {
  const connectionString = process.env.DB_CONNECTION_STRING;

  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}
