import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './test/reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/index'
import Feed from './pages/Feed';
import Home from './pages/Home';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Note from './pages/Note';
import SignUp from './pages/SignUp';
import Register from './pages/Register';

const uri = process.env.API_URI || 'http://localhost:4000/api'
const cache = new InMemoryCache()
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/note/:noteId",
        element: <Note />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
