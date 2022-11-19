import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useMatches } from 'react-router-dom'

const GET_NOTE = gql`
query Query($noteId: ID!) {
    note(id: $noteId) {
      id
      content
      author {
        username
      }
    }
  }
`

export default function Note(props) {
    const matches = useMatches()
    const id = matches[1].params.noteId
    // const id = props.matches
    console.log(id)
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { noteId: id } });
    if(loading) return <div>Loading...</div>
    if(error) return <div>Error!</div>
    if(data) return (
        <div className='container'>
            <h1>{data.note.author.username}</h1>
            <p>{data.note.content}</p>
        </div>
    )
}