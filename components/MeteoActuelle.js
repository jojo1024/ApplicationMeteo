import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import {isSameDay} from "date-fns"
import SearchBar from './SearchBar';


const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`




export default function MeteoActuelle({ weatherData, fetchWeatherData }) {
   

  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    const currentW = weatherData.list.filter(forecast => {
      const today = new Date().getTime() + Math.abs(weatherData.city.timezone * 1000)
      const forecastDate = new Date(forecast.dt * 1000)
      return isSameDay(today, forecastDate)
    })
    setCurrentWeather(currentW[0])
  }, [weatherData])



  return (
    <View style={styles.container}>
      
     
   

        <SearchBar fetchWeatherData={fetchWeatherData} />
      
      <Text style={styles.city} >{weatherData?.city?.name}</Text>
      <Text style={styles.description} >{currentWeather?.weather[0].description}</Text>
      <Text style={styles.today} >Max.{Math.round(currentWeather?.main.temp_max)}°&nbsp;Min.{Math.round(currentWeather?.main.temp_min)}°</Text>
      {/* <Text style={styles.today} >Aujourd'hui</Text> */}

      <Image
        source={{ uri: getIcon(currentWeather?.weather[0].icon) }}
        style={styles.image}
      
      />

      <Text style={styles.temp} >{Math.round(currentWeather?.main.temp)}° </Text>
      
 

    </View>
  )
}
const COLOR = "white"

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:"center"
      },
  city: {
    fontSize: 40,
    fontWeight: '500',
    color : COLOR,
    
  },
  today: {
    fontSize: 28,
    fontWeight: '300',
    color:COLOR
  },
  temp: {
    fontSize: 80,
    fontWeight: "bold",
    color: COLOR
  },
  image: {width:170, height:170},
  description:{
    fontSize: 24,
    fontWeight:'bold',
    color: COLOR
  },
  imageback: {
    flex: 1,
    justifyContent: "center"
  }


})