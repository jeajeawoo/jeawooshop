import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  // getInitialProps는 SSR에서 페이지를 렌더링하고 필요한 props를 초기화하는 역할을 합니다.
  static async getInitialProps(ctx:DocumentContext) {
    // styled-components의 서버사이드 스타일 시트를 생성합니다.
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // 페이지를 렌더링하여 스타일을 추출합니다.
      // App 컴포넌트를 감싸서 styled-components의 스타일을 수집합니다.
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      // 기본적으로 페이지의 초기 props를 가져옵니다.
      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        // 여기서 추출한 styled-components 스타일을 초기 props에 삽입합니다.
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}  {/* 서버사이드 렌더링에서 추출한 스타일 */}
          </>
        ),
      }
    } finally {
      // 메모리 릭을 방지하기 위해 style sheet를 닫습니다.
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
