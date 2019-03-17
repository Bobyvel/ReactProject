import Auth from "../utils/auth";

const host = "http://localhost:5000/";

async function fetchBooks() {
  const res = await window.fetch(host + "book/all");
  const body = res.json();

  return body;
}

async function fetchAddBook(title, genres, description, image, author, price) {
  const res = await window.fetch(host + "book/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + Auth.getToken()
    },
    body: JSON.stringify({ title, genres, description, image, author, price })
  });

  return res.json();
}

async function deleteBook(id) {
  const res = await window.fetch(host + `book/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "bearer " + Auth.getToken()
    }
  });

  return res.json();
}

async function editBook(id, title, genres, description, image, author, price) {
  const res = await window.fetch(host + `book/edit/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + Auth.getToken()
    },
    body: JSON.stringify({ title, genres, description, image, author, price })
  });

  return res.json();
}
async function likeBook(id) {
  const res = await window.fetch(host + `book/like/${id}`, {
    method: "POST",
    headers: {
      Authorization: "bearer " + Auth.getToken()
    }
  });

  return res.json();
}

async function unlikeBook(id) {
  const res = await window.fetch(host + `book/unlike/${id}`, {
    method: "POST",
    headers: {
      Authorization: "bearer " + Auth.getToken()
    }
  });

  return res.json();
}

export { fetchBooks, fetchAddBook, deleteBook, editBook, likeBook, unlikeBook };
