import React from "react";
import styled from "styled-components";

const NotFoundStyled = styled.p`
  font-size: 60px;
  text-align: center;
  font-weight: bold;
`;

export const NotFound = () => {
  return (
    <NotFoundStyled>Not found 404 :(</NotFoundStyled>
  );
};