import React, { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUE,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOB_BEGIN,
  GET_JOB_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STAT_BEGIN,
  SHOW_STAT_SUCCESS,
} from "./action";
import { useEffect } from "react";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const location = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location || "",
  jobLocation: location || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full time", "part time", "remote", "internship"],
  jobType: "full time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  page: 1,
  numOfPages: 1,
  stats: {},
  monthlyApplication: []
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      console.log("request send");
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
        console.log("AUTH ERROR");
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      console.log(response);
      const { user, location, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      clearAlert();
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
        console.log(error.response);
      }
    }
    clearAlert();
  };
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUE,
    });
  };
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      console.log(state);
      await authFetch.post("/jobs", {
        company,
        position,
        status,
        jobLocation,
        jobType,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUE });
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        return;
      } else {
        console.log(error.response.status === 400);
        dispatch({
          type: CREATE_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
        clearAlert();
      }
    }
  };
  const getJobs = async () => {
    let url = `/jobs`;

    dispatch({ type: GET_JOB_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      console.log(data);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOB_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };
  // useEffect(() => {
  //   getAllJob()
  // }, [])
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: {id} });
  };
  const deleteJob = async (id) => {
    dispatch({type: DELETE_JOB_BEGIN})
    try{
      await authFetch.delete(`/jobs/${id}`)
      getJobs()
    }
    catch  {
     logoutUser()
    }
  };
  const editJob = async(currentJob , id) => {
    dispatch({type: EDIT_JOB_BEGIN})
    try {
      const { data } = await authFetch.patch(`/jobs/${id}`, currentJob)
      const {company , position, jobLocation, jobType, status } = data
      dispatch({type: EDIT_JOB_SUCCESS, payload: {company, position, jobLocation, jobType, status}})
      dispatch({type : CLEAR_VALUE})
    }
    catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: EDIT_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  }
  const showStats =  async() => {
    dispatch({type: SHOW_STAT_BEGIN})
    try{   
      const {data } = await authFetch.get('/jobs/stats')
      dispatch({
        type: SHOW_STAT_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplication : data.monthlyApplication
        }
      })
    } catch(err){
   console.log(err);
   logoutUser()
    }
    clearAlert()
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
