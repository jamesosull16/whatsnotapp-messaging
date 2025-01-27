const db = require("../models");

module.exports = (app) => {

  
  //GET route for getting all messages
  app.get("/api/messages", (req, res) => {
    // findAll returns all entries for a table when used with no options
    db.Message.findAll({}).then((dbMessage) => res.json(dbMessage));
    res.render("index");
  });

  //POST route for saving new message to db
  app.post("/api/messages", (req, res) => {
    db.Message.create({
      username: req.body.text,
      message: req.body.text,
    }).then((dbMessage) => res.json(dbMessage));
  });

  //from chat example...not sure what to do with this
  app.get("/", (req, res) => {
    res.render("index");
  });
};
