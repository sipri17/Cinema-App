import logo from './logo.svg';
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from './store'
import './App.css';
import router from './router'
import { ApolloProvider } from '@apollo/client'
import { client } from './config/apolloClient';

function App() {
  return (
    <ApolloProvider client={client} >

      {/* <Provider store={store}> */}

        <RouterProvider router={router} />
      {/* </Provider> */}
    </ApolloProvider>


  );
}

export default App;
