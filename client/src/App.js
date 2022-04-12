import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Folder from './components/Folder/Folder'
import Register from './components/Register/Register';

function App() {
  
  return (
    <div className="App">
        <Route path='/' component={NavBar}/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/folder/:id' component={Folder} />
        <Route exact path='/register' component={Register} />
    </div>
  );
}

export default App;