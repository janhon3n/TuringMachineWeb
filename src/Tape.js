import React, { Component } from 'react';
import { ToggleButton } from './Inputs';

class Tape extends Component {

  constructor(props) {
    super(props)
    this.setLetter = this.setLetter.bind(this)

    this.state = {
      tapeLetters: [this.props.letters[0], this.props.letters[0], this.props.letters[0], this.props.letters[0], this.props.letters[0], this.props.letters[0], this.props.letters[0], this.props.letters[0], this.props.letters[0], this.props.letters[0]]
    }
  }

  setLetter(index, letter) {
    let newTapeLetters = this.state.tapeLetters.slice()
    newTapeLetters[index] = letter
    this.setState({ tapeLetters: newTapeLetters })
  }

  render() {
    let leftShiftAmount = 23 + (1+this.props.currentTapePosition) * 47
    return (
      <div style={{
        position: 'absolute',
        top: '80px',
        left: 'calc(50% - ' + leftShiftAmount + 'px)'
      }}>
        <div style={{
          display:'flex',
        }}>
          {this.state.tapeLetters.map((letter, index) => {
            return (<TapeLetter
              size='30px'
              index={index}
              letter={letter}
              letters={this.props.letters}
              setLetter={this.setLetter} />)
          }) }
        </div>
      </div>
    );
  }
}


function TapeLetter(props) {
  return (
    <TapeBlock>
      <ToggleButton value={props.letter} values={props.letters} setValue={(value) => props.setLetter(props.index, value)}>
        {props.letter}
      </ToggleButton>
    </TapeBlock>
  )
}

function TapeBlock(props) {
  return (
    <div style={{
      width: props.size,
      height: props.size,
      backgroundColor: '#EEE',
      fontSize: '20px',
      margin: '1px',
      padding: '7px',
      borderRadius: '5px',
    }}>
      {props.children}
    </div>
  )
}

export default Tape;
