import React, { useState } from 'react';
import { Container, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Search = (props) => {
  const initialState = { name: '' };
  const [input, setInput] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value })
  }

  return (
    <Container fluid="sm">
      <Row  xs="1" sm="2" md="2">
      <Form
            onSubmit={e => {
              e.preventDefault()
              props.search(input.name)
            }}
          >
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="name" className="mr-sm-2">Search</Label>
              <Input type="name" name="name" id="name" placeholder=""
                value={input.name} 
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button>Search</Button>
          </Form>
      </Row>
    </Container>
  );
}

export default Search;
