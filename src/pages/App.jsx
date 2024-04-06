import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Home from './Home.jsx';
import Authentication from './Authentication.jsx';
import '../assets/css/App.css';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/main_window" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/authentication" element={<Authentication />} />
            </Routes>
        </Router>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />)