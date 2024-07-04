import React from 'react';
import RootNavigation from './src/RootNavigation';
import { store } from './src/app/store'
import { Provider } from 'react-redux'

const App = () => (
   <Provider store={store}>
   <RootNavigation />
   </Provider>
)

export default App;
