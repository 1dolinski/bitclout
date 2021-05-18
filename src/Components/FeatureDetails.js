import { Fragment, useState, useEffect } from 'react'
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/outline'

function truncateString(str, num) {
    // If the length of str is less than or equal to num
// just return str--don't truncate it.

if (str === undefined) { return ""; }

if (str.length <= num) {
  return str
}
// Return str truncated with '...' concatenated to the end of str.
return str.slice(0, num) + '...'
}

const truncatAt = (isTruncated) => isTruncated ? 80 : 500;

export default function FeatureDetails(props) {

    const [show, setShow] = useState(true);

    return (<Fragment>
        
        <div onClick={() => setShow(!show)}> 
        <p>{truncateString(props.record.get('Details'), truncatAt(show))}</p>
        { !show && <p><a className="font-semibold mt-8" href={`https://www.bitclout.com/u/${props.record.get('Username')}`}>Submitted by {props.record.get('Username')}</a></p> }
        </div>
        
    </Fragment>
)}