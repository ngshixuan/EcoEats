import { useContext } from "react"
import { AuthContext } from "./context/Auth"
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "./components/utilities/LoadingSpinner";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    const location = useLocation();

    if(loading){
        return <LoadingSpinner/>
    }
    else{
        if(user){
            return children;
        }
        else{
            console.log("Permission denied");

            /*
            The "replace" prop ensures that the current entry in the browser history is replaced
            by the new one. This means that after the navigation, if the user clicks the browser's back 
            button, they won't go back to the previous route (which is unauthorized), but rather back
            to the page they visited before the unauthorized route.
            */

            return <Navigate to="/login" state={{from:location}} replace></Navigate>
        }
    }
}

export default PrivateRoutes;

/* 
The state prop allows you to pass data to the target route (in this case, the login page).
Here, it's passing an object that contains a key from, which holds the current location (i.e.,
the current URL the user is trying to access).
location refers to the current path the user is on when the redirection happens.
This is important because, after a successful login, you might want to redirect the user back to
the page they originally tried to visit
*/