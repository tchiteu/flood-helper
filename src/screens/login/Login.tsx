import React, { Component } from 'react';
import { MyInput } from '../../components/form';
import { navigate } from '../../services/navigation';
import MyText from '../../components/utils/MyText';

import { Main, Logo, ActionContainer, LoginButton} from './style';

export default class Login extends Component {
  handleLogin() {
    navigate('Main')
  }

  render() {
    const logoSrc = require('../../../assets/images/logo.png');

    return (
      <Main>
        <Logo source={logoSrc}></Logo>

        <MyInput label={"E-mail"} width={320} />
        <MyInput label={"Senha"} width={320} password />

        <ActionContainer>
          <MyText color={"#2FA9FB"}>
            Esqueci minha senha
          </MyText>

          <LoginButton onPress={this.handleLogin} >
            <MyText color={"#FFFF"} size={16}>
              ENTRAR
            </MyText>
          </LoginButton>
        </ActionContainer>
      </Main>
    )
  }
}