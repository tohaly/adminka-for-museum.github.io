import React, { useEffect, memo } from "react";
import styled from 'styled-components';
import { fetchNewsList, selectNewsList, selectPending, sleetErrorMessage } from "./newsSlice";
import { useSelector } from "react-redux";
import { News } from "./News/News";
import { Loader } from "../../components/Loader/Loader";
import { Title } from "../../components/Title/Title";

const List = styled.ul`
  padding: 0 32px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 8px;
  justify-content: center;
`;

export const NewsList = memo(() => {
  const newList = useSelector(selectNewsList);
  const pending = useSelector(selectPending);
  const error = useSelector(sleetErrorMessage);

  if (pending) {
    return (
      <>
        <Title text="Список новостей" />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Title text="Список новостей" />
      { pending && <Loader /> }
      { error && <p>{ error }</p> }
      <List>
        { newList.map((news, index, arr) => {
          let isRight = false;
          let isLeft = false;

          if (index === 0) {
            isLeft = true;
          }

          if (index === arr.length - 1) {
            isRight = true;
          }

          return <News isRight={ isRight } isLeft={ isLeft } key={ news.id } { ...news } />;
        }) }
      </List>
    </>
  );
});

