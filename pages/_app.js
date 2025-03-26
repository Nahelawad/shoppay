import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist"; // Correct import
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";

let persistor = persistStore(store); // Correct usage of persistStore

export default function App({ Component,pageProps: { session, ...pageProps } }) {
  return (

    <>

      <Head>
        <title>Shoppay</title>
        <meta name="description" content="Shoppay-online shopping service"/>
        <link rel="icon" href="logo.png"/>
      </Head>

      <SessionProvider session={session}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* 'loading' should be lowercase */}
        <PayPalScriptProvider options={{"clientId":process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}}>
        <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
        <Component {...pageProps} />
        </PayPalScriptProvider>
      </PersistGate>
    </Provider>
    </SessionProvider>
    </>
    
  );
}
