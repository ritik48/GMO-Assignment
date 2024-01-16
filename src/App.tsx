import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";

import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import Footer from "./pages/Footer";

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
