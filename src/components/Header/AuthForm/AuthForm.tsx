import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectIsAuth, selectPendingAuth } from "../../../features/auth/authSlice";
import styled, { keyframes } from "styled-components";

const load = keyframes`
  from {
    max-width: 0;
    background-color: #ae86ee;
  }

  to {
    max-width: 500px;
    background-color: #39aebc;
  }
`;

const LoadingStyled = styled.div`
  height: 21px;
  width: 423px;
  background-color: transparent;
  border-radius: 20px;
  position: relative;
  border: 4px solid #000;
  overflow: hidden;

  :after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    animation: ${ load } 2s linear;
    background-color: #39aebc;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  border: 2px solid #18191a;
  border-radius: 16px;
  outline: none;
  margin: 0 8px 16px;
  font-weight: 500;
  padding: 8px;

  ::placeholder {
    margin: 0;
    color: #565061;
  }

  :focus {
    border: 2px solid #ae86ee;
  }

  &:not(:placeholder-shown) {
    :valid {
      border: 2px solid #39aebc;
    }

    :invalid:required {
      border: 2px solid #d6676f;
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  color: #fff;
  background-color: #ae86ee;
  padding: 10px 16px;
  border-radius: 16px;
  font-weight: bold;
`;

const AuthFormStyled = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const AuthForm = () => {
  const [ values, setValues ] = useState({ email: '', password: '' });
  const pending = useSelector(selectPendingAuth);
  const dispatch = useDispatch();

  const changeValuesHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = () => {
    dispatch(loginUser(values));
  };

  if (pending) {
    return (
      <LoadingStyled />
    );
  }

  return (
    <AuthFormStyled onSubmit={ submitHandler }>
      <Input
        name="email"
        value={ values.email }
        onChange={ changeValuesHandler }
        placeholder="email..."
        type="text"
        pattern=".{1,}@.{1,}\..{1,}"
        required
      />
      <Input
        name="password"
        value={ values.password }
        onChange={ changeValuesHandler }
        placeholder="password..."
        type="password"
        minLength={ 6 }
        required
      />
      <Button type="submit">Войти</Button>
    </AuthFormStyled>
  );
};