
import ReactJson from 'react-json-view'

import { Fragment, useState } from 'react'

export default function EventDetails(props) {

    const [show, setShow] = useState(true);

    return (<Fragment>
        
        <div onClick={() => setShow(!show)}> 
        <p>Show details?</p>
        { !show && <ReactJson src={props} /> }
        </div>
        
    </Fragment>
)}