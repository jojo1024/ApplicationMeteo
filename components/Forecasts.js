import React, {useEffect, useState} from "react";
import {StyleSheet, ScrollView} from "react-native";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import Weather from "./Weather"

export default function Forecasts({ weatherData }) {
  const [forecasts, setForecasts] = useState([])
  useEffect(() => {
        const forecastsData = weatherData.list.map(f => {
    const dt = new Date(f.dt * 1000)
    return ({
      date: dt,
      hour: dt.getHours(),
      temp: Math.round(f.main.temp),
      icon: f.weather[0].icon,
      name: format(dt, "EEEE", {locale: fr})
    })
  })
  setForecasts(forecastsData)
  }, [weatherData])


  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {forecasts.map(f => (
        <Weather forecast={f} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll:{
    top:250,
    marginHorizontal:40
  }
})