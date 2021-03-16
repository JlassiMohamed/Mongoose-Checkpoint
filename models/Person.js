const mongoose = require("mongoose")

const schema = mongoose.Schema;

const personSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

module.exports = mongoose.model('person', personSchema);
