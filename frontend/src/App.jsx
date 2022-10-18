import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import auth from "./api/auth";
import { fetchUser } from "./api/user";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import Top from "./pages/Top";
import User from "./pages/User";
import UserSettings from "./pages/UserSettings";
import { css } from "@emotion/react";

const queryClient = new QueryClient();

export const userContext = createContext();

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      const res = await fetchUser();
      const pathname = window.location.pathname;
      if (pathname !== "/") {
        auth(res.data);
      }
      setUser(res.data);
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Header />
          <main
            css={css`
              margin-top: 70px;
              @media screen and (min-width: 600px) {
                margin-top: 80px;
              }
            `}
          >
            <Routes>
              <Route index element={<Top />} />
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/users/:userId" element={<User />} />
              <Route
                path="/users/:userId/settings"
                element={<UserSettings />}
              />
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
