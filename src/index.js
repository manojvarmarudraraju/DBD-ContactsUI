import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import EditContact from './EditContact';



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store} >
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">My Contacts</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Container>
          </Navbar>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/add' component={App} />
          <Route path='/edit/:index' component={EditContact} />
          <App />
        </Switch>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
