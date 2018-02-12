import React, { Component } from 'react';
import { ListColumn, ListRow, default as List } from './List'
import TuringMachineJS from './TuringMachineJS'
import { ToggleButton } from './Inputs'

class TransitionList extends Component {

  constructor(props) {
    super(props)
    this.addNewTransition = this.addNewTransition.bind(this)
    this.setTransition = this.setTransition.bind(this)
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

  setTransition(index, transition) {
    let newTransitions = this.props.transitions.slice()
    newTransitions[index] = transition
    this.props.setTransitions(newTransitions)
  }

  render() {
    return (
      <List title="Transitions" addNew={this.addNewTransition}>
        {this.props.transitions.map((transition, index) => {
          return (<TransitionListRow transition={transition} states={this.props.states} letters={this.props.letters} index={index} setTransition={this.setTransition} />)
        })}
      </List>
    );
  }
}



class TransitionListRow extends Component {
  constructor(props) {
    super(props)
    this.mutateTransition = this.mutateTransition.bind(this)
  }

  mutateTransition(name, value) {
    let newTransition = Object.assign({}, this.props.transition)
    newTransition[name] = value
    this.props.setTransition(this.props.index, newTransition)
  }

  render() {
    let props = this.props
    let mutateTransition = this.mutateTransition
    let properties = []
    properties.push({property: 'oldState', values: props.states})
    properties.push({property: 'readLetter', values: props.letters})
    properties.push({property: 'newState', values: props.states})
    properties.push({property: 'newLetter', values: props.letters})
    properties.push({property: 'moveDirection', values: ['L','R']})
    return (
      <ListRow>
        {
          properties.map((o) => {
            return (
              <ListColumn>
                <ToggleButton
                  value={props.transition[o.property]}
                  values={o.values}
                  name={o.property}
                  setValue={(value) => {
                    mutateTransition(o.property, value)
                  }} />
              </ListColumn>
            )
          })
        }
        <ListColumn>Delete</ListColumn>
      </ListRow>
    )
  }
}

export default TransitionList;
