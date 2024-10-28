import Layout from "./Layout";
import { createContext, useState } from "react";
import { example } from "./commandBytes";
import { byte } from "./commandBytes";

// export cont //<{"bytes":byte[], }>
export const BytesContext = createContext({bytes:[]})

export default function App() {

    const [bytes, setBytes] = useState(example);
    return (
        <BytesContext.Provider value={{bytes, setBytes}}>
            <Layout />
        </BytesContext.Provider>
    );
}
