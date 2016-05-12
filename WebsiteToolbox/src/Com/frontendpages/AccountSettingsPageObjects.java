package Com.frontendpages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import Com.Utilities.baseClass;

public class AccountSettingsPageObjects extends baseClass {
	public AccountSettingsPageObjects() {
		PageFactory.initElements(driver, this);
	}

	@FindBy(how = How.XPATH, using = "//button[@class='dropdown-toggle']")
	@CacheLookup
	public WebElement Signoutbuttondropdown;

	@FindBy(how = How.XPATH, using = "//*[text()='Edit Profile']")
	@CacheLookup
	public WebElement EditProfile;

	@FindBy(how = How.XPATH, using = "//span[text()='Short answer']/following::div/input")
	@CacheLookup
	public WebElement ShotAnswers;

	public By ShotAnswers_xpath = By
			.xpath("//span[text()='Short answers']/following::div/input");

	@FindBy(how = How.XPATH, using = "//textarea[@class='form-control']")
	@CacheLookup
	public WebElement ParaGrapth;

	public By ParaGrapth_xpath = By.xpath("//textarea[@class='form-control']");

	@FindBy(how = How.XPATH, using = ".//*[@id='registerEditProfile']/div/form/div[10]/div/div/button")
	@CacheLookup
	public WebElement MultipleChoice;

	@FindBy(how = How.XPATH, using = ".//*[@id='registerEditProfile']/div/form/div[11]/div/div/label")
	@CacheLookup
	public WebElement CheckBoxes;

	@FindBy(how = How.XPATH, using = ".//*[@id='registerEditProfile']/div/form/div[12]/div/select")
	@CacheLookup
	public WebElement DropDown;

	@FindBy(how = How.XPATH, using = ".//*[@id='registerEditProfile']/div/form/div[13]/div/div/button")
	@CacheLookup
	public WebElement MultipleSelectionList;

	@FindBy(how = How.XPATH, using = "//*[text()='Profile']")
	@CacheLookup
	public WebElement Profile;

	@FindBy(how = How.XPATH, using = "//*[text()='Settings']")
	@CacheLookup
	public WebElement Settings;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrName']/a[2]/small")
	@CacheLookup
	public WebElement UserNamemousehoverEditButton;

	@FindBy(how = How.XPATH, using = "//div/input[@class='form-control input-small']")
	@CacheLookup
	public WebElement UserNameEditText;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrName']/span/div/form/div/div[1]/div[2]/button[1]")
	@CacheLookup
	public WebElement UserNameEditOkButton;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrName']/span/div/form/div/div[1]/div[2]/button[2]")
	@CacheLookup
	public WebElement UserNameEditCancelbutton;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrPwd']/a/small")
	@CacheLookup
	public WebElement PasswordEditButton;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrPwd']/span[2]/div/form/div/div[1]/div[1]/input")
	@CacheLookup
	public WebElement PasswordEditText;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrPwd']/span[2]/div/form/div/div[1]/div[2]/button[1]")
	@CacheLookup
	public WebElement PasswordEditOkButton;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrPwd']/span[2]/div/form/div/div[1]/div[2]/button[2]")
	@CacheLookup
	public WebElement PasswordEditCancelButton;

	@FindBy(how = How.XPATH, using = ".//*[@id='change_user_name']")
	@CacheLookup
	public WebElement Editusername;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrEmail']/a/small")
	@CacheLookup
	public WebElement EmailEditButton;

	@FindBy(how = How.XPATH, using = ".//*[@id='change_user_pwd']")
	@CacheLookup
	public WebElement EditPassword;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrEmail']/span[2]/div/form/div/div[1]/div[1]/input")
	@CacheLookup
	public WebElement EmailEditText;

	@FindBy(how = How.XPATH, using = ".//*[@id='change_user_email']")
	@CacheLookup
	public WebElement EmailEdit;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrEmail']/span[2]/div/form/div/div[1]/div[2]/button[1]")
	@CacheLookup
	public WebElement EmailEditOkButton;

	@FindBy(how = How.XPATH, using = ".//*[@id='usrEmail']/span[2]/div/form/div/div[1]/div[2]/button[2]")
	@CacheLookup
	public WebElement EmailEditCancelButton;

	@FindBy(how = How.XPATH, using = ".//*[@id='fblogin']")
	@CacheLookup
	public WebElement connctfacebook;

	@FindBy(how = How.XPATH, using = "html/body/div[3]/div[5]/div[3]/div/form")
	@CacheLookup
	public WebElement Updatebuttonbody;

	@FindBy(how = How.XPATH, using = "//button[@type='submit']")
	@CacheLookup
	public WebElement UpdateButton;

	// div/button[@class='btn btn-primary']

