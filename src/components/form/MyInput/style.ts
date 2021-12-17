import styled from "styled-components/native";

interface MyInputProps {
  width?: Number
}

export const Container = styled.View`
  display: flex;
  margin-bottom: 16px;
`

export const LabelSection = styled.View`
  display: flex;
  margin-bottom: 8px;
`

export const Input = styled.TextInput<MyInputProps>`
  height: 40px;
  border-radius: 8px;
  border: solid 1px #E8E8E8;
  background-color: #F6F6F6;
  padding: 0px 10px;
  font-size: 18px;
  width: 100%;
  display: flex;

  ${props => props.width && `
    width: ${props.width}px;
  `}
`