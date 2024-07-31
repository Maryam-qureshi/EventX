const mongoose = require('mongoose');

const PlannerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
    required: true,
  },
});

const Planner = mongoose.model('Planner', PlannerSchema);

module.exports = Planner;