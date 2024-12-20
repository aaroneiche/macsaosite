import Layout from "./Layout";
import { createContext, useState } from "react";
import { example } from "./commandBytes";
import { byte } from "./commandBytes";

import { BrowserRouter as Router} from "react-router-dom";


export interface BytesContextInterface {
  bytes: byte[];
  setBytes: React.Dispatch<React.SetStateAction<byte[]>>  | null;
}

export const BytesContext = createContext<BytesContextInterface>({bytes:[], setBytes: null});

export default function App() {

    const [bytes, setBytes] = useState<byte[]>(example);
    return (
      <BytesContext.Provider value={{ bytes, setBytes }}>
        <Router basename="/macsao">
          <Layout />
        </Router>
      </BytesContext.Provider>
    );
}
