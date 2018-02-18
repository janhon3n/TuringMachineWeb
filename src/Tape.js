import React, { Component } from 'react';
import { ToggleButton, AddButton } from './Inputs';

class Tape extends Component {

  constructor(props) {
    super(props)
    this.addLetter = this.addLetter.bind(this)
    this.setLetter = this.setLetter.bind(this)

    this.state = {
      blockSize: 40,
    }
  }

  addLetter(toBeginning) {
    let newTapeLetters = this.props.tapeLetters.slice()
    if (toBeginning) newTapeLetters.unshift(this.props.availableLetters[0])
    else newTapeLetters.push(this.props.availableLetters[0])
    this.props.setTapeLetters(newTapeLetters, (toBeginning ? 1 : 0))
  }
  setLetter(index, letter) {
    let newTapeLetters = this.props.tapeLetters.slice()
    newTapeLetters[index] = letter
    this.props.setTapeLetters(newTapeLetters)
  }

  render() {
    let leftShiftAmount = this.state.blockSize / 2 + (this.props.currentTapePosition + 1) * this.state.blockSize;
    return (
      <div style={{
        position: 'absolute',
        top: '80px',
        left: 'calc(50% - ' + leftShiftAmount + 'px)'
      }}>
        <div style={{
          display: 'flex',
        }}>
          <AddBlock onClick={(e) => this.addLetter(true)} />
          {this.props.tapeLetters.map((letter, index) => {
            return (<TapeLetter
              active={this.props.currentTapePosition === index}
              size={this.state.blockSize}
              index={index}
              letter={letter}
              letters={this.props.availableLetters}
              setLetter={this.setLetter} />)
          })}
          <AddBlock onClick={(e) => this.addLetter(false)} />
        </div>
      </div>
    );
  }
}


function TapeLetter(props) {
  return (
    <TapeBlock size={props.size} active={props.active}>
      <ToggleButton value={props.letter} values={props.letters} setValue={(value) => props.setLetter(props.index, value)}>
        {props.letter}
      </ToggleButton>
    </TapeBlock>
  )
}

function AddBlock(props) {
  return (
    <TapeBlock utility size={props.size}>
      <AddButton onClick={props.onClick} />
    </TapeBlock>
  )
}

function TapeBlock(props) {
  let backgroundColor = '#EEE'
  let border = '1px solid black'
  let boxShadow = '2px 2px 5px black'

  if (props.active) backgroundColor = '#8cb7ff'
  if (props.utility) backgroundColor = 'rgba(0,0,0,0)'
  if (props.utility) border = '0'
  if (props.utility) boxShadow = '0'
  return (

    <div style={{
      width: props.size + 'px',
      height: props.size + 'px',
      backgroundColor: backgroundColor,
      fontSize: '20px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
      padding: '5px',
      border: border,
      boxShadow: boxShadow,
      boxSizing: 'border-box',
    }}>
      {props.children}
    </div>
  )
}

export default Tape;
