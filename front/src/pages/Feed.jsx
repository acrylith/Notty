import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container as BsCnt } from 'react-bootstrap'
import NoteFeed from '../components/NoteFeed'
import styled from 'styled-components'

export default function Feed() {
    const { data, isLoading, error, fetchMore } = useQuery(GET_NOTES)
    useEffect(() => {
        document.title = 'Feed - Notty'
    }, [])
    console.log(localStorage.getItem('token'))
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h1>{console.log(error)}Error!</h1>
    return (
        <section>
            <Container>
                {data ? 
                    <NoteFeed
                        cursor={data.noteFeed.cursor}
                        hasNextPage = {data.noteFeed.hasNextPage}
                        notes={data.noteFeed.notes}
                        fetchMore={fetchMore}
                    />
                : <h1>Loading...</h1>}
            </Container>
        </section>
    )
}

const Container = styled(BsCnt)`
    background: rgba(255,255,255,0.5);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.25);
`

const GET_NOTES = gql`
    query Query($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                author {
                    id
                    username
                    avatar
                }
            content
            updatedAt
            favoriteCount
            }
        }
    }
`