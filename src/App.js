import logo from './logo.svg';
import './App.css';
import DateCalculator from './components/DateCalculator'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className='container mt-5 mb-5'>
      <DateCalculator />
    </div>
  );
}

export default App;
