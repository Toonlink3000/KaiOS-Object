// Object identifier "TON1"

#define IDENTIFIER	MAKEID(T,O,N,1)		// REQUIRED: you MUST replace the letters in the MAKEID macro by others
										// and then remove the #pragma message above. If you do not do this, MMF2
										// could confuse your object with another in the event editor.

// ------------------------------
// DEFINITION OF CONDITIONS CODES
// ------------------------------
#define CND_LSK_PRESSED             0
#define CND_RSK_PRESSED             1
#define CND_LARGETEXTON             2
#define CND_WHILECHARGING           3
#define CND_BATTERYLEVELCHANGED     4
#define CND_DEVICEPOSITIONCHANGED   5
#define CND_ISKAIOS                 6
#define CND_ADWASCLOSED             7
#define CND_ADWASCLICKED            8
#define CND_IFERRORDISPLAYAD        9
#define	CND_LAST					10

// ---------------------------
// DEFINITION OF ACTIONS CODES
// ---------------------------

#define ACT_AUDIO_VOLUMEUP          0
#define ACT_AUDIO_VOLUMEDOWN        1
#define ACT_AUDIO_SHOWVOLUME        2
#define ACT_RUMBLEDEVICE            3
#define ACT_WATCHBATTERYLVL         4
#define ACT_WATCHLOCATION           5
#define ACT_NOWATCHBATTERYLVL       6
#define ACT_NOWATCHLOCATION         7
#define ACT_LOADANDDISPLAYAD        8
#define	ACT_LAST					9

// -------------------------------
// DEFINITION OF EXPRESSIONS CODES
// -------------------------------

#define EXP_BATTERYLEVEL            0
#define EXP_BATTERYHEALTH           1
#define EXP_DISCHARGETIME           2
#define EXP_CHARGETIME              3
#define EXP_BATTERYTEMPERATURE      4
#define EXP_KAIADSERRORCODE         5
#define EXP_GETLATITUDE             6
#define EXP_GETLONGITUDE            7
#define EXP_GETACCURACY             8
#define	EXP_LAST                    9


// ---------------------
// OBJECT DATA STRUCTURE 
// ---------------------
// Used at edit time and saved in the MFA/CCN/EXE files

typedef struct tagEDATA_V1
{
	// Header - required
	extHeader		eHeader;

	// Object's data
//	short			swidth;
//	short			sheight;

} EDITDATA;
typedef EDITDATA *			LPEDATA;

// Object versions
#define	KCX_CURRENT_VERSION			1

// --------------------------------
// RUNNING OBJECT DATA STRUCTURE
// --------------------------------
// Used at runtime. Initialize it in the CreateRunObject function.
// Free any allocated memory or object in the DestroyRunObject function.
//
// Note: if you store C++ objects in this structure and do not store 
// them as pointers, you must call yourself their constructor in the
// CreateRunObject function and their destructor in the DestroyRunObject
// function. As the RUNDATA structure is a simple C structure and not a C++ object.

typedef struct tagRDATA
{
	// Main header - required
	headerObject	rHo;					// Header

	// Optional headers - depend on the OEFLAGS value, see documentation and examples for more info
//	rCom			rc;				// Common structure for movements & animations
//	rMvt			rm;				// Movements
//	rSpr			rs;				// Sprite (displayable objects)
//	rVal			rv;				// Alterable values

	// Object's runtime data

} RUNDATA;
typedef	RUNDATA	*			LPRDATA;

// Size when editing the object under level editor
// -----------------------------------------------
#define	MAX_EDITSIZE			sizeof(EDITDATA)

// Default flags - see documentation for more info
// -------------
#define	OEFLAGS      			0
#define	OEPREFS      			0


// If to handle message, specify the priority of the handling procedure
// 0= low, 255= very high. You should use 100 as normal.                                                
// --------------------------------------------------------------------
#define	WINDOWPROC_PRIORITY		100
