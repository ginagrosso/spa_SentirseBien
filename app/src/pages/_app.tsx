// src/pages/_app.tsx
import '../styles/globals.css';
import '@fontsource/roboto';
import '@fontsource/amiri';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <Toaster position="top-right" />
        </AuthProvider>
    );
}
