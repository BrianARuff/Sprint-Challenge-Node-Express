import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ActionList from './components/ActionList';

class App extends Component {
  state = {
    projects: [],
    projectsError: null,
  }
  componentDidMount() {
    axios
      .get(`http://localhost:9000/api/projects`)
      .then(projects => this.setState({projects: projects.data}))
      .catch(err => this.setState({projectsError: err}));
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
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
