import {Routes, Route, Navigate} from "react-router-dom";

import Home from "../pages/Home/Home";
import Characters from "../pages/Characters/Characters";

import Character from "../pages/Character/Character";
import Houses from "../pages/Houses/Houses";

function AppRoute ()
{
  return (
    <Routes>
    <Route
      path="/"
      element={<Home />}
    />

    <Route
      path="/Houses"
      element={<Houses />}
    />
    <Route
      path="/character/:id"
      element={<Character />}
    />

    <Route
      path="/characters"
      element={<Characters />}
    />

    <Route
      path="*"
      element={<Navigate to={"/"} />}
    />
  </Routes>

    
  );
}

export default AppRoute;
