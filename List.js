import React from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Player from './Player';
import { ListItem, Avatar } from 'react-native-elements';
export default function List({ navigation, route })
{

    const [display, setdisplay] = React.useState();
    const [trackuri, settrackuri] = React.useState();
    const spotifyApi = new SpotifyWebApi({
        clientId: '6d21f19fce214d8b81e9bab21dc39adc',
    })
    var accessToken = route.params.accessToken;
    var cate = route.params.cate;
   

    const [constructorHasRun, setConstructorHasRun] = React.useState(false);
    const handleChange = (date) => {
        settrackuri(date);
       
    };
    
    const constructor = () => {
        if (constructorHasRun) return;
        load();
        setConstructorHasRun(true);
    };
    constructor();

    function load() {
        var results;
        if (accessToken) {
            spotifyApi.setAccessToken(accessToken);
            spotifyApi.getPlaylistsForCategory(cate, {
                country: 'IN',
                limit: 20,
                offset: 0
            })
                .then(function (data) {
                    console.log(data.body);
                    results = data.body.playlists.items;
                    setdisplay(results);
                    //navigation.navigate('Categorylist', { name: results } )

                }, function (err) {
                    console.log("Something went wrong!", err);
                });
            console.log("sdsdsdsd" + results);

        } else {
            return (<div>Nothing</div>)
        }
    }
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
                                    <Avatar source={ person.images[0].url} />
                                    <ListItem.Content onClick={() => handleChange(person.uri)}>
                                        <ListItem.Title>{person.name}</ListItem.Title>
                                     
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
        <div><Display style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }} />
            <div style={{ position: 'fixed',  left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Player               
                 accessToken={accessToken}
                trackUri={trackuri}

                />
                </div>
        </div>
    )

}