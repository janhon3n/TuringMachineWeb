import React, { Component } from 'react';
import { ListColumn, ListRow, default as List } from 'Lists/List'
import { EditableField } from 'Inputs'

class StateList extends Component {

  constructor(props) {
    super(props)
    this.addNewState = this.addNewState.bind(this)
    this.removeLastState = this.removeLastState.bind(this)
    this.editState = this.editState.bind(this)

  }
  addNewState() {
    let newStates = this.props.states.slice()
    newStates.push('STATE ' + this.props.states.length)
    this.props.setStates(newStates)
  }

  removeLastState() {
    let newStates = this.props.states.slice()
    newStates.pop()
    this.props.setStates(newStates)
  }

  editState(index, value) {
    let newStates = this.props.states.slice()
    newStates[index] = value
    this.props.setStates(newStates)
  }

  render() {
    return (
      <List
        title="States"
        header={['']}
        addNew={this.addNewState}
        removeLast={(this.props.states.length > 1 ? this.removeLastState : undefined)}
        items={this.props.states.map((state, index) => {
          return <EditableField value={state} setValue={value => {
            this.editState(index, value)
          }}/>
        })}
        primaryHighlightIndex={this.props.currentStateIndex}/>
    );
  }
}


class StateListRow extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ListRow>
        <ListColumn>
          <EditableField value={this.props.state} setValue={value => {
            this.props.setState(this.props.index, value)
          }}></EditableField>
        </ListColumn>
      </ListRow>
    )
  }
}

export default StateList;
