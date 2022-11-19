import { gql, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Container as BsCnt } from 'react-bootstrap'
import styled from 'styled-components'

export default function Home() {
    const { data, loading } = useQuery(GET_MY_INFO)
    console.log(data)
    useEffect(() => {
        if(loading) {
            document.title = 'Profile - Notty'
        } else {
            document.title = `${data.me ? data.me.username : 'Profile'} - Notty`
        }
    }, [])
    return (
        <div>
            <Container>
                {loading ? <h1>Loading...</h1> :
                    <User>
                        <div className='avatar'>
                            <img src={data.me.avatar} alt={data.me.username} />
                        </div>
                        <div className='info'>
                            <h3>{data.me.username}<span className='id'>({data.me.id})</span></h3>
                        </div>
                    </User>
                }
            </Container>
        </div>
    )
}

const GET_MY_INFO = gql`
    query Me {
        me {
            id
            username
            avatar
        }
    }
`
const Container = styled(BsCnt)`
    background: rgba(255,255,255,0.5);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.25);
`
const User = styled.div`
    display: flex;
    .avatar {
        width: 200px;
        height: 200px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .info {
        color: white;
        .id {
            font-style: italic;
            color: #585858;
        }
    }
`