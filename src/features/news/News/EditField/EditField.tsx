import React from "react";
import styled from "styled-components";

interface IProps {
  value: string;
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  onCLick(): void
  cancelHandler(): void
}

const TextareaTitle = styled.textarea`
  height: 80px;
  border: none;
  max-width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  color: #fff;
  background-color: #ae86ee;
  padding: 2px 4px;
  border-radius: 6px;
  font-weight: bold;
  margin-left: 4px;
`;

export const EditField = ({ value, onChange, onCLick, cancelHandler }: IProps) => {
  return (
    <>
      <TextareaTitle
        name="title"
        value={ value }
        onChange={ onChange }
      />
      <Button onClick={ onCLick }>Сохранить</Button>
      <Button onClick={ cancelHandler }>Отмена</Button>
    </>
  );
};