import React from "react";
import { Typography } from "@mui/material";

export default function Bot() {
    return (
        <div
            style={{
                marginLeft: 'auto',
                marginRight: 0,
                width: width,
                height: '100%',
                transition: 'width 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
            }}
        >
            <Typography style={{ color: 'rgba(50, 76, 100, 1)', position: 'absolute', top: '15px', fontSize: '25px', fontWeight: 'bold' }}>Dashboard</Typography>
        </div>
    )
}
