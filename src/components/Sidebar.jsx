import React, { useEffect } from "react";

export default function Sidebar(props) {    
    return (
        <div 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                height: '100%',
                width: props.sidebarExpanded ? '150px' : '50px',
                background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(2,0,36,1) 100%)',
                zIndex: 1,
                transition: 'width 0.3s ease-in-out',
            }}
            onMouseEnter={() => props.onSidebarHover()}
            onMouseLeave={() => props.onSidebarHover()}
        >
            oi
        </div>
    )
}