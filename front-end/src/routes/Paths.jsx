import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLayout from "../layouts/PageLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound"
import Register from "../pages/Register";
import Login from "../pages/Login";

const Paths = () => {
    return ( 
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout NavType = 'home' />}>
                    <Route index element={<Home/>}/>
                </Route>
                <Route  path="/register" element={<PageLayout NavType = 'register' />}>
                    <Route index element={<Register/>}/>
                </Route>
                <Route  path="/login" element={<PageLayout NavType = 'login' />}>
                    <Route index element={<Login/>}/>
                </Route>
                
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
        </>
     );
}
 
export default Paths;