import { DateTime } from 'luxon';
import Tag from './Tag.js'
import { Fragment } from "react"

const monthDay = (isoDate) => DateTime.fromISO(isoDate).toFormat('MMM dd')
const dateLabel = (record) => {

    if (record.get('Date')) {
        return DateTime.fromISO(record.get('Date')).toFormat('MMM dd')
    }

    if (record.get('DateTime')) {
        return DateTime.fromISO(record.get('DateTime')).setZone(record.get('Timezone'), { keepLocalTime: true }).toFormat('MMM dd H:mm')
    }
}

const localDateTime = (record) => {
    if (record.get('Date')) {
        return DateTime.fromISO(record.get('Date'));
    }

    if (record.get('DateTime')) {
        return DateTime.fromISO(record.get('DateTime')).setZone(record.get('Timezone'), { keepLocalTime: true });
    }
}

const typeColors =(type) => {
    const types = {
        Newsletter: 'gray',
        Meetup: 'red',
        Announcement: 'gray',
        Giveaway: 'green',
        Merch: 'green',
        NFT: 'green',
        Discord: 'gray',
        Event: 'red',
        Contest: 'green',
        Interview: 'gray'
    };

    return types[type] || 'green';
};

export default function Row(props) {
    return  <Fragment><div className={`p-8 mt-4 ${props.record.get('Highlight?') ? 'bg-yellow-100' : 'border'}`}>
    
    <div className="flex">
        <div className="flex-1">
            {props.record.get('Calendar') && 
                <span className="bg-red-100 text-red-500 rounded font-bold p-1">{dateLabel(props.record)} {props.record.get('DateTime') ? props.record.get('Timezone') : ''}</span>
            }

            {props.record.get('Calendar') && 
                <span className="ml-2 text-gray-400">{localDateTime(props.record).toRelative()}</span>
            }
            
            <div className="flex">
                <a className="md:text-2xl font-semibold" href={props.record.get('URL')} target="_blank">{props.record.get('Title')} </a>
            </div>
            {props.record.get('Username (from Users)').map((username) => (
                <span className="pr-2"><Tag name={username} tagColor="blue" isAt/></span>
            ))}

            {props.record.get('Type').map((type) => (
                <span className="pr-2"><Tag name={type} tagColor={typeColors(type)}/></span>
            ))}
        </div>

        <div className="py-4 pl-8 md:pr-16 md:text-lg font-semibold">
            {props.record.get('Highlight?') ? 'Featured' : monthDay(props.record.get('Created At'))}
        </div>

        <div className="py-4 pl-8 md:pr-8 w-24 md:text-lg"> 
            { Date.parse(props.record.get('Created At')) > Date.now() - 1000 * 60 * 60 * 24 * 2 * 2 &&
            <span className="p-2 font-semibold bg-yellow-200 rounded">
                NEW
            </span>
            }
        </div>
    </div>
  </div>
  </Fragment>
  }
