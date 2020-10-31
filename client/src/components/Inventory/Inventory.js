import React, { Fragment, useState, useEffect } from 'react';
import { connect, useDispatch, useSelector  } from 'react-redux';
import { Container, Row, } from 'reactstrap';
import ItemsList from '../ItemsList'
import InputItem from '../InputItem';
import EditInput from '../EditInput';
import { deleteItem, getItems, searchItem, addItem } from '../../actions/inventory'

const Inventory = (props) => {
  const { isAuthenticated } = props;
  const initialInputState = { id: null, name: '', price: '' }
  
  // const mockData = [
  //   { id: 1, name: 'Tania', username: 'floppydiskette' },
  //   { id: 2, name: 'Craig', username: 'siliconeidolon' },
  //   { id: 3, name: 'Ben', username: 'benisphere' },
  // ]

  const dispatch = useDispatch();

  const inventory = useSelector((state) => state.inventory.list)
  const [items, setItems] = useState(inventory);

  const [currentItem, setCurrentItem ] = useState(initialInputState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const addItem = (item) => {
    // item.id = items.length + 1

    setItems([...items, item]);
  }

  const deleteItem = (_id) => {
    setEditing(false)

    // dispatch(deleteItem(_id));
    setItems(items.filter((item) => item._id !== _id));
  }


  const updateItem = (_id, updateItem) => {
		setEditing(false);

		setItems(items.map(item => (item._id === _id ? updateItem : item)))
	}

  const editRow = item => {
		setEditing(true)

		setCurrentItem({ _id: item._id, name: item.name, price: item.price })
  }

  if (!isAuthenticated) return null
  return (
    <Container>
        <Row>
          {editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditInput
								editing={editing}
								setEditing={setEditing}
								currentItem={currentItem}
								updateItem={updateItem}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Inventory</h2>
              <InputItem addItem={addItem} />
						</Fragment>
					)}
        </Row>
        {/* <Row>
          <Search search={search}/>
        </Row> */}
        <Row>
          <ItemsList items={inventory} editRow={editRow} deleteItem={deleteItem} />
        </Row>
        
      </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    inventory: state.inventory.list,
    loading: state.inventory.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems()),
  deleteItem: (_id) => dispatch(deleteItem(_id)),
  searchItem: (name) => dispatch(searchItem(name)),
  addItem: (name, price) => dispatch(addItem(name, price))
});

export default connect(mapStateToProps,	mapDispatchToProps)(Inventory);
