import {Dispatch, SetStateAction, useCallback, useState} from "react";

// useCallback과 useState 동시에, 타입이 안정해져있을땐 any 혹은 제네릭으로 받기
type ReturnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialData: T) : ReturnTypes<T> => {
    const [value, setValue] = useState(initialData);
    const handler = useCallback((e: any) => {
        setValue(e.target.value);
    }, []);
    return [value, handler, setValue];
};

export default  useInput;