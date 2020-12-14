import React from "react";
import { loadImageToServe, loadNewsToServer } from "../newsSlice";
import { clearStatusMessage } from '../../form/formSlice';
import { Form, InputFile, TextArea, Input, Button, StatusMessage } from "../../form/";
import useAddForm from './useAddForm';
import { Title } from "../../../components/Title/Title";
import { withAuth } from "../../../firebase/withAuth";


export const AddNews = withAuth(({ isAuth }) => {
  const {
    isValidate,
    setValidate,
    values,
    setValues,
    dispatch,
    imageLink,
    statusMessage,
    isError,
    pending,
    pendingImage,
  } = useAddForm();

  const validateForm = ({ currentTarget }: React.ChangeEvent<HTMLFormElement>) => {
    if (statusMessage) {
      dispatch(clearStatusMessage());
    }

    if (currentTarget.checkValidity() && imageLink) {
      setValidate(true);
      return;
    }

    setValidate(false);
  };

  const fileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files[0];
      await dispatch(loadImageToServe(file));
      if (values.link && values.title) {
        setValidate(true);
      }
    } catch {
      console.error('Ошибка загрузки:(');
    }
  };

  const changeValuesHandler = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, link } = values;
    const date = Date.now();

    await dispatch(loadNewsToServer({
      title,
      link,
      date,
      img: imageLink,
    }));

    await setValues({ title: '', link: '' });
    setValidate(false);
    event.target.reset();
  };

  return (
    <>
      <Title text="Добавить новость" />
      <Form onChange={ validateForm } onSubmit={ submitHandler }>
        <InputFile onChange={ fileChangeHandler } image={ imageLink } isPending={ pendingImage } />
        <Input
          onChange={ changeValuesHandler }
          value={ values.link }
        />
        <TextArea
          onChange={ changeValuesHandler }
          value={ values.title }
        />
        <StatusMessage isError={ isError } text={ statusMessage } />
        <Button isValidate={ isValidate && isAuth } pending={ pending } />
      </Form>
    </>
  );
});