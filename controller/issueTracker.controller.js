const { DELET_Issue } = require("../config/constant");
const IssuesTracker = require("../model/issuetracker.model");
const { handleError, handleSuccess } = require("../utils/handler");
const mongoose = require('mongoose');

//create an API for creating an issue,
const createIssue = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const addissue = await new IssuesTracker({
      title,
      description,
      status,
      priority,
    });
    let insertissue = await addissue.save();
    return handleSuccess(res, insertissue, "Created Successfully");
  } catch (e) {
    console.log(e);
    handleError(res, e);
  }
};
//update issue by id
const updateIssue = async (req, res) => {
  try {
    const { _id, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return handleSuccess(res, null, "Invalid issue ID");
    }
    const issue = await IssuesTracker.findById(_id);
    if (!issue) {
      return handleSuccess(res, null, "Issue not found");
    }
    const updateissue = await IssuesTracker.updateOne(
      { _id: req.body._id },
      { $set: { description } }
    );
    return handleSuccess(res, updateissue, "updated Successfully");
  } catch (e) {
    console.log(e);
    handleError(res, e);
  }
};

//   API for deleting issues,
const deleteIssue = async (req, res) => {
    try {
      const { _id } = req.body;
  
      if (!_id) {
        const updateResult = await IssuesTracker.updateMany(
          {},
          { $set: { is_deleted: true } }
        );
        return handleSuccess(res, updateResult, "All issues marked as deleted successfully");
      } 
  
      const issue = await IssuesTracker.findById(_id);
      if (!issue) {
        return handleSuccess(res, null, "Issue not found");
      }
  
      const updateResult = await IssuesTracker.updateOne(
        { _id: _id },
        { $set: { is_deleted: true } }
      );
  
      return handleSuccess(res, updateResult, "deleted successfully");
    } catch (e) {
      console.error(e);
      return handleError(res, e.message);
    }
  };
  

//API for viewing issues
const getIssues = async (req, res) => {
    try {
      const { _id, priority, status, dateFrom, dateTo } = req.query;
      if (_id) {
        const issue = await IssuesTracker.findById(_id);
        if (!issue) {
          return handleSuccess(res, null, "Issue not found");
        }
        return handleSuccess(res, issue, "Issue fetched successfully");
      }
  
      const query = {};
  
      if (priority) {
        query.priority = priority;
      }
  
      if (status) {
        query.status = status;
      }
  
      if (dateFrom || dateTo) {
        query.date = {};
        if (dateFrom) {
          query.date.$gte = moment(dateFrom).startOf("day").toDate();
        }
        if (dateTo) {
          query.date.$lte = moment(dateTo).endOf("day").toDate();
        }
      }
  query.is_deleted = false
      const issues = await IssuesTracker.find(query);
  
      if (!issues || issues.length === 0) {
        return handleSuccess(res, null, "No issues found");
      }
  
      return handleSuccess(res, issues, "Issues fetched successfully");
    } catch (e) {
      console.error(e);
      return handleError(res, e.message);
    }
  };
  

module.exports = { createIssue, updateIssue, deleteIssue, getIssues };
