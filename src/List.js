import React, { Component } from 'react';
import {Button} from './Inputs'

class List extends Component {
  render() {
    return (
      <div {...this.props}
        style={{
          margin: '15px',
          padding: '10px',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        {(this.props.title !== undefined &&
          <h3 style={{ color: 'white' }}>{this.props.title}</h3>
        )}
        
        {this.props.children}

        {
          ((this.props.addNew !== undefined || this.props.removeLast !== undefined) &&
            <ListRow>
              {(this.props.addNew !== undefined) &&
                <ListColumn><Button onClick={this.props.addNew} text="+"/></ListColumn>}
              {(this.props.removeLast !== undefined) &&
                <ListColumn><Button onClick={this.props.removeLast} text="-"/></ListColumn>}
            </ListRow>
        )}
      </div>
    );
  }
}

class ListRow extends Component {
  render() {
    return (
      <div style={{
        height:'20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        margin: '5px',
        padding: '5px',
        backgroundColor: '#DDD'
      }}  {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

class ListColumn extends Component {
  render() {
    return (
      <div {...this.props} style={{
        paddingLeft: '10px',
        paddingRight: '10px',
      }}>
        {this.props.children}
      </div>
    );
  }
}

export default List;
export { ListRow, ListColumn }
