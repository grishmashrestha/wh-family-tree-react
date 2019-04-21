import React, { Component } from 'react';
import Todos from './components/Todos';
import Header from './components/layout/Header'
import axios from 'axios';
import './App.css';

class App extends Component {
  
  state = {
    users: []
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/v1/users")
      .then(res => this.setState({ users: res.data.users }));
  }

  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:4000/api/v1/users", data, { 
      // receive two parameter endpoint url ,form data 
      })
      .then(res => this.setState({ users: res.data.users }));
   }

  render() {
    return (
      <div className="App">
        <Header/>
        <div style={UploadDivStyle}>
          <label>Select file to upload </label>
          <input type="file" name="file" onChange={this.onChangeHandler}/>
          <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>   
        </div>
        
        {/* <Todos todos={this.state.todos}/> */}
        <div style={UserListStyle}>
          <ul style={UserListUlStyle}>
            {this.state.users.map(item => (
              <li key={item.id}>{item.full_name}, {item.address || "no address"}</li>
            ))}
          </ul>
        </div>
       
      </div>
    );
  }
}

const UploadDivStyle = {
  borderStyle: 'solid',
  borderColor: '#333',
  textAlign: 'center',
  padding:  '10px'

}

const UserListStyle = {
  padding:  '10px'
}

const UserListUlStyle = {
  textAlign: 'left',
  margin: 'auto',
  width: '60%'
}
export default App;
