import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logIn } from '../redux/authSlice'

export default function Register() {
    const [values, setValues] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [register, { error }] = useMutation(REGISTER, {
        onCompleted: data => {
            //save token
            localStorage.setItem('token', data.signUp)
            //update app state
            dispatch(logIn(data.signUp))
            navigate('/')
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
        register({ variables: { ...values } })
    }
    return (
    <section>
        <Container>
            <RegBoard>
                <RegForm onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <Form.Group controlId='formMail'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' name='email' placeholder='Email' onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId='formUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' name='username' placeholder='Username' onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} required />
                    </Form.Group>
                    <Button variant='primary' type='submit'>Sign up</Button>
                </RegForm>
            </RegBoard>
        </Container>
    </section>
    )
}
const REGISTER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password)
    }
`

const RegBoard = styled.div`
    min-height: calc(100vh - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
`
const RegForm = styled(Form)`
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