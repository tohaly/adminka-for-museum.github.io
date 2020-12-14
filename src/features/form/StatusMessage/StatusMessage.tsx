import React from "react";
import styled from "styled-components";

interface IProps {
  text: string;
  isError: boolean;
}

export const StatusMessageStyled = styled.p<Pick<IProps, 'isError'>>`
  font-size: 14px;
  color: ${ ({ isError }) => isError ? '#d6676f' : '#8bb16f' };
  text-align: center;
  margin: 8px 0;
`;

export const StatusMessage = ({ text, isError }: IProps) => {
  return (
    <StatusMessageStyled isError={ isError }>{ text }</StatusMessageStyled>
  );
};