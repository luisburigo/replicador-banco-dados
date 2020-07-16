import React from 'react';
import MainLayout from "./layouts/MainLayout";
import Routes from "./routes";
import {DirecaoProvider} from "./contexts/DirecaoContext";
import socketIo from "socket.io-client"

function App() {
    return (
        <DirecaoProvider>
            <MainLayout>
                <Routes/>
            </MainLayout>
        </DirecaoProvider>
    );
}

export default App;