	@FindBy(how = How.ID, using = "deleteAccountDialog")
	@CacheLookup
	public WebElement DeleteAccountButton;

	@FindBy(how = How.ID, using = "deleteAccount")
	@CacheLookup
	public WebElement DeleteAccountYesbutton;

	@FindBy(how = How.ID, using = "doNotDelAccount")
	@CacheLookup
	public WebElement DeleteAccountNobutton;

	@FindBy(how = How.XPATH, using = "//div/a[@id='send_message']")
	@CacheLookup
	public WebElement Messagebutton;

	@FindBy(how = How.XPATH, using = ".//*[@id='pm_subject']")
	@CacheLookup
	public WebElement MsgSubjecttext;

	@FindBy(how = How.ID, using = "pmessage_new_ifr")
	@CacheLookup
	public WebElement messageBody;

	@FindBy(how = How.ID, using = "tinymce")
	@CacheLookup
	public WebElement messagetextfield;

	@FindBy(how = How.XPATH, using = "html/body/div[3]/div[2]/div[1]/div/form/div[3]/div/span/a[1]/i")
	@CacheLookup
	public WebElement AttachFilesbutton;

	@FindBy(how = How.XPATH, using = ".//*[@id='insert_image_dialog_']/i")
	@CacheLookup
	public WebElement AttachImageButton;

	@FindBy(how = How.ID, using = "send_pmsg_button")
	@CacheLookup
	public WebElement MsgSendButton;

	@FindBy(how = How.XPATH, using = "//div/a[@id='emailMember']")
	@CacheLookup
	public WebElement Email;

	@FindBy(how = How.XPATH, using = ".//*[@id='email_subject']")
	@CacheLookup
	public WebElement EmailSubjectText;

	@FindBy(how = How.XPATH, using = ".//*[@id='email_message']")
	@CacheLookup
	public WebElement EmailMessageText;

	@FindBy(how = How.XPATH, using = ".//*[@id='send_email_button']")
	@CacheLookup
	public WebElement EmailSendButton;

	@FindBy(how = How.XPATH, using = ".//*[@id='imType']")
	@CacheLookup
	public WebElement InstantMessaging;

	@FindBy(how = How.XPATH, using = ".//*[@id='imID']")
	@CacheLookup
	public WebElement InstantMessagingnewTextfield;

	@FindBy(how = How.ID, using = ".//*[@id='moderator-panel']/div[2]/div/div/div/div/form/div[6]/div/div/button")
	@CacheLookup
	public WebElement AdditionalUserGroup;

	@FindBy(how = How.NAME, using = "submit")
	@CacheLookup
	public WebElement SavechangesButton;

	@FindBy(how = How.XPATH, using = "//div/a[@id='send_email']")
	@CacheLookup
	public WebElement EmailbuttonOnViewProfilepage;

	@FindBy(how = How.XPATH, using = "//select[@class='form-control']")
	@CacheLookup
	public WebElement PrimaryusergroupDropdown;

	// Edit Page Expected And Error Messages

	@FindBy(how = How.XPATH, using = "//div[@class='alert alert-success text-center']")
	@CacheLookup
	public WebElement Accountsettingssucessfulmessage;

	@FindBy(how = How.XPATH, using = "//div[@class='editable-error-block help-block']")
	@CacheLookup
	public WebElement errormessageemail;

	// edit account Settings disable error msg
	@FindBy(how = How.XPATH, using = "//div[@class='text-center bmessage text-danger']")
	@CacheLookup
	public WebElement errormessaageAccountsettings;
	// edit page error masg
	public By Editpage_error_xpath = By
			.xpath("//div[@class='text-center bmessage text-danger']");

	@FindBy(how = How.XPATH, using = "//a[@href='javascript:history.back();']")
	@CacheLookup
	public WebElement Bakbutton;

	// EditProfile signature Page

	@FindBy(how = How.XPATH, using = ".//*[@id='user_signature']/strong")
	@CacheLookup
	public WebElement EditSignature;

	@FindBy(how = How.XPATH, using = ".//*[@id='edit_signature']/small")
	@CacheLookup
	public WebElement SignaturemousehoverEditButton;

	@FindBy(how = How.ID, using = "tinymce")
	@CacheLookup
	public WebElement EditSignatureText;
	
	
	// sucessfulEditProfileSettings ExpectedMEssage

	@FindBy(how = How.XPATH, using = "//div[@class='alert alert-success text-center']")
	@CacheLookup
	public WebElement SettingsUpdateSecessfullMessage;

	@FindBy(how = How.XPATH, using = "//input[@name='usertitle']")
	@CacheLookup
	public WebElement CustomUserTitle;

	@FindBy(how = How.XPATH, using = ".//*[@id='change_user_title']/small")
	@CacheLookup
	public WebElement CustomUserTitleMouseHoverButton;

	@FindBy(how = How.ID, using = "change_user_title")
	@CacheLookup
	public WebElement EditCustomUserTitle;

	@FindBy(how = How.XPATH, using = "//input[@class='form-control input-sm']")
	@CacheLookup
	public WebElement CustomUserTitleText;

	@FindBy(how = How.XPATH, using = "//button[@class='btn btn-primary btn-sm editable-submit']")
	@CacheLookup
	public WebElement CustomUserTitleEditOkButton;

	@FindBy(how = How.XPATH, using = "//button[@class='btn btn-default btn-sm editable-cancel']")
	@CacheLookup
	public WebElement CustomUserTitleCancelButton;
	// Invisiblemode CheckbOX

	@FindBy(how = How.ID, using = "INVS")
	@CacheLookup
	public WebElement InvisibleModeCheckBox;

	// ******************delete account popwindow **************//

	@FindBy(how = How.XPATH, using = ".//*[@id='confirm_pwd']/div/div")
	@CacheLookup
	public WebElement PasswordPopupwindow;

	@FindBy(how = How.XPATH, using = "//input[@name='passwrd']")
	@CacheLookup
	public WebElement Textfield_Passwordpopup;

	@FindBy(how = How.ID, using = "confirm_submit")
	@CacheLookup
	public WebElement ContinueButton;

	//*****************Locator for followed content page ***************************//
	
		@FindBy(how = How.XPATH, using = "//button[@class='dropdown-toggle']")
		@CacheLookup
		public WebElement userAccountPanel;	
	
		@FindBy(how = How.XPATH, using = "//*[text()='Followed Content']")
		@CacheLookup
		public WebElement followedContent;
		
		@FindBy(how = How.ID, using = "unsubscribe")
		@CacheLookup
		public WebElement unFollow;
		
		@FindBy(how = How.XPATH, using = "//*[@value='Check All']")
		@CacheLookup
		public WebElement MainCheckbox;
		
		@FindBy(how = How.XPATH, using = "//*[@class='alert alert-info text-center no-space']")
		@CacheLookup
		public WebElement NoContentMsg;
		
		@FindBy(how = How.XPATH, using = "//*[@class='panel-heading']/ul/li[2]/a")
		@CacheLookup
		public WebElement CategoryTab;
		
		@FindBy(how = How.ID, using = "mass_forum_unsubscribe_btn")
		@CacheLookup
		public WebElement unFollow_category;
		
		
		
		// ************Locator for Profile page **********************//
		@FindBy(how = How.ID, using = "Topics_Started")
		@CacheLookup
		public WebElement TopicStarted_tab;
		
		@FindBy(how = How.XPATH, using = "//*[@class='glyphicon glyphicon-right-arrow']")
		@CacheLookup
		public WebElement MoveIcon;
		
		
	
	//********************* Received private masages *******************************//
	@FindBy(how = How.ID, using = "epm")
	@CacheLookup
	public WebElement ReceivedprivatemsgsCheckBox;
	
	@FindBy(how = How.ID, using = "npm")
	@CacheLookup
	public WebElement EmailPrivateMessageNotifications;
	
	
	//Edit profile page locaters
	@FindBy(how = How.ID, using = "inputname")
	@CacheLookup
	public WebElement Fullname;
	
	@FindBy(how = How.ID, using = "imType")
	@CacheLookup
	public WebElement InstantaniousMessageDropDown;
	
	@FindBy(how = How.ID, using = "imID")
	@CacheLookup
	public WebElement InstantaniousMessageText;
	
	@FindBy(how = How.ID, using = "birthDatepicker")
	@CacheLookup
	public WebElement Birthday;
	
	@FindBy(how = How.XPATH, using = ".//*[@id='signature']")
	@CacheLookup
	public WebElement Signature;
	
	@FindBy(how = How.XPATH, using = "//*[@id='edit_signature']/small")
	@CacheLookup
	public WebElement EditSignatureButton;
	
	//******************* Delete Account On memberspage **************************//
	@FindBy(how = How.ID, using = "delUserAccount")
	@CacheLookup
	public WebElement DeleteAccount;
	
	//AccountSettings Tab
	
	@FindBy(how = How.XPATH, using = "//a[@aria-controls='Account Settings']")
	@CacheLookup
	public WebElement AccountSettingsTab;
	
	//profile Edit Button 
	
	@FindBy(how = How.ID, using = "anchor_tab_edit")
	@CacheLookup
	public WebElement ProfileEditButton;

	//Memebers Search Text
	
	@FindBy(how = How.ID, using = "inline_search_box")
	@CacheLookup
	public WebElement MembersSearchText;

	
	
	
	
	

}
