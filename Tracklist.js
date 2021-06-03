import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-node';
import { ListItem, Avatar } from 'react-native-elements';
import Player from './Player';

export default function Tracklist({ navigation, route}) {
    
    const spotifyApi = new SpotifyWebApi({
        clientId: '6d21f19fce214d8b81e9bab21dc39adc',
    })

    var accessToken = route.params.accessToken;
    spotifyApi.setAccessToken(accessToken);

    const [dataText1, setdataText1] = React.useState("");
    const [display, setdisplay] = React.useState();
    const [trackuri, settrackuri] = React.useState();

    const handleDateChange1 = (date) => {
        setdataText1(date.target.value);
   
    };
    const handleChange = (date) => {
        settrackuri(date);

    };
    spotifyApi.searchTracks(dataText1)
        .then(function (data) {
            setdisplay(data.body.tracks.items);
        }, function (err) {
            console.error(err);
        });
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 16,
        },
        title: {
            textAlign: 'center',
            marginVertical: 8,
        },
        fixToText: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        separator: {
            marginVertical: 8,
            borderBottomColor: '#737373',
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
    });
    function addplaylist(rawdata) {
           alert("Track Added");
        spotifyApi.addTracksToPlaylist("5E5dcQesbg5ScbuThnm6Ry", [rawdata])
            .then(function (data) {
                console.log('Added tracks to playlist!');
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    }
    function getplaylistId() {
        spotifyApi.getUserPlaylists('thelinmichael')
            .then(function (data) {
                console.log('Retrieved playlists', data.body);
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    }
    function createPlaylist() {
        }
    const [constructorHasRun, setConstructorHasRun] = React.useState(false);

    const constructor = () => {
        if (constructorHasRun) return;
        createPlaylist();
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
                                    <ListItem.Content onClick={() => handleChange(person.uri)}>
                                        <ListItem.Title>{person.name}</ListItem.Title>
                                        <View style={styles.fixToText}>
                                            <Button
                                                title="Add"
                                                onPress={() => addplaylist(person.uri) }
                                            />
                                          
                                        </View>
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
    const Inputstyle = {
        marginTop: "5px",
        width: "100%",
        padding: "10px",
        fontFamily: "Arial"
    };
    return (
        <view>
            <input type="text" value={dataText1} style={Inputstyle} onChange={handleDateChange1} placeholder="search" /><br></br>
             <Display/>
           
            <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Player
                    accessToken={accessToken}
                    trackUri={trackuri}

                />
            </div>

        </view>

    )

}