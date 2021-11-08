import {Component} from 'react';
import { connect } from 'react-redux';
import * as boot from 'react-bootstrap';
import { withRouter } from "react-router";
import * as contactsActionCreators from '../redux/actions';
import { bindActionCreators } from 'redux';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.setState(this.props.search);
    }

    onSearchChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    
    addRedirect = () => {
        this.props.history.push('/add');
    }

    Search = () => {
        console.log(this.state);
        this.props.getWithSearch(this.state.search);
    }

    render(){
        var search = this.state.search;
        return (
            <boot.Card>
                <boot.Card.Header>Search</boot.Card.Header>
                <boot.Card.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <boot.Form.Control type="text" placeholder="Search" name="search" value={search} onChange={this.onSearchChange} />
                            </div>
                            <div className="col-md-2">
                                <boot.Button variant="outline-secondary" id="button-addon2-search" onClick={()=> {this.Search()}}>
                                    Search
                                </boot.Button>
                            </div>
                            <div className="col-md-2">
                                <boot.Button variant="outline-secondary" id="button-addon2-add" onClick={()=> {this.addRedirect()}}>
                                    ADD
                                </boot.Button>
                            </div>
                        </div>
                    </div>
                </boot.Card.Body>
            </boot.Card>
        );
    }
}

var mapStateToProps = (state) => {
    return {
        search: state.contacts.search
    }
}

var mapDispatchToProps = (dispatch) => {
    const contactsActionDispatchers = bindActionCreators(contactsActionCreators, dispatch);
    return contactsActionDispatchers;
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchComponent));