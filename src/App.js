import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import * as FireStoreService from './services/firebase'
import AdminPage from './Pages/AdminPage';
import GamePage from './Pages/GamePage';


function App() {
  const [activeCategory, setActiveCategory] = useState('none');
  const [nrCorrectAnswers, setNrCorrectAnswers] = useState(0);
  return(
    <div>

      <Link to="/admin">Admin</Link>
      <Link to="/">Game</Link>


      <Routes>
        <Route path="/" element={<GamePage category={activeCategory} nrAnswers={nrCorrectAnswers}></GamePage>} />
        <Route path="admin" element={<AdminPage activeCategory={activeCategory} setActiveCategory={setActiveCategory}
          setNrCorrectAnswers={setNrCorrectAnswers} />} />
      </Routes>

    </div>
  );
}



export default App;
