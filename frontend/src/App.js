import { Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';


function App() {
  return (
    <div className= "App">
      <Route path = '/' component={Homepage} exact/>
      <Route path = '/chats' component={ChatPage}/>
      <Route path = '/login' component={Login}/>
      <Route path = '/signup' component={Signup}/>
    </div>
  );
}

export default App;
