import styled from "styled-components/native";

export const Main = styled.View`
  display: flex;
  align-items: center;
`

export const Logo = styled.Image`
  width: 120px;
  height: 120px;
  margin: 32px 0px;
`

export const ActionContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 320px;
  justify-content: space-between;
`

export const LoginButton = styled.Pressable`
  background-color: #25CA53;
  border: solid #43AC61 1px;
  font-family: 'Roboto';
  padding: 10px 25px;
  border-radius: 8px;
`