import React, { Component } from 'react';
import {ListColumn, ListRow, default as List} from './List'
import {EditableField} from './Inputs'

class StateList extends Component {

  constructor(props) {
    super(props)
    this.addNewState = this.addNewState.bind(this)

  }
  addNewState() {
    let newStates = this.props.states.slice()
    newStates.push('STATE '+this.props.states.length)
    this.props.setStates(newStates)
  }

  setState(index, value){
    let newStates = this.props.states.slice()
    newStates[index] = value
    this.props.setStates(newStates)
  }

  render() {
    return (
      <List title="States" addNew={this.addNewState}>
        {this.props.states.map((state) => {
          return (<StateListRow state={state} setState={this.setState}/>)
        })}
      </List>
    );
  }
}


class StateListRow extends Component{

  constructor(props){
    super(props)
  }

  render() {
    return(
      <ListRow>
        <ListColumn>
          <EditableField value={this.props.state} setValue={(value) => {
            this.props.setState(this.props.index, value)
          }}></EditableField>
        </ListColumn>
      </ListRow>
    )
  }
}

export default StateList;
