import React from 'react';
import { Table, Button } from 'reactstrap';

const ItemsList = ({items, deleteItem, editRow}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          items.length > 0 ? (
            items.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <Button outline color="secondary" size="sm"
                    style={{marginRight: 10}}
                    onClick={() => {
                      editRow(item)
                    }}
                  >Edit</Button>
                  <Button outline  color="secondary" size="sm"
                    onClick={() => deleteItem(item._id)}
                  >Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No Items</td>
            </tr>
          )
        }
      </tbody>
    </Table>
  );

}

export default ItemsList;