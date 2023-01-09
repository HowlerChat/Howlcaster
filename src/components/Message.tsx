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

    let videos = props.cast.text.match(/https?:\/\/w?w?w?.?youtu.?be.?c?o?m?\/[a-z\-_0-9/.?=]*/i);

    if (videos) for (const video of videos) {
        props.cast.text = props.cast.text.replace(video, "");
    }

    let links = props.cast.text.match(/https?:\/\/[a-z\-_0-9/.?]*/i);
    let messageParts: JSX.Element[] = [];
    let start = 0;

    if (links) for (const link of links) {
        messageParts.push(<React.Fragment key={props.cast.hash + "link" + start}>{props.cast.text.substring(start, props.cast.text.indexOf(link))}</React.Fragment>);
        messageParts.push(<a key={props.cast.hash + "link" + (start + 1)} className="message-a" target="_blank" href={link}>{link}</a>);
        start += props.cast.text.indexOf(link) + link.length;
    }

    messageParts.push(<React.Fragment key={props.cast.hash + "link" + start}>{props.cast.text.substring(start)}</React.Fragment>);

    return (<React.Fragment key={props.cast.hash + "ct"}>
        <div className="message-row">    
            <div className="message-sender-icon" style={{ backgroundImage: `url(${(props.cast.author.pfp || {url: ""}).url})` }}/>
            <div className="message-content">
                <span className="message-sender-name">{props.cast.author.displayName}</span><span className="message-timestamp">{time.format('h:mma')}</span>
                <div className="message-post-content">
                    {messageParts}
                    <div>
                    {(() => {
                        if (images) for (const image of images) {
                            return <img key={props.cast.hash + "img"} height="200" src={image}/>;
                        } else {
                            return <></>;
                        }
                    })()}
                    {(() => {
                        if (videos) for (const video of videos) {
                            return <iframe key={props.cast.hash + "vid"} width="560" height="315" src={video.replace("youtu.be", "youtube.com").replace("youtube.com/","youtube.com/embed/").replace("watch?v=", "")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>;
                        }
                    })()}
                    </div>
                </div>
            </div>
            <div className="message-menu" onClick={() => props.setInReply(props.cast)}>
                <FontAwesomeIcon icon={faReply}/>
            </div>
        </div>
    </React.Fragment>);
}

export default Message;
