import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AddButton, RemoveButton } from 'Inputs'

class List extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div
        style={{
          margin: '15px',
          padding: '10px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          overflowX:'auto',
          maxWidth:'100%',
          border:'2px solid rgb(0, 15, 41)',
          boxShadow:'2px 2px 10px black',
        }}>

        {(this.props.title !== undefined &&
          <h3 style={{ color: 'white' }}>{this.props.title}</h3>
        )}
        {(this.props.header !== undefined &&
          <ListRow header minWidth={this.props.minWidth}>
            {this.props.header.map((header, index) => {
              return <ListColumn width={(this.props.columnWidths && this.props.columnWidths[index])}>{header}</ListColumn>
            })}
          </ListRow>
        )}
        {this.props.items.map((row, index) => {
          return (<ListRow primary={this.props.primaryHighlightIndex === index} minWidth={this.props.minWidth}>
            {
              (Array.isArray(row) ?
                row.map((col, index) => {
                  return <ListColumn width={(this.props.columnWidths && this.props.columnWidths[index])}>{col}</ListColumn>
                })
                :
                <ListColumn>
                  {row}
                </ListColumn>)
            }
            {
              (this.props.removeItem !== undefined &&
                <ListColumn><RemoveButton onClick={(e) => this.props.removeItem(index)} /></ListColumn>)}
          </ListRow>)
        })}

        {((this.props.addNew !== undefined || this.props.removeLast !== undefined) &&
          <ListRow utility>
            {(this.props.addNew !== undefined) &&
              <ListColumn><AddButton onClick={this.props.addNew} /></ListColumn>}
            {(this.props.removeLast !== undefined) &&
              <ListColumn><RemoveButton onClick={this.props.removeLast} /></ListColumn>}
          </ListRow>
        )}
      </div>
    );
  }
}
List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.any
  ),
  addNew: PropTypes.func,
  removeLast: PropTypes.func,
  removeItem: PropTypes.func,
  columnWidths: PropTypes.arrayOf(PropTypes.number)
}

class ListRow extends Component {
  render() {
    let backgroundColor = '#DDD'
    let weight='normal'
    let color='black'
    if(this.props.primary) backgroundColor = '#8cb7ff'
    if(this.props.header) backgroundColor = '#333'
    if(this.props.utility) backgroundColor='rgba(0,0,0,0)'
    if(this.props.header) weight='bold'
    if(this.props.header) color='white'
    return (
      <div style={{
        height: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '5px',
        padding: '5px',
        minWidth: this.props.minWidth ? this.props.minWidth + 'px': 'auto',
        color:color,
        backgroundColor: backgroundColor
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
        textAlign:'center',
        width: this.props.width + 'px',
        boxSizing:'border-box',
      }}>
        {this.props.children}
      </div>
    );
  }
}

export default List;
export { ListRow, ListColumn }
