import React, { Component } from 'react';
import { ListColumn, ListRow, default as List } from './List'

class LetterList extends Component {

    constructor(props) {
        super(props)
        this.addNewLetter = this.addNewLetter.bind(this)
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

    render() {
        return (
            <List
                title="Letters"
                addNew={(this.props.letters.length < this.supportedLetters.length ? this.addNewLetter : undefined)}>
                
                {this.props.letters.map((letter) => {
                    return (<ListRow>
                        <ListColumn>{letter}</ListColumn>
                    </ListRow>)
                })}
            </List>
        );
    }
}

export default LetterList;
