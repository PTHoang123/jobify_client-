import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error , ProtectedRoutes} from "./pages";
import { AllJob, Profile, ShareLayout, AddJob, Stats,  } from "./pages/dashboard";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <nav>
          <Link to='/'>Dashboard</Link>
          <Link to='/register'>Register</Link>
          <Link to='/landing'>Landing</Link>
        </nav> */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <ShareLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/" element={<Stats />} />
            <Route path="all-jobs" element={<AllJob />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
