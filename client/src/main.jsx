import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BlockchainProvider } from './context/Blockchaincontext'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BlockchainProvider>

<ChakraProvider>
<App />

</ChakraProvider>
    </BlockchainProvider>

  

)
