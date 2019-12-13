import React from 'react';
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setText } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    console.log('vote', anecdotes)
    const vote = (anecdote) => () => {
        const message = 'You voted for "' + anecdote.content + '"'
        console.log('vote', anecdote.id)
        props.voteForAnecdote(anecdote)
        props.setText(message, 5)
      }
  
    return (
        <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
          </>
    )
}

const orderedAnecdotes = (anecdotes) => {
    console.log(anecdotes.sort((a, b) => b.votes - a.votes))
    return anecdotes.sort((a, b) => b.votes - a.votes).slice()
}

const mapStateToProps = (state) => {
    return {
        anecdotes: orderedAnecdotes(state.anecdotes)
    }
}

const mapDispatchToProps = {
    voteForAnecdote,
    setText
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList