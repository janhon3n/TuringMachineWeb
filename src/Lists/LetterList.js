import React, { Component } from 'react';
import { ListColumn, ListRow, default as List } from 'Lists/List'

class LetterList extends Component {

    constructor(props) {
        super(props)
        this.addNewLetter = this.addNewLetter.bind(this)
        this.removeLastLetter = this.removeLastLetter.bind(this)
        this.supportedLetters = ['A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
            'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    }

    addNewLetter() {
        if(this.props.letters.length >= this.supportedLetters.length)
            throw new Error('Maximun letter count reaced')
        let newLetter = this.supportedLetters[this.props.letters.length]
        let newLetters = this.props.letters.slice()
        newLetters.push(newLetter)
        this.props.setLetters(newLetters)
    }

    removeLastLetter() {
        let newLetters = this.props.letters.slice()
        newLetters.pop()
        this.props.setLetters(newLetters)
    }

    render() {
        return (
            <List
                title="Letters"
                header={['']}
                addNew={(this.props.letters.length < this.supportedLetters.length ? this.addNewLetter : undefined)}
                removeLast={(this.props.letters.length > 1 ? this.removeLastLetter : undefined)}
                items={this.props.letters}
                primaryHighlightIndex={this.props.currentLetterIndex}>
            </List>
        );
    }
}

export default LetterList;
