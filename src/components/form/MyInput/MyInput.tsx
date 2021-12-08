import React, { Component } from 'react';
import { MyText } from '../../utils/MyText/MyText';
import { Container, LabelSection, Input } from './style';

interface MyProps {
  label?: String,
  value?: any,
  width?: Number
  onChangeText?: (text: string) => void
}

export class MyInput extends Component<MyProps> {
  render() {
    let label;

    if (this.props.label) {
      label = ( 
        <LabelSection>
          <MyText>{this.props.label}</MyText>
        </LabelSection>
      )
    }

    return (
      <Container>
        {label}
        <Input 
          value={this.props.value}
          width={this.props.width}
          onChangeText={this.props.onChangeText}
        />
      </Container>
    )
  }
}