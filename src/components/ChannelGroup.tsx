import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import './ChannelGroup.scss';
import { Link, useParams } from 'react-router-dom';

const ChannelGroup : React.FunctionComponent<{ group: { groupName: string, channels: { channelId: string, channelName: string, mentionCount?: number, mentions?: string }[] }, channelId: string, setChannelId: React.Dispatch<React.SetStateAction<string>>, setChannelName: React.Dispatch<React.SetStateAction<string>> }> = props => {
    // let { channelId } = useParams<{channelId: string}>();
    return <div className="channel-group">
        <div className="channel-group-name">{props.group.groupName}</div>
        {props.group.channels.map(channel => //<Link key={channel.channelName} to={`/casts/tags/${channel.channelId}`}>
            <div className="channel-group-channel" onClick={() => { props.setChannelId(channel.channelId); props.setChannelName(channel.channelName); }}>
                <div className={"channel-group-channel-name" + (props.channelId === channel.channelId || (!props.channelId && channel.channelId === "3ec22786-bc0d-4adf-b1f7-69c65c00f162") ? "-focused": "")}>{channel.channelName}
                    {(!!channel.mentionCount ?
                        <span className={"channel-group-channel-name-mentions-" + channel.mentions}>{channel.mentionCount}</span> :
                        <></>)}
                </div>
            </div>
        //</Link>
        )}
    </div>;
}

export default ChannelGroup;
