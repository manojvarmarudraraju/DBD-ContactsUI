import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contactsActionCreators from '../redux/actions';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class Contacts extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
        }
    }
    onSearchChange = (event) => {
        console.log(event);
        this.setState({search: event.target.value});
    }

    onSearchClick = (event) => {
        event.preventDefault();
    }

    

    render(){
        console.log(this.state.search);
        return (
            <Card style={{margin: "2%"}}>
                <Card.Body>
                    <Table>
                        <tbody style={{width: "100%"}}>
                            <tr>
                                <td colSpan="2">
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Search"
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                            onChange={this.onSearchChange}
                                        />
                                        <Button onClick={this.onSearchClick} variant="outline-secondary" id="button-addon2">
                                            Search
                                        </Button>
                                    </InputGroup>
                                </td>
                                <td colSpan="1">
                                    <Button variant="outline-secondary" id="button-addon2">
                                        ADD
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card> 
        );
    }
}

function mapStateToProps(state) {
    return {
      data: state.contacts.data
    }
}

function mapDispatchToProps(dispatch) {
    const contactsActionDispatchers = bindActionCreators(contactsActionCreators, dispatch);
    return contactsActionDispatchers;
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);