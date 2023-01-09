import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { AuthState } from '@aws-amplify/ui-components';
import { ApplicationState } from '../store';
import * as Farcaster from '../store/Farcaster';
import ChannelList from './ChannelList';
import Channel from './Channel';
import UserStatus from './UserStatus';

import './Space.scss';
import { Cast, MerkleAPIClient } from '@standard-crypto/farcaster-js';

type SpaceProps = {
  user: any,
} & typeof Farcaster.actionCreators & Farcaster.FarcasterState;

const Space : React.FunctionComponent<SpaceProps> = props => {
  let keys = [];
  for (let key of props.taggedCasts.keys()) {
    keys.push(key);
  }

  /** This should be routes */
  let [channelId, setChannelId] = React.useState<string>("3ec22786-bc0d-4adf-b1f7-69c65c00f162");
  let [channelName, setChannelName] = React.useState<string>("#untagged");

  return <div className="space-container">
    <div className="space-container-channels">
      <ChannelList channelId={channelId} setChannelId={setChannelId} setChannelName={setChannelName} tags={keys} />
      <UserStatus user={props.user}/>
    </div>
    <Channel casts={channelId === "3ec22786-bc0d-4adf-b1f7-69c65c00f162" ? props.casts : props.taggedCasts.get(channelId)!} channelName={channelName} channelId={channelId} />
  </div>;
};

export default connect(
  (state: ApplicationState) => state.farcaster,
  Farcaster.actionCreators
)(Space);
