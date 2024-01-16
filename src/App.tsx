import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";

import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import Footer from "./pages/Footer";
import { Box } from "@mui/material";

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Box sx={{height: "100vh",display: "flex",flexDirection: "column", justifyContent: "space-between"}}>
                    <NavBar />
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                    <Footer />
                </Box>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
