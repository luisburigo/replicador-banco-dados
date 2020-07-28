import React from 'react';
import MainLayout from "./layouts/MainLayout";
import Routes from "./routes";
import {DirecaoProvider} from "./contexts/DirecaoContext";

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
