import React from "react";

type byteType = "background"|"action"|"control";

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
    image?: string;
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
            desc: "Macintosh Desktop with a menu, a system disk icon, and the Trash",
            args: ['disk'],
            type: "background",
            image: "desktop.png"
        },
        2: {
            name: "MacPaint",
            desc: "The MacPaint app",
            args: ['tool'],
            type: "background",
            image: "macpaint.png"
        },
        3: {
            name: "MacWrite",
            desc: "The MacWrite app",
            args: [],
            type: "background",
            image: "macwrite.png"
        },
        5: {
            name: "Window",
            desc: "A window",
            args: ['x','y','width','height','scrollbars'],
            image: "window.png"
        },
        6: {
            name: "Menu",
            desc: "The menu bar, and optional selected menu & item (-1 for unselected)",
            args: ['Selected Menu','Selected Item'],
            image: "menu.png"
        },
        9: {
            name: "Draw Pixel",
            desc: "Draw a Pixel at x,y coordinates, with color",
            args: ['x','y','color'],
        },
        10: {
            name: "Draw Horizontal line",
            desc: "Draw a horizontal line from x,y for length with color",
            args: ['x','y','length', 'color'],
        },
        11: {
            name: "Draw vertical line",
            desc: "Draw a vertical line from x,y for length with color",
            args: ['x','y','length', 'color'],
        },
        12: {
            name: "Draw Filled Rectangle",
            desc: "Draw a filled Rectangle with color",
            args: ['x','y','width','height', 'color'],
        },
        13: {
            name: "Draw Rectangle",
            desc: "Draw a Rectangle with color (not filled)",
            args: ['x','y','width','height', 'color'],
        },
        14: {
            name: "Draw Filled Circle",
            desc: "Draw a filled Circle with color",
            args: ['x','y','radius', 'color'],
        },
        15: {
            name: "Draw Circle",
            desc: "Draw a Circle with color (not filled)",
            args: ['x','y','radius', 'color'],
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
            desc: "Places text characters. ASCII coded bytes - terminated by a 0. ",
            args: textArgEdit,
            value: "",
            out: textArgBytes
        },
        20: {
            name: "Type Text",
            desc: "Types text characters out at a rate of 0.1s. ASCII coded bytes - terminated by a 0.",
            args: textArgEdit,
            value: "",
            out: textArgBytes

        },        
        21: {
            name: "Clear Buffer",
            desc: "Clears MacPaint Buffer. Color arg is 1 for white, 0 for black",
            args: ["color"],
            value: "",
        },
        22: {
            name: "Mouse To Menu",
            desc: "Moves the mouse to a menu, and then to an Item. Menu gets appropriately highlighted.",
            args: ["Menu","Menu Item"],
        },
        254: {
            name: "BG End",
            desc: "The end of a background block. ",
            args: [],
        },
        255: {
            name: "Action End",
            desc: "The end of an action block",
            args: [],
        }
    };


export const controlTable: {[key: number]: lookupByte} = {
    1: {
            name: "Write to Display Stack",
            desc: "Writes the provided bytes to the display stack and starts playback from beginning. The display stack has a maximum length of 255",
            args: ['Position Offset'],
            type: "control",
        },
    2: {
            name: "Write to EEPROM",
            desc: "Writes the provided bytes to the EEPROM at the provided address. Max 32 bytes at a time (including control, high and low address)",
            args: ["Address High","Address Low"],
            type: "control",
        },        
    3: {
            name: "Read bytes",
            desc: "Reads n bytes from the EEPROM at the provided address, Or from the display stack by sending 0xFFFF",
            args: ["Address High","Address Low", "Number of bytes"],
            type: "control",
        },                
    4: {
            name: "Load Animation Sequence from EEPROM",
            desc: "Loads n bytes from the EEPROM at address into the display buffer. Automatically appends a 255 at end for end-of-playback. Display offset provides position of first byte in display stack",
            args: ["Address High","Address Low", "Number of bytes","Display Offset"],
            type: "control",
        },        
    5: {
            name: "Set a variable",
            desc: "Sets a variable value. 1: Mode (0 is animation, 1 is live drive). 2: Mouse Coordinates (X and Y) ",
            args: [],
            type: "control",
        },        
    6: {
        name: "Read a variable",
        desc: "Puts variable value in i2c register to read. Immediately read to get data. Ids are:  1: Mode (1 byte). 2: Mouse Coordinates (2 bytes) ",
        args: ['variable id '],
        type: "control",
    },        
}

