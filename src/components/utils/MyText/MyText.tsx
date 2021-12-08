import React, { Component } from 'react';
import { CustomText } from './style';

interface MyProps {
  size?: Number 
}

export class MyText extends Component<MyProps> {

  render() {
    return (
      <CustomText size={this.props.size} style={{fontFamily: 'Roboto'}}>
        {this.props.children}
      </CustomText>
    )
  }
}