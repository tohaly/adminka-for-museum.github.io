import React from "react";
import styled from "styled-components";

const MainStyled = styled.p`
  font-size: 60px;
  text-align: center;
  font-weight: bold;
`;

export const Main = () => {
  return (
    <MainStyled>Добро пожаловать</MainStyled>
  );
};