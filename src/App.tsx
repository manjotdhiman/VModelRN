/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState, type PropsWithChildren } from 'react';
import {
    GestureResponderEvent,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View, Alert,
    ActivityIndicator,
    PermissionsAndroid
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import BlockButton from './components/BlockButton';
import Geolocation from 'react-native-geolocation-service';
// Add google maps api key here
const API_KEY = 'AIzaSyB_ZBaVH5BroLPK_lE6ceP8vP6a2JxEUZA';
interface IgeoLocation {
    formatted_address: string
}
const App = () => {
    const [hasLocationPermission, setHasPermission] = useState(false);
    const [geoLocation, setGeoLocation] = useState<IgeoLocation>();
    const [locationtext, setLocationText] = useState('');
    const [loading, setLoading] = useState(false);
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "VModel Location Permission",
                    message:
                        "VModel needs access to your camera " +
                        ".",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
                setHasPermission(true);
            } else {
                console.log("lamera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    useEffect(() => {
        requestLocationPermission();
    }, []);
    useEffect(() => {
        if (geoLocation) {
         setLocationText(geoLocation?.formatted_address);
        }
    }, [geoLocation])

    const detect_location = () => {
        if (hasLocationPermission) {
            setLoading(true);
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${position.coords.latitude},
                ${position.coords.longitude}&key=${API_KEY}`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            // Find locality name . We can find any other name such as country,route etc
                            setGeoLocation(responseJson.results[0]);
                            setLoading(false);
                            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
                        })
                },
                (error) => {
                    console.log(error.code, error.message);
                    Alert.alert('Error', error.message);
                    setLoading(false);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            // Here we can request again for permission to access the location according to requirements.
            Alert.alert('Error', 'Permission denied by user');
        }
    };


    return (
        <SafeAreaView style={styles.backgroundStyle}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={"#fff"}
            />
            <View style={styles.headerContainer} >
                <TouchableOpacity onPress={() => Alert.alert('Nothing here')} >
                    <Ionicons name="chevron-back-outline" size={24} /></TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Nothing here')} >
                    <Text style={styles.label} >Skip</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer} >
                <Text style={styles.label} >Where are you based?</Text>
                <TextInput value={locationtext} onChangeText={setLocationText} placeholder='Ex: London' style={styles.input} />
            </View>
            <View style={styles.sectionButtons}>
                <BlockButton  {...{ loading, title: 'Detect automatically', onClick: detect_location }} />
                <BlockButton {...{ loading: false, title: 'Continue', onClick: () => { Alert.alert('Location is', locationtext) } }} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1, padding: 20,

    },
    sectionContainer: {
        alignItems: 'stretch',
        flex: 0.5,
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: 'rgb(217,217,217)',
        fontFamily: 'SansSerifBookFLF-Demibold'
    },
    sectionButtons: {
        flex: 0.5,
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    label: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'SansSerifFLF-Demibold'
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
