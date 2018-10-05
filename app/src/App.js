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
    postError: null,
    deleteError: null,
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

  handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:9000/api/projects/${id}`)
      .then(resp => window.location.reload())
      .catch(err => this.setState({deleteError: err}));
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
                <ActionList project={project} id={project.id} />
                <button onClick={() => this.handleDelete(project.id)}>Delete this project</button>
              </div>
            )
          })
        }
        <div style={{display: 'flexbox', flexDirection: 'column'}}>
                  <h4>New Project</h4>
                  <div><span>Project Name: </span><input onChange={this.handleChange} type="text" name="name" placeholder="Name" /></div>
                  <div><span>Project Description: </span><input onChange={this.handleChange} type="text" name="description" placeholder="Description" /></div>
                  <div><span>True/False</span> <input onChange={this.handleChange} type="checkbox" name="completed" /></div>
                  <div><button onClick={this.handleSubmit}>Submit</button></div>
                </div>
      </div>
    );
  }
}

export default App;
