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

        setCurrent(tr.map(t => t.profit_loss).reduce((a, b) => a + b, 0))
    }, []);

    return (
        <div
            style={{
                backgroundColor: 'white',
                boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.1)',
                textAlign: 'center',
                width: 'max-content',
                padding: '10px 20px',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transform: 'scale(1.0)',
                transition: 'transform 0.1s ease-in-out',
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)' }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1.0)' }}
        >

            <Typography sx={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
                {new Date().toLocaleDateString()}
            </Typography>
            <CircularWithValueLabel
                value={
                    current / stores.userStore.dailyObjective * 100 > 0
                        && current / stores.userStore.dailyObjective * 100 < 100 ?
                        current / stores.userStore.dailyObjective * 100 : 0
                }
            />
            <Typography sx={{ fontSize: '15px', fontWeight: 'bold', marginTop: '10px', color: current >= 0 ? 'green' : 'red' }}>
                {`${current > 0 && '+' || ''}${current?.toFixed(2)}$`}
            </Typography>
            <Typography sx={{ fontSize: '15px', fontWeight: 'bold', marginTop: '10px' }}>
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
                    {`${props.value?.toFixed(1)}%`}
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

const CircularWithValueLabel = observer((props) => {
    return <CircularProgressWithLabel value={props.value} />;
});
export default DailyObjective;