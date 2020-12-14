import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  INews,
  loadImageAndGetUrl,
  loadNews,
  loadSingleNewsAndGetId,
  removeNewsFromServer,
  updateDateOnServer, updateTitleOnServer,
} from "../../firebase/endpoints";
import {
  formStartPending,
  formStopPending,
  setFormError,
  setFormSuccess,
  setImage,
  startLoadImagePending,
  stopLoadImagePending,
} from "../form/formSlice";
import { AppThunk, RootState } from "../../app/store";

interface INewsState {
  list: INews[];
  pending: boolean;
  error: string;
}

const initialState: INewsState = {
  list: [],
  pending: false,
  error: '',

};

const news = createSlice({
  name: 'news',
  initialState,
  reducers: {
    getNewsListStart(state) {
      state.pending = true;
    },
    getNewsListStop(state) {
      state.pending = false;
    },
    getNewsListSuccess(state, { payload }: PayloadAction<INews[]>) {
      state.list.push(...payload);
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    addNews(state, { payload }: PayloadAction<INews>) {
      state.list.push(payload);
    },
    removeNews(state, { payload }: PayloadAction<string>) {
      state.list = state.list.filter(({ id }) => id !== payload);
    },
    replaceNews(state, { payload }) {
      const { dateOne, dateTwo } = payload;

      const news = state.list.map((news) => {
        console.log(news.date, dateTwo);
        if (news.date === dateOne) {
          return {
            ...news,
            date: dateTwo,
          };
        }

        if (news.date === dateTwo) {
          return {
            ...news,
            date: dateOne,
          };
        }

        return news;
      });

      console.log(news);
      state.list = news;
    },
    changeNewsTitle(state, { payload }) {
      const { id, title } = payload;

      state.list = state.list.map(news => {
        if (id === news.id) {
          return {
            ...news,
            title,
          };
        }

        return news;
      });
    },
  },
});

export const {
  getNewsListStart,
  getNewsListSuccess,
  setError,
  getNewsListStop,
  addNews,
  removeNews,
  replaceNews,
  changeNewsTitle
} = news.actions;

export const fetchNewsList = (): AppThunk => async dispatch => {
  try {
    dispatch(getNewsListStart());
    const list = await loadNews();
    dispatch(getNewsListSuccess(list));
  } catch {
    dispatch(setError('Ошибка загрузки новостей'));
  } finally {
    setTimeout(() => {
      dispatch(getNewsListStop());
    }, 2000);
  }
};

export const loadNewsToServer = (data: Omit<INews, 'id'>): AppThunk => async dispatch => {
  try {
    dispatch(formStartPending());
    const id = await loadSingleNewsAndGetId(data);
    dispatch(addNews({ ...data, id }));
    dispatch(setFormSuccess('Новость успешно загружена'));
  } catch {
    dispatch(setFormError('Ошибка загрузки новости:('));
  } finally {
    setTimeout(() => {
      dispatch(formStopPending());
    }, 2000);
  }
};

export const loadImageToServe = (file: File): AppThunk => async dispatch => {
  try {
    dispatch(startLoadImagePending());
    const imgUrl = await loadImageAndGetUrl(file);
    dispatch(setImage(imgUrl));
  } catch {
    dispatch(setFormError('Ошибка загрузки картинки:('));
  } finally {
    dispatch(stopLoadImagePending());
  }
};

export const removeNewsHandler = (id: string): AppThunk => async dispatch => {
  try {
    await removeNewsFromServer(id);
    dispatch(removeNews(id));
  } catch (err) {
    console.error(err);
  }
};

export const changeDate = ([ newsOne, newsTwo ]: { id: string, date: number }[]): AppThunk => async dispatch => {
  try {
    await updateDateOnServer(newsOne.id, newsTwo.date);
    await updateDateOnServer(newsTwo.id, newsOne.date);
    dispatch(replaceNews({ dateOne: newsOne.date, dateTwo: newsTwo.date }));
  } catch (err) {
    console.error(err);
  }
};


export const changeTitle = (id: string, title: string): AppThunk => async dispatch => {
  try {
    await updateTitleOnServer(id, title);
    dispatch(changeNewsTitle({id, title}));
  } catch (err) {
    console.error(err);
  }
};

export const selectNewsList = (state: RootState) => {
  const arr = [ ...state.news.list ];
  return arr.sort((a, b) => b.date - a.date);
};
export const selectPending = (state: RootState) => state.news.pending;
export const sleetErrorMessage = (state: RootState) => state.news.error;

export default news.reducer;