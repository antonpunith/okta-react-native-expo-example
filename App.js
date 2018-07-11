import React from 'react';
import { Button, Text, View } from 'react-native';
import TokenClient from '@okta/okta-react-native';

const tokenClient = new TokenClient({
  issuer: 'https://dev-635406.oktapreview.com/oauth2/default',
  client_id: '0oafpooaszOm1rHy20h7',
  scope: 'openid profile',
  redirect_uri: __DEV__ ?
    'exp://localhost:19000/+expo-auth-session' :
    'com.oktapreview.dev-635406:/+expo-auth-session'
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { authenticated: false };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    await this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await tokenClient.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async login() {
    await tokenClient.signInWithRedirect();
    this.checkAuthentication();
  }

  async logout() {
    await tokenClient.signOut();
    this.checkAuthentication();
  }

  render() {
    return (
      <View style={{ paddingTop: 100 }}>
        <Text>Okta + React Native</Text>
        {this.state.authenticated ?
          <Button
            onPress={async () => { this.logout(); }}
            title="Logout"
          /> :
          <Button
            onPress={async () => { this.login(); }}
            title="Login"
          />
        }
      </View>
    );
  }
}
