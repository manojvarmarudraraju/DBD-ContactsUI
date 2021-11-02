import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import * as contactsActionCreators from './redux/actions';
import Loading from './Loading';
import Contacts from './Contacts';

class App extends React.Component{

  componentDidMount(){
    console.log(this.props);
    this.props.loadData();
  }

  render(){
    const { data, loading, error } = this.props;
    console.log(data);
    return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">My Contacts</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </Container>
        </Navbar>
        {loading ? <Loading/>:<Contacts/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.contacts.data,
    loading: state.contacts.loading,
    error: state.contacts.error
  }
}

function mapDispatchToProps(dispatch) {
  const contactsActionDispatchers = bindActionCreators(contactsActionCreators, dispatch);
  return contactsActionDispatchers;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
