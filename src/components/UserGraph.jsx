import React from "react";
import { translate } from "../translations/translate";
import { observer } from "mobx-react-lite";

const UserGraph = observer(()=> {
    return (
        <div>
            <p>{translate('hello')}</p>
        </div>
    )
});

export default UserGraph;