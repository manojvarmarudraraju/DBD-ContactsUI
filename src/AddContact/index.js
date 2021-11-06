import React, { Component } from 'react';
import * as boot from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Trash } from 'react-bootstrap-icons';
import * as contactsActionCreators from '../redux/actions';
import { bindActionCreators } from 'redux';

class AddContact extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.data)
        this.state = {fname: "", mname: "", lname: "", address: [], phone: [], date: []};
    }

    onSubmit = () => {
        var dummy = this.state;
        dummy.phone = dummy.phone.filter((value) => {return "phone_do" in value && value["phone_do"]});
        dummy.address = dummy.address.filter((value) => {return "add_do" in value && value["add_do"]});
        dummy.date = dummy.date.filter((value) => {return "date_do" in value && value["date_do"]});
        this.props.addContact(this.state, this.props.history);
    }

    detailChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    Date = () => {
        var date = this.state.date;
        var options = this.props.options.filter((values) => {return values.TYPE_CONNECTION === 3});
        var options_map = {};
        options.forEach((values) => {
            options_map[values.TYPE_IDENTIFIER] = values;
        });

        var date_map = {};
        date.forEach((values) => {
            date_map[values.date_type] = true
        })
        var available = options.filter((values) => {return !(values.TYPE_IDENTIFIER in date_map)});

        var changeDate = (event, ind) => {
            var new_date = this.state.date;
            new_date[ind][event.target.name] = event.target.value;
            new_date[ind]["date_do"] = true;
            this.setState({
                date: new_date
            });
        }

        var addDate = (event, type) => {
            var old_date = this.state.date;
            old_date.push({
                "date_type": parseInt(type),
                "date_date": ""
            });
            this.setState({
                date: old_date
            });
        }

        var deleteDate = (index) => {
            var old_date = this.state.date;
            var id = null
            old_date =  old_date.filter((a,b) => {
                if("date_id" in a && b===index){
                    id = a["date_id"]
                }
                return (b !== index)
            });
            var delDate = this.state.date_delete;
            if(id != null){
                delDate.push(id);
            }
            this.setState({
                date: old_date,
                date_delete: delDate
            })
        }

        return (
            <div>
                {
                    date.map((values, index) => {
                        if(values.date_type in options_map){
                            return (
                                <boot.Card style={{margin: "2%"}}>
                                    <boot.Card.Header>
                                        {options_map[parseInt(values.date_type)]["TYPE_VALUE"]}
                                        <Trash onClick={() => {deleteDate(index)}}/>
                                    </boot.Card.Header>
                                    <boot.Card.Body>
                                        <boot.Row>
                                            <boot.Col>
                                                <boot.FloatingLabel
                                                controlId="floatingInput"
                                                label="Date(YYYY-MM-DD)"
                                                className="mb-3"
                                                >
                                                    <Form.Control type="text" name="date_date" value={values.date_date} onChange={(event) => changeDate(event,index)} />
                                                </boot.FloatingLabel>
                                            </boot.Col>
                                        </boot.Row>
                                    </boot.Card.Body>
                                </boot.Card>
                            );
                        } else{
                            return (<div></div>);
                        }
                    })
                }
            {
                available.length>0?
                    <boot.Dropdown>
                        <boot.Dropdown.Toggle variant="success" id="dropdown-basic">
                            Add Date
                        </boot.Dropdown.Toggle>
                
                        <boot.Dropdown.Menu>
                            {available.map((item, index) => {
                                return (
                                    <boot.Dropdown.Item onClick={(event) => addDate(event, item.TYPE_IDENTIFIER)}>{item.TYPE_VALUE}</boot.Dropdown.Item>
                                );
                            })}
                        </boot.Dropdown.Menu>
                    </boot.Dropdown>
                :
                <div></div>
            }
            </div>
        );
    }

    Address = () => {
        var address = this.state.address;
        var options = this.props.options.filter((values) => {return values.TYPE_CONNECTION === 2});
        var options_map = {};
        options.forEach((values) => {
            options_map[values.TYPE_IDENTIFIER] = values;
        });

        var address_map = {};
        address.forEach((values) => {
            address_map[values.address_type] = true
        })
        var available = options.filter((values) => {return !(values.TYPE_IDENTIFIER in address_map)});

        var changeAddress = (event, ind) => {
            var new_address = this.state.address;
            new_address[ind][event.target.name] = event.target.value;
            new_address[ind]["add_do"] = true;
            this.setState({
                address: new_address
            });
        }

        var addAddress = (event, type) => {
            var old_address = this.state.address;
            old_address.push({
                "address_type": parseInt(type),
                "address": "",
                "city":"",
                "state": "",
                "zip": null
            });
            this.setState({
                address: old_address
            });
        }

        var deleteAddress = (index) => {
            var old_address = this.state.address;
            var id = null
            old_address =  old_address.filter((a,b) => {
                if("address_id" in a && b===index){
                    id = a["address_id"]
                }
                return (b !== index)
            });
            var delAddress = this.state.address_delete;
            if(id != null){
                delAddress.push(id);
            }
            this.setState({
                address: old_address,
                address_delete: delAddress
            })
        }

        return (
            <div>
                {
                    address.map((values, index) => {
                        if(values.address_type in options_map){
                            return (
                                <boot.Card style={{margin: "2%"}}>
                                    <boot.Card.Header>
                                        {options_map[parseInt(values.address_type)]["TYPE_VALUE"]}
                                        <Trash onClick={() => {deleteAddress(index)}}/>
                                    </boot.Card.Header>
                                    <boot.Card.Body>
                                    <boot.Row>
                                        <boot.Col>
                                            <boot.FloatingLabel
                                                controlId="floatingInput"
                                                label="Address"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" name="address" value={values.address} onChange={(event) => changeAddress(event,index)} />
                                            </boot.FloatingLabel>
                                        </boot.Col>
                                        <boot.Col>
                                            <boot.FloatingLabel
                                                controlId="floatingInput"
                                                label="City"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" name="city" value={values.city} onChange={(event) => changeAddress(event,index)}/>
                                            </boot.FloatingLabel>
                                        </boot.Col>
                                        <boot.Col>
                                            <boot.FloatingLabel
                                                controlId="floatingInput"
                                                label="State"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" name="state" value={values.state} onChange={(event) => changeAddress(event,index)}/>
                                            </boot.FloatingLabel>
                                        </boot.Col>
                                        <boot.Col>
                                            <boot.FloatingLabel
                                                controlId="floatingInput"
                                                label="ZIP"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" name="zip" value={values.zip} onChange={(event) => changeAddress(event,index)}/>
                                            </boot.FloatingLabel>
                                        </boot.Col>
                                    </boot.Row>

                                    </boot.Card.Body>
                                </boot.Card>
                            )
                        } else{
                            return (<div></div>);
                        }
                    })
                }
            {
                available.length>0?
                <boot.Dropdown>
                    <boot.Dropdown.Toggle variant="success" id="dropdown-basic">
                        Add Address
                    </boot.Dropdown.Toggle>
            
                    <boot.Dropdown.Menu>
                        {available.map((item, index) => {
                            return (
                                <boot.Dropdown.Item onClick={(event) => addAddress(event, item.TYPE_IDENTIFIER)}>{item.TYPE_VALUE}</boot.Dropdown.Item>
                            );
                        })}
                    </boot.Dropdown.Menu>
                </boot.Dropdown>
            :
            <div></div>
            }
            </div>
        );
    }

    Phone = () => {
        var phone = this.state.phone;
        var options = this.props.options.filter((values) => {return values.TYPE_CONNECTION === 1});
        var options_map = {};
        options.forEach((values) => {
            options_map[values.TYPE_IDENTIFIER] = values;
        });

        var phone_map = {};
        phone.forEach((values) => {
            phone_map[values.phone_type] = true
        })
        var available = options.filter((values) => {return !(values.TYPE_IDENTIFIER in phone_map)});

        var changePhone = (event, ind) => {
            var new_phone = this.state.phone;
            new_phone[ind][event.target.name] = event.target.value;
            new_phone[ind]["phone_do"] = true;
            this.setState({
                phone: new_phone
            });
        }

        var addPhone = (event, type) => {
            var old_phone = this.state.phone;
            old_phone.push({
                "phone_type": parseInt(type),
                "mobile_number": ""
            });
            this.setState({
                phone: old_phone
            });
        }

        var deletePhone = (index) => {
            var old_phone = this.state.phone;
            var id = null
            old_phone =  old_phone.filter((a,b) => {
                if("phone_id" in a && b===index){
                    id = a["phone_id"]
                }
                return (b !== index)
            });
            var delPhone = this.state.phone_delete;
            if(id != null){
                delPhone.push(id);
            }
            this.setState({
                phone: old_phone,
                phone_delete: delPhone
            })
        }
        console.log(this.state);
        return (
            
            <div>
            {
                phone.map((values, index) => {
                    if(values.phone_type in options_map){
                        return (
                            <boot.Card style={{margin: "2%"}}>
                                <boot.Card.Header>
                                    {options_map[parseInt(values.phone_type)]["TYPE_VALUE"]}
                                    <Trash onClick={() => {deletePhone(index)}}/>
                                </boot.Card.Header>
                                <boot.Card.Body>
                                    <boot.Row>
                                        <boot.Col>
                                            <boot.FloatingLabel
                                            controlId="floatingInput"
                                            label="Area Code"
                                            className="mb-3"
                                            >
                                                <Form.Control type="text" value={values.area_code} name="area_code" onChange={(event) => changePhone(event,index)}/>
                                            </boot.FloatingLabel>
                                        </boot.Col>
                                        <boot.Col>
                                            <boot.FloatingLabel
                                            controlId="floatingInput"
                                            label="Mobile Number"
                                            className="mb-3"
                                            >
                                                <Form.Control type="text"  value={values.mobile_number} name="mobile_number" onChange={(event) => changePhone(event, index)} />
                                            </boot.FloatingLabel>
                                        </boot.Col>
                                    </boot.Row>
                                </boot.Card.Body>
                            </boot.Card>
                        )
                    } else{
                        return (<div></div>);
                    }
                })
            }
            {
                available.length>0?
                    <boot.Dropdown>
                        <boot.Dropdown.Toggle variant="success" id="dropdown-basic">
                            Add Number
                        </boot.Dropdown.Toggle>
                
                        <boot.Dropdown.Menu>
                            {available.map((item, index) => {
                                return (
                                    <boot.Dropdown.Item onClick={(event) => addPhone(event, item.TYPE_IDENTIFIER)}>{item.TYPE_VALUE}</boot.Dropdown.Item>
                                );
                            })}
                        </boot.Dropdown.Menu>
                    </boot.Dropdown>
                :
                <div></div>
            }
            </div>
        );
    }

    render(){
        var data = this.state;
        return (
            <boot.Card>
                <boot.Card.Title>Edit Contact</boot.Card.Title>
                <boot.Card.Body>
                    <boot.Row>
                        <boot.Col>
                            <boot.FloatingLabel
                                controlId="floatingInput"
                                label="First Name"
                                className="mb-3"
                            >
                                <boot.Form.Control type="text" placeholder="First Name" value={data.fname} name="fname" onChange={this.detailChange}/>
                            </boot.FloatingLabel>
                        </boot.Col>
                        <boot.Col>
                            <boot.FloatingLabel
                                controlId="floatingInput"
                                label="Middle Name"
                                className="mb-3"
                            >
                                <boot.Form.Control type="text" placeholder="Middle Name" value={data.mname} name="mname" onChange={this.detailChange}/>
                            </boot.FloatingLabel>
                        </boot.Col>
                        <boot.Col>
                            <boot.FloatingLabel
                                controlId="floatingInput"
                                label="Last Name"
                                className="mb-3"
                            >
                                <boot.Form.Control type="text" placeholder="Last Name" value={data.lname} name="lname" onChange={this.detailChange}/>
                            </boot.FloatingLabel>
                        </boot.Col>
                    </boot.Row>
                    <boot.Card style={{margin: "2%"}}>
                        <boot.Card.Header>
                            Phone Numbers
                        </boot.Card.Header>
                        <boot.Card.Body>
                            {this.Phone()}
                        </boot.Card.Body>
                    </boot.Card>
                    <boot.Card style={{margin: "2%"}}>
                        <boot.Card.Header>
                            Addresses
                        </boot.Card.Header>
                        <boot.Card.Body>
                            {this.Address()}
                        </boot.Card.Body>
                    </boot.Card>
                    <boot.Card style={{margin: "2%"}}>
                        <boot.Card.Header>
                            Dates
                        </boot.Card.Header>
                        <boot.Card.Body>
                            {this.Date()}
                        </boot.Card.Body>
                    </boot.Card>

                    <boot.Button onClick={this.onSubmit}>Submit</boot.Button>
                </boot.Card.Body>
            </boot.Card>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddContact));