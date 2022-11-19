import { gql, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { logIn } from '../redux/authSlice'

export default function SignUp(props) {
    const [values, setValues] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        document.title = 'Sign Up - Notty'
    })
    const navigate = useNavigate()
    const [signIn, { error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            //save token
            localStorage.setItem('token', data.signIn)
            //update app state
            dispatch(logIn(data.signIn))
            navigate("/")
        }
    })
    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        signIn({ variables: { ...values } })
    }
    return (
        <section>
            <Container>
                <SignBoard>
                    <SignForm onSubmit={handleSubmit}>
                        <h2>Sign Up</h2>
                        <Form.Group controlId='formUsername'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' name='username' placeholder='Username' onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId='formPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} required />
                        </Form.Group>
                        {error ?
                            <Alert variant='danger'>Wrong password or user not found</Alert>
                        :null}
                        <Button variant='primary' type='submit'>Sign up</Button>
                    </SignForm>
                </SignBoard>
            </Container>
        </section>
    )
}

const SIGNUP_USER = gql`
    mutation($username: String!, $password: String!) {
        signIn(username: $username, password: $password)
    }
`

const SignBoard = styled.div`
    min-height: calc(100vh - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
`
const SignForm = styled(Form)`
    background: rgba(255,255,255,0.5);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.25);
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 16px;
    color: white;
    h2 {
        text-align: center;
    }
`