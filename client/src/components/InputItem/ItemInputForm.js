import React, { useState } from 'react'
import { Col, Button, Form, Row, Label, Input, Container } from 'reactstrap';

const ItemInputForm = (props) => {

  const initialState = { id: '', name: '', price: '' };
  const [item, setItem] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value })
  }

  return (
    <Container>
        <Form
        onSubmit={e => {
          e.preventDefault()
          if (!item.name || !item.price) return
          setItem(initialState);
        }}
      >
        <Row>
          <Col>
            <Label>Name</Label>
            <Input 
              type="text" 
              name="name" 
              value={item.name}
              onChange={handleInputChange}
            />
          </Col>
            
          <Col>
            <Label>Price</Label>
            <Input 
              type="number" 
              name="price" 
              value={item.price}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="primary" size="sm" style={{margin: '10px 0px'}}>Add new item</Button>
          </Col>
        </Row>

      </Form>
    </Container>
  )
}

export default ItemInputForm