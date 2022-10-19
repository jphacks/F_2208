import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import auth from "./api/auth";
import { fetchUser } from "./api/user";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import Top from "./pages/Top";
import UserSettings from "./pages/UserSettings";
import { css } from "@emotion/react";
import "./App.css";
import { useUser } from "./contexts/userContext";
import { userContext } from "./contexts/userContext";
import Profile from "./pages/Profile";
import Header from "./components/Header/Header";

const queryClient = new QueryClient();

const App = () => {
  const user = useUser();

  // 認証ありページ
  const guards = ["/dashboard", "/users", "/users/settings", "/tasks"];

  useEffect(() => {
    (async () => {
      const res = await fetchUser();
      const pathname = window.location.pathname;
      if (guards.includes(pathname)) {
        auth(res.data);
      }
      user.setUser(res.data);
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Header />
          <main
            css={css`
              margin-top: 80px;
              @media screen and (min-width: 600px) {
                margin-top: 68px;
              }
            `}
          >
            <Routes>
              <Route index element={<Top />} />
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/users/:userId" element={<Profile />} />
              <Route path="/users/settings" element={<UserSettings />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </userContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
