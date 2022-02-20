import logo from './logo.svg';
import './App.css';
import List from './Components/List';
import Form from './Components/Form';

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form/>
        <List/>
      </div>
    </div>
  );
}

export default App;
