import {
  useCallback,
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

function useStateIfMounted<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const [state, _setState] = useState(initialState);

  const setState = useCallback((value: S | SetStateAction<S>) => {
    if (isMounted.current) {
      _setState(value);
    }
  }, []);

  return [state, setState];
}

export default useStateIfMounted;
