import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, ArrowRightIcon} from '@heroicons/react/outline'
import Constants from './Constants'
import Row from './Components/Row.js'

import Header from "./Header.js";



var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyURduiO0k0SRGGY'}).base('appX3lOvCGm05jXmy');

export default function Home() {

    const [page, setPage] = useState(1);
    const [offers, setOffers] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const script = document.createElement('script');
      script.setAttribute('embedclout', 'bitcloutoffers')
      script.setAttribute('template', 'light')
      script.setAttribute('position', 'default')
      script.setAttribute('size', 'detailed')
      script.src = 'https://www.embedclout.com/badge/badge.js'
    
      document.querySelector('#embed').appendChild(script);
    }, [])


    useEffect(() => {
        base('List').select({
            // Selecting the first 3 records in @BitCloutOffers List:
            maxRecords: 12,
            sort: [
                {field: 'Highlight?', direction: 'desc'},
                {field: 'Created At', direction: 'desc'}
            ],
            filterByFormula: "NOT({Calendar})",
            view: "@BitCloutOffers List"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            console.log(records);
            setOffers(records);
            setIsLoading(false)
            // records.forEach(function(record) {
            //     console.log('Retrieved', record);
            // });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
      }, [page]);

      useEffect(() => {
        base('List').select({
            // Selecting the first 3 records in @BitCloutOffers List:
            maxRecords: 12,
            sort: [
                {field: 'Highlight?', direction: 'desc'},
                {field: 'Calendar', direction: 'asc'}
            ],
            filterByFormula: "{Calendar} > DATEADD(Today(),-1,'days')",
            view: "@BitCloutOffers List"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            console.log(records);
            setEvents(records);
            setIsLoading(false)
            // records.forEach(function(record) {
            //     console.log('Retrieved', record);
            // });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
      }, [page]);

  return (
      <Fragment>

<Header
        title="The Biggest BitClout"
        subtitle="Events and Offers"
        description="Find what clouters are doing and what they're offering. Our algorithm searches high and low for valuable coins"
        unsplashId="photo-1616635460792-0c6ff749d56a"
      />

    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">🎟 Upcoming BitClout Events</h2>
    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 mb-2">
        The Biggest Upcoming Events on BitClout
    </p>

    {isLoading && <p>Wait I'm loading events for you</p>}

    {events.map((c, index) => (
        <div key={index}>
          { (
            <>
              <Row record={c} />
            </>
          )}
        </div>
      ))}

    <div className="mt-8">
        <a className="text-xl flex" href="/calendar">
            <p>See full calendar</p>
            <ArrowRightIcon className="h-6 w-6 mt-1" aria-hidden="true"/></a>
    </div>
    </div>

    {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">🐋 Creator Offers</h2>
    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 mb-2">
        The Most Promoted Offers on BitClout
    </p>

    {isLoading && <p>Wait I'm loading offers for you</p>}

    {offers.map((c, index) => (
        <div key={index}>
          { (
            <>
                <Row record={c} />
            </>
          )}
        </div>
      ))}

    <div className="mt-8">
        <a className="text-xl flex" href="/list">
            <p>See all offers</p>
            <ArrowRightIcon className="h-6 w-6 mt-1" aria-hidden="true"/></a>
    </div>
    </div> */}




    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Do You Have an Offer or Event?</span>
          <span className="block text-indigo-600">Add it to the List</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="https://airtable.com/shrCuDoIrnE4wNPyf" target="_blank"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add Offer or Event 
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-left">
      <div id="embed"></div>
    </div>

    </Fragment>
  )
}