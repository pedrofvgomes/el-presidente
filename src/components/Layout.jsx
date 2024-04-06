import React from "react";
import { Outlet } from "react-router-dom";
import LanguagePopover from "./LanguagePopover.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout(props) {
    return (
        <div
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
            }}
        >
            {/* Sidebar */}
            <Sidebar onSidebarHover={props.onSidebarHover} sidebarExpanded={props.sidebarExpanded} />
            {/* Authentication or user */}

            <LanguagePopover />

            <Outlet />
        </div>
    );
};