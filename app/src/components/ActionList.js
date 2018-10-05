import React from 'react';
import axios from 'axios';


class ActionList extends React.Component {
  state = {
    projectWithActions: [],
    projectWithActionsError: null,
  }
  componentDidMount() {
    axios
      .get(`http://localhost:9000/api/projects/${this.props.id}`)
      .then(actions => this.setState({projectWithActions: actions.data.actions}))
      .catch(err => this.setState({projectWithActionsError: err}));
  }
  render() {
    return (
      <div>
      {
        this.state.projectWithActions.length > 1 ? <h3>Project Actions</h3> : null
      }
      {
        this.state.projectWithActions.map(action => {
          return (
            <div>
              <h4>Action Title: {action.description}</h4>
              <p>Action Info: {action.notes}</p>
            </div>
          )
        })
      }
      </div>
    )
  }
}

export default ActionList;