import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-node';
import { ListItem, Avatar } from 'react-native-elements';
import Player from './Player';

export default function Myplaylis({ navigation, route }) {

    const [display, setdisplay] = React.useState();
    const [trackuri, settrackuri] = React.useState();

    const handleChange = (date) => {
        settrackuri(date);
    }

    const spotifyApi = new SpotifyWebApi({
        clientId: '6d21f19fce214d8b81e9bab21dc39adc',
    })

    var accessToken = route.params.accessToken;
    spotifyApi.setAccessToken(accessToken);

    const [constructorHasRun, setConstructorHasRun] = React.useState(false);

    const constructor = () => {
        if (constructorHasRun) return;
        spotifyApi.getPlaylist('5E5dcQesbg5ScbuThnm6Ry')
            .then(function (data) {
                console.log('Some information about this playlist', data.body.tracks.items);
                setdisplay(data.body.tracks.items);
            }, function (err) {
                console.log('Something went wrong!', err);
            });
        setConstructorHasRun(true);
    };
    constructor();

    function Display() {

        if (display) {
            spotifyApi.setAccessToken(accessToken);
            var results = [...display];
            return (
                < center >
                    <div>
                        {
                            results.map((person, i) => (
                                <ListItem bottomDivider>
                                    <ListItem.Content onClick={() => handleChange(person.track.uri)}>
                                        <ListItem.Title>{person.track.name}</ListItem.Title>

                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                                // <button key={i} onClick={() => handleChange(person.uri)}  uri={person.uri}> {person.name}</button>

                            ))
                        }

                    </div>
                </center >
            );
        } else {
            return ("Nothing");
        }

    }


    return (
        <SafeAreaView >
            <View>
                <Display />
                <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Player
                        accessToken={accessToken}
                        trackUri={trackuri}

                    />
                </div>
            </View>
        </SafeAreaView >


    )

}