import React, { Component} from 'react';
import * as boot from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as contactsActionCreators from '../redux/actions';
import { bindActionCreators } from 'redux';

class AddOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
                phone: "",
                address: "",
                date: "",
                prevphone: "",
                prevaddress: "",
                prevdate: ""
        }
    }


    change = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    }

    clickFunc = (id, type) => {
        var val = this.state[type];
        var prev= "prev"+type;
        var prevVal = this.state[prev]
        if(prevVal === prev){
            window.alert("Values cannot be Empty/Same");
            return;
        }
        var data={
            "option_type": id,
            "option_value": val
        };
        this.setState({prev: val}, () => {
            this.props.optionAdd(data);
        })

    }
    render(){
        return (
            <div>

                <boot.Table>
                    <boot.Row>
                        <boot.Col>
                            <boot.FloatingLabel
                            controlId="floatingInput"
                            label="Phone type"
                            className="mb-3"
                            >
                                <boot.Form.Control type="text" name="phone" value={this.state.phone} onChange={(event) => this.change(event)} />
                            </boot.FloatingLabel>
                            <boot.Button variant="primary" style={{backgroundColor: "black"}} onClick={() => {this.clickFunc(1,"phone")}}>Add Phone Type</boot.Button>
                        </boot.Col>
                    </boot.Row>
                    <boot.Row>
                        <boot.Col>
                            <boot.FloatingLabel
                            controlId="floatingInput"
                            label="Address type"
                            className="mb-3"
                            >
                                <boot.Form.Control type="text" name="address" value={this.state.address} onChange={(event) => this.change(event)} />
                            </boot.FloatingLabel>
                            <boot.Button variant="primary" style={{backgroundColor: "black"}} onClick={() => {this.clickFunc(2,"address")}}>Add Address Type</boot.Button>
                        </boot.Col>  
                    </boot.Row>
                    <boot.Row>
                        <boot.Col>
                            <boot.FloatingLabel
                            controlId="floatingInput"
                            label="Date type"
                            className="mb-3"
                            >
                                <boot.Form.Control type="text" name="date" value={this.state.date} onChange={(event) => this.change(event)} />
                            </boot.FloatingLabel>
                            <boot.Button variant="primary" style={{backgroundColor: "black"}} onClick={() => {this.clickFunc(3,"date")}}>Add Date Type</boot.Button>
                        </boot.Col>   
                    </boot.Row>
                </boot.Table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      options: state.contacts.options,
    }
}

function mapDispatchToProps(dispatch) {
    const contactsActionDispatchers = bindActionCreators(contactsActionCreators, dispatch);
    return contactsActionDispatchers;
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOption));