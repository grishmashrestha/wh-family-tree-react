import React, { Component } from 'react';
import Todos from './components/Todos';
import axios from 'axios';
import './App.css';

class App extends Component {
  
  state = {
    todos: [
      {
        id: 1,
        title: "Take out the trash",
        completed: true
      },
      {
        id: 2,
        title: "Sankata with boo boo",
        completed: false
      },
      {
        id: 3,
        title: "Avengers endgame with friends",
        completed: false
      }
    ]
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
    axios.get("http://localhost:4000/api/v1/users", data, { 
      // receive two parameter endpoint url ,form data 
      })
      .then(res => { 
        // then print response status
        console.log(res.statusText)
      })
   }

  render() {
    return (
      <div className="App">
        <input type="file" name="file" onChange={this.onChangeHandler}/>
        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
