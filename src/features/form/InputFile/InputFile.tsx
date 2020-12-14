import React from "react";
import styled from "styled-components";

interface IProps {
  isPending: boolean;
  image: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

const Text = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const HiddenInput = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  top: 0;
  left: 0;
`;

const Label = styled.label<Pick<IProps, 'image'>>`
  box-sizing: border-box;
  width: 100%;
  position: relative;
  cursor: pointer;
  border: 4px solid ${ ({ image }) => image ? '#39aebc' : '#000' };
  padding: 6px 15px;
  border-radius: 16px;
  margin: 0 0 16px;
  transition: border .4s;

  :hover {
    border: 4px solid #ae86ee;
  }
`;

export const InputFile = ({ onChange, image, isPending }: IProps) => {
  return (
    <Label htmlFor="imageFileInput" image={ image }>
      <HiddenInput type="file" onChange={ onChange } name="imageFileInput" id="imageFileInput" />
      { image ?
        <Text>Картинка загружена</Text> :
        isPending ? <Text>Загрузка картинки...</Text> : <Text>Выбрать картинку</Text> }
    </Label>
  );
};