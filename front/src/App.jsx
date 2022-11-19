import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, gql } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { Outlet } from 'react-router-dom';// eslint-disable-next-line
import './styles/bootstrap.min.css';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import { onInit } from './redux/authSlice';

const uri = "http://localhost:4000/api"
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
})

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(onInit())
  }, [])
  return (
    <ApolloProvider client={client}>
      <Application className="App">
        <Navigation />
        <Outlet />
      </Application>
    </ApolloProvider>
  );
}

const Application = styled.div`
  background-color: #0079A1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='169' height='169' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%2300678e' fill-opacity='0.35'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.35'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
  /* background-repeat: no-repeat; */
  background-attachment: fixed;
  min-height: 100vh;
  padding-top: 56px;
`

export default App;
