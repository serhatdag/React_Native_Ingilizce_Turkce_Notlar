import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store'
import Page from './components/Page'

const App = () => {
  return (
    <Provider store={Store} >
      <Page/>
    </Provider>
  )
}

export default App