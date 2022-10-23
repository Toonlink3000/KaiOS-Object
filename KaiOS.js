//----------------------------------------------------------------------------------
//
// CRunKaiOS.js
// Clickteam Fusion 2.5 HTML5 runtime extension template
//
//----------------------------------------------------------------------------------
/* Copyright (c) 1996-2014 Clickteam
*
* This source code is part of the HTML5 exporter for Clickteam Fusion 2.5
* 
* Permission is hereby granted to any obtaining a legal copy 
* of Clickteam Fusion 2.5 to use or modify this source code for 
* debugging, optimizing, or customizing applications created with 
* Clickteam Fusion 2.5. 
* Any other use of this source code is prohibited.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/

// Definition of the conditions, actions and expressions codes.
// ---------------------------------------------------------------
// This list must be identical to the list defined in the C version
// of your extension.
CRunKaiOS.CND_LSK_PRESSED = 0; // done
CRunKaiOS.CND_RSK_PRESSED = 1; // done
CRunKaiOS.CND_LARGETEXTON = 2;// done
CRunKaiOS.CND_WHILECHARGING = 3; //done
CRunKaiOS.CND_BATTERYLEVELCHANGED = 4; // done
CRunKaiOS.CND_DEVICEPOSITIONCHANGED = 5; //done
CRunKaiOS.CND_ISKAIOS = 6; //done
CRunKaiOS.CND_ADWASCLOSED = 7;
CRunKaiOS.CND_ADWASCLICKED = 8;
CRunKaiOS.CND_IFERRORDISPLAYAD = 9;
CRunKaiOS.CND_LAST = 10;

//Actions
CRunKaiOS.ACT_AUDIO_VOLUMEUP = 0;  //done
CRunKaiOS.ACT_AUDIO_VOLUMEDOWN = 1;//done
CRunKaiOS.ACT_AUDIO_SHOWVOLUME = 2;//done
CRunKaiOS.ACT_RUMBLEDEVICE = 3;//done
CRunKaiOS.ACT_WATCHBATTERYLVL = 4;//done
CRunKaiOS.ACT_WATCHLOCATION = 5;//done
CRunKaiOS.ACT_NOWATCHBATTERYLVL = 6;//done
CRunKaiOS.ACT_NOWATCHLOCATION = 7;//done
CRunKaiOS.ACT_LOADDISPLAYAD = 8;

// Expressions
CRunKaiOS.EXP_BATTERYLEVEL = 0; //done
CRunKaiOS.EXP_BATTERYHEALTH = 1;//always returns 0
CRunKaiOS.EXP_DISCHARGETIME = 2;//done
CRunKaiOS.EXP_CHARGETIME = 3;//done
CRunKaiOS.EXP_BATTERYTEMPERATURE = 4;//done
CRunKaiOS.EXP_KAIADSERRORCODE = 5;

var isKaiOS = false;
var kaiOsVersion = 0;

var lskPressed = false;
var rskPressed = false;

var batLvlChanged = false;
var charging = false;
var batterylevel = 0;

var geolocationPosChanged = false;
var watchPosID = -1;
var displayingAd = false;
var kaiadclosed = false;
// document.body.style.overflow = "hidden";
var kaiadclicked = false;

var waserror = false;
var displayaderror = -1;

// Constructor of the object.
// ----------------------------------------------------------------
// Called during the creation process of the object, but before any 
// initialization. You may want (although you can do it in CreateRunObject), 
// to instantiate variables.
function CRunKaiOS()
{
	//console.log("KaiOS Object");
	
	document.addEventListener("keydown", this.handleSoftKeys);
	agent = navigator.userAgent;
				
	switch (version) 
	{
		case 0:
			if (agent.toLowerCase().includes("KAIOS") == true) 
			{
				isKaiOS = true;
				kaiOsVersion = 0;
			}
			break;
		case 1:
			if (agent.toLowerCase().includes("KAIOS/2") == true) 
			{
				isKaiOS = true;
				kaiOsVersion = 1;
			}
			break;
		case 2:
			if (agent.toLowerCase().includes("KAIOS/3") == true) 
			{
				isKaiOS = true;
				kaiOsVersion = 2;
			}
			break;
						
		default:
			isKaiOS = false;
	}
}

// Prototype definition 
// -----------------------------------------------------------------
// This class is a sub-class of CRunExtension, by the mean of the 
// CServices.extend function which copies all the properties of 
// the parent class to the new class when it is created.
// As all the necessary functions are defined in the parent class,
// you only need to keep the ones that you actually need in your code.
CRunKaiOS.prototype = CServices.extend(new CRunExtension(),
{
	handleSoftKeys:function(evt) 
	{
		switch (evt.key)
		{
			case "SoftLeft":
				lskPressed = true;
				console.log("softleft");
			case "SoftRight":
				rskPressed = true;		
				console.log("softleft");
		}
	},
	
	handleBatteryLvlChanged:function() 
	{
		batLvlChange = true;
	},
	
	handleWatchPosition:function(pos) 
	{
		geolocationPosChanged = true;
	},
	handleWatchPositionError:function(err) 
	{
		geolocationPosChanged = false;
		console.log(err.message);
		
	},
	
	doNothing:function()
	{
		return 0;
	},
	
	handleKaiAdClosed:function()
	{
		kaiadclosed = true;
		console.log("closed ad");
		//this.ho.resume();
		displayingAd = false;
	},
	
	handleKaiAdClicked:function() 
	{
		kaiadclicked = true;
		console.log("clicked ad");
	},
	
	handleKaiAdsReady:function(ad) 
	{
		console.log("ready");
		ad.on("close", () => kaiadclosed = true);
		ad.on("click", () => kaiadclicked = true);
		
		//this.ho.pause();
		displayingAd = true;
		
		ad.call("display");
	},
	
	handleKaiAdsError:function(err) 
	{
		displayaderror = err;
		console.log(err);
		waserror = true;
		displayingAd = false;
	},
    // Returns the number of conditions
    // --------------------------------------------------------------------
    // Warning, if this number is not correct, the application _will_ crash
    getNumberOfConditions:function()
    {
        return CRunKaiOS.CND_LAST;
    },                                              // Don't forget the comma between each function
	
    // Creation of the object
    // --------------------------------------------------------------------
    // - file : a CFile object, pointing to the object's data zone
    // - cob : a CCreateObjectInfo containing infos about the created object
    // - version : the version number of the object, as defined in the C code
    createRunObject:function(file, cob, version)
    {
        // Use the "file" parameter to call the CFile object, and 
        // gather the data of the object in the order as they were saved
        // (same order as the definition of the data in the EDITDATA structure
        // of the C code).
        // Examples :
        // this.myIntegerValue = file.readAInt();   Reads 4 bytes as a signed number
        // this.myShortValue = file.readAShort();   Reads 2 bytes as a unsigned number
        // this.myString = file.readAString();      Reads a string, ending by 0
        // this.myString = file.readAString(size);  Reads a string out of a given sized buffer
        //                                            - The string can end before the end of the buffer with a 0
        //                                            - If the string is as long as the buffer, it does not 
        //                                              need to end by a 0
        //                                            > Whatever happens, this function will always position the file
        //                                              at the end of the buffer upon exit
        // this.myString = file.readAStringEOL();   Reads a string until a CR or a CR/LF (works with both)
        // this.myColor = file.readAColor();        Reads a RGB value
        // file.skipBytes(number);                  Skips a number of bytes in the file
        // Please report to the documentation for more information on the CFile object

        // The return value is not used in this version of the runtime but maybe later.
        // So please return false;
        return false;
    },
	
    // Handling of the object
    // ---------------------------------------------------------------------
    // This function is called at every loop of the game. You have to perform 
    // in it all the tasks necessary for your object to function.
    // Return values:
    //    - 0 : this function will be called during the next loop
    //    - CRunExtension.REFLAG_ONESHOT : this function will not be called anymore
    //      In this case, call the this.reHandle(); function of the base class 
    //      to have it called again.
    handleRunObject: function()
    {
		// Kai Ads
		if (kaiadclosed == true) 
		{
			this.ho.generateEvent(CRunKaiOS.CND_ADWASCLOSED, this.ho.getEventParam());
			kaiadclosed = false;
		}
		if (kaiadclicked = true) 
		{
			this.ho.generateEvent(CRunKaiOS.CND_ADWASCLICKED, this.ho.getEventParam());
			kaiadclicked = false;
		}
		
		if (waserror == true) 
		{
			this.ho.generateEvent(CRunKaiOS.CND_IFERRORDISPLAYAD, this.ho.getEventParam());
			waserror = false;
		}
		
		// Soft keys
		if (lskPressed == true) 
		{
			this.ho.generateEvent(CRunKaiOS.CND_LSK_PRESSED, this.ho.getEventParam());
			console.log("l");
			lskPressed = false;
		}
		if (rskPressed == true) 
		{
			this.ho.generateEvent(CRunKaiOS.CND_RSK_PRESSED, this.ho.getEventParam());
			console.log("r");
			rskPressed = false;
		}
		
		// Battery level changed
		if (batLvlChanged == true) 
		{
			this.ho.generateEvent(CRunKaiOS.CND_BATTERYLEVELCHANGED, this.ho.getEventParam());
			batLvlChanged = false;
		}
		
		// Device position changed
		if (geolocationPosChanged == true) 
		{
			this.ho.generateEvent(CRunKaiOS.CND_DEVICEPOSITIONCHANGED, this.ho.getEventParam());
			geolocationPosChanged = false;
		}
        return 0;       // The object will be called next loop
    },
    
    // Destruction of the object
    // ---------------------------------------------------------------
    // Called when the object is actually destroyed. This will always be
    // after the main game loop, and out of the actions processing : the 
    // destroy process is queued until the very end of the game loop.
    destroyRunObject: function(bFast)
    {
    },

    // Displays the object
    // ----------------------------------------------------------------
    // Called when the object needs to be displayed in the browser.
    //    - renderer : the Renderer object which will draw the object
    //    - xDraw : an offset to add to every X coordinate for display
    //    - yDraw : an offset to add to every Y coordinate for display
    // This function will only be called if the object's flags in the C code
    // indicate that this is a displayable object (OEFLAG_SPRITE)
    displayRunObject:function(renderer, xDraw, yDraw)
    {
        // Example of display of an image, taking the layer and frame position
        // into account
        // var x = this.ho.hoX - this.rh.rhWindowX + this.ho.pLayer.x + xDraw;
        // var y = this.ho.hoY - this.rh.rhWindowY + this.ho.pLayer.y + yDraw;
        // renderer.renderSimpleImage(this.image, x, y, this.image.width, this.image.height, 0, 0);
    },

    // Put the object into pause
    // ----------------------------------------------------------------
    // Called when the game enters pause mode.
    pauseRunObject: function ()
    {
    },

    // Get the object out of pause mode
    // -----------------------------------------------------------------
    // Called when the game quits pause mode.
    continueRunObject: function ()
    {
    },

    // Condition entry
    // -----------------------------------------------------------------
    // Called when a condition of this object is evaluated
    //    - num : the number of the condition, as defined on top of this source
    //    - cnd : a CCndExtension object, allowing you to retreive the parameters
    //            of the condition
    // Return value :
    //    true or false
    condition:function(num, cnd)
    {
        switch (num)
        {
			// Always return true when event generated from callback
            case CRunKaiOS.CND_LSK_PRESSED:
				return true;
				break;
            case CRunKaiOS.CND_RSK_PRESSED:
				return true;
				break;
				
            // The large text setting is set to on
            case CRunKaiOS.CND_LARGETEXTON:
				largeText = navigator.largeTextEnabled;
				return largeText;
				break;

            // Repeat while charging
            case CRunKaiOS.CND_WHILECHARGING:
				var charging = navigator.battery.charging;
				return charging;
				break;
				
			case CRunKaiOS.CND_ISKAIOS:
				var version = cnd.getParamExpression(this.rh, 0)
				var isKaiV = false;
				if (isKaiOS)
				{
					switch (version) 
					{
						// Any version
						case 0:
							if (kaiOsVersion == version) 
							{
								isKaiV = true;
							}
						// KaiOS 1 or 2
						case 1:
							if (kaiOsVersion == version) 
							{
								isKaiV = true;
							}
						// KaiOS 3
						case 2:
							if (kaiOsVersion == version) 
							{
								isKaiV = true;
							}
						default:
							isKaiV = false;
					}
				}
				
				return isKaiV;
				break;
			
		    case CRunKaiOS.CND_ADWASCLOSED:
				return true;
				break;
				
		    case CRunKaiOS.CND_ADWASCLICKED:
				return true;
				break;
			case CRunKaiOS.CND_IFERRORDISPLAYAD:
				return true;
				break;
				
			case CRunKaiOS.CND_DEVICEPOSITIONCHANGED:
				return true;
				break;
			
			case CRunKaiOS.CND_BATTERYLEVELCHANGED:
				return true;
				break;
        }
        return false;
    },
    
    // Action entry
    // --------------------------------------------------------------
    // Called when an action of this object is executed
    //   - num : number of the action, as defined in the list on top of this source
    //   - act : a CActExtension object, allowing you to retreive the parameters
    //           of the action
    action:function(num, act)
    {   
        switch (num)
        {
            case CRunKaiOS.ACT_AUDIO_VOLUMEUP:
				var volume = navigator.volumeManager;
				volume.requestUp();
                break;

            case CRunKaiOS.ACT_AUDIO_VOLUMEDOWN:
				var volume = navigator.volumeManager;
				volume.requestDown();
                break;
				
			case CRunKaiOS.ACT_AUDIO_SHOWVOLUME:
				var volume = navigator.volumeManager;
				volume.requestShow();
				break;
            
			case CRunKaiOS.ACT_RUMBLEDEVICE:
				var duration = act.getParamExpression(this.rh, 0);
				navigator.vibrate(duration);
				break;
				
			case CRunKaiOS.ACT_WATCHBATTERYLVL:
				navigator.battery.onlevelchange = this.handleBatteryLvlChanged;
				break;
				
			case CRunKaiOS.ACT_WATCHLOCATION:
				if (id == -1) 
				{
					id = navigator.geolocation.watchPosition(this.handleWatchPosition, this.handleWatchPositionError);
				}
				break;
				
			case CRunKaiOS.ACT_NOWATCHBATTERYLVL:
				navigator.battery.onlevelchange = this.doNothing;
				break;
				
			case CRunKaiOS.ACT_NOWATCHLOCATION:
				if (id != -1)
				{
					navigator.geolocation.clearWatch(id);
					id = -1;
				}
				break;
			
			case CRunKaiOS.ACT_LOADDISPLAYAD:
				// Get parameters from runtime
				var pubid = act.getParamExpression(this.rh, 0);
				var appnm = act.getParamExpression(this.rh, 1);
				var timeout = act.getParamExpression(this.rh, 2);
				var testingnum = act.getParamExpression(this.rh, 3)
				
				if (testingnum == 1) 
				{
					var testing = 1;
				}
				else 
				{
					var testing = 0;
				}
				try
				{
					console.log("advert");
					getKaiAd({
						publisher: pubid,
						app: appnm,
						test: testing,
						timeout: timeout,
						onerror: this.handleKaiAdsError,
						onready: this.handleKaiAdsReady
					});
				}
				catch (error)
				{
					// check console and react accordingly
					console.log(error);
					waserror = true;
					displayaderror = -1;
				}
				break;
        }
    },

    // Expression entry
    // ------------------------------------------------------------------
    // Called during the evaluation of an expression.
    //    - num : the number of the expression, as defined on top of this source.
    // Note that it is important that your expression function asks for 
    // each and every one of the parameters of the function, each time it is 
    // called. The runtime will crash if you miss parameters.
    // Return value : test
    //    - The result of the calculation, a number or a string
    expression: function(num)
    {
		try{
        switch (num)
        {
			
            // Battery level - 0 - 100%
            case CRunKaiOS.EXP_BATTERYLEVEL:
				var level = navigator.battery.level;
				return level * 100;
				break;


				
            case CRunKaiOS.EXP_BATTERYHEALTH:
				var level = navigator.battery.level;
				return level;
				break;
				
            case CRunKaiOS.EXP_CHARGETIME:
				var ctime = navigator.battery.chargingTime;
				return ctime;
				break;
				
            case CRunKaiOS.EXP_DISCHARGETIME:
				var dtime = navigator.battery.dischargingTime;
				return dtime;
				break;
				
            case CRunKaiOS.EXP_BATTERYTEMPERATURE:
				var temperature = navigator.battery.temperature;
				return temperature;
				break;
				
			case CRunKaiOS.EXP_KAIADSERRORCODE:
				return displayaderror;
				break;
        }}
		catch (error) 
		{
			console.log("KaiOS: Error while returning conditions.")
		}
        return 0;
    }                                                   // No comma for the last function : the Google compiler
                                                        // we use for final projects does not accept it
});
// You are perfectly free to define any new class or global function in this code.
// Avoid using generic names, as they may clash with future extensions. The best 
// option is to have a prefix specific to your name or object, inserted before the 
// name of the class or functions.

