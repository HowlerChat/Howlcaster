import * as React from 'react';
import * as moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import { Cast } from '../api/farcaster-js';

import './Message.scss';

type MessageProps = { cast: Cast, setInReply: React.Dispatch<React.SetStateAction<Cast | undefined>> };

const Message: React.FunctionComponent<MessageProps> = (props) => {
    let time = moment.tz(props.cast.timestamp, "America/Chicago");

    return (<>
        <div className="message-row">    
            <div className="message-sender-icon" style={{ backgroundImage: `url(${(props.cast.author.pfp || {url: ""}).url})` }}/>
            <div className="message-content">
                <span className="message-sender-name">{props.cast.author.displayName}</span><span className="message-timestamp">{time.format('h:mma')}</span>
                <div className="message-post-content">{props.cast.text}</div>
            </div>
            <div className="message-menu" onClick={() => props.setInReply(props.cast)}>
                <FontAwesomeIcon icon={faReply}/>
            </div>
        </div>
    </>);
}

export default Message;
