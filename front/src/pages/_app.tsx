import MainLayout from "@/layout/MainLayout";
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from "@/store";
import { Provider } from "react-redux";
import { ShoesProvider } from "@/context/shoescontext";
import { TabProvider } from "@/context/tabmenucontext";
import { AuthProvider } from "@/context/Authcontext";
import { ThemeProvider } from "styled-components";
import { theme } from "@/theme/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <TabProvider>
            <ShoesProvider>
              <MainLayout>
                <Provider store={store}> 
                  <Component {...pageProps} />
                </Provider>
              </MainLayout>
            </ShoesProvider>
          </TabProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}
