import { Route,Routes } from "react-router-dom"
import { Home } from "./pages/Home";
import { AstronomyPicture } from "./pages/AstronomyPicture";
import { RouterLayout } from "./common/RouterLayout";
import { AsteroidMap } from "./pages/Map";
import { Events } from "./pages/Events";
import { Login } from "./pages/Login";


export const AppRouter: React.FC<{}> = () => {
    return(
        <Routes>
            <Route path="/" element={<RouterLayout/>}> 
                <Route path="/" element={<Home/>}> </Route>
                <Route path="/picture" element={<AstronomyPicture/>}> </Route>
                <Route path="/events" element={<Events/>}> </Route>
                <Route path="/map" element={<AsteroidMap/>}> </Route>
                <Route path="/events" element={<Events/>}> </Route>
                <Route path="/login" element={<Login/>}> </Route>
            </Route>
            
        </Routes>
    );
    
};