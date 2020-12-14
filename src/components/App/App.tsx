import React, { useEffect } from 'react';
import { NewsList } from "../../features/news/NewsList";
import { AddNews } from "../../features/news/AddNews/AddNews";
import { Header } from "../Header/Header";
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';
import { fetchNewsList } from "../../features/news/newsSlice";
import { useDispatch } from "react-redux";
import { Main } from "../Main/Main";
import { checkUserAuthorize } from "../../features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuthorize());
  }, [ dispatch ]);

  useEffect(() => {
    dispatch(fetchNewsList());
  }, [ dispatch ]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={ Main } />
        <Route path='/add' component={ AddNews } />
        <Route path='/list' component={ NewsList } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
