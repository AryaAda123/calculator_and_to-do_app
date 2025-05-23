import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css'
import Calculator1 from './components/Calculator1';
import TodoApp from './components/TodoApp';

function App() {
  useEffect(() => {
    // Set page title
    document.title = 'Calculator & Todo App';
    
    // Apply Poppins font to the whole app
    document.body.style.fontFamily = "'Poppins', sans-serif";
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Calculator1 />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
