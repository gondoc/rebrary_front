import "./assets/css/common.css";
import "./assets/css/home.css";
// import "./assets/css/main.css"
import "./assets/css/login.css";
import "./assets/css/join.css";
import "./assets/css/find.css";
import "./assets/css/fontStyle.css";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import JoinPage from "./pages/JoinPage.tsx";
import FindPage from "./pages/FindPage.tsx";

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={"/rebrary"}>
      <Routes>
        {/*<Route path={"/home"} element={<HomePage/>}/>*/}
        {/*<Route path={"/main"} element={<MainPage/>}/>*/}
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/join"} element={<JoinPage />} />
        <Route path={"/find"} element={<FindPage />} />
        <Route path={"/*"} element={<>404page</>} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
