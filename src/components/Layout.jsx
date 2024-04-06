import React from "react";
import { Outlet } from "react-router-dom";
import { translate } from "../translations/translate.js";
import LanguagePopover from "./LanguagePopover.jsx";

export default function Layout() {
    return (
        <>
            <h1>{translate('layout')} </h1>

            {/* Sidebar */}
            {/* Authentication or user */}

            <LanguagePopover />

            <Outlet />
        </>
    );
};