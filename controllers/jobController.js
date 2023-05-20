import { StatusCodes } from "http-status-codes";
import moment from "moment/moment.js";

import {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} from "../errors/index.js";
import Job from "../models/Job.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import checkPermissions from "../utils/checkPermission.js";

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: status, count } = curr;
    acc[status] = count;
    return acc;
  }, {});
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplication = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplication = monthlyApplication.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    console.log(month);
    console.log(moment().month(month - 1).format('MMM'));
    const date = moment()
      .month(month -1)
      .year(year)
      .format("MMM Y");
    return { date, count };
  })
  .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication });
};
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const deleteJob = async (req, res, next) => {
  const { id: JobId } = req.params;
  const job = await Job.findOne({ _id: JobId });
  if (!job) {
    throw new NotFoundError(`no job wth id : ${JobId}`);
  }
  checkPermissions(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "remove job success" });
};
const getAllJob = async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPage: 1 });
};
const updateJob = async (req, res, next) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("Please provide all value");
  }
  const job = Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with ${id}`);
  }
  checkPermissions(req.user, job.createdBy);
  const updatedJob = await job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  // job.company = company,
  // job.position = position,
  // await job.save()
  res.status(StatusCodes.OK).json({ updatedJob });
};

export { createJob, deleteJob, getAllJob, updateJob, showStats };
