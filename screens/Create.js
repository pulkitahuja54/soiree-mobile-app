import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ActivityIndicator, Button, Platform, WebView } from 'react-native';

const { height, width } = require("Dimensions").get("window");

class Create extends Component {
    constructor(props) {
        super(props);
            this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
  	    }   

    onPressButton() {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                event_name: this.state.event_name,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        this.setState({
            isLoading: true
        })
                    return fetch('http://3.215.63.130/api/events', data)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            isLoading: false,
                            data: responseJson.data,
                        });
                    alert(JSON.stringify(responseJson));
                    setTimeout(this.props.navigation.navigate('DisplayScreen'),5000);
                    })
                .catch((error) => {
                    alert(error);
                    console.error(error);
                });

    }

    renderButton() {
        if (this.state.loading) {
            return (
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator size= "large" />
                </View>
            );
        }

        return (
            <Button
                style={styles.buttonStyle}
                onPress={() =>  this.onPressButton()}
                title="Create Event"
                color="#FF8976"
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.titleStyle}>Event</Text>
                <TextInput
                    style={styles.textStyle}
                    onChangeText={(text) => this.setState({ event_name: text })}
                    value={this.state.event_name}
                />

                <Text style={styles.titleStyle}>
                    {JSON.stringify(this.state.data)}
                </Text>
                {this.renderButton()}                    
                </View>
        );
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 60,
            alignItems: 'center',
            flexDirection: "column",
        },
        buttonStyle: {
            height: 40,
            width: width - 20,
            margin: 10
        },
        textStyle: {
            height: 40,
            width: width - 20,
            borderColor: 'gray',
            borderWidth: 1,
            fontSize: 20,
            margin: 10,
        },
        titleStyle: {
            width: width - 20,
            fontSize: 20,
        },
        spinnerStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    });
export default Create;