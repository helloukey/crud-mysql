import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import usePage from "../hooks/usePage";

const UpdateBook = ({id, propTitle, propDesc, propImage, show, setShow}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { refresh, dispatch } = usePage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8000/books/${id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.length ? title : null,
        desc: desc.length ? desc : null,
        image: image.length ? image : null,
      }),
    });

    if(res) {
      dispatch({type: "TOGGLE", payload: !refresh});
      setShow(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Eg: Shawshank Redemption"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={propTitle}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setDesc(e.target.value)}
              name="desc"
              defaultValue={propDesc}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg: image.jpg"
              autoFocus
              onChange={(e) => setImage(e.target.value)}
              name="image"
              defaultValue={propImage}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Book
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default UpdateBook;
