import React from "react";
import styled from "styled-components";
import { withAuth } from "../../firebase/withAuth";

interface IProps {
  text: string
}

const TitleStyled = styled.h2`
  font-size: 32px;
  text-align: center;
`;

const Info = styled.h2`
  font-size: 14px;
  text-align: center;
  font-weight: 400;
  margin: 0 auto 40px;
  color: #ccc;
  max-width: 250px;
`;

export const Title = withAuth(({ text, isAuth }: IProps & { isAuth: boolean }) => {
  return (
    <>
      <TitleStyled>{ text }</TitleStyled>
      { !isAuth && <Info>!Авторизируйтесь что бы изменять/добовлять новости</Info> }
    </>
  );
});