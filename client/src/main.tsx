import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Routes } from "./routes.tsx";
import { store } from "./store/configureStore.ts";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Routes />
      </QueryClientProvider>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
