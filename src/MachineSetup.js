import React, { Component } from 'react';
import StateList from './StateList'
import TransitionList from './TransitionList'
import LetterList from './LetterList'
import Tape from './Tape'
import MachineReadingHead from './MachineReadingHead'

class MachineSetup extends Component {
    constructor(props) {
        super(props)

        this.setTransitions = this.setTransitions.bind(this)
        this.setStates = this.setStates.bind(this)
        this.setLetters = this.setLetters.bind(this)

        this.state = {
            states: ['STATE 0'],
            transitions: [],
            letters: ['A','B'],
            currentStateIndex: 0,
            currentTapePosition: 1,
        }
    }

    setTransitions(transitions) {
        this.setState({ transitions: transitions })
    }
    setStates(states) {
        this.setState({ states: states })
    }
    setLetters(letters) {
        this.setState({ letters: letters })
    }

    render() {
        return (
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <LetterList
                        letters={this.state.letters}
                        setLetters={this.setLetters} />
                    <StateList
                        states={this.state.states}
                        setStates={this.setStates} />
                    <TransitionList
                        transitions={this.state.transitions}
                        states={this.state.states}
                        letters={this.state.letters}
                        setTransitions={this.setTransitions} />
                </div>
                <div style={{ position: 'relative' }}>
                    <MachineReadingHead/>
                    <Tape
                        letters={this.state.letters}
                        currentTapePosition={this.state.currentTapePosition} />
                </div>
            </div>
        )
    }
}

export default MachineSetup;
