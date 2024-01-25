import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Details from './views/Details/Details';
import AppProvider from './providers/AppProvider';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:catId" element={<Details />} />
          <Route path="/?breed=:breedId" element={<Home />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
