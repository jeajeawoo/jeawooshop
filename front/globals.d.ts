// globals.d.ts
export {};

declare global {
  interface Window {
    daum: any; // daum API를 사용할 수 있도록 타입을 any로 지정
  }
}
