import { useState } from "react";

// 제네릭 타입을 추가하여 다양한 타입을 처리할 수 있게 변경
function useForm<T>(initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as T);  // 값이 정확하게 T 타입으로 처리될 수 있게 합니다
    };

    return [value, onChange] as const; // 튜플 타입을 반환하여 구조분해 할당을 안전하게 처리합니다.
}

export default useForm;
