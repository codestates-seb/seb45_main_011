import { useEffect } from 'react';

type EffectCallback = () => void | (() => void | undefined);

export default function useEffectOnce(callback: EffectCallback) {
  useEffect(() => {
    callback();
  }, []);
}
