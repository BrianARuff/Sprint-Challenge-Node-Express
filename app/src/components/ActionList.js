import React from "react";
import axios from "axios";

class ActionList extends React.Component {
  state = {
    projectWithActions: [],
    projectWithActionsError: null,
    showForm: false,
    updatedProject: {
      description: this.props.project.description,
      name: this.props.project.name,
      completed: this.props.project.completed
    },
    updateError: null
  };
  componentDidMount() {
    axios
      .get(`http://localhost:9000/api/projects/${this.props.id}`)
      .then(actions =>
        this.setState({ projectWithActions: actions.data.actions })
      )
      .catch(err => this.setState({ projectWithActionsError: err }));
  }
  handleUpdate = (e, id) => {
    axios
      .put(
        `http://localhost:9000/api/projects/${this.props.id}`,
        this.state.updatedProject
      )
      .then(post => {
        this.setState({ project_id: id });
        window.location.reload();
      })
      .catch(err => this.setState({ updateError: err }));
    console.log(this.state.updatedProject);
    window.location.reload();
  };
  handleOnChange = e => {
    this.setState({
      updatedProject: {
        ...this.state.updatedProject,
        [e.target.name]: e.target.value
      }
    });
  };
  render() {
    return (
      <div>
        {this.state.projectWithActions.length > 1 ? (
          <h3>Project Actions</h3>
        ) : null}
        <button
          onClick={() => this.setState({ showForm: !this.state.showForm })}
        >
          Update Project
        </button>
        {this.state.showForm ? (
          <div style={{ display: "flexbox", flexDirection: "column" }}>
            <div>
              <span>Action Name: </span>
              <input
                onChange={this.handleOnChange}
                type="text"
                defaultValue={this.props.project.name}
                name="name"
                placeholder="Name"
              />
            </div>
            <div>
              <span>Action Description: </span>
              <textarea
                onChange={this.handleOnChange}
                type="text"
                defaultValue={this.props.project.description}
                name="description"
                placeholder="name"
                placeholder="Description"
              />
            </div>
            <div>
              <button
                style={{ background: "yellow" }}
                onClick={e => {
                  this.handleUpdate(e, this.props.project.id);
                }}
              >
                Update!
              </button>
            </div>
          </div>
        ) : null}
        {this.state.projectWithActions.map(action => {
          return (
            <div
              key={action.id}
              style={{
                border: "1px solid black",
                margin: "20px",
                padding: "20px",
                boxShadow: "3px 3px 3px rgba(0,0,0,0.2)"
              }}
            >
              <h4>Action Title: {action.description}</h4>
              <p>Action Info: {action.notes}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ActionList;
