import React from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

export default function Home({ navigation }) {
    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=6d21f19fce214d8b81e9bab21dc39adc&response_type=code&redirect_uri=http://localhost:19006/callback&scope=ugc-image-upload%20user-read-recently-played%20user-read-playback-state%20user-top-read%20app-remote-control%20playlist-modify-public%20user-modify-playback-state%20playlist-modify-private%20user-follow-modify%20user-read-currently-playing%20user-follow-read%20user-library-modify%20user-read-playback-position%20playlist-read-private%20user-read-email%20user-read-private%20user-library-read%20playlist-read-collaborative%20streaming";
    const [token, settoken] = React.useState();
    const [accessToken, setAccessToken] = React.useState();
    const [refreshToken, setRefreshToken] = React.useState();
    const [expiresIn, setExpiresIn] = React.useState();
    const [codedata, setcodedata] = React.useState();
    const spotifyApi = new SpotifyWebApi({
        clientId: '6d21f19fce214d8b81e9bab21dc39adc',
    })
    const code = new URLSearchParams(window.location.search).get('code');
    const Separator = () => (
        <View style={styles.separator} />
    );
    const styles = StyleSheet.create({
      
        separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

        fixToText: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        },

    });
 

    function serversend (code) {
        console.log(code);
        if (code) {
            
            var data = { "m1": code };
            const url = 'http://localhost:5000';
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    //var json = JSON.parse(this.responseText);
                    let temp = this.responseText
                    temp = (JSON.parse(temp));
                    setAccessToken(temp.access_token);
                    setRefreshToken(temp.refresh_token);
                    setExpiresIn(temp.expires_in);
                    // settoken(temp); 
                    console.log((temp.access_token));
                    spotifyApi.setAccessToken(temp.access_token);
                    return temp.access_token;
                }
            };
            xhr.send(JSON.stringify(data));
        }
    }, [code])
    serversend(code);  // use for expire
 


    return (
        <view>
            {(() => {
                if (code) {
                    return (
                        <div>
                            <Separator />
                         <Button
                                title="pop"
                                onPress={() => navigation.navigate('List', { accessToken: accessToken, cate: "pop" })
                            }>Pop</Button >
                            <Separator />
                            <Button
                                title="chill"
                                onPress={() => navigation.navigate('List', { accessToken: accessToken,cate:"chill" })
                                }>chill</Button >
                            <Separator />
                           <Button
                                title="Playlist"
                                onPress={() => navigation.navigate('Playlist', { accessToken: accessToken })
                            }>Playlist</Button >
                            <Separator />
                            <Button
                                title="Tracklist"
                                onPress={() => navigation.navigate('Tracklist', { accessToken: accessToken })
                                }>Tracklist</Button >
                        </div>
                    )
                } else {
                    return (
                        <a style={{
                            color: "blue",
                            fontFamily: "helvetica",
                         textDecoration: "none",
                            textTransform: "uppercase",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100"

                        }} href={AUTH_URL}  >Login</a>
                    )
                }
            })()}
          
           
        </view>
        )

}
