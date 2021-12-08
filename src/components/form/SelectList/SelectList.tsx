import React, { Component } from 'react';
import { MyText } from '../../utils/MyText/MyText';

import {
  Container,
  ListContainer,
  Card
} from './style';

import { OptionSelectList } from '../../utils/types';

interface MyProps {
  options: Array<OptionSelectList>,
  label?: String,
  onSelect: Function
}

interface MyState {
  selectedIndex: Number | null;
}

export class SelectList extends Component<MyProps, MyState> {
  state: MyState = {
    selectedIndex: null
  }

  handlePress = (index: number) => {
    if (index === this.state.selectedIndex) {
      this.props.onSelect(null);

      this.setState({
        selectedIndex: null
      });
    }
    else {
      const option = this.props.options[index];

      this.setState({
        selectedIndex: index
      });

      this.props.onSelect(option.value);
    }   
  }

  render() {
    let label, options;

    if (this.props.label) {
      label = <MyText>{this.props.label}</MyText>
    }

    if (this.props.options?.length) {
      options = this.props.options.map((option, index) => { 
        const first = (index === 0);
        const last = (index === this.props.options.length - 1);
        const selected = (index === this.state.selectedIndex);

        return (
          <Card
            first={first}
            last={last}
            selected={selected}
            key={index}
            onPress={() => this.handlePress(index)}
          >
            <MyText>{option.name}</MyText>
          </Card>
        )
      })
    }

    return (
      <Container>
        {label}
        <ListContainer>
          {options}
        </ListContainer>
      </Container>
    )
  }
}