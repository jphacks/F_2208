import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./pages/Top";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
