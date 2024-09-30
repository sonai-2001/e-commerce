import './App.css';
import Header from './components/layout/Header';
import { BrowserRouter } from 'react-router-dom';
import Routing from './utils/Routing';
import { Provider } from'react-redux';
import store from './utils/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App" style={{height:"100vh",overflow:"hidden"}} >
      <BrowserRouter>
           
           <Routing/>
      </BrowserRouter>    
    </div>
    </Provider>
  )
}

export default App;
