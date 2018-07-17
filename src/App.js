import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';  // just get the header object
import LoginForm from './components/LoginForm';
class App extends Component {
// lifecycle methods
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCEET68z5bGidDfRYJp7IuqY-nfpOV5djM",
            authDomain: "auth-2960d.firebaseapp.com",
            databaseURL: "https://auth-2960d.firebaseio.com",
            projectId: "auth-2960d",
            storageBucket: "auth-2960d.appspot.com",
            messagingSenderId: "184536410510"
          });

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false});
            }
          });
    }

    renderContent() {

        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                
                { this.renderContent() }
            </View>
        )
    }
}

export default App