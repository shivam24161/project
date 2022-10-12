import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Login from './Login/Login';
import Signup from './Login/Signup';
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </>
  );
}
export default App;
