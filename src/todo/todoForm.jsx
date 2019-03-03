import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { changeTask, search, add, clearSearch } from './todoActions'

class TodoForm extends Component {

  constructor(props) {
    super(props)

    this.keyHandler = this.keyHandler.bind(this)
  }

  componentWillMount() {
    this.props.search()
  }

  keyHandler(e) {
    const { add, search, clearSearch, description } = this.props
    if (e.key === 'Enter') {
      e.shiftKey ? search() : add(description)
    } else if (e.key === 'Escape') {
      clearSearch()
    }
  }

  render() {
    const { add, search, description, clearSearch, changeTask } = this.props
    return (
      <div role="form" className="todo-form">

        <Grid cols="12 9 10">
          <input
            id="description"
            className="form-control"
            placeholder="Adicione uma tarefa"
            value={description}
            onChange={changeTask}
            onKeyUp={this.keyHandler}
          />
        </Grid>
    
        <Grid cols="12 3 2">
          <IconButton style="primary" icon="plus" onClick={() => add(description)}></IconButton>
          <IconButton style="info" icon="search" onClick={search} hide={!description}></IconButton>
          <IconButton style="default" icon="close" onClick={clearSearch} hide={!description}></IconButton>
        </Grid>
    
      </div>
    )
  }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToProps = dispatch => bindActionCreators({ changeTask, search, add, clearSearch }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)