import { React, Fragment, useState, useEffect } from "react";
import api from "../api.js";

export default function Sponsors() {
  const [hodlrs, setHodlrs] = useState([]);

  const getHodlers = async () => {
    const response = await api.getHodlersForPublicKey("BitCloutOffers");
    setHodlrs(response);
  };

  useEffect(() => {
    getHodlers();
  }, []);

  return (
    <Fragment>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Live @BitCloutOffers Investors 💜
        </h2>
        <div class="grid grid-cols-3 gap-4 mt-8">
        {hodlrs.Hodlers &&
          hodlrs.Hodlers.slice(1, 10).map((hodlr) => <div>
            <div className="font-semibold inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 w-full">
              <a
                href={`https://www.bitclout.com/u/${hodlr.ProfileEntryResponse.Username}`}
                target="_blank"
                className=""
              >
                     <div
                        class="w-24 h-24 max-w-xs rounded mr-2"
                        style={{
                          "background-image": `url("${hodlr.ProfileEntryResponse.ProfilePic}")`,
                          backgroundSize: "cover",
                        }}
                      ></div>
                {hodlr.ProfileEntryResponse.Username}
              </a>
            </div>
          </div>)}
          </div>
      </div>
    </Fragment>
  );
}
