import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import AddBook from "./AddBook";
import usePage from "../hooks/usePage";

const Header = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refresh, dispatch } = usePage();

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);

    // return if fields are empty
    if (!title || !desc || !image) return;

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
          fetchBooks();
        };
      });
    };

    isImgUrl(image);

    const fetchBooks = async () => {
      const res = await fetch("http://localhost:8000/books", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          desc: desc,
          image: image,
        }),
      });

      if (res) {
        dispatch({ type: "TOGGLE", payload: !refresh });
        setShow(false);
      }
    };
  };

  return (
    <Nav className="bg-primary p-3 justify-content-between">
      <h1 className="fw-bold text-light">MySQL - CRUD</h1>
      <Button className="px-4 fw-bold" variant="light" onClick={handleShow}>
        Add Book
      </Button>

      {/* Add Book */}
      <AddBook
        setTitle={setTitle}
        setDesc={setDesc}
        setImage={setImage}
        show={show}
        setShow={setShow}
        handleSubmit={handleSubmit}
        isError={isError}
        isLoading={isLoading}
      />
    </Nav>
  );
};
export default Header;
