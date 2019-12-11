# ReactProject

### Description

BookStore project with React, Express, MongoDB

### Tech

ReactProject uses a number of open source projects to work:
* [MongoDB](https://www.mongodb.com) - Free and open-source cross-platform document-oriented database
* [Mongoose](http://mongoosejs.com/index.html) - Elegant MongoDB object modeling for NodeJS
* [NodeJS](https://nodejs.org/en/) - Evented I/O for the backend
* [ExpressJS](https://expressjs.com) - Fast, unopinionated, minimalist web framework for NodeJS
* [JSONWebToken](https://jwt.io) - Used for authorization
* [React](https://reactjs.org) - User Interface (UI) library

### Installation

STARTING SERVER: on terminal \Servers folder, command: node index

STARTING React: on terminal \Clients\React folder, command: npm start

### Features

--Anonymous users--
HOME PAGE
Anyone can view top rated books, to view their details and follow links from external API for reviews.
If user want to order is redirected to login form.

STORE PAGE
Anyone can view all books, to search among them and view their details
If person want to order is redirected to login form.

DETAIL PAGE
Anyone can view book details. If person want to order is redirected to login form.

LOGIN PAGE
Form for sign in for registered users. Has validation and handle mistakes on.
If person is not registered, at the bottom has a link to redirect to register page.
After successful sign in, user is redirected to home page.

REGISTER PAGE
Form for REGISTRATION. Has validation on.
After successful register, user is redirected to home page.


--Registered users--

HOME PAGE
User can view top rated books, to view their details, follow links from external API for reviews.
On order is redirected to card, where can make an order, remove the order or go to store again.

STORE PAGE
User can view all books, to search among them and view their details.
On order is redirected to card, where can make an order, remove the order or go to store again.

DETAIL PAGE
User can view book details, like or unlike them and order.

CART PAGE
User can view selected to order books, remove each one, return to store.
On order is redirected to My orders page.

MY ORDERS PAGE
User can view their orders, if they ara approved or pending, view details on each order.

LOGOUT PAGE
User sign out and is redirected to login

--Administrator users--

HOME PAGE
Admin can view top rated books, to view their details, like or unlike them and follow links from external API for reviews.
On order is redirected to card, where can make an order, remove the order or go to store again.
On each book has edit and delete button. On edit, load page with form with the information on wanted book. Has validatin an mistakes handler on. After successful edit, admin is redirected to store page. On delete the book is removed from the list.

STORE PAGE
Admin can view all books, to search among them and view their details, like or unlike them.
On order is redirected to card, where can make an order, remove the order or go to store again.
On each book has edit and delete button. On edit, load page with form with the information on wanted book. Has validatin an mistakes handler on. After successful edit, admin is redirected to store page. On delete the book is removed from the list.

DETAIL PAGE
User can view book details, like or unlike them and order.

CART PAGE
Admin can view selected to order books, remove each one, return to store.
On order is redirected to My orders page.

PENDING ORDERS PAGE
Admin can view all pending orders, and approve them. After approve the order stop showng on the page.

ADD BOOK PAGE
Admin can add books to the store. Has validation and handle mistakes on.

LOGOUT PAGE
User sign out and is redirected to login


--ADDITIONAL INFORMATION--
Route paths are marked as Public, Private or Administrative. If user without autorization try to go is redirected to login page. For autorization are used tokens and local storage.
