import { React, Fragment, useState, useEffect, useCallback } from "react";
import { DateTime } from "luxon";
import Constants from "./Constants";
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

import Header from "./Header.js";

import { Line } from 'react-chartjs-2';


if (!firebase.apps.length) {
    const firebaseApp = firebase.initializeApp(Constants.firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  
  const db = firebase.firestore();

export default function Prices() {
  const [nanosSold, setNanosSold] = useState([]);
  const [satoshisPerBitCloutExchangeRate, setSatoshisPerBitCloutExchangeRate] = useState([]);
  const [usdCentsPerBitcoinExchangeRate, setusdCentsPerBitcoinExchangeRate] = useState([]);

  const fetchPrices = async (username) => {
    let response = db
      .collection("exchange_rate")
      .orderBy("createdAt")

    const data = await response.get();
    const results = data.docs.map((item) => item.data());
    
    const nanosSoldObj = {
      labels: results.map(obj => DateTime.fromJSDate(obj.createdAt.toDate()).toLocaleString(DateTime.DATETIME_FULL)),
      datasets: [
        {
          label: "Nanos Sold",
          data: results.map(obj => obj.NanosSold),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };

    const satoshisPerBitCloutExchangeRateObj = {
      labels: results.map(obj => DateTime.fromJSDate(obj.createdAt.toDate()).toLocaleString(DateTime.DATETIME_FULL)),
      datasets: [
        {
          label: "Satoshis Per BitClout Exchange Rate",
          data: results.map(obj => obj.SatoshisPerBitCloutExchangeRate),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };

    const usdCentsPerBitcoinExchangeRateObj = {
      labels: results.map(obj => DateTime.fromJSDate(obj.createdAt.toDate()).toLocaleString(DateTime.DATETIME_FULL)),
      datasets: [
        {
          label: "USD Cents Per Bitcoin Exchange Rate",
          data: results.map(obj => obj.USDCentsPerBitcoinExchangeRate),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
    

    setNanosSold(nanosSoldObj);
    setSatoshisPerBitCloutExchangeRate(satoshisPerBitCloutExchangeRateObj);
    setusdCentsPerBitcoinExchangeRate(usdCentsPerBitcoinExchangeRateObj);
  };

  useEffect(() => {
    fetchPrices();
  }, []);



  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Fragment>
      <Header
        title="BitClout Historical"
        subtitle="Exchange Rates"
        description="Graphing the BitClout Api's Exchange Rate"
        unsplashId="photo-1560350824-8828864cdef1"
      />

      <div className="flex flex-col content-between space-y-12 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between">
        { nanosSold && <Line data={nanosSold} options={options} /> }
        { satoshisPerBitCloutExchangeRate && <Line data={satoshisPerBitCloutExchangeRate} options={options} /> }
        { usdCentsPerBitcoinExchangeRate && <Line data={usdCentsPerBitcoinExchangeRate} options={options} /> }
      </div>
    </Fragment>
  );
}
{}