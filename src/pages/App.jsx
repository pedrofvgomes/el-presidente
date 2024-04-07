import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Home from './Home.jsx';
import '../assets/css/App.css';
import Bot from './Bot.jsx';
import News from './News.jsx';

export default function App() {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    function onSidebarHover() {
        setSidebarExpanded(!sidebarExpanded);
    }

    return (
        <Router>
            <Routes>
                <Route path="/main_window" element={<Layout onSidebarHover={onSidebarHover} sidebarExpanded={sidebarExpanded}/>}>
                    <Route index element={<Home sidebarExpanded={sidebarExpanded} />} />
                    <Route path='bot' element={<Bot />} />
                    <Route path='news' element={<News />} />
                </Route>
            </Routes>
        </Router>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />)