import React from "react";
import styled from "styled-components";

interface IProps {
  isValidate: boolean;
  pending: boolean;
}

const AddButton = styled.button`
  border: none;
  outline: none;
  color: #fff;
  padding: 16px 16px;
  width: 100%;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: bold;
  border-radius: 16px;
  cursor: pointer;
  background-color: #39aebc;

  :disabled {
    background-color: #402f60;
    color: #565061;
    cursor: auto;
  }
`;

export const Button = ({ isValidate, pending }: IProps) => {
  return (
    <AddButton disabled={ !isValidate } type="submit">{
      pending ? 'Загрузка...' : 'Загрузить' }
    </AddButton>
  );
};