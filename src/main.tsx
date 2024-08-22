/*
 * @Author: yjl
 * @Date: 2024-08-21 09:09:24
 * @LastEditors: yjl
 * @Description: 描述
 */
import { StrictMode, Suspense } from "react";

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "uno.css";
import { Spin } from "antd";
import { BrowserRouter } from "react-router-dom";
import { setupProdMockServer } from "../mock/_createProductionServer";

setupProdMockServer();
createRoot(document.getElementById("root")!).render(

  <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<Spin fullscreen />}>
          <App />
        </Suspense>
      </BrowserRouter>
  </StrictMode>
);
