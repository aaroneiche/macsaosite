import { useState } from "react";
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
            <Navigation currentPage={currentPage} setPage={setCurrentPage}/>
            
            <div id="page">{pages[currentPage] || <div>Page not found</div>}</div>
        </>
    );

}