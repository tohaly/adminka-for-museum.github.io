import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AuthForm } from "./AuthForm/AuthForm";
import { toggleForm, selectFormVisible, logoutUser } from "../../features/auth/authSlice";
import { withAuth } from "../../firebase/withAuth";

const HeaderStyled = styled.header`
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  font-size: 20px;
  position: relative;
  padding-bottom: 10px;
  margin-right: 16px;

  :after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    border-bottom: 2px solid #000;
    width: 100%;
    max-width: 0;
    transition: max-width .4s;
  }

  :hover {
    :after {
      max-width: 100%;
    }
  }

  &.active {
    color: #ae86ee;
    cursor: default;

    :after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      max-width: 100%;
      width: 100%;
      border-bottom: 2px solid #ae86ee;
    }
  }

  @media screen and (max-width: 700px){
   margin: 0 0 16px;
  }
`;

const StyledLinkBlank = styled.a`
  text-decoration: none;
  color: #000;
  font-size: 20px;
  position: relative;
  padding-bottom: 10px;
  margin-right: 16px;

  :hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 700px){
    margin: 0 0 16px;
  }
`;

const AuthButton = styled.button`
  width: 140px;
  padding: 8px;
  color: #fff;
  background-color: #ae86ee;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  transition: opacity .4s;
  cursor: pointer;
  outline: none;

  :hover {
    opacity: .4;
  }
`;

const NavigateBar = styled.nav`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 700px){
    flex-direction: column;
    align-items: center;
  }
`;

export const Header = withAuth(({ isAuth }) => {
  const formIsVisible = useSelector(selectFormVisible);
  const dispatch = useDispatch();

  return (
    <HeaderStyled>
      <NavigateBar>
        <StyledLink to='/list'>Управялть новостями</StyledLink>
        <StyledLink to='/add'>Добавить новость</StyledLink>
        <StyledLinkBlank href="http://xn--b1adccgnpd5cn4a0j.xn--p1ai/" rel="noreferrer" target="_blank">
          Перейти на сайт акции
        </StyledLinkBlank>
        { !isAuth && <AuthButton onClick={ () => dispatch(toggleForm()) }>
          Авторизация
        </AuthButton> }
        { isAuth && <AuthButton onClick={ () => dispatch(logoutUser()) }>
          Выйти
        </AuthButton> }
      </NavigateBar>
      { formIsVisible && <AuthForm /> }
    </HeaderStyled>
  );
});