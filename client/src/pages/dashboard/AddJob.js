import React from "react";
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router-dom";
function AddJob() {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    statusOptions,
    status,
    handleChange,
    clearValues,
    isLoading,
    createJob,
    editJob,
    editJobId
  } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if(isEditing) {
      editJob({position, company, jobType, status, jobLocation}, editJobId)
      return;
    }
    createJob()
    console.log("create job");
  };
  const handleJobInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job" : "Add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            labelText="location"
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="status"
            value={status}
            list={statusOptions}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleJobInput}
          />
          <button onClick={(e) => {
                e.preventDefault()
                clearValues()
              }} className="btn btn-block clear-btn">
            Clear
          </button>
          <div className="btn-container">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob;
