import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Notes } from './components/Notes';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alert/AlertState';
import { Alert } from './components/Alert';

function App() {
  return (
    <>
      <AlertState>
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <div className='container'>
              <Alert/> 
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/notes' element={<Notes />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
              </Routes>
            </div>
          </BrowserRouter>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
