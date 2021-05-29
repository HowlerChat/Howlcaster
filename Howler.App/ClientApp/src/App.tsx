import React from 'react';
import { Route } from 'react-router';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Layout from './components/Layout';
import Space from './components/Space';

import './sass/custom.scss';

const App = () => {
    const [authState, setAuthState] = React.useState<AuthState>();
    const [user, setUser] = React.useState<any>();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            console.log(nextAuthState);
            setAuthState(nextAuthState);
            setUser(authData);
        });
    }, []);

    return authState === AuthState.SignedIn && user ? (<>
        <Layout>
            <Route exact path='/' component={() => <Space user={user} />} />
        </Layout>
    </>) : <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            formFields={[
            {
                type: "email",
                label: "Custom Email Label",
                placeholder: "Custom email placeholder",
                inputProps: { required: true, autocomplete: "username" },
            },
            {
                type: "password",
                label: "Custom Password Label",
                placeholder: "Custom password placeholder",
                inputProps: { required: true, autocomplete: "new-password" },
            },
            {
                type: "phone_number",
                label: "Custom Phone Label",
                placeholder: "Custom phone placeholder",
            },
            ]} 
        />
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>;
};

export default App;
