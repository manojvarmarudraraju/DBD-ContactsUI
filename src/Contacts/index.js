import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contactsActionCreators from '../redux/actions';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import * as boot from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { withRouter } from "react-router";

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

    addressItem = (add_arr) => {
        var options = this.props.options.filter((values) => {return values.TYPE_CONNECTION === 2});
        var options_map = {};
        options.forEach((values) => {
            options_map[values.TYPE_IDENTIFIER] = values;
        });
        return (
            <div>
                {add_arr.map((values, index) => {
                    if(values.address_type in options_map){
                        return (
                        <Card style={{margin: "2%"}}>
                            <Card.Header>
                                {options_map[parseInt(values.address_type)]["TYPE_VALUE"]}
                            </Card.Header>
                            <Card.Body>
                            <boot.Row>
                                <boot.Col>
                                    <boot.FloatingLabel
                                        controlId="floatingInput"
                                        label="Address"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Readonly input here..." value={values.address!==null && values.address !==undefined? values.address:" "} readOnly />
                                    </boot.FloatingLabel>
                                </boot.Col>
                                <boot.Col>
                                    <boot.FloatingLabel
                                        controlId="floatingInput"
                                        label="City"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Readonly input here..." value={values.city!==null && values.city!==undefined?values.city:" "} readOnly />
                                    </boot.FloatingLabel>
                                </boot.Col>
                                <boot.Col>
                                    <boot.FloatingLabel
                                        controlId="floatingInput"
                                        label="State"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Readonly input here..." value={values.state!==null || values.state!==undefined?values.state:" "} readOnly />
                                    </boot.FloatingLabel>
                                </boot.Col>
                                <boot.Col>
                                    <boot.FloatingLabel
                                        controlId="floatingInput"
                                        label="ZIP"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Readonly input here..." value={values.zip!==null || values.zip!==undefined?values.zip:" "} readOnly />
                                    </boot.FloatingLabel>
                                </boot.Col>
                            </boot.Row>
                            </Card.Body>
                        </Card>
                        );
                    } else{
                        console.log("Important", values);
                        return (<div></div>);
                    }
                })}
            </div>   
        );
    }

    phoneItem = (phone_vals) => {
        var options = this.props.options.filter((values) => {return values.TYPE_CONNECTION === 1});
        var options_map = {};
        options.forEach((values) => {
            options_map[values.TYPE_IDENTIFIER] = values;
        });
        return (
            <div>
                {
                    phone_vals.map((values) => {
                        if(values.phone_type in options_map) {
                        return (
                            <Card style={{margin: "2%"}}>
                                <Card.Header>
                                    {options_map[parseInt(values.phone_type)]["TYPE_VALUE"]}
                                </Card.Header>
                                <Card.Body>
                                    <boot.Row>
                                        <boot.Col>
                                            <boot.FloatingLabel
                                            controlId="floatingInput"
                                            label="Area Code"
                                            className="mb-3"
                                            >
                                                <Form.Control type="text" placeholder="Readonly input here..." value={values.area_code!==null || values.area_code!==undefined?values.area_code:" "} readOnly />
                                            </boot.FloatingLabel>
                                        </boot.Col>
                                        <boot.Col>
                                            <boot.FloatingLabel
                                            controlId="floatingInput"
                                            label="Mobile Number"
                                            className="mb-3"
                                            >
                                                <Form.Control type="text" placeholder="Readonly input here..." value={values.mobile_number!==null || values.mobile_number!==undefined?values.mobile_number:" "} readOnly />
                                            </boot.FloatingLabel>

                                        </boot.Col>
                                    </boot.Row>
                                </Card.Body>
                            </Card>
                        )
                        
                        }
                    else {
                        return (<div></div>);
                    }
                })}
            </div>
        );
    }

    dateItem = (date_arr) => {
        var options = this.props.options.filter((values) => {return values.TYPE_CONNECTION === 3});
        var options_map = {};
        options.forEach((values) => {
            options_map[values.TYPE_IDENTIFIER] = values;
        });
        return (<div>
            { date_arr.map((values) => {

                if(values.date_type in options_map){
                    return (
                        <Card style={{margin: "2%"}}>
                            <Card.Header>
                                {options_map[parseInt(values.date_type)]["TYPE_VALUE"]}
                            </Card.Header>
                            <Card.Body>
                                <boot.Row>
                                    <boot.Col>
                                        <boot.FloatingLabel
                                        controlId="floatingInput"
                                        label="Date"
                                        className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="Readonly input here..." value={values.date_date!==null || values.date_date!==undefined?values.date_date:" "} readOnly />
                                        </boot.FloatingLabel>
                                    </boot.Col>
                                </boot.Row>
                            </Card.Body>
                        </Card>
                    );
                } else{
                    return (<div></div>);
                }
            })}
        </div>);
    }

    contactItem = (index) => {
        var data = this.props.data[index];

        return (
            <div>
                <boot.Row>
                    <boot.Col>
                        <boot.FloatingLabel
                            controlId="floatingInput"
                            label="First Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Readonly input here..." value={data.fname!==null && data.fname!==undefined?data.fname:" "} readOnly />
                        </boot.FloatingLabel>
                    </boot.Col>
                    <boot.Col>
                        <boot.FloatingLabel
                            controlId="floatingInput"
                            label="Middle Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Readonly input here..." value={data.mname!==null && data.mname!==undefined?data.mname:" "} readOnly />
                        </boot.FloatingLabel>
                    </boot.Col>
                    <boot.Col>
                        <boot.FloatingLabel
                            controlId="floatingInput"
                            label="Last Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Readonly input here..." value={data.lname!==null || data.lname!==undefined?data.lname:" "} readOnly />
                        </boot.FloatingLabel>
                    </boot.Col>
                </boot.Row>
                {data.address.length > 0 ?
                <Card>
                    <h4>Addresses</h4>
                    <Card.Body>
                        {this.addressItem(data.address)}
                    </Card.Body>
                </Card>
                :<div></div>}
                {data.phone.length > 0?
                <Card className="mt-1">
                    <h4>Phone</h4>
                    <Card.Body>
                        {this.phoneItem(data.phone)}
                    </Card.Body>
                </Card>
                : <div></div>}
                
                {data.date.length > 0?<Card className="mt-1">
                    <h4>Date</h4>
                    <Card.Body>
                        {this.dateItem(data.date)}
                    </Card.Body>
                </Card>:<div></div>}
            </div>
        );
    }

    deleteContactLocal = (index) => {
        var contacts = this.props.data[index];
        var contact = [contacts.contact_id]
        var address = contacts.address.map((value) => {return value.address_id});
        var phone = contacts.phone.map((value) => {return value.phone_id});
        var date = contacts.date.map((value) => {return value.date_id});

        this.props.deleteContact({contact, address, phone, date});
    }

    editContact = (index) => {
        this.props.history.push("/edit/"+String(index));
    }

    contactList = () => {
        var { data } = this.props;
        return (
            <Accordion defaultActiveKey="0">
                {data.map((value, index) => {
                    var name = (value.fname!==null && value.fname!==undefined?value.fname:"")+(value.mname !== null && value.mname!== undefined ?value.mname:"")+(value.lname !== null && value.lname !== undefined?value.lname:"")
                    return (
                        <Accordion.Item eventKey={"Contact-item-"+String(index)}>
                            <Accordion.Header >
                                {name}
                                <div id="div-id" className="justify-content-right">
                                    <Pencil onClick={() => {this.editContact(index);}} />
                                    <Trash onClick={() => {this.deleteContactLocal(index);}}/>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                {this.contactItem(index)}
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        );
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
                    {this.contactList()}
                </Card.Body>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
      data: state.contacts.data,
      options: state.contacts.options,
    }
}

function mapDispatchToProps(dispatch) {
    const contactsActionDispatchers = bindActionCreators(contactsActionCreators, dispatch);
    return contactsActionDispatchers;
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contacts));