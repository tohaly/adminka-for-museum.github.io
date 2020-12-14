import React from "react";
import styled from "styled-components";

interface IProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  value: string
}

const InputStyled = styled.input`
  box-sizing: border-box;
  width: 100%;
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

  &:not(:placeholder-shown) {
    :valid {
      border: 4px solid #39aebc;
    }

    :invalid {
      border: 4px solid #d6676f;
    }
  }
`;

const Input = ({ onChange, value }: IProps) => {
  return (
    <InputStyled
      onChange={ onChange }
      value={ value }
      name="link"
      placeholder="Введите ссылку на новость..."
      pattern="http(s?):\/\/.{2,}\..{2,}"
      required
    />
  );
};

export { Input };