import React, { useEffect, useState } from "react";
import { SmartToyRounded, DashboardRounded, NewspaperRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { translate } from "../translations/translate";

export default function Sidebar(props) {

    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const [logo, setLogo] = useState('/img/brunix-compact.png');

    const [canUpdate, setCanUpdate] = useState(true);

    let logoStyle = {
        marginTop: '10px',
        height: '40px',
        left: sidebarExpanded ? `${(150 - 40 * 584 / 188) / 2}px` : `${(50 - 40 * 164 / 188) / 2}px`,
        position: 'absolute',
        transition: 'left 0.3s ease-in-out',
        objectFit: 'contain',
    }

    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        setSidebarExpanded(props.sidebarExpanded);
    }
        , [props.sidebarExpanded]);

    function handleMouseEnter() {
        if (sidebarExpanded) return;

        props.onSidebarHover();
        setLogo('/img/brunix.png');
        setShowDescription(true);
    }

    function handleMouseLeave() {
        if (!sidebarExpanded) return;

        props.onSidebarHover();
        setShowDescription(false);
        setLogo('/img/brunix-compact.png');
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                height: '100%',
                width: sidebarExpanded ? '150px' : '50px',
                background: 'linear-gradient(180deg, rgba(75, 103, 131, 1) 0%, rgba(2,0,36,1) 100%)',
                zIndex: 1,
                transition: 'width 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            }}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
        >
            <img src={logo} alt="Brunix" style={logoStyle} />

            <div style={{ marginTop: '60px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                <Link
                    to="/main_window/"
                    style={{
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'left',
                        alignContent: 'center',
                        position: 'absolute',
                        left: sidebarExpanded ? `${(150 - 40 * 584 / 188) / 2}px` : `${(50 - 40 * 164 / 188) / 2}px`,
                        transition: 'left 0.3s ease-in-out',
                        top: '80px'
                    }}
                >
                    <DashboardRounded style={{ color: 'white', fontSize: `${40 * 164 / 188}px` }} />
                    <Typography
                        style={{
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            display: showDescription ? 'flex' : 'none',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: '5px',
                            width: '60%'
                        }}
                    >
                        {translate('dashboard')}
                    </Typography>
                </Link>
                <Link
                    to="/main_window/bot"
                    style={{
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'left',
                        alignContent: 'center',
                        position: 'absolute',
                        left: sidebarExpanded ? `${(150 - 40 * 584 / 188) / 2}px` : `${(50 - 40 * 164 / 188) / 2}px`,
                        transition: 'left 0.3s ease-in-out',
                        top: '130px'
                    }}
                >
                    <SmartToyRounded style={{ color: 'white', fontSize: `${40 * 164 / 188}px` }} />
                    <Typography
                        style={{
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            display: showDescription ? 'flex' : 'none',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: '5px',
                            width: '60%'
                        }}
                    >
                        {translate('bot')}
                    </Typography>
                </Link>
            </div>
        </div>
    )
}
