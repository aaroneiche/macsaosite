### Communicating with the MacSAO
The MacSAO's primary interface is a standard two-wire I2C. The default address is *10* (0x0A) for writing, *11* (0x0B) for reading. Two alternative addresses are available: 34 (0x22) and 86 (0x56). To change the I2C address, press and hold down the button on the bottom of the MacSAO for approximately 3 seconds. The display will change to a setting screen where you can select the desired address. Pressing the button will step through the options. When you've selected your preference, press and hold the button again for 3 seconds and it will save that value. 

### Drawing to the MacSAO.  

The MacSAO was designed to allow users to make their own animation sequences. I've tried to make this as straightforward as possible. Sequences are a series of 8bit bytes, containing drawing instructions or commands. A simple sequence looks like this: 

```
1      // Display the desktop
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

A sequence of commands needs, at minimum:
1) A Background command, with a `254` at the end
2) An Action command, with a `255` at the end

You can provide as many background drawing commands as you'd like. They are all executed before the action.
You can provide as many action commands as you'd like. Some take time to execute (such as moving the mouse). Once an action has completed, the interpreter moves onto the next action in the sequence.

Once the interpreter sees a 255, it will move onto the next sequence - another set of  background and action commands. Once the interpreter cannot find anymore commands, it will start at the beginning.

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
254  // END of background
16   // Mouse to
5    // x = 5
5    // y = 5
255  // END of Action

1    // draw Desktop
254  // END of background
16   // Mouse to
50   // x = 50
45   // y = 45
255  // END of Action
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
