import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@fontsource/roboto'; 
import '@fontsource/amiri'; 

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
