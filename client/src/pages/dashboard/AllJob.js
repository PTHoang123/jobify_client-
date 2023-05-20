import React from 'react'
import { JobContainer, SearchContainer } from '../../components';

import { useAppContext } from "../../context/appContext";

function AllJob() {
  return (
    <>
      <SearchContainer/>
      <JobContainer/>
    </>
  )
}

export default AllJob