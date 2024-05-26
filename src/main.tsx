import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import {App} from "./app.tsx"

const theme = extendBaseTheme({
  styles: {
    global: {
      body: {
        bg: '#222',
        userSelect: 'none',
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  </React.StrictMode>,
)
