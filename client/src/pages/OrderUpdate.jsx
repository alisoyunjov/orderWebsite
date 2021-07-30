import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import AuthService from "../services/authService";
import api from '../components/api/index';
import userapi from '../components/api/userApi';
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { FormControl, TextField } from "@material-ui/core";
import { Container, Col, Row, Jumbotron, Form, Button } from "react-bootstrap";

import styled from 'styled-components'
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin-left:200px;
    margin-top: 30px;
    width:600px;
    background-color: 'red';
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;

`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`


class OrderUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            notes:"",
            price1: "",
            price2: "",
            submission: "",
            receivedDate: "",
            orderStatus: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleIncludeOrder = this.handleIncludeOrder.bind(this);
        
    }
    handleChange = async e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleIncludeOrder = async () => {
        const {id,orderStatus, receivedDate, price1, price2, submission, notes} = this.state
        const payload = {orderStatus, receivedDate, price1, price2, submission, notes}
       
        
        await api.updateOrderById(id, payload).then(res => {
            window.alert(`Order updated successfully`)
            this.setState({
                notes:"",
                price1: "",
                price2: "",
                submission: "",
                receivedDate: "",
                orderStatus: ""
            })
            {<Redirect to='/ordersList'/>} 
            
        })
        
    }

    render() {
        const {orderStatus, receivedDate, price1, price2, submission, notes} = this.state

        return (
        <>
        <br />
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2}}>
              <Jumbotron>
              <h1>Update Order</h1>
                <Form onSubmit={this.handleIncludeOrder} >
                  <Form.Row>
                  <Form.Group style = {{marginLeft: '50px'}}>
                    <Form.Label>
                      Price 1
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows="1"
                        name = "price1"
                        value = {price1}
                        onChange = {this.handleChange} 

                    />
                  </Form.Group>
                  <Form.Group style = {{marginLeft: '20px'}}>
                    <Form.Label>
                        Price 2
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows="1"
                        name = "price2"
                        value = {price2}
                        onChange = {this.handleChange} 
                    />
                  </Form.Group>
                  <Form.Group style = {{marginLeft: '20px'}}>
                    <Form.Label>
                        Submission
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows="1"
                        name = "submission"
                        value = {submission}
                        onChange = {this.handleChange} 
                    />
                  </Form.Group>
                  </Form.Row>

                  <Form.Row>
                  <Form.Group style = {{marginLeft: '120px'}}>
                    <Form.Label>Received Date</Form.Label>
                    <Form.Control
                      type="date"
                      name = "receivedDate"
                      value={receivedDate}
                      onChange={this.handleChangeDate}
                    />
                  </Form.Group>
                  <Form.Group style = {{marginLeft: '50px'}}>
                    <Form.Label>
                      Status
                    </Form.Label>
                    <Form.Control as="textarea" rows="1" 
                        name = "orderStatus"
                        value = {orderStatus}
                        onChange = {this.handleChange} 
                    />
                  </Form.Group>
                  </Form.Row>
                  <Form.Group>
                    <Form.Label>
                      Notes
                    </Form.Label>
                    <Form.Control as="textarea" rows="3" 
                        name = "notes"
                        value = {notes}
                        onChange = {this.handleChange} 
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" >
                    Update
                  </Button>
    
                  <CancelButton href={'/ordersList'} style = {{marginLeft: '50px'}}>Back</CancelButton>
                </Form>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
        
            
      </>
      
        )
    }
}

export default OrderUpdate