import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import cn from "classnames";
import style from "./style.module.scss";
import { useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { errorSelectors, setError } from "store/errorSlice";
import { CloseIcon } from "components/svgIcons";

const Toast: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const dispatch = useAppDispatch();

  const error = useSelector(errorSelectors.selectError);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    let timer: ReturnType<typeof setTimeout>;
    timer = setTimeout(() => {
      dispatch(setError(null));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      timer = setTimeout(() => {
        handleClose();
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, handleClose]);

  if (error && !children) {
    return (
      <div
        className={cn(
          style.toast,
          style.toast_error,
          isOpen && style.toast_open
        )}
        onClick={handleClose}
      >
        <div className={style.toast__body}>
          <div className={style.toast__title}>Error</div>
          <div className={style.toast__text}>{error.message}</div>
        </div>
        <button
          type="button"
          className={style.toast__close}
          onClick={handleClose}
        >
          <CloseIcon fill="#FFFFFF" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn(style.toast, style.toast_success)} onClick={handleClose}>
      <div className={style.toast__body}>{children}</div>
      <button
        type="button"
        className={style.toast__close}
        onClick={handleClose}
      >
        <CloseIcon fill="#FFFFFF" />
      </button>
    </div>
  );
};

export default Toast;
