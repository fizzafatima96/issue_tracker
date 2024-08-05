const express = require("express");
const { createIssue, updateIssue , deleteIssue, getIssues } = require("../controller/issueTracker.controller");
const tracker_router = express.Router();


tracker_router.post('/createIssue', createIssue)

tracker_router.put('/updateIssue', updateIssue)

tracker_router.put('/deleteIssue', deleteIssue)

tracker_router.get('/getIssues', getIssues)



module.exports = tracker_router;

