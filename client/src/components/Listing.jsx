import { useEffect } from "react";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// assets
import editButton from "../assets/edit.svg";
import deleteButton from "../assets/delete.svg";
import UpdateBook from "./UpdateBook";
import usePage from "../hooks/usePage";

const Listing = () => {
  const [books, setBooks] = useState(null);
  const [show, setShow] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDesc, setCurrentDesc] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const { refresh, dispatch } = usePage();

  const handleShow = (e) => {
    setCurrentId(e.target.dataset.id);
    setCurrentTitle(e.target.dataset.title);
    setCurrentDesc(e.target.dataset.desc);
    setCurrentImage(e.target.dataset.image);
    setShow(true);
  }
  const handleDelete = async (e) => {
    const id = e.target.dataset.id;
    const toggle = await fetch("http://localhost:8000/books/"+id, {
      method: "DELETE"
    });
    if(toggle) dispatch({type: "TOGGLE", payload: !refresh})
  };

  useEffect(() => {
    fetch("http://localhost:8000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [refresh]);

  return (
    <div className="w-100 mt-5 d-flex justify-content-center px-4 gap-3 flex-wrap">
      {books &&
        books.map((book) => (
          <Card style={{ width: "18rem" }} key={book.id}>
            <Card.Img variant="top" src={book.image} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>{book.desc}</Card.Text>
              <div className="d-flex gap-2">
                <img
                  type="button"
                  src={editButton}
                  alt="edit"
                  width={24}
                  onClick={handleShow}
                  data-id={book.id}
                  data-title={book.title}
                  data-desc={book.desc}
                  data-image={book.image}
                />
                <img
                  type="button"
                  src={deleteButton}
                  alt="edit"
                  width={24}
                  onClick={handleDelete}
                  data-id={book.id}
                />
              </div>
            </Card.Body>
            <UpdateBook
              id={currentId}
              show={show}
              propTitle={currentTitle}
              propDesc={currentDesc}
              propImage={currentImage}
              setShow={setShow}
            />
          </Card>
        ))}
    </div>
  );
};
export default Listing;
