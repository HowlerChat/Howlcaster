import * as React from 'react';
import * as moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import { Cast } from '../api/farcaster-js';

import './Message.scss';

type MessageProps = { cast: Cast, setInReply: React.Dispatch<React.SetStateAction<Cast | undefined>> };

const Message: React.FunctionComponent<MessageProps> = (props) => {
    let time = moment.tz(props.cast.timestamp, "America/Chicago");
    let images = props.cast.text.match(/https?:\/\/[a-z\-_0-9/.]*\.[jpg][pni][egf]g?/i);

    if (images) for (const image of images) {
        props.cast.text = props.cast.text.replace(image, "");
    }

    let links = props.cast.text.match(/https?:\/\/[a-z\-_0-9/.]*/i);
    let messageParts: JSX.Element[] = [];
    let start = 0;

    if (links) for (const link of links) {
        messageParts.push(<>{props.cast.text.substring(start, props.cast.text.indexOf(link))}</>);
        messageParts.push(<a className="message-a" target="_blank" href={link}>{link}</a>);
        start += props.cast.text.indexOf(link) + link.length;
    }

    messageParts.push(<>{props.cast.text.substring(start)}</>);

    return (<>
        <div className="message-row">    
            <div className="message-sender-icon" style={{ backgroundImage: `url(${(props.cast.author.pfp || {url: ""}).url})` }}/>
            <div className="message-content">
                <span className="message-sender-name">{props.cast.author.displayName}</span><span className="message-timestamp">{time.format('h:mma')}</span>
                <div className="message-post-content">
                    {messageParts}
                    <div>
                    {(() => {
                        if (images) for (const image of images) {
                            return <img height="200" src={image}/>;
                        } else {
                            return <></>;
                        }
                    })()}
                    </div>
                </div>
            </div>
            <div className="message-menu" onClick={() => props.setInReply(props.cast)}>
                <FontAwesomeIcon icon={faReply}/>
            </div>
        </div>
    </>);
}

export default Message;
