import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface IProps {
  onChange(event: React.ChangeEvent<HTMLFormElement>): void
  onSubmit(event: React.ChangeEvent<HTMLFormElement>): void;
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: 290px;
  width: 100%;
  margin: 0 auto;
`;

const Form = ({ onSubmit, children, onChange }: PropsWithChildren<IProps>) => {
  return (
    <FormStyled onSubmit={ onSubmit } onChange={ onChange } noValidate>
      { children }
    </FormStyled>
  );
};

export { Form };