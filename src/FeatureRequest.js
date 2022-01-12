import { Fragment, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, ArrowRightIcon } from "@heroicons/react/outline";

import FeatureRequestRow from "./Components/FeatureRequestRow.js";

import { FirebaseDatabaseProvider } from "@react-firebase/database";

import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import "firebase/compat/firestore";

import Constants from "./Constants";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyURduiO0k0SRGGY" }).base(
  "appX3lOvCGm05jXmy"
);

export default function FeatureRequest() {
  const [page, setPage] = useState(1);
  const [featureRequests, setFeatureRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    base("FeatureRequests")
      .select({
        // Selecting the first 3 records in @BitCloutOffers List:
        maxRecords: 100,
        sort: [{ field: "Created", direction: "desc" }],
        filterByFormula: "({Verified})",
        view: "FeatureRequests",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          setFeatureRequests(records);
          setIsLoading(false);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }, [page]);

  return (
    <Fragment>
      <Popover className="relative bg-white overflow-hidden">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto">
              <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <svg
                  className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                  fill="currentColor"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <polygon points="50,0 100,0 50,100 0,100" />
                </svg>

                <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                  <nav
                    className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                    aria-label="Global"
                  >
                    <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                      <div className="flex items-center justify-between w-full md:w-auto">
                        <a href="#">
                          <span className="sr-only">Workflow</span>
                          <img
                            className="h-8 w-auto sm:h-10"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                          />
                        </a>
                        <div className="-mr-2 flex items-center md:hidden">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                      {Constants.navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="font-medium text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    static
                    className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                  >
                    <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="px-5 pt-4 flex items-center justify-between">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt=""
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close main menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-3 space-y-1">
                        {Constants.navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>

                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block xl:inline">
                        The Most Requested
                      </span>{" "}
                      <span className="block text-indigo-600 xl:inline">
                        BitClout Features
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      See what the brilliant minds of @bitclout want next
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <a
                          href="https://airtable.com/shrQQ2sWzttvcwEQ6"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          Post A Feature Request <span className="line-through mr-2 ml-2">Invest $500</span> Free Today
                        </a>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                src="https://images.unsplash.com/photo-1518725665353-881de995cacb?ixlib=rb-1.2.1&ixid=1zO4O3Z0UJA&auto=format&fit=crop&w=2850&q=80"
                alt=""
              />
            </div>
          </>
        )}
      </Popover>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          👯‍♀️ Requested Features
        </h2>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 mb-2">
          A list of ways to make @BitClout better. Posts will be verified before showing up.
        </p>

        {isLoading && <p>Wait I'm loading offers for you</p>}

        <FirebaseAuthProvider {...Constants.firebaseConfig} firebase={firebase}>

          <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
                <pre className="text-right">

        { !isSignedIn && <button className="text-green-500 font-bold"
          data-testid="signin-anon"
          onClick={() => {
            firebase.auth().signInAnonymously();
          }}
        >
          Sign In Here To Vote
        </button> }

        { isSignedIn && <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
          }
              </pre>
            );
          }}
        </FirebaseAuthConsumer>

          <FirebaseDatabaseProvider
            firebase={firebase}
            {...Constants.firebaseConfig}
          >
            {featureRequests.map((c, index) => (
              <div key={index}>
                {
                  <>
                    <FeatureRequestRow record={c} />
                  </>
                }
              </div>
            ))}
          </FirebaseDatabaseProvider>
        </FirebaseAuthProvider>

        <div className="mt-8">
          <a
            className="text-xl flex"
            target="_blank"
            href="https://airtable.com/shrjIAufWDF180peN"
          >
            <p>See all feature requests</p>
            <ArrowRightIcon className="h-6 w-6 mt-1" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Do You Have an Offer or Event?</span>
            <span className="block text-indigo-600">Add it to the List</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="https://airtable.com/shrCuDoIrnE4wNPyf"
                target="_blank"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Offer or Event
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
