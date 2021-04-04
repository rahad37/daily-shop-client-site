import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import LogIn from './Components/LonIn/LogIn';
import AddProducts from './Components/AddProducts/AddProducts';
import Header from './Components/Header/Header';
import { Container } from 'react-bootstrap';
import Order from './Components/Order/Order';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import EditProduct from './Components/EditProduct/EditProduct';
import CheckOut from './Components/CheckOut/CheckOut';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <Container>
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header></Header>
      <h2>{loggedInUser.email}</h2>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path='/edit'>
          <EditProduct/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path="/login">
          <LogIn/>
        </Route>
        <PrivateRoute path="/addProducts">
          <AddProducts/>
        </PrivateRoute>
        <PrivateRoute path="/productId/:_id">
          <CheckOut></CheckOut>
        </PrivateRoute>
        <PrivateRoute path="/order">
          <Order/>
        </PrivateRoute>
      </Switch>
  </Router>
  </UserContext.Provider>
  </Container>
);
}


export default App;
