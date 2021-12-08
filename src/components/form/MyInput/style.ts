import styled from "styled-components/native";

interface MyInputProps {
  width?: Number
}

export const Container = styled.View`
  display: flex;
`

export const LabelSection = styled.View`
  display: flex;
  margin-bottom: 8px;
`

export const Input = styled.TextInput<MyInputProps>`
  height: 28px;
  border-radius: 4px;
  border: solid 1px #6a737c;
  padding: 0px 5px;
  font-size: 12px;

  ${props => props.width && `
    width: ${props.width}px;
  `}
`