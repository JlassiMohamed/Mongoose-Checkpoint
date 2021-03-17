const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const controllers = require("../controllers/person.controllers")

//TEST ROUTING
router.get("/test", (req, res) => {
  res.send("Hello");
});

// notation swaga @:
// @method: POST
// @desc: Create and Save one person using the argument person_0
// @path: http://localhost:5000/api/person/saveone
// @params: no
router.post("/saveone", controllers.savePerson);

// @method: POST
// @desc: Create Many Records using the argument arrayOfPeople.
// @path: http://localhost:5000/api/person/createmany
// @params: no
router.post("/createmany", controllers.createPeople);

// @method: GET
// @desc: Find people having a given name with argument: nameToFind
// @path: http://localhost:5000/api/person/findname
// @params: no
router.get("/findname", controllers.findName);

// @method: GET
// @desc: Find just one person which has a certain food with argument food
// @path: http://localhost:5000/api/person/personfood
// @param: no
router.get("/personfood", controllers.personFood);

// @method: GET
// @desc: Find the (only!!) person having a given id with argument personId
// @path: http://localhost:5000/api/person/onlyone
// @param: no
router.get("/onlyone", controllers.findPerson);

// @method: GET
// @desc: Perform Classic Updates by Running Find, Edit, then Save with arguments personId and foodToAdd.
// @path: http://localhost:5000/api/person/addfood
// @param: no
router.get("/addfood", controllers.addFood);

// @method: PUT
// @desc: Find a person by Name and update the person's age to 20 with arguments nameToFind.
// @path: http://localhost:5000/api/person/addfood
// @param: no
router.put("/", controllers.personAge);

// @method: DELETE
// @desc: Delete one person by the argument personId.
// @path: http://localhost:5000/api/person/_id
// @param: no
router.delete("/removeperson", controllers.removePerson);

// @method: 
// @desc: Delete all the people whose name is “Mary”
// @path: http://localhost:5000/api/person/_id
// @param: no
router.delete("/removemaries", controllers.deleteMaries);

// @method: 
// @desc: Find people who like burrito.
// @path: http://localhost:5000/api/person/
// @param: no
router.get("/peopleburrito", controllers.peopleBurrito);

module.exports = router;
