import React from "react";
import { translate } from "../translations/translate";
import { observer } from "mobx-react-lite";

const UserGraph = observer(()=> {
    return (
        <div
            style={{
                width: '100%',
                height: '40%',
                backgroundColor: 'white',
                boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.1)',
            }}
        >
            Graph
        </div>
    )
});

export default UserGraph;