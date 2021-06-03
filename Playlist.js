import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

export default function Playlist({ navigation, route }) {
    var accessToken = route.params.accessToken;
    const styles = StyleSheet.create({
      
     
        fixToText: {
            display: "flex",
            justifyContent: 'center',
        alignItems: 'center'
              },
     
    });

    return (
   <SafeAreaView >
    <View>
    
      <View style={styles.fixToText}>
        <Button
                        title="My Playlist"
                        onPress={() => navigation.navigate('Myplaylist', { accessToken: accessToken })}
        />
        <Button
                        title="Recent PlayList"
                        onPress={() => navigation.navigate('Recent', { accessToken: accessToken })}
        />
      </View>
    </View>
  </SafeAreaView >


    )

}