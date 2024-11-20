## Mac SAO (Simple Add-On)

The Mac SAO is a "Simple Add-on", a device you can connect to electronic conference badges that have a standard SAO port. It looks like a Mac, and acts a little bit like a Mac.

#### Why did you make this?
In 2023, I attended the Hackaday Supercon, and came home with an interesting SAO that I thought was really cool. I decided that I wanted to make my own and take it to Supercon the following year. After thinking it over, I decided to celebrate the 40th Anniversary of the original Macintosh with a little tribute.

#### What does it do
The Mac SAO displays screens that look like the original Macintosh's. It does animations and generally 

#### That's cool! How do you animate on it?
I'm so glad you asked! Take a look at the "Getting Started" section of this site. Also, look at the reference for an idea of some of the commands available.

#### So it's not an emulator?
No! While I think that would be a supercool project, it's not what I wanted to do. If you're interested in something like that, you should take a look at Marc Evan's [Pico-Mac](https://github.com/evansm7/pico-mac). If I was working with a larger space, and a display that could draw 512x342, I think I would have given it a shot.

#### Can I see the source code/Look at the PCB?
Yes! The MacSAO is open source! You can find hardware and firmware at [Github](https://github.com/aaroneiche/macsao).


### Acknowledgements
This project would not have been possible without a lot of libraries, examples, tools, and feedback from a whole lot of people: 

> The [CH32V003Fun library](https://github.com/cnlohr/ch32v003fun) by Charles Lohr (Specifically E. Brombaugh's OLED demo, and Renze Nicolai's I2C slave).

> ADBeta's [Software I2C](https://github.com/ADBeta/CH32V003_lib_swi2c) master library for the CH32V003

> Jasper van Loenen's [image2cpp](https://javl.github.io/image2cpp/) was extremely useful for manipulating bitmaps

> Emutyworks' [Bitmap Editor](https://emutyworks.github.io/BitmapEditor/demo/index.html#) 

> Romeo Van Snick's [Creep Font](https://github.com/romeovs/creep) served as the basis for the narrow font.

> Tom Nardi of Hackaday - whose Cyberdeck SAO from 2023 inspired me to make my own SAO. 

> Sakun Archarige - who put together the [*system.css*](https://sakofchit.github.io/system.css/) that this website uses.

> Any number of folks on the Hackaday and CN

> My wonderful wife, Hykel - who was supportive and told me it was cool even when I'm pretty confident she thinks its just silly. 

And the many thousands of Hackers who have come before me.
