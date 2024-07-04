
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page1 from "./pages/Page1.tsx";
import Page2 from "./pages/Page2.tsx";
import PrivateRoute from "./pages/PrivateRoute";
import PageNotFound from "./pages/PageNotFound.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route element={<PrivateRoute />}>
          <Route path="/page2" element={<Page2 />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
