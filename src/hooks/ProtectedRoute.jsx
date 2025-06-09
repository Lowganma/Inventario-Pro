import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ({user, redirectTo, Children})=> { 
    if(user==null) return <Navigate replace to={redirectTo} />
return Children?Children:<Outlet/>
}
