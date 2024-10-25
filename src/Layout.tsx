import { useState } from "react";
// import ByteBuilder from "./components/ByteBuilder";
import {ByteBuilder, Intro, Reference} from "./components";
import Navigation from "./components/Navigation";

export type page = "intro" | "reference" | "bytebuilder";




export default function Layout() { //props: {children: React.ReactNode}

    const [currentPage, setCurrentPage] = useState<page>("intro"); 
    const pages: Record<page,React.ReactNode> = {
        intro: <Intro />,
        bytebuilder: <ByteBuilder />,
        reference: <Reference/>
    }

    return (
        <>
            <Navigation setPage={setCurrentPage}/>

        <div>{pages[currentPage] || <div>Page not found</div>}</div>
        </>
    );

}