import React, { useState } from "react";
import { Title } from "../components/styles/Text";
import {
  BrandContainer,
  ResponsiveContainer,
} from "../components/styles/Containers";
import { IToken } from "../types/graphql.types";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { Helmet } from "react-helmet";

interface IProps {
  onAuth(token: IToken): void;
}

const Welcome: React.FC<IProps> = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <ResponsiveContainer>
      <Helmet>
        <title>Taskyz: Welcome</title>
      </Helmet>

      <BrandContainer>
        <Title>Taskyz</Title>
        <p>The customizable TODO app</p>
      </BrandContainer>

      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} onLogin={props.onAuth} />
      ) : (
        <Register onSwitch={() => setIsLogin(true)} onRegister={props.onAuth} />
      )}
    </ResponsiveContainer>
  );
};

export default Welcome;
