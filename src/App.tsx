import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userSlice from './store/userSlice'
import LogInPage from './pages/LogInPage'

const store = configureStore({
  reducer: {
    //key: value
    user: userSlice,
  },
})


const App = () => {
  return (
    <Provider store={store}>
      <LogInPage />
    </Provider>
  )
}

export default App