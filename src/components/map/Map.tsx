import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import MapView, { Heatmap, LatLng, Marker, Region, WeightedLatLng } from 'react-native-maps';
import AddOccurrence from '../modals/AddOccurrence';
import GetLocation from 'react-native-get-location';
import { getOccurrences } from '../utils/ApiUtils';
import { Occurrence, ModalizeRef } from '../utils/types';
import pinImg from '../../../assets/images/pin.png';
import iconHeatmap from '../../../assets/images/icon_heatmap.png';

import { Main, Container } from './style';

interface MapProps {

}
interface MapState {
  markers: Array<Marker> | null,
  heatmapPoints: Array<WeightedLatLng> | null,
  heatmap: Boolean,
  userLocation: LatLng
}

export default class Map extends Component<MapProps, MapState> {
  state: MapState = {
    heatmapPoints: null,
    markers: null,
    heatmap: false,
    userLocation: {
      latitude: -26.2659,
      longitude: -48.9187,
    }
  }

  map: MapView | null;
  modalizeRef: ModalizeRef;
  openAddModal: Function;

  initialRegion: {
    latitude: -26.2659,
    longitude: -48.9187,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  componentDidMount() {
    this.updateUserLocation();
  }

  updateUserLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 0
    })
    .then(location => {
      const { latitude, longitude } = location;
      this.setState({ userLocation: location });

      if (this.map) {
        this.map.setCamera({
          center: {
            latitude,
            longitude
          },
          pitch: 45,
          heading: 90,
          altitude: 1000,
          zoom: 20
        });
      }
    })
  }

  translateType(type: String) {
    if(type == "Flash flood") {
      return 'Enchente'
    }
    
    if(type == "Riverine flood") {
      return 'Inundação'
    }
    
    if(type == "Flooding") {
      return 'Alagamento'
    }
  }

  drawLayers = () => {
    getOccurrences()
    .then(response => {
      const occurrences = response.data;

      const heatmapPoints = occurrences.map((occurrence: Occurrence) => {
        return {
          latitude: parseFloat(occurrence.latitude),
          longitude: parseFloat(occurrence.longitude),
          weight: 1
        }
      })

      const markers = occurrences.map((occurrence: Occurrence) => {
        let coordinate = {
          latitude: parseFloat(occurrence.latitude),
          longitude: parseFloat(occurrence.longitude),
        }
        return (
          <Marker
            key={`${occurrence.id}`}
            title={this.translateType(occurrence.type)}
            coordinate={coordinate}
            image={pinImg}
          />
        )
      })

      this.setState({ heatmapPoints, markers });
    })
  }

  handleModalRef(openModal: Function) {
    this.openAddModal = () => {
      openModal();
      this.updateUserLocation();
    }
  }

  handleRegionChange = (region: Region) => {
    if (region.latitudeDelta <= 0.0070 && this.state.heatmap) {
      this.setState({ heatmap: false });
    }
    else if (region.latitudeDelta > 0.0070 && !this.state.heatmap) {
      this.setState({ heatmap: true });
    }
  }

  render() {
    let heatmap, markers;

    // HEATMAP POINTS
    if (this.state.heatmapPoints && this.state.heatmap) {
      heatmap = <Heatmap points={this.state.heatmapPoints} radius={50} />
    }

    if (this.state.markers && !this.state.heatmap) {
      markers = this.state.markers
    }

    return (
      <Main>
        <Container>
          <MapView
            ref={ref => { this.map = ref }}
            style={{flex: 1}}
            showsUserLocation={true}
            onMapReady={this.drawLayers}
            initialRegion={this.initialRegion}
            onRegionChange={this.handleRegionChange}
          > 
            {heatmap}
            {markers}
          </MapView>

          <AddOccurrence
            openRef={(open: Function) => {this.handleModalRef(open)}}
            latLng={this.state.userLocation}
            onSuccess={this.drawLayers}
          />

          <Button onPress={() => {this.openAddModal()}}>
            Reportar Ocorrência
          </Button>
        </Container>
      </Main>
    );
  }
}