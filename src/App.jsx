import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Button } from "@material-ui/core";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { signOut } from "firebase/auth";
import { auth } from "./Firbase-Config";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/Login";
    });
  };

  return (
    <div className="app_fullbody">
      <div className="app_body">
        <Router>
          <nav>
            <Link to="/">Home</Link>

            {!isAuth ? (
              <Link to="/Login">Log in</Link>
            ) : (
              <>
                <Link to="/CreatePost">Create Post</Link>
                <Button style={{ color: "white" }} onClick={signUserOut}>
                  Log Out
                </Button>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<Home isAuth={isAuth} />} />
            <Route
              path="/CreatePost"
              element={<CreatePost isAuth={isAuth} />}
            />
            <Route path="/Login" element={<Login setIsAuth={setIsAuth} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
