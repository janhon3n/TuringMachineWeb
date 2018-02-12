function Tape(letters, initialPosition) {
    this.left = letters.slice(0, initialPosition)
    this.right = letters.slice(initialPosition + 1)
    this.middleLetter = letters[initialPosition]
}
Tape.prototype.shiftLeft = function () {
    this.left.push(this.middleLetter)
    this.middleLetter = this.right.length !== 0 ? this.right.shift() : ' '
}
Tape.prototype.shiftRight = function() {
    this.right.unshift(this.middleLetter)
    this.middleLetter = this.left.length !== 0 ? this.left.pop() : ' '
}
Tape.prototype.push = function(letter) {
    this.right.push(letter)
}

function TuringMachine(tape, initialState, goalStates, transitions) {
    this.tape = tape
    this.currentState = initialState
    this.goalStates = goalStates
    this.transitions = transitions
}
TuringMachine.prototype.runIteration = function () {
    let transition = this.transitions.find((t) => {
        return (t.key.oldState === this.currentState &&
            t.key.readLetter === this.tape.middleLetter)
    });

    if(transition === undefined)
        throw new Error('No transition found with key { state: '+
        this.currentState+' letter: '+this.tape.middleLetter+' }')

    this.currentState = transition.values.newState
    this.tape.middleLetter = transition.values.newLetter
    if(transition.values.moveDirection === 'L') this.tape.shiftLeft()
    if(transition.values.moveDirection === 'R') this.tape.shiftRight()
}
TuringMachine.prototype.goalStateReached = function() {
    if(this.goalStates.indexOf(this.currentState) !== -1) return true
    return false
}

function Transition(oldState, readLetter, newState, newLetter, moveDirection){
    this.key = {
        oldState: oldState,
        readLetter: readLetter
    }
    this.values = {
        newState: newState,
        newLetter: newLetter,
        moveDirection: moveDirection
    }
}

export default {
    TuringMachine: TuringMachine,
    Transition: Transition,
    Tape: Tape
}