import React, { Component } from 'react';
import { Modalize } from 'react-native-modalize';
import { ModalizeRef, Occurrence, OptionSelectList } from '../../utils/types';
import { SelectList, MyInput } from '../../form';
import { ModalContainer, Container, Form, LatLngSection, MyButton, ButtonSection } from './style';
import { MyText } from '../../utils/MyText/MyText';
import { createOccurrence } from '../../utils/ApiUtils';
import { LatLng } from 'react-native-maps';
import { Alert } from 'react-native';

interface MyProps {
  openRef: Function,
  latLng: LatLng,
  onSuccess?: Function
}

interface MyState {
  latitude?: number,
  longitude?: number,
  type?: string
}

export class AddOccurrence extends Component<MyProps, MyState> {
  state: MyState = {
    latitude: this.props.latLng?.latitude || -44.224433,
    longitude: this.props.latLng?.longitude || -44.224433,
  }

  modalizeRef: ModalizeRef;
  typeOptions: Array<OptionSelectList> = [
    {
      name: 'Enchente',
      value: 'Flash flood'
    },
    {
      name: 'Inundação',
      value: 'Riverine flood'
    },
    {
      name: 'Alagamento',
      value: 'Flooding'
    }
  ]; 

  componentDidMount() {
    this.props.openRef(this.modalizeRef.open);
  }

  componentDidUpdate() {
    const { latitude, longitude } = this.props.latLng;

    if (latitude != this.state.latitude || longitude != this.state.longitude) {
      this.setState({
        ...this.props.latLng
      })
    }
  }

  handleSelectedType = (type: string) => {
    this.setState({ type });
  }

  handleFormAction = () => {
    if (!this.state.latitude || !this.state.longitude || !this.state.type) {
      Alert.alert("Falha ao enviar", "Preencha todos os campos!");
      return;
    }

    const occurrence: Occurrence = {
      latitude: `${this.state.latitude}`,
      longitude:`${this.state.longitude}`,
      type: this.state.type
    }

    try {
      createOccurrence(occurrence, () => {
        this.modalizeRef.close();

        if (this.props.onSuccess) {
          this.props.onSuccess();
        }
      });
    } catch (error) {
      // this.props.onError(error);
    }
  }

  handleLatChange = (lat: string) => {
    const latitude = parseFloat(lat);

    this.setState({ latitude });
  }

  handleLongChange = (long: string) => {
    const longitude = parseFloat(long);

    this.setState({ longitude });
  }

  render() {
    return (
      <Modalize
        ref={(ref: ModalizeRef) => {this.modalizeRef = ref}}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalHeight={280}
      >
        <ModalContainer>
          <MyText size={18}>NOVA OCORRÊNCIA</MyText>

          <Form>
            <SelectList
              label={"Tipo de Ocorrência"}
              options={this.typeOptions}
              onSelect={this.handleSelectedType}
            />

            <Container>
              <LatLngSection>
                <MyInput
                  label={"Latitude"}
                  onChangeText={this.handleLatChange}
                  value={`${this.state.latitude}`}
                  width={140}
                />
              </LatLngSection>
              <LatLngSection>
                <MyInput
                  label={"Longitude"}
                  onChangeText={this.handleLongChange}
                  value={`${this.state.longitude}`}
                  width={140}
                />
              </LatLngSection>
            </Container>

            <ButtonSection>
              <MyButton
                title={"ENVIAR"}
                onPress={this.handleFormAction}
              />
            </ButtonSection>
          </Form>
        </ModalContainer>
      </Modalize>
    )
  }
}