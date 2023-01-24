/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Email = require("./models/email");
const ReadEmail = require("./models/readEmail");
const FlagEmail = require("./models/flagged");

// import chrono library for parsing dates and times
const chrono = require("chrono-node");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// get data from database
router.get("/emails", (req, res) => {
  // empty selector means get all documents
  Email.find({}).then((emails) => res.send(emails));
});

// flag email on feed
router.post("/flag", auth.ensureLoggedIn, (req, res) => {
  const flagEmail = new FlagEmail({
    userID: req.body.userID,
    subject: req.body.subject,
    emailID: req.body.emailID,
  });
  flagEmail.save().then(res.send(flagEmail));
});

router.get("/read", (req, res) => {
  // TODO: use the userID to narrow in on the find
  ReadEmail.find({}).then((emailsRead) => {
    // ReadEmail.find({ userID: req.query.userID }).then((emailsRead) => {
    let excludedEmails = emailsRead.map((emails) => emails.emailID);
    res.send(excludedEmails);
  });
});

router.post("/read", auth.ensureLoggedIn, (req, res) => {
  // router.post("/read", (req, res) => {
  const readEmail = new ReadEmail({
    userID: req.body.userId,
    subject: req.body.subject,
    emailID: req.body.emailID,
  });
  readEmail.save().then(res.send(readEmail));
});

// DON'T NEED ANYMORE BUT JUST IN CASE NEED IN THE FUTURE!

const writeToDB = (email) => {
  const newEmail = new Email({
    senderEmail: email.from.emailAddress.address,
    senderName: email.from.emailAddress.name,
    header: email.subject,
    hasAttachment: email.hasAttachments,
    attachments: [],
    emailID: email.id,
    content: email.body.content,
    links: [],
    // links: getLinks(email.body.content),
    times: [],
    relevantDates: String(chrono.parseDate(email.body.content)),
    venue: "",
    emailURL: email.webLink,
    isRead: email.isRead,
    isFlagged: email.flag.flagStatus,
    timeReceived: email.receivedDateTime,
  });
  newEmail.save();
  return newEmail;
};
// function to return the
const parsedRawEmails = (rawEmailData) => {
  const parsedEmails = rawEmailData.map((email) => writeToDB(email));
  return parsedEmails;
};

// send dummy data to database
router.post("/emails", (req, res) => {
  const rawEmailData = GENERIC_EMAILS.value;
  parsedRawEmails(rawEmailData);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
