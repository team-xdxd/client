import FbPixelScript from '../../../utils/fb-pixel'
import Head from 'next/head'

export default () => (
  <Head>
    {process.env.INCLUDE_PIXEL === 'yes' &&
      <FbPixelScript />
    }
  </Head>
)