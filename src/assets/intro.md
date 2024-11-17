## Pictures on a screen

The MacSAO uses data in an array of bytes to draw images on its display. The array bytes are referred to as the **Display Stack**. You can add data to the display stack to display different pictures, and make the MacSAO act like a computer. 


## Communicating with the MacSAO
The MacSAO's primary interface is a standard two-wire I2C. The default address is **10** (0x0A) for writing (*11* for reading). Two alternative addresses are available: **34** (0x22) and **86** (0x56). To change the I2C address, press and hold down the button on the bottom of the MacSAO for approximately 3 seconds. The display will change to a setting screen where you can select the desired address. Pressing the button will step through the options. When you've selected your preference, press and hold the button again for 3 seconds and it will save that value and return you to the previous mode. 

Messages are sent to the SAO typically with 3 parts: A **control byte**, a (drawing) **command**, and **arguments** for that command. 

The **control byte** tells the Mac what to do with this data. Write to the display stack, to the EEPROM, read data etc. 

The **command** (most often for drawing to the screen) tells the Mac what to display on the screen. Some commands are very simple: Draw a rectangle *(13)*. Other commands such as MacWrite *(3)* draw quite a lot on the display. In both cases, the commands are a single byte.

The **arguments** provide additional data that the command uses to draw. Some commands take only one argument (or none at all). Others take several arguments, and sometimes an unknown number. 

### MacSAO Modes

There are two primary modes of operation for the MacSAO: *Animation*, and *Live-Drive*. 
The Animation mode is intended largely as a passive-mode, something for the Mac to Display for fun. 
The Live-Drive mode is intended largely for interactivity. Changing the display on-demand to some changing data from another source. 

## Animation Mode

### Drawing to the MacSAO.  

The MacSAO was designed to allow users to make their own animation sequences. I've tried to make this as straightforward as possible. Sequences are a series of 8bit bytes, containing drawing instructions or commands. A simple sequence looks like this: 

``` 
    1      // Write directly to the Display Stack 
    0      // The offset of the display stack to write to
    
    1      // Display the desktop with Disk Unselected (1)
    1      // 
    254    // End of Background

    16     // Move Mouse to (45,10)
    45     
    10

    16     // Move Mouse to (10,10)
    10
    10

    255    // End of Actions
```
This sequence will draw the desktop, and then animate the mouse going from its current position to the X,Y coordinates 45,10. Then it will animate the mouse going to X,Y coordinates 10,10 (from the last mouse coordinates, at 45,10)

An animation sequence of commands needs, at minimum:
1) A Background command, with a `254` at the end
2) An Action command, with a `255` at the end

You can provide as many background drawing commands as you'd like. They are all executed before the action.
You can provide as many action commands as you'd like. Some take time to execute (such as moving the mouse). Once an action has completed, the interpreter moves onto the next action in the sequence.

Once the interpreter sees a 255, it will move onto the next sequence - another set of  background and action commands. Once the interpreter cannot find anymore commands (a second `255` following the `255` at the end of an action), it will go start back at the beginning.

### Getting sequences on the MacSAO

While you can compile the code and flash it to the MacSAO, it's much easier to just load the commands using the I2C interface

There are two ways to provide sequences to the MacSAO.
1) Write commands directly to the Display stack. 
2) Write commands to the EEPROM and set the "load from" value in the preferences

### Writing Sequences to the EEPROM
The most common method of storing sequences for the MacSAO is going to be storing them in the EEPROM. 

Sequences can be written by sending the MacSAO an I2C *write* command using the control byte for writing to the EEPROM. This is a 2, followed by the  2-byte address you want to store the sequence at, and the series of bytes in the sequence. The maximum number of bytes you can send in this command is 32 at a time. For longer stored sequences, start a new write command, and send additional bytes to the next sequential address.

This example shows how to send a short sequence to the first possible address (spacing is provided for clarity):
```
    2    // Control byte: Write to EEPROM
    0    // Address high byte
    16   // Address low byte

    1    // draw Desktop
    1    // with the system disk unselected
    254  // END of background

    16   // Mouse to
    5    // x = 5
    5    // y = 5
    255  // END of Action

    1    // draw Desktop
    1    // with the system disk unselected
    254  // END of background

    16   // Mouse to
    50   // x = 50
    45   // y = 45
    255  // END of Action
    255  // END of Sequence.
```

If your sequence was too large to send in a single command, you could write a second command to write additional sequence data. Alternatively you can store multiple sequences in the EEPROM and load difference sequences at will.

In order to use these stored sequences, you must tell the MacSAO where to find your sequence. This is done by setting the 2nd, 3rd, and 4th bytes of the preferences. In the preferences, bytes 2 and 3 are the 16-bit EEPROM address for where your sequence begins.
The 4th byte is the length of your sequence.

If you were using the example sequence above, you would send the following command to use the sequence at startup: 

```
    2    // Control byte: Write to EEPROM
    0    // Address high byte
    16   // Address low byte
    12   // Length the sequence
```

## LiveDrive mode

As mentioned above LiveDrive mode is intended as a more interactive mode. Instead of stepping through backgrounds and actions to create animation, in LiveDrive mode you set a background, and then send drawing commands that update it. 

### Getting into Live Drive
Setting the SAO into LiveDrive mode is accomplished by sending control byte `5`, followed by the mode variable `1` and the desired mode `1` (alternatively, `0` will place the SAO back in Animation mode)


### Setting a background in LiveDrive

The background in LiveDrive mode is set by writing draw commands to the display stack. 
```
    1    // Control byte - write to display stack
    1    // Desktop
    1    // arg: Unselected Disk (on desktop)
    254  // END of background
```

Now that you have a background, You can send draw commands to draw over it. A common use case would be to draw the mouse. Instead of using the `MouseTo` command like you would in an animation, you can directly set the mouse x,y values using the `set variable` control byte:
```
    5   // Control byte - set variable
    2   // The mouse X,Y coordinates
    32  // X coordinate
    25  // Y Coordinate 
```

Sending this command in series moves the mouse around. This could be driven by an actual mouse, or some other controller. Please note there are practical limits to how fast the SAO can handle these commands.

Every time an command is sent, the background is drawn again, with whatever new command you've sent. If you had the background above, and then sent a `window` draw command, the window would be drawn and visible on the display. If you sent a command to update the mouse position though, the window would disappear. For items you want to show up with some permanence, It's recommended you write to the background. You could conceivably send all commands with no background, if desired.


