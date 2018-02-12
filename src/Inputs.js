import React, { Component } from 'react';

function Button(props){
  return (
    <button style={{
      whiteSpace:'nowrap'
    }} {...props}>{props.text}</button>
  )
}


/* All values given by props must be primitive
  because equality is checked by === */
class ToggleButton extends Component {

  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    let currentValueIndex = this.props.values.indexOf(this.props.value)
    if (currentValueIndex === -1) throw new Error('this.props.value does not exist in this.props.values')
    let newValue = this.props.values[(currentValueIndex + 1) % this.props.values.length]
    this.props.setValue(newValue)
  }

  render() {
    return (
      <Button onClick={this.toggle} text={this.props.value}/>
    );
  }
}


class EditableField extends Component {
  constructor(props) {
    super(props)
    this.edit = this.edit.bind(this)

    this.state = {
      editingInProgress: false
    }
  }

  edit() {

  }

  render() {
    if (!this.state.editingInProgress) {
      return (
        <div>{this.props.value}</div>
      )
    } else {
      return (
        <div>{this.props.value}</div>
      )
    }
  }
}

export { ToggleButton, EditableField, Button };
