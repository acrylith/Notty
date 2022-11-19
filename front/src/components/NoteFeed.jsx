import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { AiFillHeart } from 'react-icons/ai'

export default function NoteFeed(props) {
    const { cursor = null, hasNextPage = false, notes = [], fetchMore } = props
    // console.log(`cursor: ${cursor}`)
    return (
        <div>
            {notes ? notes.map(note => {
                return <Note key={note.id}>
                    <Card.Body>
                        <Title>
                            <div className='author'>
                                <span className='avatar'><img src={note.author.avatar} alt={note.author.username} /></span>
                                {note.author.username}
                            </div>
                        </Title>
                        <Card.Text>
                            <LinkContainer to={`note/${note.id}`}>
                                <span>{note.content}</span>
                            </LinkContainer>
                        </Card.Text>
                        <Interactions>
                            <em>{dayjs(note.updatedAt).format('DD/MM/YYYY HH:mm')}</em>
                            <span><AiFillHeart />{note.favoriteCount}</span>
                        </Interactions>
                    </Card.Body>
                </Note>
            }) : null}
            {hasNextPage &&
                <Button
                    type='primary'
                    onClick={() =>
                        fetchMore({
                            variables: {
                                cursor: cursor
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                }
                            }
                        })
                    }
                >
                    Load More...
                </Button>
            }
        </div>
    )
}

const Note = styled(Card)`
    margin: 12px 0;
    background-color: transparent;
    border: none;
    color: white;
`
const Title = styled(Card.Title)`
    display: flex;
    align-items: center;
    .author {
        display: flex;
        align-items: center;
        gap: 16px;
        font-weight: 600;
        .avatar {
            width: 52px;
            height: 52px;
            display: inline-block;
            border-radius: 50%;
            border: 1px solid white;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
`
const Interactions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`