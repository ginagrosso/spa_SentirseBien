import '../styles/globals.css'
import '@fontsource/roboto';
import '@fontsource/amiri';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  );
}