import { DateTime } from 'luxon';
import Tag from './Tag.js'
import { Fragment } from "react"
import { ChatAltIcon } from '@heroicons/react/outline'
import FeatureDetails from './FeatureDetails.js';
import UpVote from './UpVote.js';

const monthDay = (isoDate) => DateTime.fromISO(isoDate).toFormat('MMM dd')

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

export default function FeatureRequestRow(props) {
    return  <Fragment><div className={`p-8 mt-4 ${props.record.get('Highlight?') ? 'bg-yellow-100' : 'border'}`}>
    
    <div className="flex">
        <div className="flex-1">
            <div className="flex">
                { Date.parse(props.record.get('Created')) > Date.now() - 1000 * 60 * 60 * 24 * 2 * 1 &&
                <span className="p-2 mr-2 font-semibold bg-yellow-200 rounded">
                    NEW
                </span>
                }

                {
                    props.record.get('Status') === "Done" && <span className="p-2 mr-2 font-semibold bg-green-200 rounded">Done 🙌</span>
                }
                <div><span className="md:text-2xl font-semibold">{props.record.get('Title')}</span>
                </div>
            </div>

            {props.record.get('Tags') && props.record.get('Tags').map((type) => (
                <span className="pr-2"><Tag name={type} tagColor={typeColors(type)}/></span>
            ))}

            <div className="mt-4">
                <FeatureDetails {...props} />
            </div>
        </div>

        <div className="py-4 pl-8 md:pr-16 md:text-lg font-semibold">
            {props.record.get('Highlight?') ? 'Featured' : monthDay(props.record.get('Created'))}
        </div>

        { props.record.get('CommentUrl') && 
        <a href={props.record.get('CommentUrl')} className="py-4 pl-8 md:pr-16 md:text-lg font-semibold">
            <ChatAltIcon className="h-6 w-6"/> 
        </a>
        }

        <div className="py-4 pl-8 md:pr-8 w-24 md:text-lg" alt="Coming soon">
            <UpVote {...props} />
        </div>
    </div>
  </div>
  </Fragment>
  }
