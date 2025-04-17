import { TabConProps } from "@/types/type";
import { useEffect, useState } from "react";

export const TabCon = ({ tab1 }: TabConProps) => {
  const [fade, setFade] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 100);
    return () => {
      setFade('');
    };
  }, [tab1]);

  return (
    <div className={'start ' + fade}>
      {[
        <div key="0">내용0</div>,
        <div key="1">내용1</div>,
        <div key="2">내용2</div>,
      ][tab1]}
    </div>
  );
};