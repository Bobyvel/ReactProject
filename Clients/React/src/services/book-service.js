import toastr from "toastr";
import Auth from "../utils/auth";

const host = "http://localhost:5000/";

export async function fetchBooks() {
  const res = await window.fetch(host + "book/all");
  const body = res.json();
  if (body.errors) {
    body.errors.forEach(error => {
      toastr.error(error.msg);
    });
  } else {
    return body;
  }
}

export async function fetchAddBook(
  title,
  genres,
  description,
  image,
  author,
  price
) {
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

export async function deleteBook (id) {
  const res = await window.fetch(host + `book/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'bearer ' + Auth.getToken()
    }
  })

  return res.json()
}
