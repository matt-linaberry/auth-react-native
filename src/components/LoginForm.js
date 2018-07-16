import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

    // add some state
    // feedback from the user handling

    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {

        const { email, password } = this.state;

        this.setState({error: '', loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                this.onLoginSuccess.bind(this)
            )
            .catch(() => {
                // if there is a problem, then do this...
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(
                    this.onLoginSuccess.bind(this)
                )
                .catch(
                    // finally do some error handling.
                    // re-render components using state
                    this.onLoginFail.bind(this)
                );
            });  // this returns a promise!

    }

    onLoginSuccess() {
        // clear out the error message
        this.setState({ loading: false, email: '', password: '', error: '' });
        // stop the spinner
        // clean out the form.

    }

    onLoginFail() {
        this.setState({error: 'Authentication failed.', loading: false });

    }

    renderButton() {
        // show the spinner or the button
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return ( 
            <Button onPress={ this.onButtonPress.bind(this) }>
                Log In
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        value={ this.state.email }
                        onChangeText={email => this.setState({ email })}
                        placeholder="user@example.com"
                        
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        label="Password"   
                        secureTextEntry                 
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;