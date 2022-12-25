import React from "react";
import "./css/Global.css";
import { Public } from "./Router";
import { LoginProvider } from "./hooks/useLoginContext";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <LoginProvider>
        <Public />
      </LoginProvider>
    </ChakraProvider>
  );
};

export default App;
