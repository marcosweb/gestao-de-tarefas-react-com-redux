import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { done, del, pending, search } from './todoActions'


const TodoList = props => {
    
  const tableRows = () => {
    const list = props.list || []
    return list.map(todo => (
      <tr key={todo._id}>
        <td className={todo.done ? 'task-marked' : ''}>{todo.description}</td>
        <td className="table-actions">

          <IconButton
            style="success"
            icon="check"
            onClick={() => props.done(todo)}
            hide={todo.done}>
          </IconButton>

          <IconButton
            style="warning"
            icon="undo"
            onClick={() => props.pending(todo)}
            hide={!todo.done}>
            
          </IconButton>

          <IconButton
            style="danger"
            icon="trash-o"
            onClick={() => props.del(todo)}
            hide={!todo.done}>
          </IconButton>

        </td>
      </tr>
    ))
  }

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tableRows()}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({ list: state.todo.list })
const mapDispatchToProps = dispatch => bindActionCreators({ done, del, pending, search }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
