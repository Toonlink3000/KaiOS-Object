// ============================================================================
//
// This file are where the Conditions/Actions/Expressions are defined.
// You can manually enter these, or use CICK (recommended)
// See the Extension FAQ in this SDK for more info and where to download it
//
// ============================================================================

// Common Include
#include	"common.h"

// Quick memo: content of the eventInformations arrays
// ---------------------------------------------------
// Menu ID
// String ID
// Code
// Flags
// Number_of_parameters
// Parameter_type [Number_of_parameters]
// Parameter_TitleString [Number_of_parameters]

// Definitions of parameters for each condition
short conditionsInfos[]=
		{
		IDMN_LSK_PRESSED, IDS_LSK_PRESSED, CND_LSK_PRESSED, 0, 0,
		IDMN_RSK_PRESSED, IDS_RSK_PRESSED, CND_RSK_PRESSED, 0, 0,
		IDMN_LARGETEXTON, IDS_LARGETEXTON, CND_LARGETEXTON, EVFLAGS_NOTABLE, 0,
		IDMN_WHILECHARGING, IDS_WHILECHARGING, CND_WHILECHARGING, EVFLAGS_NOTABLE, 0,
		IDMN_BATTERYLEVELCHANGED, IDS_BATTERYLEVELCHANGED, CND_BATTERYLEVELCHANGED, 0, 0,
		IDMN_DEVICEPOSITIONCHANGED, IDS_DEVICEPOSITIONCHANGED, CND_DEVICEPOSITIONCHANGED, 0, 0,
		IDMN_ISKAIOS, IDS_ISKAIOS, CND_ISKAIOS, EVFLAGS_ALWAYS, 1, PARAM_EXPRESSION, IDS_ISKAIOS_P1,
		IDMN_ADWASCLOSED, IDS_ADWASCLOSED, CND_ADWASCLOSED, 0, 0,
		IDMN_ADWASCLICKED, IDS_ADWASCLICKED, CND_ADWASCLICKED, 0, 0,
		IDMN_IFERRORDISPLAYAD, IDS_IFERRORDISPLAYAD, CND_IFERRORDISPLAYAD, 0, 0,
		};

// Definitions of parameters for each action
short actionsInfos[]=
		{
		IDMN_AUDIO_VOLUMEUP, IDS_AUDIO_VOLUMEUP, ACT_AUDIO_VOLUMEUP, 0, 0,
		IDMN_AUDIO_VOLUMEDOWN, IDS_AUDIO_VOLUMEDOWN, ACT_AUDIO_VOLUMEDOWN, 0, 0,
		IDMN_AUDIO_SHOWVOLUME, IDS_AUDIO_SHOWVOLUME, ACT_AUDIO_SHOWVOLUME, 0, 0,
		IDMN_RUMBLEDEVICE, IDS_RUMBLEDEVICE, ACT_RUMBLEDEVICE, 0, 1, PARAM_EXPRESSION, IDS_ACT_RUMBLEDEVICE_P1,
		IDMN_WATCHBATTERYLVL, IDS_WATCHBATTERYLVL, ACT_WATCHBATTERYLVL, 0, 0,
		IDMN_WATCHLOCATION, IDS_WATCHLOCATION, ACT_WATCHLOCATION, 0, 0,
		IDMN_NOWATCHBATTERYLVL, IDS_NOWATCHBATTERYLVL, ACT_NOWATCHBATTERYLVL, 0, 0,
		IDMN_NOWATCHLOCATION, IDS_NOWATCHLOCATION, ACT_NOWATCHLOCATION, 0, 0,
		IDMN_LOADDISPLAYAD, IDS_LOADDISPLAYAD, ACT_LOADANDDISPLAYAD, 0, 4, PARAM_EXPSTRING, PARAM_EXPSTRING, PARAM_EXPRESSION, PARAM_EXPRESSION, IDS_LOADDISPLAYAD_P1, IDS_LOADDISPLAYAD_P2, IDS_LOADDISPLAYAD_P3, IDS_LOADDISPLAYAD_P4,
		};

