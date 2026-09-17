"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { reduxPersistor, reduxStore } from "@/lib/redux";

export const ReduxProviders = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={reduxPersistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};
