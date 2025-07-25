import { useRoutes } from "react-router-dom"
import routes from "./routes"

import Navbar from "./layouts/Navbar/Navbar";
import Footer from "./layouts/Footer/Footer";
import "./styles/App.css";

function AppRoutes() {
    const element = useRoutes(routes)
    return <>{element}</>
}

export default function App() {
    return (
        <div className="App">
            <Navbar />
            <main className="main-content">
                <AppRoutes />
            </main>
            <Footer />
        </div>
    );
}