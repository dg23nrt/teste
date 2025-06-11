import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Card, Text, ActivityIndicator } from 'react-native-paper';
import * as Location from 'expo-location';
import axios from 'axios';

export default function PerfilScreen() {
  const [clima, setClima] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocalizacao(location.coords);

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&current_weather=true`;
      const response = await axios.get(url);
      setClima(response.data.current_weather);
      setLoading(false);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Perfil do Usuário" />
      </Appbar.Header>
      <View style={{ padding: 16 }}>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            <Card style={{ marginBottom: 16 }}>
              <Card.Title title="Localização Atual" />
              <Card.Content>
                <Text>Latitude: {localizacao?.latitude}</Text>
                <Text>Longitude: {localizacao?.longitude}</Text>
              </Card.Content>
            </Card>
            <Card>
              <Card.Title title="Clima Atual" />
              <Card.Content>
                {clima ? (
                  <>
                    <Text>Temperatura: {clima.temperature} °C</Text>
                    <Text>Vento: {clima.windspeed} km/h</Text>
                  </>
                ) : (
                  <Text>Não foi possível carregar o clima.</Text>
                )}
              </Card.Content>
            </Card>
          </>
        )}
      </View>
    </View>
  );
}
