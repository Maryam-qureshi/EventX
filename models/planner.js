const mongoose = require('mongoose');

const PlannerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    expertise: {
      type: String,
      required: true,
    },
    services: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  portfolio: [{
    eventType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    images: [{
      type: String,
    }],
  }],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  }],
});

const Planner = mongoose.model('Planner', PlannerSchema);
module.exports = Planner;
