'use client'
import React, { Children, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function StoreProvider({children}:{children:ReactNode}) {
  return (
   <Provider store={store}>
        {children}
   </Provider>
  )
}

export default StoreProvider