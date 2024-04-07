import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function BTCGraph() {
  const [fetchingData, setFetchingData] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = () => {
      const url = "https://api.coindesk.com/v1/bpi/historical/close.json";

      fetch(url)
        .then((response) => response.json())
        .then((bitcoinData) => {
          const sortedData = [];
          let count = 0;
          for (let date in bitcoinData.bpi) {
            sortedData.push({
              d: moment(date).format('MMM DD'),
              p: bitcoinData.bpi[date].toLocaleString("us-EN", {
                style: "currency",
                currency: "USD",
              }),
              x: count, //previous days
              y: bitcoinData.bpi[date], // numerical price
            });
            count++;
          }
          setData(sortedData);
          console.log("Data: ", sortedData);
          setFetchingData(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };

    getData();
  }, []);

  const chartData = {
    labels: data ? data.map(item => new Date(item.d)) : [], // Convert date strings to Date objects
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: data ? data.map(item => item.y) : [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM DD'
          }
        }
      }],
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return '$' + value.toLocaleString(); // Format y-axis labels as currency
          }
        }
      }]
    }
  };
  

  return (
    <div className="chart-container">
      <h2>Bitcoin Price Chart</h2>
    </div>
  );
  
}