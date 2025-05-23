import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Calculator2.css';

const Calculator2 = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // Safely evaluate a mathematical expression
  const safeEval = (expression) => {
    // Convert the expression to a postfix notation and calculate
    try {
      // Remove all whitespace
      expression = expression.replace(/\s+/g, '');
      
      // Basic validation
      if (!/^[0-9+\-*/().÷×%]+$/.test(expression)) {
        throw new Error('Invalid characters');
      }

      // Simple implementation for basic operations
      // This is a simplified version, in a real app you'd want to use
      // a proper parser or library like math.js
      
      // First, handle any × and ÷ symbols
      expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
      
      // Parse and evaluate using Function constructor (safer than eval)
      // Still shouldn't be used with user input in production
      return new Function('return ' + expression)();
    } catch (err) {
      console.error('Calculation error:', err);
      return 'Error';
    }
  };

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const calculatedResult = safeEval(input);
        setResult(String(calculatedResult));
      } catch {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="calculator2-wrapper">
      <h1>Calculator - Style 2</h1>
      <div className="calculator2">
        <div className="calculator2-screen">
          <div className="calculator2-input">{input || '0'}</div>
          <div className="calculator2-result">{result}</div>
        </div>
        <div className="calculator2-buttons">
          <button onClick={() => handleButtonClick('C')} className="calculator2-button calculator2-clear">C</button>
          <button onClick={() => handleButtonClick('DEL')} className="calculator2-button calculator2-delete">DEL</button>
          <button onClick={() => handleButtonClick('%')} className="calculator2-button calculator2-operator">%</button>
          <button onClick={() => handleButtonClick('÷')} className="calculator2-button calculator2-operator">÷</button>
          
          <button onClick={() => handleButtonClick('7')} className="calculator2-button">7</button>
          <button onClick={() => handleButtonClick('8')} className="calculator2-button">8</button>
          <button onClick={() => handleButtonClick('9')} className="calculator2-button">9</button>
          <button onClick={() => handleButtonClick('×')} className="calculator2-button calculator2-operator">×</button>
          
          <button onClick={() => handleButtonClick('4')} className="calculator2-button">4</button>
          <button onClick={() => handleButtonClick('5')} className="calculator2-button">5</button>
          <button onClick={() => handleButtonClick('6')} className="calculator2-button">6</button>
          <button onClick={() => handleButtonClick('-')} className="calculator2-button calculator2-operator">-</button>
          
          <button onClick={() => handleButtonClick('1')} className="calculator2-button">1</button>
          <button onClick={() => handleButtonClick('2')} className="calculator2-button">2</button>
          <button onClick={() => handleButtonClick('3')} className="calculator2-button">3</button>
          <button onClick={() => handleButtonClick('+')} className="calculator2-button calculator2-operator">+</button>
          
          <button onClick={() => handleButtonClick('0')} className="calculator2-button calculator2-zero">0</button>
          <button onClick={() => handleButtonClick('.')} className="calculator2-button">.</button>
          <button onClick={() => handleButtonClick('=')} className="calculator2-button calculator2-equals">=</button>
        </div>
        <div className="navigation-link">
          <Link to="/" className="back-to-calc1">Back to Calculator 1</Link>
        </div>
      </div>
    </div>
  );
};

export default Calculator2; 