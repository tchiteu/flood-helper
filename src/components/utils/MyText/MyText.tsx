import React, { Component } from 'react';
import { CustomText } from './style';

interface MyProps {
  size?: Number,
  color?: string
}

export class MyText extends Component<MyProps> {

  render() {
    return (
      <CustomText
        size={this.props.size}
        style={{fontFamily: 'Roboto'}}
        color={this.props.color}
      >
        {this.props.children}
      </CustomText>
    )
  }
}