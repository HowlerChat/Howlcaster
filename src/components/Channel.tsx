import * as React from 'react';
import * as moment from 'moment-timezone';
import { connect } from 'react-redux';
import * as Farcaster from '../store/Farcaster';
import './Channel.scss';
import { Cast } from '@standard-crypto/farcaster-js';
import { ApplicationState } from '../store';
import Message from './Message';

type ChannelProps = { casts: Cast[], channelId: string } & Farcaster.FarcasterState & typeof Farcaster.actionCreators;

const Channel: React.FunctionComponent<ChannelProps> = (props) => {
    let [pendingMessage, setPendingMessage] = React.useState<string>();
    let [inReply, setInReply] = React.useState<Cast | undefined>();
    let ref = React.createRef<HTMLDivElement>();

    const submitMessage = () => {
        props.submitCast(pendingMessage!, inReply);
        // this.setState(prevState => { return {...prevState, messages: prevState.messages.concat([{
        //     // "timestamp": "1622272285000",
        //     "messageId": Math.random().toString(16).substring(2, 8), // just need a random value for now
        //     "content": {
        //         "type": "post",
        //         "senderId": "@<00000000-0000-0000-0000-000000000000>",
        //         "text": prevState.pendingMessage
        //     }
        // }]), pendingMessage: ""} });
    };

    const scrollToBottom = () => {
        ref.current!.scrollIntoView({ behavior: "auto" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [props.casts]);

    return (<div className="channel">
        <div className="channel-name">#untagged</div>
        <div className="message-list">
            {props.casts.map(cast => {
                let message = cast;
                let recast = message.text.startsWith("recast:farcaster://casts/") ? props.casts.find(c => c.hash === message.text.substring("recast:farcaster://casts/".length)) : undefined;
                let recasting: Cast | undefined = undefined;
                if (recast) {
                    recasting = message;
                    message = recast;
                }
                
                // todo: message glomming
                return <div key={message.hash} id={message.hash} className="message">
                    {(() => {
                        let reply = !message.parentHash ? undefined : props.casts.find(c => c.hash === message.parentHash);
                        if (reply) {
                            return <div className="message-reply-heading" onClick={() => document.getElementById(message.parentHash!)!.scrollIntoView({ behavior: "smooth" })}>
                                <div className="message-reply-curve"/>
                                <div className="message-reply-sender-icon" style={{ backgroundImage: `url(${(reply.author.pfp || {url:""}).url})`}}/>
                                <div className="message-reply-sender-name">
                                    {reply.author.displayName}
                                </div>
                                <div className="message-reply-text">
                                    {reply.text}
                                </div>
                            </div>;
                        } else {
                            return <></>;
                        }
                    })()}
                    {(() => {
                        if (recasting) {
                            return <div className="message-reply-heading" onClick={() => document.getElementById(message.parentHash!)!.scrollIntoView({ behavior: "smooth" })}>
                                <div className="message-reply-curve"/>
                                <div className="message-reply-sender-icon" style={{ backgroundImage: `url(${(recasting.author.pfp || {url:""}).url})`}}/>
                                <div className="message-reply-sender-name">
                                    {recasting.author.displayName} recasted
                                </div>
                                <div className="message-reply-text">
                                </div>
                            </div>;
                        } else {
                            return <></>;
                        }
                    })()}
                    <Message cast={message} setInReply={setInReply}/>
                </div>
            })}
            <div className="scroll-target" ref={ref}></div>
        </div>
        {(() => {
            if (inReply) {
                return <div className="message-in-reply">Replying to {inReply.author.displayName} <span className="message-in-reply-dismiss" onClick={() => setInReply(undefined)}>×</span></div>;
            } else {
                return <></>;
            }
        })()}
        <textarea
            className={"message-editor" + (inReply ? " message-editor-with-reply" : "")}
            placeholder={"Send a message to #untagged"}
            rows={1}
            value={pendingMessage}
            onChange={(e) => setPendingMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    submitMessage();
                    e.preventDefault();
                }
            }}/>
    </div>);
}

export default connect(
    (state: ApplicationState) => { return {...state}; },
    {...Farcaster.actionCreators }
)(Channel);

  