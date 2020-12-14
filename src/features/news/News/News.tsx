import React from "react";
import styled from "styled-components";
import { INews } from "../../../firebase/endpoints";
import { changeDate, removeNewsHandler, replaceNews } from "../newsSlice";
import { useDispatch } from "react-redux";
import { withAuth } from "../../../firebase/withAuth";

interface IButtonStyleProps {
  top: string;
  right?: string;
  left?: string;
}

const NewsStyled = styled.li`
  padding: 0;
  width: 150px;
  position: relative;
  border: 2px solid #ae86ee;
  border-radius: 8px;
  overflow: hidden;
`;

const Link = styled.a`
  text-decoration: none;
  display: block;
`;

const NewsImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center;
`;

const NewsTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  color: #000;
  text-align: center;
`;

const ControlButton = styled.button<IButtonStyleProps>`
  position: absolute;
  top: ${ ({ top }) => top || 'auto' };
  right: ${ ({ right }) => right || 'auto' };
  left: ${ ({ left }) => left || 'auto' };
  text-align: center;
  padding: 0;
  width: 20px;
  height: 20px;
  border: none;
  color: #fff;
  background-color: #ae86ee;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity .2s;

  :hover {
    opacity: .6;
  }

  :disabled {
    cursor: default;
    background-color: #c7c7c7;

    :hover {
      opacity: 1;
    }
  }
`;

type Props = {
  isLeft: boolean;
  isRight: boolean;
  isAuth: boolean;
} & INews

export const News = withAuth(({ date, img, link, title, id, isLeft, isRight, isAuth }: Props) => {
  const dispatch = useDispatch();

  const getArrWithDateAndId = (firstElement: HTMLElement, secondElement: HTMLElement) => {
    const newsOne = {
      id: firstElement.dataset.id,
      date: Number(firstElement.dataset.date),
    };

    const newsTwo = {
      id: secondElement.dataset.id,
      date: Number(secondElement.dataset.date),
    };

    return [ newsOne, newsTwo ];
  };

  const removeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const parentClass: string = NewsStyled.styledComponentId;
    const element = (event.target as HTMLElement);
    const parent = element.closest(`.${ parentClass }`) as HTMLElement;
    const id = parent.dataset.id;
    dispatch(removeNewsHandler(id));
  };

  const moveLefter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const parentClass: string = NewsStyled.styledComponentId;
    const element = (event.target as HTMLElement);
    const elementOne = element.closest(`.${ parentClass }`) as HTMLElement;
    const elementTwo = elementOne.previousElementSibling as HTMLElement;

    dispatch(changeDate(getArrWithDateAndId(elementOne, elementTwo)));
  };

  const moveRighter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const parentClass: string = NewsStyled.styledComponentId;
    const element = (event.target as HTMLElement);
    const elementOne = element.closest(`.${ parentClass }`) as HTMLElement;
    const elementTwo = elementOne.nextElementSibling as HTMLElement;

    dispatch(changeDate(getArrWithDateAndId(elementOne, elementTwo)));
  };

  return (
    <NewsStyled data-id={ id } data-date={ date }>
      <ControlButton onClick={ removeHandler } top="0" right="0" disabled={ !isAuth }>X</ControlButton>
      { !isLeft &&
      <ControlButton onClick={ moveLefter } top="50px" left="0" disabled={ !isAuth }>{ '<' }</ControlButton> }
      { !isRight &&
      <ControlButton onClick={ moveRighter } top="50px" right="0" disabled={ !isAuth }>{ '>' }</ControlButton> }
      <Link target="_blank" href={ link }>
        <NewsImage src={ img } alt={ title } />
        <NewsTitle>{ title }</NewsTitle>
      </Link>
    </NewsStyled>
  );
});