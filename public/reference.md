# Command reference

## Control Commands:

Control commands refer to commands sent over I2C. The first byte sent in any command is the *control byte*. This tells the SAO what to do with the data being sent. Note that control commands are not part of sequences 

| **Write to Display Stack**                                                        | *1 + n bytes* |
| --------------------------------------------------------------------------------- | ------------- |
| 1 *1h*<br>*n bytes of sequence*                                                   |               |
| This command writes the bytes you have sent to the display stack immediately. |               |

| **Write to EEPROM memory**                                                                                                        | *3 + n bytes* |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| *2h*<br>*0-20 Address High* <br>*0-FF Address Low*<br>*n bytes of sequence*                                                       |               |
| Writes the proceeding bytes to EEPROM memory. You cannot write below address 0x0010. That space is reserved for<br/> preferences. |               |


| **Read from EEPROM Memory**   | *4 bytes* |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| *3h*<br>*0-20 Address High* <br>*0-FF Address Low*<br>*0-FF number of bytes to return*                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |           |
| Reading from the on-board EEPROM requires two steps. First you send a command to set the address and the number of bytes to fetch, then you read that number of bytes. <br><br>As an example, we send the control byte (`3`) then the high address byte (`0`) and the low address byte (`16`) and finally the number of bytes we want to receive (`32`)<br>`3 0 16 32`<br><br>This will get us 32 bytes starting at address `16` (or in the hex `0x0010`). <br><br>Having sent the command, we can issue an i2c *read* signal, and then clock out 32 bytes of data. |           |



**Load displayStack from address**
*4 bytes*
TODO!!!!
*5h*
*0-20h Address High* 
*0-FFh Address Low*
*0-FFh Number of bytes to load.*
Immediately loads display data from a memory address into the display stack. Overwrites whatever is in displayStack.

## Background Drawing commands:

**Desktop** - 1 byte - Background
*1 1h*
Draws the classic Macintosh Desktop with a system disk and the Trash. 
TODO: Extend to have byte that contains states for trash open, disk open, trash selected, disk selected. 

**MacPaint** - 2 bytes - Background
*2 2h*
*t (0:13)* - The currently highlighted tool in the lefthand tool palette

Draws the MacPaint application. A 
TODO: Add byte for selected "pattern"


**Window** - 5 bytes -Background
*5 5h*
*x (0:63) - Left offset of window* 
*y (0:47) - Top offset of window* 
*w (0:63) - Width*
*h (0:47) - Height*
*s (0:1) - Scrollbars (display scrollbars)*

Draws a mac window. The window can technically be the full width and height of the display, but I recommend keeping it to max 60px wide, and 42px tall.

#### Animation commands:

**MouseTo** - 3 bytes - Animation:
*16 10h*
*x (0:63) - the X goal coordinate you'd like the mouse to go to*
*y (0:47) - the Y goal coordinate you'd like the mouse to go to.*

Sends the mouse to a given coordinate from its current position. Path is the most direct simple X/Y travel. 

**MouseToMenu** - 3 Bytes:
Similar to **MouseTo**, but goes to a specific menu. This will draw over the menu that is in your app
*17 11h*
*n (0:4) - Menu to mouse to*
*a (0:8) - Item in menu to mouse down to. Items are automatically highlighted as the mouse moves. Items flashes briefly before menu disappears.*

**Wait** - 2 bytes
*18 12h*
*n - 100ms periods. If you pass 10, your display will wait 1 second. If you pass 100, you'll wait 10 seconds. If you pass 5, you'll wait half a second.*

