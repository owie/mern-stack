import React, { useState, useEffect } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const EditInput = props => {
  const [ item, setitem ] = useState(props.currentItem)

  useEffect(
    () => {
      setitem(props.currentItem)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target
    setitem({ ...item, [name]: value })
  }

  return (
    <Form
      onSubmit={event => {
        event.preventDefault()

        props.updateItem(item.id, item)
      }}
    >
      <Label>Name</Label>
      <Input type="text" name="name" value={item.name} onChange={handleInputChange} />
      <Label>Price</Label>
      <Input type="text" name="price" value={item.price} onChange={handleInputChange} />
      <Button>Update item</Button>
      <Button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </Button>
    </Form>
  )
}

export default EditInput