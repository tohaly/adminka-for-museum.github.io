import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../features/auth/authSlice";

interface IWithAuthProps {
  isAuth: boolean;
}

export const withAuth = <T extends IWithAuthProps>(WrappedComponent: React.ComponentType<T>) => {

  return (props: Omit<T, keyof IWithAuthProps>) => {
    const isAuth = useSelector(selectIsAuth);

    return <WrappedComponent isAuth={ isAuth } { ...(props as T) } />;
  };
};
;