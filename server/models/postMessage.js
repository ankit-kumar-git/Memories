import mongoose from "mongoose";

//Creating schema which will maintain a uniformity of what each post will include.
//And mongoose allows to create such document with these schema.
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String, //We will convert images into string using react-file-base64
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//Now we will turn these schema into model
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
