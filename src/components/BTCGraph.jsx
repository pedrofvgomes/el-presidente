import React, { useState, useEffect } from "react";
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function BTCGraph() {
    const [fetchingData, setFetchingData] = useState(true);
    const [data, setData] = useState(null);
    const [selectedInterval, setSelectedInterval] = useState("1d");

    let options = {
        theme: "dark1", // "light1", "light2", "dark1", "dark2"
        animationEnabled: true,
        title: {
            text: "BTCUSD"
        },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            prefix: "$",
            title: "Price (in USD)"
        },
        data: [{
            type: "candlestick",
            showInLegend: true,
            name: "BTCUSD",
            yValueFormatString: "$###0.00",
            xValueFormatString: "MMMM YY",
            dataPoints: []
        }
        ]
    }

    useEffect(() => {
        const getData = () => {
            const url = `https://api.pro.coinbase.com/products/BTC-USD/candles/${selectedInterval}`;

            fetch(url)
                .then((response) => response.json())
                .then((bitcoinData) => {
                    // format the series for candles
                    const formattedData = bitcoinData.map((candle) => {
                        return {
                            x: new Date(candle[0]),
                            y: [candle[1], candle[2], candle[3], candle[4]]
                        }
                    });

                    setData(formattedData);

                    options.data[0].dataPoints = formattedData;

                    setFetchingData(false);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        };

        getData();
    }, [selectedInterval]);

    return (
        <div style={{
            width: '100%',
            height: '100px',
            backgroundColor: 'white',
            boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.1)',
        }}>
        </div>
    );
}
