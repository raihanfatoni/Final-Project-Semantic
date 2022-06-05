import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Show Data/Home';

function App() {
  return (
   <Router>
     <Navbar />
     <Routes>
       <Route path="/" element={<Home />}/>
     </Routes>
   </Router>
  );
}

export default App;
