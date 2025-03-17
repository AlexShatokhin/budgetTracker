import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

import { routes } from "./routes/routes";
import { useEffect } from "react";
import { useFetchUserDataQuery } from "../../api/modules/authorizationApi";
import { useTypedDispatch } from "../../hooks/useRedux";
import { removeToken, setToken } from "../Authorization/authorizationSlice";

function App() {
    const {data, isSuccess, isError, isLoading} = useFetchUserDataQuery();
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if(!isLoading){
            if(isSuccess && data)
                dispatch(setToken(data))
            if(isError)
                dispatch(removeToken())
        }
    }, )

  return (
    <div className="App">
        <Routes>
            {
                routes.map((route) => {
                    return route.isPrivate ? (
                        <Route key={route.path} element={<PrivateRoute />}>
                            <Route path={route.path} element={<route.component />}/>
                        </Route>
                    ) : <Route key={route.path} path={route.path} element={<route.component />}/>
                })
            }    
        </Routes>
    </div>
  );
}

export default App;