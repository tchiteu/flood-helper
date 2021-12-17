import styled from "styled-components/native";

interface TextProps {
  size?: Number,
  color?: String
}

export const CustomText = styled.Text<TextProps>`
  font-family: 'Cochin';
  font-size: ${props => `${props.size || 12}px`};
  color: ${props => `${props.color || '#6a737c'}`};
`