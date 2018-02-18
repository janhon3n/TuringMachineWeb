import React, { Component } from 'react';

class MachineReadingHead extends Component {
  render() {
    return (
      <div {...this.props}
        style={{
          width: '200px',
          height: '80px',
          position: 'absolute',
          left: 'calc(50% - 100px)'
        }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="20,2 50,98, 80,2" style={{
            fill:'#003999',
            stroke:'black',
          }}/>
        </svg>
      </div>
    );
  }
}

export default MachineReadingHead;
