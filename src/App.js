import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/snippets/NavBar';
import Footer from './components/snippets/Footer';
import Search from './components/Search';
import About from './components/About';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import ShowDetails from './components/ShowDetails';

function App() {
  return (
    <>
      <Router basename="tiwflix">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie" element={<CategoryPage category="movie"/>} />
          <Route path="/tv" element={<CategoryPage category="tv"/>} />
          <Route path="/:category/:id/" element={<ShowDetails />} />
          <Route path="/:category/:id/season/:season/episode/:episode" element={<ShowDetails />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/about/" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
