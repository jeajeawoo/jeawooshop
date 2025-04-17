// types/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      hover: string;
      border: string;
      textColor: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
    borderRadius: string;
    padding: string;
    margin: string;
    inputWidth: string;
    containerWidth: string;
    containerPadding: string;
  }
}
