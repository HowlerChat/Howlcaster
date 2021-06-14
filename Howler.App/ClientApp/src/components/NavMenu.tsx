import { AmplifySignOut } from '@aws-amplify/ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';
import * as React from 'react';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './NavMenu.scss';

export default class NavMenu extends React.PureComponent<{ setAuthState: React.Dispatch<React.SetStateAction<AuthState | undefined>> }, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <img src="/howler.png" className="logo"/>
                <div className="space-icon" style={{ backgroundImage: `url('/shipyard.png')` }}></div>
                <div className="sign-out" onClick={async () => await this.signOut()}><FontAwesomeIcon icon={faSignOutAlt}/></div>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    private async signOut() {
        try {
            await Auth.signOut().then(() => {
                // Welcome to an incredibly stupid hack, courtesy of this genius decision:
                // https://github.com/aws-amplify/amplify-js/issues/1269#issuecomment-479963543
                this.props.setAuthState(AuthState.SignedOut);
            });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}
