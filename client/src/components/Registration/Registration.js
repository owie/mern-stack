import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { register } from '../../actions/auth'

const Registration = ({register, isAuthenticated}) => {
  const initialState = {  name: '', email: '', password: '' };
  const [input, setInput] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  if (isAuthenticated) return null
  return (
    <Container fluid="sm">
      <Row>
        <h2>Register</h2>
      </Row>
      <Row  xs="1" sm="2" md="2">
        <Form
          onSubmit={e => {
            e.preventDefault()
            register(input.name, input.email, input.password)
          }}
        >
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="name" className="mr-sm-2">Name</Label>
            <Input type="name" name="name" id="name" placeholder=""
              value={input.name} 
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="email" className="mr-sm-2">Email</Label>
            <Input type="email" name="email" id="email" placeholder=""
              value={input.email} 
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="password" className="mr-sm-2">Password</Label>
            <Input type="password" name="password" id="password" placeholder=""
              value={input.password}  
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button color="primary" style={{margin: '10px 0px'}}>Submit</Button>
        </Form>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps -> state", state)
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => ({
    register: (name, email, password) => dispatch(register(name, email, password))
});

export default connect(mapStateToProps,	mapDispatchToProps)(Registration);
