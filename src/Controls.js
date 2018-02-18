import React, { Component } from 'react'
import { Button } from 'Inputs'

class Controls extends Component {

   constructor(props) {
      super(props)
      this.runIteration = this.runIteration.bind(this)
      this.setSpeed = this.setSpeed.bind(this)
      this.startInterval = this.startInterval.bind(this)
      this.stopInterval = this.stopInterval.bind(this)

      this.state = {
         error: null,
         intervalId: null,
         speed: 1,
      }
   }

   runIteration() {
      try {
         this.props.runIteration();
      } catch (err) {
         if(this.state.intervalId !== null){
            this.stopInterval()
         }
         return this.setState({ error: err })
      }
      this.setState({ error: null })
   }

   setSpeed(value) {
      this.setState({ speed: Number(value) })
      if(this.state.intervalId !== null){
         this.stopInterval()
         this.startInterval()
      }
   }

   startInterval(){
      let intervalId = window.setInterval(this.runIteration, 1/this.state.speed*1000)
      this.setState({intervalId:intervalId})
   }
   stopInterval(){
      if(this.state.intervalId !== null){
         window.clearInterval(this.state.intervalId)
         this.setState({intervalId: null})
      }
   }

   componentWillUnmount() {
      this.stopInterval()
   }
   
   render() {
      return (
         <div style={{ display: 'flex', flexDirection: 'column', spaceBetween: '5px', alignItems: 'center' }}>
            {(this.state.error !== null && <div style={{ color: '#ff5656', fontSize: '20px' }}>{this.state.error.message}</div>)}
            <div style={{
               display: 'flex',
               flexWrap: 'wrap',
               padding: '10px',
            }}>
               <Button big onClick={this.runIteration} text="Run one iteration" />
               {this.state.intervalId === null ?
                  <Button big onClick={this.startInterval} text="Run constantly" />
                  : <Button big onClick={this.stopInterval} text="Stop" />}
               <div style={{
                  margin: '10px',
                  display: 'flex',
                  flexDirection: 'column'
               }}>
                  <label style={{ color: 'white', fontSize: '18px' }}>Speed</label>
                  <input style={{ width: '200px' }} value={this.state.speed} type="range" min="0.2" max="10" step="0.2" onChange={(e) => this.setSpeed(e.target.value)} />
                  <label style={{ color: 'white', fontSize: '16px' }}>{this.state.speed + " per second"}</label>
               </div>
            </div>
         </div>
      )
   }
}

export default Controls