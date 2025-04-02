const { ref } = require("joi");
const mongoose = require("mongoose");
const review = require("./review");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: [
    {
      url: String,
      filename: String,
    },
  ],

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // category: {
  //   type: String,
  //   enum: [
  //     "trending",
  //     "mountain",
  //     "room",
  //     "iconic-city",
  //     "castle",
  //     "amazing-pools",
  //     "camping",
  //     "farm",
  //     "artic",
  //   ],
  // },
});

// Deleting listing with all the reviews
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
