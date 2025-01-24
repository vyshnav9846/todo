import React, { useEffect, useState } from 'react'
import { Button, Container, FloatingLabel, Form, Modal, Navbar, Table } from 'react-bootstrap'
import { deleteTodoApi, getAllTodoApi, saveTodoApi } from '../services/commonApi';


const Header = () => {
  const [show, setShow] = useState(false);
  const [todoDetails, setTodoDetails] = useState({
    title: "", description: "", deadline: "", priority: "", completion: ""

  })
  useEffect(() => {
    getTodoList()
  }, [])
  const [getTodo, setGetTodo] = useState([])
  const getTodoList = async () => {
    const result = await getAllTodoApi()
    if (result.status >= 200 && result.status < 300) {
      setGetTodo(result.data)
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpload = async () => {
    handleClose()
    console.log(todoDetails);
    try {
      const res = await saveTodoApi(todoDetails)
      if (res.status >= 200 && res.status < 300) {
        alert("saved sucessfully")
        handleClose()
        getTodoList()
      }
    } catch (error) {
      console.log(error);


    }

  }
  const deleteTask = async(id)=>{
    try {
      await deleteTodoApi(id)
      getTodoList()
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <Navbar style={{ zIndex: 1 }} className="bg-info position-fixed w-100">
        <Container>

          <Navbar.Brand style={{ color: 'white' }} className='fw-bolder fs-5' >
            <i class="fa-solid fa-list"></i>

            TO DO LIST
          </Navbar.Brand>

        </Container>
      </Navbar>
      <div style={{ paddingTop: '100px' }} className='container'>
        <i onClick={handleShow} style={{ fontSize: '20px', marginLeft: '40%' }} className='' class="fa-brands fa-creative-commons-sampling-plus">Add To Do List</i>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body><FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
          >
            <Form.Control onChange={e => setTodoDetails({ ...todoDetails, title: e.target.value })} type="text" placeholder="name@example.com" />
          </FloatingLabel>
            <FloatingLabel className='my-2' controlId="floatingPassword" label="Description">
              <Form.Control onChange={e => setTodoDetails({ ...todoDetails, description: e.target.value })} type="text" placeholder="Password" />
            </FloatingLabel>
            <FloatingLabel className='my-2' controlId="floatingPassword" label="Deadline">
              <Form.Control onChange={e => setTodoDetails({ ...todoDetails, deadline: e.target.value })} type="text" placeholder="Password" />
            </FloatingLabel>
            <FloatingLabel className='my-2' controlId="floatingPassword" label="Priority level">
              <Form.Control onChange={e => setTodoDetails({ ...todoDetails, priority: e.target.value })} type="text" placeholder="Password" />
            </FloatingLabel>
            <FloatingLabel className='my-2' controlId="floatingPassword" label="Completion status">
              <Form.Control onChange={e => setTodoDetails({ ...todoDetails, completion: e.target.value })} type="text" placeholder="Password" />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpload}>
              upload
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Priority level</th>
              <th>completionstatus</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>


            {
              getTodo?.length > 0 ?
                getTodo?.map(tasks => (
                  <tr >
                    <td>{tasks.title}</td>
                    <td>{tasks.description}</td>
                    <td>{tasks.deadline}</td>
                    <td>{tasks.priority}</td>
                    <td>{tasks.completion}</td>
                    <td><button onClick={() => deleteTask(tasks.id)} className='btn btn-danger' >Delete </button></td>
                  </tr>
                ))
                :
                <div>no task added</div>
            }








          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Header