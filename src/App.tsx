import * as React from "react"
import {
  ChakraProvider,

  theme,
} from "@chakra-ui/react"

import SignupCard from "./SignupCard"

export const App = () => (
  <ChakraProvider theme={theme}>
    <SignupCard></SignupCard>
  </ChakraProvider>
)
