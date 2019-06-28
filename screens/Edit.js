import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ActivityIndicator, Button, Platform, WebView } from 'react-native';

const { height, width } = require("Dimensions").get("window");

const URI = 'http://3.215.63.130/api/events/';


class Edit extends Component {
    constructor(props) 
    {
            super(props);
            this.item = this.props.navigation.getParam('item', {});

            this.state = 
            {
            isLoading: false,
            dataSource: [],
            event_name:this.item.event_name,
            item:  this.item,
            };
    }

    componentDidMount() 
    {
    }

         onPressButton() 
         {
        let data = {
            method: 'PATCH',
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
        
        return fetch( URI + this.state.item.id , data)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            isLoading: false,
                            data: responseJson.data,
                        });
                        alert('Event successfully updated');
                        this.props.navigation.navigate('DisplayScreen');
                    
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
                onPress={() => this.onPressButton()}
                title="Update Event"
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
                    value={this.state.event_name }
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
export default Edit;