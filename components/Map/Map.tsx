import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import MapView, { Heatmap, Region, LatLng, WeightedLatLng, Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import { getOccurrences } from '../../Utils/ApiUtils';
import { Occurrence } from '../../Utils/Types';

import styles from './style';

interface MyProps {

}

interface MyState {
  region: Region,
  points: Array<WeightedLatLng>,
  heatmap: Boolean,
  modalAddOccurrence: Boolean
}

export default class Map extends Component<MyProps, MyState> {
  state: MyState = {
    region: {
      latitude: -26.2659,
      longitude: -48.9187,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    points: [],
    modalAddOccurrence: false,
    heatmap: true
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

  toggleModalAddOccurrence = () => {
    this.setState({
      modalAddOccurrence: !!this.state.modalAddOccurrence
    });
  }

  drawLayers = () => {
    getOccurrences()
    .then(response => {
      if (this.state.heatmap) {
        const points = response.data.map((occurrence: Occurrence) => {
          return {
            latitude: parseFloat(occurrence.latitude),
            longitude: parseFloat(occurrence.longitude),
            weight: 1
          }
        })

        this.setState({ points });
      }
    })
  }

  render() {
    let heatmap, markers;

    // HEATMAP POINTS
    if (this.state.points.length) {
      heatmap = <Heatmap points={this.state.points} radius={50} />
    }

    // MARKERS
    // if (this.state.markers.length) {
    //   markers = this.state.markers.map((marker: any) => (
    //     <Marker
    //       key={marker.id}
    //       coordinate={marker.latlng}
    //       title={marker.type}
    //     />
    //   ))
    // }

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.region}
            showsUserLocation={true}
            onMapReady={this.drawLayers}
          > 
            {heatmap}
          </MapView>
          
          <Button onPress={this.toggleModalAddOccurrence}>
            Reportar Ocorrência
          </Button>
        </View>
      </View>
    );
  }
}