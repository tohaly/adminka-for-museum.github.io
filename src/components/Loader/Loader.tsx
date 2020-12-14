import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderItem = styled.div`
  width: 80px;
  height: 80px;
  animation: ${ spin } 1s linear infinite;
  border: 4px solid #18191a;
  border-bottom-color: #ccc;
  border-top-color: #402f60;
  border-left-color: #39aebc;
  border-radius: 50%;
`;

export const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderItem />
    </LoaderWrapper>
  );
};