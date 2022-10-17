import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import Top from "./pages/Top";
import User from "./pages/User";
import UserSettings from "./pages/UserSettings";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Top />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/users/:userId/settings" element={<UserSettings />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
