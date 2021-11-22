import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import MapView, { Camera, Marker, Region, LatLng } from 'react-native-maps';
import axios from 'axios';
import GetLocation from 'react-native-get-location';

axios.defaults.baseURL = 'http://192.168.0.8:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    width: "100%",
    height: "100%"
  },
  map: {
    flex: 1
  },
  button: {
    position: 'absolute',
    backgroundColor: '#32d632',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00000050'
  }
}); 

interface MyProps {

}

interface MyState {
  region: Region,
}

export default class App extends Component<MyProps, MyState> {
  map: any;

  state: MyState = {
    region: {
      latitude: -26.2659,
      longitude: -48.9187,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
  }

  componentDidMount() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000
    })
    .then(location => {
      const { latitude, longitude } = location;
      this.setRegion({latitude, longitude});
    })
  }

  setRegion(latLng: LatLng) {
    this.setState({
      region: {
        ...this.state.region,
        ...latLng
      }
    })
  }

  createOccurrence() {
    let fakeData = {
      name: 'Teste 02',
      latitude: -26.2659,
      longitude: -48.9987
    }
  
    axios.post('/occurrences', fakeData)
    .then(response => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapView
            ref={ref => { this.map = ref }}
            style={styles.map}
            region={this.state.region}
            showsUserLocation={true}
          >
            {/* {this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))} */}
          </MapView>
          
          
          <Button onPress={this.createOccurrence}>
            Reportar Ocorrência
          </Button>
        </View>
      </View>
    );
  }
}