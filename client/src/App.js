import Wrapper from './Component/Wrapper';
import DetailPage from './Component/DetailPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Wrapper />} />
          <Route exact path="/detail-page" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;






