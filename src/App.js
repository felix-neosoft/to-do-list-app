import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from './pages/Index';
import TodoList from './pages/TodoList';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/todolist" exact component={TodoList}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
