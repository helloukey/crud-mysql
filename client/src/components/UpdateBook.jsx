import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import usePage from "../hooks/usePage";

const UpdateBook = ({ id, propTitle, propDesc, propImage, show, setShow }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { refresh, dispatch } = usePage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);

    // close if fields are empty
    if (!title && !desc && !image) setShow(false);

    // check if image url is valid
    const isImgUrl = (url) => {
      setIsLoading(true);
      const img = new Image();
      img.src = url;
      return new Promise((resolve) => {
        img.onerror = () => {
          resolve(false);
          setIsError(true);
          setIsLoading(false);
        };
        img.onload = () => {
          resolve(true);
          setIsLoading(false);
          updateBooks();
        };
      });
    };

    // use prop image if user not defined
    image ? isImgUrl(image) : isImgUrl(propImage);

    // update books
    const updateBooks = async () => {
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
  
      if (res) {
        dispatch({ type: "TOGGLE", payload: !refresh });
        setShow(false);
      }
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
            {isError && (
              <Alert key="alert" variant="danger" className="p-2 my-3">
                Invalid Image URL...
              </Alert>
            )}
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Updating Book..." : "Update Book"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default UpdateBook;
