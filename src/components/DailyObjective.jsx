import { observer } from "mobx-react-lite";
import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { translate } from "../translations/translate";
import { isToday } from "date-fns";
import { useEffect, useState } from "react";
import { stores } from "../stores";
import PropTypes from 'prop-types';

const DailyObjective = observer(() => {
    const [todayTransactions, setTodayTransactions] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        let tr = stores.transactionStore.transactions.filter(t => isToday(t.datetime));
        setTodayTransactions(tr)

        setCurrent(tr.map(t => t.amount).reduce((a, b) => a + b, 0))
    }, []);

    return (
        <div
            style={{
                backgroundColor: 'white',
                padding: '10px 0px',
                boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.1)',
                display: 'inline-block',
                textAlign: 'center',
                padding: '10px 20px',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}
        >
            <CircularWithValueLabel />
            <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                {translate("objective_today")}: {stores.userStore.dailyObjective}$
            </Typography>
        </div>
    )
})

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};

const CircularWithValueLabel = observer(() => {
    const [progress, setProgress] = React.useState(null);

    useEffect(() => {
        const obj = stores.userStore.dailyObjective;
        const current = stores.transactionStore.transactions.filter(t => isToday(t.datetime)).map(t => t.amount).reduce((a, b) => a + b, 0)
        setProgress(current / obj * 100 > 0 ? current / obj * 100 : 0)
    }, [stores.userStore.dailyObjective])

    return <CircularProgressWithLabel value={progress} />;
});

export default DailyObjective;