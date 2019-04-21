import React, { Component } from 'react';
import Header from './components/layout/Header'
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    console.log('test')
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
    axios.post("http://localhost:4000/api/v1/users", data)
      .then(res => this.setState({ users: res.data.users }));
   }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className= "AppBody" style={AppBodyStyle}>
          <div style={UploadDivStyle}>
            <label>Select csv file to upload </label>
            <br/>
            <input type="file" name="file" accept=".csv" style={InputStyle} onChange={this.onChangeHandler}/>
            <button type="button" className="btn" style={BtnUpload} onClick={this.onClickHandler}>Upload</button>   
          </div>
        
          <div style={UserListStyle}>
            <ul style={UserListUlStyle}>
              {this.state.users.map(item => (
                <li key={item.id}>
                {item.full_name}
                </li>
              ))}
            </ul>
          </div>
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
  width: '25%',
  listStyle: 'none'
}

const AppBodyStyle = {
  fontSize: '14px'
}

const InputStyle = {
  border: 'solid',
  borderColor: '#333',
  borderWidth: '1px',
  borderRadius: '5px'
}

const BtnUpload = {
  color: '#fff',
  backgroundColor: '#333',
  border: 'none',
  borderRadius: '2px',
  margin: '5px',
  padding: '5px 20px'
}

export default App;
