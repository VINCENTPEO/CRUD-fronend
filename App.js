import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './form';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/Form"} element={<Form/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
