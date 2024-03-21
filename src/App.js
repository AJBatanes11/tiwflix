import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/snippets/NavBar';
import Footer from './components/snippets/Footer';
import ShowDetails from './components/ShowDetails';
import Search from './components/Search';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie" element={<CategoryPage category="movie"/>} />
          <Route path="/tv" element={<CategoryPage category="tv"/>} />
          <Route path="/:category/:id/" element={<ShowDetails />} />
          <Route path="/:category/:id/season/:season/episode/:episode" element={<ShowDetails />} />
          <Route path="/Search/" element={<Search />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
