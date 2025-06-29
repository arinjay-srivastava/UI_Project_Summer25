import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <h1>NotePad</h1>
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;