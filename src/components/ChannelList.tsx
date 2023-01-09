import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import ChannelGroup from './ChannelGroup';
import './ChannelList.scss';
import { isFunction } from 'util';

type ChannelListProps = { channelId: string, tags: string[], setChannelId: React.Dispatch<React.SetStateAction<string>>, setChannelName: React.Dispatch<React.SetStateAction<string>> };

export default class ChannelList extends React.PureComponent<ChannelListProps, { groups: { groupName: string, channels: { channelId: string, channelName: string, mentionCount?: number, mentions?: string }[] }[] }> {
    constructor(props: ChannelListProps) {
        super(props);

        this.state = {
            groups: [
                {
                    groupName: "General",
                    channels: [
                        {
                            channelId: "3ec22786-bc0d-4adf-b1f7-69c65c00f162",
                            channelName: "#untagged"
                        },
                    ]
                },
                {
                    groupName: "Tagged",
                    channels: props.tags.map(tag => { return { channelId: tag, channelName: tag }; }),
                },
            ]
        };
        
    }
    public render() {
        return <div className="channels-list">
            <div className="space-header">
                <span className="space-header-name">Howlcaster</span>
                {/* <span className="space-context-menu-toggle-button"><FontAwesomeIcon icon={faChevronDown}/></span> */}
            </div>
            {this.state.groups.map(group => <ChannelGroup key={group.groupName} group={group} channelId={this.props.channelId} setChannelId={this.props.setChannelId} setChannelName={this.props.setChannelName}/>)}
        </div>;
    }
}
