import React from "react";
import styled from "styled-components";

interface IProps {
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void
  value: string
}

const TextAreaStyled = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  border: 4px solid #18191a;
  border-radius: 16px;
  outline: none;
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 500;
  padding: 8px;
  transition: border .4s;

  ::placeholder {
    margin: 0;
    color: #565061;
  }

  :focus {
    border: 4px solid #ae86ee;
  }

  :valid {
    border: 4px solid #39aebc;
  }
`;

const TextArea = ({ onChange, value }: IProps) => {
  return (
    <TextAreaStyled
      onChange={ onChange }
      value={ value }
      name="title"
      placeholder="Введите заголовок новости..."
      minLength={ 10 }
      required
    />
  );
};

export { TextArea };