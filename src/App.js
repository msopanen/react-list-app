import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
* Stateles rendering functions
*/
const ListRow = ({contact, selected}) => 
  <li value={contact.id} onClick={selected}>
    Name: {contact.name}
  </li>;

const List = ({contacts, selected}) => {
  
  let rows = [];

  contacts.forEach((c) => {
    rows.push(<ListRow contact={c} selected={selected}/>);
  });

  return <ul>{rows}</ul>
}

/*
* Statefull application
*/
class App extends Component {

  constructor(props) {
    super(props);

    this.state = { contacts: [], selectedName: '', selectedId: 0 };
    this.uniqueId = 0;

    this.append = this.append.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.del = this.del.bind(this);
    this.selected = this.selected.bind(this);
  };

  add(){

    let c = this.state.contacts;

    c.push({ 
      id: this.uniqueId++,
      name: this.state.selectedName
    });

    this.setState({
      contacts: c
    });
    
  };

  update() {

    let c = this.state.contacts;

    c[c.findIndex(item => item.id === this.state.selectedId)] = { 
      id: this.state.selectedId,
      name: this.state.selectedName 
    };

    this.setState({
      contacts: c
    }); 

  };

  del(event){

    let c = this.state.contacts;
    
    this.setState({
      contacts: c.filter(item => item.id !== this.state.selectedId),
      selectedName: ''
    });   

  };

  selected(event) {

    let c = this.state.contacts;
    let selectedId = event.target.value;
    let selectedName = c.filter(item => item.id === selectedId)[0].name;

    this.setState({
      contacts: c,
      selectedName: selectedName,
      selectedId: selectedId
    }); 

  };

  append(event) {

    this.setState({
      selectedName: event.target.value
    });

  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React List Application</h1>
        </header>

        <label>
          List item :
          <input type="text" value={this.state.selectedName} onChange={this.append} />
        </label>

        <button type="button" onClick={this.add}>Add</button>
        <button type="button" onClick={this.update}>Update</button>
        <button type="button" onClick={this.del}>Delete</button>
        <List contacts={this.state.contacts} selected={this.selected}/>
      </div>
    );
  }
}

export default App;
