import styled from "styled-components/native";

export const Main = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F5FCFF;
`

export const Container = styled.View`
  width: 100%;
  height: 100%;
`

export const ReportButton = styled.Pressable`
  background-color: #2FA9FB;
  border: solid #316C94 1px;
  font-family: 'Roboto';
  padding: 5px 25px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -5px;
  left: 104px;
`