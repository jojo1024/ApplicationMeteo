
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import SearchBar from './components/SearchBar';
import Forecasts from "./components/Forecasts"
import MeteoActuelle from './components/MeteoActuelle';

const API_KEY = "9c770b83f2f84d655b7b99a04527b2bc";


export default function App() {

    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);
    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}&lang=fr&units=metric`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Yamoussoukro');
    }, [])
    

    if(!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={styles.indicator} color='blue'  size={36} />
            </View>

        )
    }

    else if(weatherData === null) {
        return (
            <View style={styles.container}>
                <ImageBackground source={{uri: "https://th.bing.com/th/id/R.699e62fc8f0bc2b4b77ef55d563ecf03?rik=SxmQGSl3%2b7eifA&pid=ImgRaw&r=0"}}
                resizeMode="cover" style={styles.imageback}
            >
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primaryText}>Cette ville n'a pas été trouvé! Essayez une autre</Text>
                </ImageBackground>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: "https://th.bing.com/th/id/R.699e62fc8f0bc2b4b77ef55d563ecf03?rik=SxmQGSl3%2b7eifA&pid=ImgRaw&r=0"}}
                resizeMode="cover" style={styles.imageback}
            >
                {/* <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  /> */}
                
                <MeteoActuelle weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
                <Forecasts weatherData={weatherData} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
 
  },
  primaryText: {
      margin: 20,
      fontSize: 28
  },
  imageback: {
    flex: 1,
    justifyContent: "center"
  },
  indicator:{
      marginTop:350
  }
});
