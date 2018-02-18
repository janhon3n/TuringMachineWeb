import React, { Component } from 'react';
import { ListColumn, ListRow, default as List } from 'Lists/List'
import { ToggleButton, RemoveButton } from 'Inputs'

class TransitionList extends Component {

  constructor(props) {
    super(props)
    this.addNewTransition = this.addNewTransition.bind(this)
    this.editTransition = this.editTransition.bind(this)
    this.removeTransition = this.removeTransition.bind(this)
  }

  addNewTransition() {
    let newTransitions = this.props.transitions.slice()
    newTransitions.push({
      oldState: this.props.states[0],
      readLetter: this.props.letters[0],
      newState: this.props.states[0],
      newLetter: this.props.letters[0],
      moveDirection: 'L'
    })
    this.props.setTransitions(newTransitions)
  }

  removeTransition(index) {
    let newTransitions = this.props.transitions.slice()
    newTransitions.splice(index, 1)
    this.props.setTransitions(newTransitions)
  }

  editTransition(index, property, newValue) {
    let newTransition = Object.assign({}, this.props.transitions[index], { [property]: newValue })
    let newTransitions = this.props.transitions.slice()
    newTransitions[index] = newTransition
    this.props.setTransitions(newTransitions)
  }


  render() {
    return (
      <List
        title="Transitions"
        minWidth={600}
        addNew={this.addNewTransition}
        removeItem={this.removeTransition}
        header={['Old state', 'Read letter', 'New state', 'Written letter', 'Move direction', ' ']}
        items={this.props.transitions.map((transition, index) => {
          return [
            <ToggleButton value={transition.oldState} values={this.props.states}
              setValue={value => { this.editTransition(index, "oldState", value) }} />,
            <ToggleButton value={transition.readLetter} values={this.props.letters}
              setValue={value => { this.editTransition(index, "readLetter", value) }} />,
            <ToggleButton value={transition.newState} values={this.props.states}
              setValue={value => { this.editTransition(index, "newState", value) }} />,
            <ToggleButton value={transition.newLetter} values={this.props.letters}
              setValue={value => { this.editTransition(index, "newLetter", value) }} />,
            <ToggleButton direction value={transition.moveDirection} values={['L', 'R']}
              setValue={value => { this.editTransition(index, "moveDirection", value) }} />,
          ]
        })}
        columnWidths={[200,100,200,120,120,50]}
        primaryHighlightIndex={this.props.nextTransitionIndex} />
    );
  }
}

export default TransitionList;
