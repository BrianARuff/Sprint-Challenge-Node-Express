import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ActionList from './components/ActionList';

class App extends Component {
  state = {
    projects: [],
    projectsError: null,
    newPost: {
      name: '',
      description: '',
      completed: false,
    },
    postError: null
  }
  componentDidMount() {
    axios
      .get(`http://localhost:9000/api/projects`)
      .then(projects => this.setState({projects: projects.data}))
      .catch(err => this.setState({projectsError: err}));
  }
  handleSubmit = e => {
    axios.post(`http://localhost:9000/api/projects`, this.state.newPost)
    .then(resp => window.location.reload())
    .catch(err => this.setState({postError: err}));
  }
  
  handleChange = e => {
    console.log(e.target.type);
    if(e.target.type === 'checkbox') {
      this.setState({newPost: {...this.state.newPost, completed: e.target.checked}})
    } else {
      this.setState({newPost: {...this.state.newPost, [e.target.name]: e.target.value}});
    }
  }


  render() {
    return (
      <div className="App">
        <h1>Project List</h1>
        {
          this.state.projects.map(project => {
            return (
              <div style={{border: '1px solid black', margin: '20px', padding: '20px'}} key={project.id}>
                <h2>Project Details</h2>
                <h4>Project Name: {project.name}</h4>
                <p>Description: {project.description}</p>
                <small>Status: {project.completed ? 'Done': 'In Progress'}</small>
                <ActionList id={project.id} />
                <div style={{display: 'flexbox', flexDirection: 'column'}}>
                  <div><input onChange={this.handleChange} type="text" name="name" placeholder="Name" /></div>
                  <div><input onChange={this.handleChange} type="text" name="description" placeholder="Description" /></div>
                  <div><input onChange={this.handleChange} type="checkbox" name="completed" /><span>True/False</span></div>
                  <div><button onClick={this.handleSubmit}>Submit</button></div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
