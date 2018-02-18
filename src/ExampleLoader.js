import React, { Component } from 'react'
import { Button } from 'Inputs'

class ExampleLoader extends Component {
   constructor(props) {
      super(props)

      this.loadExample = this.loadExample.bind(this)

      this.examples = [
         {
            name: 'Back and forth',
            letters: ['A','B'],
            states: ['Forward','Back'],
            transitions: [
               {
                  moveDirection:'R',
                  newLetter:'A',
                  newState:'Forward',
                  oldState:'Forward',
                  readLetter:'A'
               },
               {
                  moveDirection:'L',
                  newLetter:'B',
                  newState:'Back',
                  oldState:'Forward',
                  readLetter:'B'
               },
               {
                  moveDirection:'L',
                  newLetter:'A',
                  newState:'Back',
                  oldState:'Back',
                  readLetter:'A'
               },
               {
                  moveDirection:'R',
                  newLetter:'B',
                  newState:'Forward',
                  oldState:'Back',
                  readLetter:'B'
               }
            ],
            tapeLetters: [
               'B','A','A','A','A','A','A','B'
            ],
            initialState: 'Forward',
            initialTapePosition: 3,
         },
         {
            name:'Binary adder',
            states:['State 1','State 2','State 3','State 4', 'State 5'],
            letters:['A','B'],
            transitions: [{
               oldState:'State 1',
               readLetter: 'A',
               newState: 'State 1',
               newLetter: 'A',
               moveDirection: 'R'
            },
            {
               oldState:'State 1',
               readLetter: 'B',
               newState: 'State 2',
               newLetter: 'B',
               moveDirection: 'R'
            },
            {
               oldState:'State 2',
               readLetter: 'A',
               newState: 'State 3',
               newLetter: 'B',
               moveDirection: 'R',
            },
            {
               oldState:'State 2',
               readLetter: 'B',
               newState: 'State 2',
               newLetter: 'B',
               moveDirection: 'R'
            },
            {
               oldState:'State 3',
               readLetter: 'A',
               newState: 'State 4',
               newLetter: 'A',
               moveDirection: 'L'
            },
            {
               oldState:'State 3',
               readLetter: 'B',
               newState: 'State 3',
               newLetter: 'B',
               moveDirection: 'R'
            },
            {
               oldState:'State 4',
               readLetter: 'A',
               newState: 'State 4',
               newLetter: 'A',
               moveDirection: 'L'
            },
            {
               oldState:'State 4',
               readLetter: 'B',
               newState: 'State 5',
               newLetter: 'A',
               moveDirection: 'L'
            },
            {
               oldState:'State 5',
               readLetter: 'A',
               newState: 'State 5',
               newLetter: 'A',
               moveDirection: 'R'
            },
            {
               oldState:'State 5',
               readLetter: 'B',
               newState: 'State 5',
               newLetter: 'B',
               moveDirection: 'L'
            }],
            tapeLetters:['A','A','B','B','B','B','A','B','B','B','B','B','A'],
            initialState:'State 1',
            initialTapePosition:0,
         }
      ]

      this.state = {
         selectedExample: 'Back and forth'
      }
   }

   loadExample(){
      let example = this.examples.find(example => {
         return (example.name === this.state.selectedExample)
      })
      example = Object.assign({}, example)
      example.currentStateIndex = example.states.indexOf(example.initialState)
      example.currentTapePosition = example.initialTapePosition
      example.initialState = undefined
      example.initialTapePosition = undefined
      example.name = undefined
      this.props.loadExample(example)
   }

   render() {
      return (
         <div style={{display:'flex', justifyContent:'center'}}>
            <label style={{color:'white', marginRight:'15px'}}>Load an example:</label>
            <select style={{fontSize:'14px', marginRight:'5px'}} onChange={e => this.setState({ selectedExample: e.target.value })} value={this.state.selectedExample}>
               {this.examples.map((example, index) => {
                  return <option value={example.name}>{example.name}</option>
               })}
            </select>
            <Button text='Load' onClick={this.loadExample} />
         </div>
      )
   }
}

export default ExampleLoader