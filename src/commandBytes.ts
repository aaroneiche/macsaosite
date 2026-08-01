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

export type complexArgs = {
    builder: ((byteId: number, bytesData: byte[], 
        setBytes:React.Dispatch<React.SetStateAction<byte[]>>) => React.ReactElement), // The form element that ends up in the 
    reference: string|string[] //The React Element that ends up in the Reference page.
}


export type lookupByte = {
    name: string;
    desc: string;
    args: string[]| complexArgs; //Outputs the arguments for the reference page.
    type?: byteType;
    value?:string;  
    out?: ((val: string) => number[]); // The function that outputs bytes for the byte builder.
    image?: string;
    version?:string;
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

/*
Reverses generateBytes()'s per-tile loop/addThisByte(): takes a space-separated
string of drawing/action command bytes (no leading control byte - just the
tile sequence, e.g. what you'd read off the Byte Builder grid) and
reconstructs the ordered list of command tiles. Throws with a human-readable
message on the first byte it can't make sense of.
*/
export function parseByteSequence(input: string): byte[] {
    const tokens = input.trim().split(/\s+/).filter(t => t.length !== 0);
    const result: byte[] = [];
    let id = 1;
    let i = 0;

    while (i < tokens.length) {
        const commandToken = tokens[i];
        const command = Number(commandToken);
        const lookup = lookupTable[command];

        if (!lookup) {
            throw new Error(`Unrecognized command byte "${commandToken}" at position ${i + 1}.`);
        }
        i++;

        const newByte: byte = {
            id: id++,
            command,
            name: lookup.name,
            args: [],
        };

        if (Array.isArray(lookup.args)) {
            newByte.args = lookup.args.map((a) => {
                const raw = tokens[i];
                if (raw === undefined) {
                    throw new Error(`"${lookup.name}" is missing a value for "${a}".`);
                }
                i++;
                return { arg: a, val: raw === "?" ? "" : raw };
            });
        } else {
            const codes: number[] = [];
            while (i < tokens.length && tokens[i] !== "0") {
                const code = Number(tokens[i]);
                if (Number.isNaN(code)) {
                    throw new Error(`"${lookup.name}" expected a numeric byte but found "${tokens[i]}".`);
                }
                codes.push(code);
                i++;
            }
            if (tokens[i] !== "0") {
                throw new Error(`"${lookup.name}" is missing its terminating 0.`);
            }
            i++;

            newByte.args = lookup.args.builder;
            newByte.value = codes.map(c => String.fromCharCode(c)).join("");
            newByte.out = lookup.out;
        }

        result.push(newByte);
    }

    return result;
}


export const example: byte[] = [
    
    {
        id: 1,
        command: 1,
        name: "Desktop",
        args: [{arg:'disk',val:"1"},], 
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

//The complete list of commands bytes.
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
        7: {
            name: "Draw Icon",
            desc: "Draws an icon",
            args: ['x','y','Icon','State'],
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
            image: "horizontal.png"
        },
        11: {
            name: "Draw vertical line",
            desc: "Draw a vertical line from x,y for length with color",
            args: ['x','y','length', 'color'],
            image: "vertical.png"            
        },
        12: {
            name: "Draw Filled Rectangle",
            desc: "Draw a filled Rectangle with color",
            args: ['x','y','width','height', 'color'],
            image: "fillRect.png"
        },
        13: {
            name: "Draw Rectangle",
            desc: "Draw a Rectangle with color (not filled)",
            args: ['x','y','width','height', 'color'],
            image: "rect.png"
        },
        14: {
            name: "Draw Circle",
            desc: "Draw a Circle with color (not filled)",
            args: ['x','y','radius', 'color'],
            image: "circle.png"
        },        
        15: {
            name: "Draw Filled Circle",
            desc: "Draw a filled Circle with color",
            args: ['x','y','radius', 'color'],
            image: "fillCircle.png"
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
        18: {
            name: "Wait after action",
            desc: "Pauses after an action for n * 100 ms",
            args: ['n'],
        },
        19: {
            name: "Put Text",
            desc: "Places text characters. ASCII coded bytes - terminated by a 0. Requires X and Y start position",
            args: {reference: ["x","y","n ASCII bytes", "0"], builder: textArgEdit},
            value: "",
            out: textArgBytes,
            image: "puttext.png"
        },
        20: {
            name: "Type Text",
            desc: "Types text characters out at a rate of 0.1s. ASCII coded bytes - terminated by a 0. Requires X and Y start position",
            args: {reference: ["x","y","n ASCII bytes", "0"], builder: textArgEdit},
            value: "",
            out: textArgBytes,
            image: "type.gif"

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
        23: {
            name: "Buffer Circle",
            desc: "Draws a circle to the buffer (MacPaint)",
            args: ["x","y","r","c"],
            version:"1.1"
        },
        24: {
            name: "Buffer Filled Circle",
            desc: "Draws a filled circle to the buffer (MacPaint)",
            args: ["x","y","r","c"],
            version:"1.1"            
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


//The list of control bytes 
export const controlTable: {[key: number]: lookupByte} = {
    1: {
            name: "Write to Display Stack",
            desc: "Writes the provided bytes to the display stack and starts playback from beginning. The display stack has a maximum length of 255",
            args: ["Address High","Address Low"],
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
            args: ["Variable","value(s)"],
            type: "control",
        },        
    6: {
        name: "Read a variable",
        desc: "Puts variable value in i2c register to read. Immediately read to get data. Ids are:  1: Mode (1 byte). 2: Mouse Coordinates (2 bytes) ",
        args: ['variable id '],
        type: "control",
    },        
}

