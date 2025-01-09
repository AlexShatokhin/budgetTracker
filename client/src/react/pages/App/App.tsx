import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

import { routes } from "./routes/routes";

function App() {

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