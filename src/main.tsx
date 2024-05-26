import React from 'react'
import ReactDOM from 'react-dom/client'
import Table from './components/table.tsx'
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'

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
      <Table lines={14} columns={14} bombs={40} />
    </ChakraBaseProvider>
  </React.StrictMode>,
)
