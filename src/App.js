import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Table
} from 'reactstrap';

class App extends Component {
  constructor()  {
    super();
    this.state = {
      visible: "SearchPage",
      books: [],
      searchRes: [],
    }
  }

  setVisible(componentName) {
    return(e) => {
      e.preventDefault()
      this.setState({
        visible: componentName,
      });
    }
  }

//Gets the initial data from the library public db
  componentWillMount() {
    fetch('https://api.finna.fi/v1/search?lookfor=ruby+on+rails')
     .then( response => response.json() )
     .then( results => {
        console.log(results)
        this.setState({
          books: results
        })
      })
}

  render() {
    let visiblePageComponent = () => {
      if(this.state.visible=="SearchPage") {
        return <SearchPage />
      } else if (this.state.visible=="BooksPage") {
        return <BooksPage books={this.state.books} />
      } else {
        return <LoginPage/>
      }
    }
    return(
      <div>
        <Header
          showSearch={this.setVisible("SearchPage").bind(this)}
          showBooks={this.setVisible("BooksPage").bind(this)}
          showLogin={this.setVisible("LoginPage").bind(this)}
        />
        {visiblePageComponent()}
      </div>
    )
  }
}

class Header extends React.Component {
  render() {
    return(
      <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand href="/">Bookkeeper</NavbarBrand>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" onClick={this.props.showSearch}>Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.props.showBooks}>Books</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.props.showLogin}>Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}


class SearchPage extends React.Component {
  render(){
    return (
      <div>
        <h2>Search</h2>
      </div>
    )
  }
}

class BooksPage extends React.Component {
  render(){
    let books = this.props.books
    return (
      <div>
        <h2>Your Books </h2>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {books.records.map(b => <tr key={b.id}><td>{b.title}</td></tr>)}
          </tbody>
        </Table>
      </div>
    )
  }
}

// class Starred extends React.Component {
//   render(){
//     return (
//       <div>
//         <h2>Login</h2>
//       </div>
//     )
//   }
// }

class LoginPage extends React.Component {
  render(){
    return (
      <div>
        <h2>Login</h2>
      </div>
    )
  }
}

export default App;
