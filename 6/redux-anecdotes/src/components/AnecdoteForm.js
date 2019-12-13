import React from 'react';
import { connect } from 'react-redux'
import {  addAnecdote } from '../reducers/anecdoteReducer'
import { setText } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const message = 'Added anecdote "' + content + '"'
        props.addAnecdote(content)
        props.setText(message, 5)
        
    }
  
    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addNew}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
        </>
    )
  }

/*const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotes: state.anecdotes
    }
}*/

const mapDispatchToProps = {
    addAnecdote,
    setText
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
