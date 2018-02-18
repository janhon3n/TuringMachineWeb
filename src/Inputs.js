import React, { Component } from 'react';
import AddIcon from 'react-icons/lib/md/add'
import RemoveIcon from 'react-icons/lib/md/clear'
import LeftIcon from 'react-icons/lib/md/arrow-back'
import RightIcon from 'react-icons/lib/md/arrow-forward'
function Button(props) {
  let width = (props.fullWidth ? '100%':'auto')
  let padding = '2px'
  let fontSize = 'auto'
  let margin= '0px'
  if(props.big){
    padding='10px'
    fontSize= '18px'
    margin= '10px'
  }
  return (
    <button {...props} style={{
      minWidth:'30px',
      whiteSpace: 'nowrap',
      fontFamily: 'Roboto Mono',
      width: width,
      margin: margin,
      padding: padding,
      fontSize: fontSize,
      overflow:'hidden',
    }}>{props.text}</button>
  )
}

function AddButton(props) {
  return (
    <Button {...props} text={<AddIcon />} />
  )
}

function RemoveButton(props) {
  return (
    <Button {...props} text={<RemoveIcon />} />
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
    let text = this.props.value
    if(this.props.direction && this.props.value === 'L') {
      text = <LeftIcon/>
    } else if(this.props.direction && this.props.value === 'R'){
      text = <RightIcon/>
    }
    return (
      <Button fullWidth onClick={this.toggle} text={text} />
    );
  }
}

class EditableField extends Component {
  render() {
    return (
      <input style={{
        padding:'5px',
        border:'0',
        width:'80px',
        fontFamily: 'Roboto Mono',
        backgroundColor:'rgba(255,255,255,0.5)',
        boxSizing:'border-box',
      }} onChange={(e) => this.props.setValue(e.target.value)} value={this.props.value}/>
    )
  }
}


export { ToggleButton, EditableField, Button, AddButton, RemoveButton };
