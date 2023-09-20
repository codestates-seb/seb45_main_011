import { useEffect } from 'react';

type Callback = () => (() => void) | void;

const useEffectOnce = (callback: Callback) => useEffect(() => callback(), []);

export default useEffectOnce;
