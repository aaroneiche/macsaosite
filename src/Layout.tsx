import {About, ByteBuilder, Intro, Reference} from "./components";
import Navigation from "./components/Navigation";

import {Routes, Route} from 'react-router-dom'


export type page = "about" | "intro" | "reference" | "bytebuilder";

export default function Layout() { //props: {children: React.ReactNode}

    return (
      <>
        <Navigation/>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/bytebuilder" element={<ByteBuilder />} />
          <Route path="/reference" element={<Reference />} />
        </Routes>
      </>
    );

}