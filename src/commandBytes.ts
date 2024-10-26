import React from "react";

type byteType = "background"|"action";

export type byte = {
    id: number;
    command: number;
    name: string;
    args: byteArg[] | ((byteId: number, bytesData: byte[], setBytes:React.Dispatch<React.SetStateAction<byte[]>>) => React.ReactElement);
    value?:string;
    out?: ((val: string) => number[]);
};

export type byteArg = {
    arg:string, 
    val:string
}

export type lookupByte = {
    name: string;
    desc: string;
    args: string[]| ((byteId: number, bytesData: byte[], setBytes:React.Dispatch<React.SetStateAction<byte[]>>) => React.ReactElement);
    type?: byteType;
    value?:string;
    out?: ((val: string) => number[]);
}


const textArgEdit = (byteId: number, bytesData: byte[], setBytes:React.Dispatch<React.SetStateAction<byte[]>>)=>{ 
    const updateArea = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        const newBytesData = [...bytesData];
        const thisByte = newBytesData.find((k) => k.id == byteId);
        if(thisByte) {
            thisByte.value = event.target.value;
        }
        
        setBytes(newBytesData);
    }
    const area = React.createElement("textarea",{onChange: updateArea, className:"byteTextArea"});

return area;
}

const textArgBytes = (val: string) => {
    return val.split("").map(c=>c.charCodeAt(0));
}


export const example: byte[] = [
    
    {
        id: 1,
        command: 1,
        name: "Desktop",
        args: [], 
    },
    {
        id: 2,
        command: 254,
        name: "End BG",
        args: [], 
    },
    {
        id: 3,
        command: 16,
        name: "MouseTo",
        args: [
            {arg:'x',val:"34"},
            {arg:'y',val:"38"}
        ]
    },
    {
        id: 4,
        command: 22,
        name: "Mouse To Menu",
        args: [
            {arg:'menu',val:"3"},
            {arg:'item',val:"4"}
        ]
    },    
    {
        id: 5,
        command: 255,
        name: "Action End",
        args: []
    },
    /*     
    {
        id: 6,
        command: 19,
        name: "Put Text",
        args: textArgEdit,
        value: "",
        out: textArgBytes,

    }, */
]

export const lookupTable: {[key:number]: lookupByte} = {
        1: {
            name: "Desktop",
            desc: "Macintosh Desktop",
            args: [],
            type: "background",
        },
        2: {
            name: "MacPaint",
            desc: "The MacPaint app",
            args: ['tool'],
            type: "background",
        },
        3: {
            name: "MacWrite",
            desc: "The MacWrite app",
            args: [],
            type: "background",
        },
        5: {
            name: "Window",
            desc: "A window",
            args: ['x','y','width','height','scrollbars'],

        },
        16: {
            name: "Move Mouse",
            desc: "animates mouse to an X/Y",
            args: ['x','y'],
        },
        17: {
            name: "Buffer Pixel",
            desc: "Draws a pixel in the MacPaint Buffer",
            args: ['x','y','c'],
        },
        19: {
            name: "Put Text",
            desc: "Places text characters",
            args: textArgEdit,
            value: "",
            out: textArgBytes
        },
        20: {
            name: "Type Text",
            desc: "Types text characters out",
            args: textArgEdit,
            value: "",
            out: textArgBytes

        },        
        21: {
            name: "Clear Buffer",
            desc: "Clears MacPaint Buffer. color arg is 1 for white, 0 for black",
            args: ["color"],
            value: "",
        },
        22: {
            name: "Mouse To Menu",
            desc: "Moves the mouse to a menu, and then to an Item",
            args: ["Menu","Menu Item"],
        },
        254: {
            name: "BG End",
            desc: "The end of a background block",
            args: [],
        },
        255: {
            name: "Action End",
            desc: "The end of an action block",
            args: [],
        }
    };


