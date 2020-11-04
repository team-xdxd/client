import Head from 'next/head'

export default () => (
  <Head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-170704013-1"></script>
    <script dangerouslySetInnerHTML={{
      __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'UA-170704013-1');` }}
    />
  </Head>
)