import React, { Component } from 'react';
import StateList from './Lists/StateList'
import TransitionList from './Lists/TransitionList'
import LetterList from './Lists/LetterList'
import Tape from './Tape'
import MachineReadingHead from './MachineReadingHead'
import Controls from 'Controls'

class TuringMachine extends Component {
    constructor(props) {
        super(props)

        this.setTransitions = this.setTransitions.bind(this)
        this.setStates = this.setStates.bind(this)
        this.setLetters = this.setLetters.bind(this)
        this.setTapeLettersAndShiftTapePosition = this.setTapeLettersAndShiftTapePosition.bind(this)
        this.setTapePosition = this.setTapePosition.bind(this)
        this.runIteration = this.runIteration.bind(this)

        this.state = {
            states: ['STATE 0'], //always length >= 1
            transitions: [{
                oldState: 'STATE 0',
                readLetter: 'A',
                newState: 'STATE 0',
                newLetter: 'A',
                moveDirection: 'L'
              }],
            letters: ['A'], //always length >= 1
            tapeLetters: ['A'],
            currentStateIndex: 0,
            currentTapePosition: 0,
        }
    }

    setTransitions(transitions) {
        this.setState({ transitions: transitions })
    }
    setStates(states) {
        let fixedTransitions = this.state.transitions.slice()
        fixedTransitions = fixedTransitions.map(transition => {
            let newTransition = Object.assign({}, transition)
            if (states.indexOf(newTransition.oldState) === -1)
                newTransition.oldState = states[0]
            if (states.indexOf(newTransition.newState) === -1)
                newTransition.newState = states[0]
            return newTransition
        })
        this.setState({
            states: states,
            transitions: fixedTransitions
        })
    }
    setLetters(letters) {
        let fixedTransitions = this.state.transitions.slice()
        fixedTransitions = fixedTransitions.map(transition => {
            let newTransition = Object.assign({}, transition)
            if (letters.indexOf(newTransition.readLetter) === -1)
                newTransition.readLetter = letters[0]
            if (letters.indexOf(newTransition.newLetter) === -1)
                newTransition.newLetter = letters[0]
            return newTransition
        })
        let fixedTapeLetters = this.state.tapeLetters.slice()
        fixedTapeLetters = fixedTapeLetters.map(letter => {
            if (letters.indexOf(letter) === -1)
                return letters[0]
            return letter
        })
        this.setState({
            letters: letters,
            transitions: fixedTransitions,
            tapeLetters: fixedTapeLetters
        })
    }
    setTapeLettersAndShiftTapePosition(tapeLetters, shiftTapePosition) {
        if(!shiftTapePosition) shiftTapePosition = 0
        this.setState(prevState => {
            return {
                tapeLetters: tapeLetters,
                currentTapePosition: prevState.currentTapePosition + shiftTapePosition
            }
        })
    }
    runIteration() {
        let transitionToRun = this.state.transitions.find(transition => {
            return (transition.oldState === this.state.states[this.state.currentStateIndex] &&
                transition.readLetter === this.state.tapeLetters[this.state.currentTapePosition])
        })
        if (transitionToRun === undefined) throw Error("There is no transition for current state and letter")
        let newTapeLetters = this.state.tapeLetters.slice()
        newTapeLetters[this.state.currentTapePosition] = transitionToRun.newLetter
        let newTapePosition = this.state.currentTapePosition + (transitionToRun.moveDirection === 'L' ? -1 : 1)
        if (newTapePosition < 0) {
            newTapeLetters.unshift(this.state.letters[0])
            newTapePosition += 1
        } else if (newTapePosition >= this.state.tapeLetters.length) {
            newTapeLetters.push(this.state.letters[0])
        }

        this.setState({
            currentStateIndex: this.state.states.indexOf(transitionToRun.newState),
            tapeLetters: newTapeLetters,
            currentTapePosition: newTapePosition,
        })
    }

    setTapePosition(position) {
        this.setState({ currentTapePosition: position })
    }

    render() {
        return (
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    <LetterList
                        letters={this.state.letters}
                        setLetters={this.setLetters}
                        currentLetterIndex={
                            this.state.letters.indexOf(
                                this.state.tapeLetters[this.state.currentTapePosition])
                        } />
                    <StateList
                        states={this.state.states}
                        setStates={this.setStates}
                        currentStateIndex={this.state.currentStateIndex} />
                    <TransitionList
                        transitions={this.state.transitions}
                        states={this.state.states}
                        letters={this.state.letters}
                        setTransitions={this.setTransitions}
                        nextTransitionIndex={this.state.transitions.findIndex(transition => {
                            return (transition.oldState === this.state.states[this.state.currentStateIndex] &&
                                transition.readLetter === this.state.tapeLetters[this.state.currentTapePosition])
                        })} />
                </div>
                <div style={{ position: 'relative', height: '140px', marginTop: '20px' }}>
                    <MachineReadingHead />
                    <Tape
                        tapeLetters={this.state.tapeLetters}
                        availableLetters={this.state.letters}
                        currentTapePosition={this.state.currentTapePosition}
                        setCurrentTapePosition={this.setCurrentTapePosition}
                        setTapeLetters={this.setTapeLettersAndShiftTapePosition} />
                </div>

                <Controls
                    runIteration={this.runIteration} />
            </div>
        )
    }
}

export default TuringMachine;
