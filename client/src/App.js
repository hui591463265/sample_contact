import React,{Component} from 'react';
import Header from './components/Header'
import Contactlist from './components/Contactlist';
import 'bootstrap/dist/css/bootstrap.min.css';
import{Container} from 'reactstrap';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component {

render(){
  return (
    <Provider store={store}>
      <div className="App">
        <Container>
          <Header />
        </Container>
        <Contactlist />
      </div>
    </Provider>
  );
}

}
export default App;
