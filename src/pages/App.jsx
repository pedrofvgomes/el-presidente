import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Home from './Home.jsx';
import '../assets/css/App.css';
import Bot from './Bot.jsx';

export default function App() {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    function onSidebarHover() {
        setSidebarExpanded(!sidebarExpanded);
    }

    const [botRunning, setBotRunning] = useState(false)

    function botStarted(){
        setBotRunning(true)
    }

    return (
        <Router>
            <Routes>
                <Route path="/main_window" element={<Layout onSidebarHover={onSidebarHover} sidebarExpanded={sidebarExpanded} />}>
                    <Route index element={<Home botRunning={botRunning} sidebarExpanded={sidebarExpanded} />} />
                    <Route path='bot' element={<Bot botStarted={botStarted} sidebarExpanded={sidebarExpanded} />} />
                </Route>
            </Routes>
        </Router>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />)