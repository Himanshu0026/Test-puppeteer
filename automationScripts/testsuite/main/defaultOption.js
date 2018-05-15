/****This script is dedicated for Back-end registration Setting changes permission in back-end and check front end on the forum. ****/
'use strict.';

var config = require('../../../config/config.json');
var defaultOptionTest = require('../cases/defaultOption.js');
var defaultOptionMethod = require('../methods/defaultOption.js');
var registerTests = require('../cases/register.js');
var utils = require('../utils.js');
var defaultOption = module.exports = {};
defaultOption.errors = defaultOptionMethod.jsErrors;

//Method To Abort unnecessary Requests
casper.on('resource.requested', function(requestData, networkRequest){
	var str = requestData.url;
	var res = str.match('https://static.olark.com');
	if(res) {
		utils.log(' aborting url : ' + requestData.url, 'INFO');
		networkRequest.abort();
	}
});

//1.Back end Setting with Default Registration Options and Verify Front end Edit profile Page  with respected to blank data (1-24) ********/
defaultOption.blankData = function(casper, test) {

	//Logging Message On The Console With
	casper.on('log', function(data) {
		utils.log(' ['+data.level+'] [phantomjs] '+data.message, 'DEBUG');
	});

	casper.start(config.backEndUrl, function() {
		utils.log(" Title of the page :"+this.getTitle(), 'INFO');

		/************************  1.Back-end registration Setting    *****************/

		registerTests.userAccountsEnable(function(status) {

			if (status) {

				//Create Admin User
				defaultOptionTest.createAdminUser();

				/************************   2.Front end Edit profile Page with  Full Name blank data ****************************/

				//1.Back end Full Name deafult "Yes",Required "Edit Page Only"  front end Edit Profile Page  with Full name  blank data
				defaultOptionTest.fullNameBlankDataEditPageOnlyYes();

				//2.Back end Full Name deafult "Yes",Required "Visible"  front end Edit Profile  with with Full name  blank data
				defaultOptionTest.fullNameBlankDataVisibleYes();

				//3.Back end Full Name deafult "Yes",Required "Hidden"  front end Registration with with Full name  blank data
				defaultOptionTest.fullNameBlankDataHiddenYes();

				//4.Back end Full Name deafult "No", Required "Edit Profile page only "  front end Edit Profile  with Full name  blank data
				defaultOptionTest.fullNameBlankDataEditProfilepageonlyNo();

				//5.Back end Full Name deafult "No",Required "Visible"  front end Registration with with Full name  blank data
				defaultOptionTest.fullNameBlankDataVisibleNo();

				//6.Back end Full Name deafult "No",Required "Hidden"  front end Edit Profile Page with with Full name  blank data
				defaultOptionTest.fullNameBlankDataHiddenNo();

				/************************   .3.Front end Edit profile Page with  Birthday  blank data blank data ****************************/

				//7.Back end Birthday  deafult "Yes",Required "Edit Page Only"  front end Registration with with Full name  blank data
				defaultOptionTest.birthdayBlankDataEditPageOnlyYes();

				//8.Back end Birthday  deafult "Yes",Required "Visible"  front end Edit Profile  with with Full name  blank data
				defaultOptionTest.birthdayBlankDataVisibleYes();

				//9.Back end Birthday  deafult "Yes",Required "Hidden"  front end Registration with with Full name  blank data
				defaultOptionTest.birthdayBlankDataHiddenYes();

				//10.Back end Birthday  deafult "No", Required "Edit Profile page only "  front end Edit Profile  with Full name  blank data
				defaultOptionTest.birthdayBlankDataEditProfilepageonlyNo();

				//11.Back end Birthday  deafult "No",Required "Visible"  front end Registration with with Full name  blank data
				defaultOptionTest.birthdayBlankDataVisibleNo();

				//12.Back end Birthday  deafult "No",Required "Hidden"  front end Edit Profile Page with with Full name  blank data
				defaultOptionTest.birthdayBlankDataHiddenNo();

				/************************   4.Front end Edit profile Page with Instant Messaging blank data ****************************/

				//13.Back end Instant Messaging  deafult "Yes",Required "Edit Page Only"  front end Registration with with Full name  blank data
				defaultOptionTest.instantMessageBlankDataEditPageOnlyYes();

				//14.Back end Instant Messaging deafult "Yes",Required "Visible"  front end Edit Profile  with with Full name  blank data
				defaultOptionTest.instantMessageBlankDataVisibleYes();

				//15.Back end Instant Messaging  deafult "Yes",Required "Hidden"  front end Registration with with Full name  blank data
				defaultOptionTest.instantMessageBlankDataHiddenYes();

				//16.Back end Instant Messaging  deafult "No", Required "Edit Profile page only "  front end Edit Profile  with Full name  blank data
				defaultOptionTest.instantMessageBlankDataEditProfilepageonlyNo();

				//17.Back end Instant Messaging  deafult "No",Required "Visible"  front end Registration with with Full name  blank data
				defaultOptionTest.instantMessageBlankDataVisibleNo();

				//18.Back end Instant Messaging  deafult "No",Required "Hidden"  front end Edit Profile Page with with Full name  blank data
				defaultOptionTest.instantMessageBlankDataHiddenNo();

				/************************   5..Front end Edit profile Page with  Signature    ****************************/

				//19.Back end Signature   deafult "Yes",Required "Edit Page Only"  front end Registration with with Full name  blank data
				defaultOptionTest.signatureBlankDataEditPageOnlyYes();

				//20.Back end Signature  deafult "Yes",Required "Visible"  front end Edit Profile  with with Full name  blank data
				defaultOptionTest.signatureBlankDataVisibleYes();

				//21.Back end Signature   deafult "Yes",Required "Hidden"  front end Registration with with Full name  blank data
				defaultOptionTest.signatureBlankDataHiddenYes();

				//22.Back end Signature   deafult "No", Required "Edit Profile page only "  front end Edit Profile  with Full name  blank data
				defaultOptionTest.signatureBlankDataEditProfilepageonlyNo();

				//23.Back end Signature   deafult "No",Required "Visible"  front end Registration with with Full name  blank data
				defaultOptionTest.signatureBlankDataVisibleNo();

				//24.Back end Signature   deafult "No",Required "Hidden"  front end Edit Profile Page with with Full name  blank data
				defaultOptionTest.signatureBlankDataHiddenNo();

			} else {
				utils.log(" USER NOT LOGGED IN SUCCESSFURLLY ON FORUM BACKEND", "ERROR");
			}
		});
	});
};


// 2. Back end Setting with Default Registration Options and Verify front End(25-56)********/
defaultOption.enableDisableEditPage = function(casper, test) {

	//Logging Message On The Console With
	casper.on('log', function(data) {
		utils.log(' ['+data.level+'] [phantomjs] '+data.message, 'DEBUG');
	});

	casper.start(config.backEndUrl, function() {

		/************************   6.Front end Edit profile Page Full Name Enable/Disable ****************************/

		//25.Verify full name back end Default Value "No" Required "Hidden" Front end Edit profile Page Full Name Disable
		defaultOptionTest.fullNameEditDisableHiddenNo();

		//26.Verify full name back end Default Value "No"Required "Registration Page "Front end Edit profile Page  Full name Disable
		defaultOptionTest.fullNameEditDisableRegistrationPageNo();

		//27.verify Full name back end Default value "No"Required "Visible"Front end Edit profile Page  Full Name Enable
		defaultOptionTest.fullNameEditEnableVisibleNo();

		//28.verify Full Name Back End Default Value "NO"Required "Edit Page Only"Front End Edit Profile  Page Full Name Disable
		defaultOptionTest.fullNameEditDisableEditPageOnlyNo();

		//29.Verify Full Name Back End Default Value ''Yes" Required "Hidden" Front End Edit profile Page  Full Name Disable
		defaultOptionTest.fullNameEditDisableHiddenYes();

		//30.verify Full Name Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Full Name Enable
		defaultOptionTest.fullNameEditEnableVisibleYes();

		//31.verify Full Name Back End Default Value "Yes" Required "Register page Only" Fornt End Edit profile Page  Full Name Disable
		defaultOptionTest.fullNameEditDisableRegistrationPageYes();

		//32.verify Full Name Back End Default Value "Yes" Required "Edit Page Only" Fornt End Edit profile Page  Full Name Enable
		defaultOptionTest.fullNameEditEnableEditPageOnlyYes();

		/************************   7. Front end Edit profile Page Birthday Picker  Enable/Disable ****************************/

		//33.Verify Birthday Picker Back End Default Value "No" Required "Hidden" Front end Edit page Birthday Picker Disable
		defaultOptionTest.birthdayPickerEditDisableHiddenNo();

		//34.Verify Birthday Picker Back End Default Value "No"Required "Registration Page "Front end Edit profile Page  Birthday Picker Disable//error
		defaultOptionTest.birthdayPickerEditDisableRegistrationPageNo();

		//35.verify Birthday Picker Back End end Default value "No"Required "Visible"Front end Edit profile Page  Birthday Picker Enable
		defaultOptionTest.birthdayPickerEditEnableVisibleNo();

		//36.verify Birthday Picker Back End Default Value "NO"Required "Edit Page Only"Front End Edit Profile  Page Birthday Picker Disable
		defaultOptionTest.birthdayPickerEditDisableEditPageOnlyNo();

		//37.Verify Birthday Picker Back End Default Value ''Yes" Required "Hidden" Front Edit profile Page  Birthday Picker Disable
		defaultOptionTest.birthdayPickerEditDisableHiddenYes();

		//38.verify Birthday Picker Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Birthday Picker Enable
		defaultOptionTest.birthdayPickerEditEnableVisibleYes();

		//39.verify Birthday Picker Back End Default Value "Yes" Required "Register page Only" Fornt End Edit profile Page  Birthday Picker Disable
		defaultOptionTest.birthdayPickerEditDisableRegistrationPageYes();

		//40.verify Birthday Picker Back End Default Value "Yes" Required "Edit Page Only" Fornt End Edit profile Page  Birthday Picker Enable
		defaultOptionTest.birthdayPickerEditEnableEditPageOnlyYes();

		/************************   8.Front end Edit profile Page Signature Enable/Disable ****************************/

		//41.Verify Signature Back End Default Value "No" Required "Hidden" Front end Edit profile Page  Signature Disable
		defaultOptionTest.signatureEditDisableHiddenNo();

		//42.Verify Signature Back End Default Value "No"Required "Registration Page "Front end Edit profile Page  Signature Disable
		defaultOptionTest.signatureEditDisableRegistrationPageNo();

		//43.verify Signature Back End end Default value "No"Required "Visible"Front end Edit profile Page Signature Enable
		defaultOptionTest.signatureEditEnableVisibleNo();

		//44.verify Signature Back End Default Value "NO"Required "Edit Page Only"Front End Edit profile Page  Signature Disable
		defaultOptionTest.signatureEditDisableEditProfilepageonlyNo();

		//45.Verify Signature Back End Default Value ''Yes" Required "Hidden" Front End Edit profile Page  Signature Disable
		defaultOptionTest.signatureEditDisableHiddenYes();

		//46.verify Signature Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Signature Enable
		defaultOptionTest.signatureEditEnableVisibleYes();

		//47.verify Signature Back End Default Value "Yes" Required "Register page Only" Fornt Edit profile Page  Signature Disable
		defaultOptionTest.signatureEditDisableRegistrationPageYes();

		//48.verify Signature Back End Default Value "Yes" Required "Edit Page Only" Fornt End Registration Page Signature Enable
	    	defaultOptionTest.signatureEditEnableEditPageOnlyYes();

		/************************   9.Front end Edit profile Page Instant Message Enable/Disable ****************************/

		//49.Verify Instant Message  Back End Default Value "No" Required "Hidden" Front end Edit page Instant Message Disable
		defaultOptionTest.instantMessageEditDisableHiddenNo();

		//50.Verify Instant Message  Back End Default Value "No"Required "Registration Page "Front end Edit profile Page Instant Message  Disable
		defaultOptionTest.instantMessageEditDisableRegistrationPageNo();

		//51.verify Instant Message  Back End end Default value "No"Required "Visible"Front end Edit profile Page Instant Message Enable
		defaultOptionTest.instantMessageEditEnableVisibleNo();

		//52.verify Instant Message  Back End Default Value "NO"Required "Edit Page Only"Front End Edit Profile  Page Instant Message  Disable
		defaultOptionTest.instantMessageEditDisableEditProfile();

		//53.Verify Instant Message  Back End Default Value ''Yes" Required "Hidden" Front End Edit profile Page  Instant Message  Disable
		defaultOptionTest.instantMessageEditDisableHiddenYes();

		//54.verify Instant Message  Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Instant Message  Enable
		defaultOptionTest.instantMessageEditEnableVisibleYes();

		//55.verify Instant Message  Back End Default Value "Yes" Required "Register page Only" Fornt Edit profile Page  Instant Message  Disable
		defaultOptionTest.instantMessageEditDisableRegistrationPageYes();

		//56.verify Instant Message  Back End Default Value "Yes" Required "Edit Page Only" Fornt End Edit profile Page  Instant Message  Enable
		defaultOptionTest.instantMessageEnableEditPage();

	});

};

// 3.Back end Setting with Default Registration Options and Verify front end Registration with respected to blank data(57-80)  ********/
defaultOption.blankDataRegistration = function(casper, test) {

	//Logging Message On The Console With
	casper.on('log', function(data) {
		utils.log(' ['+data.level+'] [phantomjs] '+data.message, 'DEBUG');
	});

	casper.start(config.backEndUrl, function() {

		utils.log(' Title Of The Page :' +this.getTitle(), 'INFO');

		/************************   10.Front end Registration with Full name  blank data  ****************************/

		//57.Back end Full Name deafult "Yes",Required "Registration Page Only"  front end Registration with with Full name  blank data
		defaultOptionTest.fullNameBlankDataRegistrationPageOnlyYes();

		//58.Back end Full Name deafult "Yes",Required "Visible"  front end Registration with with Full name  blank data
		defaultOptionTest.fullNameBlankDataRegistrationVisibleYes();

		//59.Back end Full Name deafult "Yes",Required "Hidden"  front end Registration with with Full name  blank data
		defaultOptionTest.fullNameBlankDataRegistrationHiddenYes();

		//60.Back end Full Name deafult "No", Required "Registration Page Only"  front end Registration with with Full name  blank data
		defaultOptionTest.fullNameBlankDataRegistrationPageOnlyNo();

		//61.Back end Full Name deafult "No",Required "Visible"  front end Registration with with Full name  blank data
		defaultOptionTest.fullNameBlankDataRegistrationVisibleNo();

		//62.Back end Full Name deafult "No",Required "Hidden"  front end Registration with with Full name  blank data
		defaultOptionTest.fullNameBlankDataRegistrationHiddenNo();


		/************************   11.Front end Registration with  Birthday  blank data  ****************************/


		//63.Back end Birthday deafult "Yes",Required "Registration Page Only"  front end Registration with  Birthday  blank data
		defaultOptionTest.birthdayBlankDataRegistrationPageOnlyYes();

		//64.Back end Birthday deafult "Yes",Required "Visible"  front end Registration with with Birthday  blank data
		defaultOptionTest.birthdayBlankDataRegistrationVisibleYes();

		//65.Back end Birthday deafult "Yes",Required "Hidden"  front end Registration with with Birthday  blank data
		defaultOptionTest.birthdayBlankDataRegistrationHiddenYes();

		//66.Back end Birthday deafult "No", Required "Registration Page Only"  front end Registration with with Birthday  blank data
		defaultOptionTest.birthdayBlankDataRegistrationPageOnlyNo();

		//67.Back end Birthday deafult "No",Required "Visible"  front end Registration with with Birthday  blank data
		defaultOptionTest.birthdayBlankDataRegistrationVisibleNo();

		//68.Back end Birthday  deafult "No",Required "Hidden"  front end Registration with with Birthday  blank data
		defaultOptionTest.birthdayBlankDataRegistrationHiddenNo();


		/************************   12.Front end Registration with  Signature  blank data ****************************/


		//69.Back end Signature deafult "Yes",Required "Registration Page Only"  front end Registration with with Signature  blank data
		defaultOptionTest.signatureBlankDataRegistrationPageOnlyYes();

		//70.Back end Signature deafult "Yes",Required "Visible"  front end Registration with with Signature  blank data
		defaultOptionTest.signatureBlankDataRegistrationVisibleYes();

		//71.Back end Signature  deafult "Yes",Required "Hidden"  front end Registration with with Signature  blank data
		defaultOptionTest.signatureBlankDataRegistrationHiddenYes();

		//72.Back end Signature  deafult "No", Required "Registration Page Only"  front end Registration with with Signature   blank data
		defaultOptionTest.signatureBlankDataRegistrationPageOnlyNo();

		//73.Back end Signature  deafult "No",Required "Visible"  front end Registration with with Signature   blank data
		defaultOptionTest.signatureBlankDataRegistrationVisibleNo();

		//74.Back end Signature  deafult "No",Required "Hidden"  front end Registration with with Signature   blank data
		defaultOptionTest.signatureBlankDataRegistrationHiddenNo();


		/************************   13.Front end Registration with Instant Message blank data  ****************************/


		//75.Back end Instant Message  deafult "Yes",Required "Registration Page Only"  front end Registration with Instant Message blank data
		defaultOptionTest.instantMessageBlankDataRegistrationPageOnlyYes();

		//76.Back end Instant Message deafult "Yes",Required "Visible"  front end Registration with Instant Message   blank data
		defaultOptionTest.instantMessageBlankDataRegistrationVisibleYes();

		//77.Back end Instant Message deafult "Yes",Required "Hidden"  front end Registration with Instant Message   blank data
		defaultOptionTest.instantMessageBlankDataRegistrationHiddenYes();

		//78.Back end Instant Message  deafult "No", Required "Registration Page Only"  front end Registration with Instant Message  blank data
		defaultOptionTest.instantMessageBlankDataRegistrationPageOnlyNo();

		//79.Back end Instant Message  deafult "No",Required "Visible"  front end Registration with Instant Message  blank data
		defaultOptionTest.instantMessageBlankDataRegistrationVisibleNo();

		//80.Back end Instant Message  deafult "No",Required "Hidden"  front end Registration with  Instant Message   blank data
		defaultOptionTest.instantMessageBlankDataRegistrationHiddenNo();

	});

};


// 4. Back end Setting with Default Registration Options and Verify front End  Registration page Field Disable/Enable (81-112)********/
defaultOption.enableDisableRegistration = function(casper, test) {

	//Logging Message On The Console With
	casper.on('log', function(data) {
		utils.log(' ['+data.level+'] [phantomjs] '+data.message, 'DEBUG');
	});

	casper.start(config.backEndUrl, function() {

		/************************   14.Front end Registration page Full Name Disable/Enable ****************************/

		//81.Verify full name back end Default Value "No" Required "Hidden" Front end Registration page Full Name Disable
		defaultOptionTest.fullNameDisableHiddenNo();

		//82.Verify full name back end Default Value "No"Required "Registerationpage Only"Front end Registration page Full name Enable
		defaultOptionTest.fullNameEnableRegistrationPageNo();

		//83.verify Full name back end Default value "No"Required "Visible"Front end Registration Page Full Name Registration Page Full Name Enable
		defaultOptionTest.fullNameEnableVisibleNo();

		//84.verify Full Name Back End Default Value "NO"Required "Edit Page Only"Front EndRegistration Page Full Name Disable
		defaultOptionTest.fullNameDisableEditProfilepageonlyNo();

		//85.Verify Full Name Back End Default Value ''Yes" Required "Hidden" Front End Registration Page Full Name Disable
		defaultOptionTest.fullNameDisableHiddenYes();

		//86.verify Full Name Back End Default Value "Yes" Required "Visible" Fornt End Registration Page Full Name Enable
		defaultOptionTest.fullNameEnableVisibleYes();

		//87.verify Full Name Back End Default Value "Yes" Required "Register page Only" Fornt End Registration Page Full Name Enable
		defaultOptionTest.fullNameEnableRegistrationPageYes();

		//88.verify Full Name Back End Default Value "Yes" Required "Edit Page Only" Fornt End Registration Page Full Name Disable
		defaultOptionTest.fullNameEnableEditPageOnlyYes();

		/************************  15.Front end Registration page BirthdayPicker Disable/Enable ****************************/

		//89.verify Birthday Picker Back End Default Value "No" Required "Hidden" Fornt End Registration Page BirthdayPicker Disable
		defaultOptionTest.birthdayPickerDisableHiddenNo();

		//90.verify Birthday Picker Back End Default Value "No" Required "Visible" Fornt End Registration Page BirthdayPicker Enable
		defaultOptionTest.birthdayPickerEnableVisibleNo();

		//91.verify Birthday Picker Back End Default Value "No" Required "RegistrationPage Only" Fornt End Registration Page BirthdayPicker Enable
		defaultOptionTest.birthdayPickerEnableRegistrationPageNo();

		//92.verify Birthday Picker Back End Default Value "No" Required "Edit Page Only" Fornt End Registration Page BirthdayPicker Disable
		defaultOptionTest.birthdayPickerDisableEditPageOnlyNo();

		//93.verify Birthday Picker Back End Default Value "Yes" Hidden" Fornt End Registration Page BirthdayPicker Disable
		defaultOptionTest.birthdayPickerDisableHiddenYes();

		//94.verify Birthday Picker Back End Default Value "Yes"  Required "Visible" Fornt End Registration Page BirthdayPicker Enable
		defaultOptionTest.birthdayPickerEnableVisibleYes();

		//95.verify Birthday Picker Back End Default Value "Yes" Register Page Only" Fornt End Registration Page BirthdayPicker Enable
		defaultOptionTest.birthdayPickerDisableRegistrationPageYes();

		//96.verify Birthday Picker Back End Default Value "Yes" Edit Page Only" Fornt End Registration Page BirthdayPicker Disable
		defaultOptionTest.birthdayPickerDisableEditPageOnlyYes();

		/************************  16.Front end Registration page Signature  Disable/Enable ****************************/

		//97.verify Signature Back End Default Value "No" Required "Hidden" Fornt End Registration Page Signature Disable
		defaultOptionTest.signatureDisableHiddenNo();

		//98.verify Signature Back End Default Value "No" Required "Visible" Fornt End Registration Page  Signature Enable
		defaultOptionTest.signatureEnableVisibleNo();

		//99.verify Signature Back End Default Value "No" Required "RegistrationPage Only" Fornt End Registration Page Signature Enable
		defaultOptionTest.signatureDisableRegistrationPageNo();

		//100.verify Signature Back End Default Value "No" Required "Edit Page Only" Fornt End Registration Page Signature  Disable
		defaultOptionTest.signatureDisableEditProfilepageonlyNo();

		//101.verify Signature Back End Default Value "Yes" Hidden" Fornt End Registration Page Signature Disable
		defaultOptionTest.signatureDisableHiddenYes();

		//102.verify Signature Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Full Name Enable
		defaultOptionTest.signatureEnableVisibleYes();

		//103.verify Signature Back End Default Value "Yes" Register Page Only" Fornt End Registration Page Signature Enable
		defaultOptionTest.signatureEnableRegistrationPageYes();

		//104.verify Signature Back End Default Value "Yes" Edit Page Only" Fornt End Registration Page Signature  Disable
	   	defaultOptionTest.signatureDisableEditPageOnlyYes();

		/************************  17.Front end Registration page InstantMessage Disable/Enable ****************************/

		//105.verify Instant Message Back End Default Value "No" Required "Hidden" Fornt End Registration Page InstantMessage Disable
		defaultOptionTest.instantMessageDisableHiddenNo();

		//106.verify Instant Message Back End Default Value "No" Required "Visible" Fornt End Registration Page  Instant Message Enable
		defaultOptionTest.instantMessageEnableVisibleNo();

		//107.verify Instant Message  Back End Default Value "No" Required "RegistrationPage Only" Fornt End Registration Page Instant Message  Enable
		defaultOptionTest.instantMessageEnableRegistrationPageNo();

		//108.verify Instant Message  Back End Default Value "No" Required "Edit Page Only" Fornt End Registration Page Instant Message Disable
		defaultOptionTest.instantMessageDisableEditProfilepageonlyNo();

		//109.verify Instant Message  Back End Default Value "Yes" Hidden" Fornt End Registration Page Instant Message Disable
		defaultOptionTest.instantMessageDisableHiddenYes();

		//110.verify Instant Message  Back End Default Value "Yes"  Required "Visible" Fornt End Registration Page Instant Message  Enable
		defaultOptionTest.instantMessageEnableVisibleYes();

		//111.verify Instant Message  Back End Default Value "Yes" Register Page Only" Fornt End Registration Page Instant Message Enable
		defaultOptionTest.instantMessageDisableRegistrationPageYes();

		//112.verify Instant Message Back End Default Value "Yes" Edit Page Only" Fornt End Registration Page Instant Message Disable
		defaultOptionTest.instantMessageEnableEditPageOnlyYes();

	});

};
