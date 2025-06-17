import { Route, Routes } from "react-router-dom";
import { Home , ProtectedRoute, UserAuth, Login } from "../index";

export function MyRoutes() {
  const {user} = UserAuth()
  return (
        <Routes>
          <Route path="/Login" element={<Login/>} />
         <Route element={<ProtectedRoute user ={user} redirectTo ="/Login" />}
          >
           <Route path="/" element={<Home/>} />
          </Route>
        </Routes>
  );
}