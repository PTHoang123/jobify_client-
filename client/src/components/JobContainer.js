import React from "react";
import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Job from "./Job";
import Loading from "./Loading";

function JobContainer() {
  const { getJobs, isLoading, jobs, page, totalJobs } = useAppContext();
  useEffect(() => {
    getJobs()
  }, [page]);
  if (isLoading) {
    return <Loading />;
  }
  if (jobs.length === 0) {
    return <Wrapper>No job to display...</Wrapper>;
  }
  return <Wrapper>
    <h5>
        {totalJobs} found{jobs.length > 1 && 's' } job

    </h5>
    <div className="jobs">
        {jobs.map((job) => {
            return (
                <Job key={job._id}{...job}/>
            )
        })}
    </div>
  </Wrapper>;
}

export default JobContainer;
