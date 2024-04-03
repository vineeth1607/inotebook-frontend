import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router and Routes
import 'bootstrap/dist/css/bootstrap.min.css';
import Customnavbar from './components/Customnavbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <Router>
        <NoteState>
          <Customnavbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
