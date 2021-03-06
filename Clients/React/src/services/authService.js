import toastr from "toastr";

const host = 'http://localhost:5000/'

async function register (username, email, password) {
  const res = await window.fetch(host + 'auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
   return res.json()

}
async function login (email, password) {
    const res = await window.fetch(host + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
  
    return res.json()
  }
  //to do logout express session
  function logout() {
    localStorage.clear();
    toastr.success('Logout successful')
   
  }

  export {
    register, login, logout
}
