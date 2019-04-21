import React, { Component } from 'react';
import Todos from './components/Todos';
import axios from 'axios';
import './App.css';

class App extends Component {
  
  state = {
    users: []
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
        <input type="file" name="file" onChange={this.onChangeHandler}/>
        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
        {/* <Todos todos={this.state.todos}/> */}
        <div>
          <ul>
            {this.state.users.map(item => (
              <li key={item.id}>{item.full_name}, {item.address || "no address"}</li>
            ))}
          </ul>
        </div>
       
      </div>
    );
  }
}

export default App;
