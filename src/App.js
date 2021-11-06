import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import * as contactsActionCreators from './redux/actions';
import Loading from './Loading';
import Contacts from './Contacts';

class App extends React.Component{

  componentDidMount(){
    console.log(this.props);
    if(this.props.reload){
      this.props.loadData();
    }   
  }

  render(){
    const { data, loading, error } = this.props;
    console.log(loading);
    return (
      <div className="App">
        {loading ? <Loading/>:<Contacts/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.contacts.data,
    loading: state.contacts.data_loading,
    error: state.contacts.error,
    reload: state.contacts.reload
  }
}

function mapDispatchToProps(dispatch) {
  const contactsActionDispatchers = bindActionCreators(contactsActionCreators, dispatch);
  return contactsActionDispatchers;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
