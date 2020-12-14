import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormErrorStatus,
  selectImageLink,
  selectPendingForm,
  selectStatusText,
  selectLoadImagePending,
} from "../../form/formSlice";

const useAddForm = () => {
  const [ isValidate, setValidate ] = useState(false);
  const [ values, setValues ] = useState({ title: '', link: '' });

  const dispatch = useDispatch();
  const imageLink = useSelector(selectImageLink);
  const statusMessage = useSelector(selectStatusText);
  const isError = useSelector(selectFormErrorStatus);
  const pending = useSelector(selectPendingForm);
  const pendingImage = useSelector(selectLoadImagePending);

  return {
    isValidate, setValidate, values, setValues, dispatch, imageLink, statusMessage, isError, pending, pendingImage,
  };
};

export default useAddForm;