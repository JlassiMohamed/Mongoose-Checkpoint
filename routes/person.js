const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

//TEST ROUTING
router.get("/test", (req, res) => {
  res.send("Hello");
});

// post a person
// get all persons
// delete a person by id
// update a person by id

// notation / documentation swaga:
// @method: POST
// @desc: Create and Save one person using the argument person_0
// @path: http://localhost:5000/api/person/saveone
// @params: no
const person_0 = new Person({
  name: "Mohamed",
  age: 21,
  favoriteFoods: ["Pizza", "Ojja"],
});
router.post("/saveone", async (req, res) => {
  try {
    const response = await person_0.save();
    res
      .status(200)
      .send({ response: response, message: "person saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `can not save it, ${error}` });
  }
});

// @method: POST
// @desc: Create Many Records using the argument arrayOfPeople.
// @path: http://localhost:5000/api/person/createmany
// @params: no
let arrayOfPeople = [
  { name: "Ahlem", age: 16, favoriteFoods: ["burrito"] },
  { name: "Safa", age: 10, favoriteFoods: ["burrito"] },
  { name: "Leila", age: 18, favoriteFoods: ["burrito"] },
];
router.post("/createmany", async (req, res) => {
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
});

// @method: GET
// @desc: Find people having a given name with argument: nameToFind
// @path: http://localhost:5000/api/person/findname
// @params: no
let nameToFind = "Faycel";
router.get("/findname", async (req, res) => {
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
});

// @method: GET
// @desc: Find just one person which has a certain food with argument food
// @path: http://localhost:5000/api/person/personfood
// @param: no
const food = "Salade";
router.get("/personfood", async (req, res) => {
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
});

// @method: GET
// @desc: Find the (only!!) person having a given id with argument personId
// @path: http://localhost:5000/api/person/onlyone
// @param: no
const personId = "60510c23642c400f6ce675ee";
router.get("/onlyone", async (req, res) => {
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
});

// @method: GET
// @desc: Perform Classic Updates by Running Find, Edit, then Save with arguments personId and foodToAdd.
// @path: http://localhost:5000/api/person/addfood
// @param: no
const foodToAdd = "hamburger";
router.get("/addfood", async (req, res) => {
  try {
    const newPerson = await Person.findById(personId);
    newPerson.favoriteFoods.push(foodToAdd);
    await Person.findById(personId);
    await newPerson.save();
    res
      .status(200)
      .send({ response: newPerson, message: "foods updated successfully" });
  } catch (error) {
    res.status(500).send({ message: `can not access data with this id, ${error}` });
  }
});

// @method: PUT
// @desc: Find a person by Name and update the person's age to 20 with arguments nameToFind.
// @path: http://localhost:5000/api/person/addfood
// @param: no
router.put("/", async (req, res) => {
  try {
    const response = await Person.findOneAndUpdate({name: nameToFind}, {$set: { age: 20 }});
    !response ? res.send({message: "cant not update age to this person"}) :
    res
      .status(200)
      .send({ response: response, message: `age updated successfully` });
  } catch (error) {
    res
      .status(500)
      .send({ message: `can not update the age of this person, ${error}` });
  }
});

// @method: DELETE
// @desc: Delete one person by the argument personId.
// @path: http://localhost:5000/api/person/_id
// @param: no
router.delete("/removeperson", async (req,res) =>{
  try {
    const result = await Person.findByIdAndRemove(personId);
    !result ? res.send({message: "no person matching with this id"}) :
    res.status(200).send({response: result, message: "person was deleted successfully"})
  } catch (error) {
    res.status(400).send({message: `can not access data, ${error}`})
  }
})

// @method: 
// @desc: Delete all the people whose name is “Mary”
// @path: http://localhost:5000/api/person/_id
// @param: no
router.delete("/removemaries", async (req,res) =>{
  try {
    const result = await Person.remove({name: "Mary"});
    console.log(result)
    if (!result.n) {
      res.status(200).send({message: "person was already deleted"})
      return
    }
    !result ? res.send({message: "no person is called Mary"}) :
    res.status(200).send({response: result, message: "all Mary were deleted successfully"})
  } catch (error) {
    res.status(400).send({message: `can not access data, ${error}`})
  }
})

// @method: 
// @desc: Find people who like burrito.
// @path: http://localhost:5000/api/person/
// @param: no
let givenFood = "burrito";
router.get("/peopleburrito", async (req, res) => {
  try {
    const result = await Person.find({ favoriteFoods: givenFood }).sort("name").limit(2).select("-age").exec();
    // !result ? res.status(400).send({ message: `can not find anyone eats burrito` }) :
    res.status(200).send({
      response: result,
      message: "wanted people are found successfully",
    });
  } catch (error) {
    res.status(400).send({ messge: `can not access data, ${error}` });
  }
});

module.exports = router;
