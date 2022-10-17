import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./pages/Top";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Top />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
