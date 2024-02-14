import ExpressBrute from "express-brute";
import MongooseStore from "express-brute-mongoose";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bruteForceSchema = new Schema({
  data: {
    count: { type: Number, required: true },
    lastRequest: { type: Date, required: true },
    firstRequest: { type: Date, required: true }
  },
  expires: { type: Date, required: true }
});
const model = mongoose.model("bruteforce", bruteForceSchema);

const store = new MongooseStore(model);
const bruteforce = new ExpressBrute(store, {
  freeRetries: 3,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 24 * 60 * 60 * 1000, // 1 day
  failCallback: function (req, res, next, nextValidRequestDate) {
    next();
    res.status(429).json({ error: "Too many login attempts, please try again later", nextValidRequestDate });
  }
});

export default bruteforce;

