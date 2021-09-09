const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: "Say something kind",
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    response: [responsechema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

commentSchema.virtual("responseCount").get(function () {
  return this.responses.length;
});

const Comment = model("Comment", commentSchema);

module.exports = Comments;
