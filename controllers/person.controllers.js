const Person = require("../models/Person");
let nameToFind = "Mohamed";
const personId = "60511ecf06798227ec9d35a3";
const foodToAdd = "hamburger";
let givenFood = "burrito";


const savePerson = async (req, res) => {
  const person_0 = new Person({
    name: "ALi",
    age: 17,
    favoriteFoods: ["Pizza", "Ojja"],
  });
  try {
    const response = await person_0.save();
    res
      .status(200)
      .send({ response: response, message: "person saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `can not save it, ${error}` });
  }
};

const createPeople = async (req, res) => {
    let arrayOfPeople = [
      { name: "Ahlem", age: 16, favoriteFoods: ["burrito"] },
      { name: "Safa", age: 10, favoriteFoods: ["burrito"] },
      { name: "Leila", age: 18, favoriteFoods: ["burrito"] },
    ];
  try {
    const response = await Person.create(arrayOfPeople);
    res
      .status(200)
      .send({ response: response, message: `creating records successfully` });
  } catch (error) {
    res.status(400).send({
      response: response,
      message: `can not create many records, ${error}`,
    });
  }
};

const findName = async (req, res) => {
  try {
    const result = await Person.find({ name: nameToFind });
    // !result ? res.status(400).send({ message: `can not find anyone with that name` }) :
    res.status(200).send({
      response: result,
      message: "wanted people are found successfully",
    });
  } catch (error) {
    res.status(400).send({ messge: `can not access data, ${error}` });
  }
};

const personFood = async (req, res) => {
    const food = "Ojja";
  try {
    const result = await Person.findOne({ favoriteFoods: food });
    !result
      ? res.status(400).send({ message: `can not find anyone with that food` })
      : res.status(200).send({
          response: result,
          message: "finding person by food successfully",
        });
  } catch (error) {
    res.status(500).send({ messge: `can not access data, ${error}` });
  }
};

const findPerson = async (req, res) => {
  try {
    const result = await Person.findById(personId);
    !result
      ? res.status(400).send({ message: `can not find anyone with that id` })
      : res.status(200).send({
          response: result,
          message: "finding person by id successfully",
        });
  } catch (error) {
    res.status(500).send({ message: `can not access data, ${error}` });
  }
};

const addFood = async (req, res) => {
  try {
    const newPerson = await Person.findById(personId);
    newPerson.favoriteFoods.push(foodToAdd);
    await Person.findById(personId);
    await newPerson.save();
    res
      .status(200)
      .send({ response: newPerson, message: "foods updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: `can not access data with this id, ${error}` });
  }
};

const personAge = async (req, res) => {
  try {
    const response = await Person.findOneAndUpdate(
      { name: nameToFind },
      { $set: { age: 20 } },
      {useFindAndModify:false}
    );
    !response
      ? res.send({ message: "cant not update age to this person" })
      : res
          .status(200)
          .send({ response: response, message: `age updated successfully` });
  } catch (error) {
    res
      .status(500)
      .send({ message: `can not update the age of this person, ${error}` });
  }
};

const removePerson = async (req, res) => {
  try {
    const result = await Person.findByIdAndRemove(personId);
    !result
      ? res.send({ message: "no person matching with this id" })
      : res
          .status(200)
          .send({
            response: result,
            message: "person was deleted successfully",
          });
  } catch (error) {
    res.status(400).send({ message: `can not access data, ${error}` });
  }
};

const deleteMaries = async (req, res) => {
  try {
    const result = await Person.remove({ name: "Mary" });
    console.log(result);
    if (!result.n) {
      res.status(200).send({ message: "all Mary were deleted successfully" });
      return;
    }
    !result
      ? res.send({ message: "no person is called Mary" })
      : res
          .status(200)
          .send({
            response: result,
            message: "can not access data",
          });
  } catch (error) {
    res.status(400).send({ message: `can not access data, ${error}` });
  }
};

const peopleBurrito = async (req, res) => {
  try {
    const result = await Person.find({ favoriteFoods: givenFood })
      .sort("name")
      .limit(2)
      .select("-age")
      .exec();
    // !result ? res.status(400).send({ message: `can not find anyone eats burrito` }) :
    res.status(200).send({
      response: result,
      message: "wanted people are found successfully",
    });
  } catch (error) {
    res.status(400).send({ messge: `can not access data, ${error}` });
  }
};

module.exports = controllers = {
  savePerson,
  createPeople,
  findName,
  personFood,
  findPerson,
  addFood,
  personAge,
  removePerson,
  deleteMaries,
  peopleBurrito,
};