// Definitions of parameters for each expression
short expressionsInfos[]=
		{
		IDMN_BATTERYLEVEL, IDS_BATTERYLEVEL, EXP_BATTERYLEVEL, 0, 0,
		IDMN_BATTERYHEALTH, IDS_BATTERYHEALTH, EXP_BATTERYHEALTH, 0, 0,
		IDMN_DISCHARGETIME, IDS_DISCHARGETIME, EXP_DISCHARGETIME, 0, 0,
		IDMN_CHARGETIME, IDS_CHARGETIME, EXP_CHARGETIME, 0, 0,
		IDMN_BATTERYTEMPERATURE, IDS_BATTERYTEMPERATURE, EXP_BATTERYTEMPERATURE, 0, 0,
		IDMN_KAIADSERRORCODE, IDS_KAIADSERRORCODE, EXP_KAIADSERRORCODE, 0, 0,
		IDMN_GETLATITUDE, IDS_GETLATITUDE, EXP_GETLATITUDE, 0, 0,
		IDMN_GETLONGITUDE, IDS_GETLONGITUDE, EXP_GETLONGITUDE, 0, 0,
		IDMN_GETACCURACY, IDS_GETACCURACY, EXP_GETACCURACY, 0, 0,
		};



// ============================================================================
//
// CONDITION ROUTINES
// 
// ============================================================================

// -----------------
// Sample Condition
// -----------------
// Returns TRUE when the two values are equal!
// 

long WINAPI DLLExport Condition(LPRDATA rdPtr, long param1, long param2)
{

//  **** Still use this method for 1 or 2 parameters ****	
//	if (param1==param2)	
//		return TRUE;

	long p1 = CNC_GetParameter(rdPtr);
	long p2 = CNC_GetParameter(rdPtr);
	long p3 = CNC_GetParameter(rdPtr);

	if ((p1 + p2)==p3)
		return TRUE;
		 
	return FALSE;
}

long WINAPI DLLExport ReturnFalse(LPRDATA rdPtr, long param1, long param2)
{
	return FALSE;
}

// ============================================================================
//
// ACTIONS ROUTINES
// 
// ============================================================================

// -----------------
// Sample Action
// -----------------
// Does nothing!
// 
short WINAPI DLLExport Action(LPRDATA rdPtr, long param1, long param2)
{
	// Actions work just like Conditions

	// Use directly param1 and/or param2 if this action has 1 or 2 parameters

	// Use this if this action has 3 parameters or more
//	long p1 = CNC_GetParameter(rdPtr);
//	long p2 = CNC_GetParameter(rdPtr);
//	long p3 = CNC_GetParameter(rdPtr);
//	etc.

	return 0;
}

short WINAPI DLLExport Rumble(LPRDATA rdPtr, long param1, long param2)
{
	long a = param1 + 1;

	return 0;
}
// ============================================================================
//
// EXPRESSIONS ROUTINES
// 
// ============================================================================

// -----------------
// Sample expression
// -----------------
// Add three values
// 
long WINAPI DLLExport Expression(LPRDATA rdPtr,long param1)
{

	long p1 = CNC_GetFirstExpressionParameter(rdPtr, param1, TYPE_INT);
	long p2 = CNC_GetNextExpressionParameter(rdPtr, param1, TYPE_INT);
	long p3 = CNC_GetNextExpressionParameter(rdPtr, param1, TYPE_INT);

	// Performs the wonderfull calculation
	return p1+p2+p3;
}

// ----------------------------------------------------------
// Condition / Action / Expression jump table
// ----------------------------------------------------------
// Contains the address inside the extension of the different
// routines that handle the action, conditions and expressions.
// Located at the end of the source for convinience
// Must finish with a 0
//
long (WINAPI * ConditionJumps[])(LPRDATA rdPtr, long param1, long param2) = 
			{ 
			ReturnFalse,
			ReturnFalse,
			ReturnFalse,
			ReturnFalse,
			ReturnFalse,
			ReturnFalse,
			ReturnFalse,
			ReturnFalse,
			ReturnFalse,
			ReturnFalse,
			0
			};
	
short (WINAPI * ActionJumps[])(LPRDATA rdPtr, long param1, long param2) =
			{
			Action,
			Action,
			Action,
			Rumble,
			Action,
			Action,
			Action,
			Action,
			Action,
			0
			};

long (WINAPI * ExpressionJumps[])(LPRDATA rdPtr, long param) = 
			{     
			Expression,
			Expression,
			Expression,
			Expression,
			Expression,
			Expression,
			Expression,
			Expression,
			Expression,
			0
			};