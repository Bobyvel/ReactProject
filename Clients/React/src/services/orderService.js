import Auth from "../utils/auth";

const host = "http://localhost:5000/";

async function submitOrder(data) {
  const res = await window.fetch(host + "orders/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + Auth.getToken()
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

async function fetchUserOrders() {
  const res = await window.fetch(host + "orders/user", {
    headers: {
      Authorization: "bearer " + Auth.getToken()
    }
  });
  return res.json();
}

async function fetchPendingOrders() {
  const res = await window.fetch(host + "orders/pending", {
    headers: {
      Authorization: "bearer " + Auth.getToken()
    }
  });
  return res.json();
}

async function approveOrder(id) {
  const res = await window.fetch(host + `orders/approve/${id}`, {
    method: "POST",
    headers: {
      Authorization: "bearer " + Auth.getToken()
    }
  });

  return res.json();
}

export { submitOrder, fetchUserOrders, fetchPendingOrders, approveOrder };
