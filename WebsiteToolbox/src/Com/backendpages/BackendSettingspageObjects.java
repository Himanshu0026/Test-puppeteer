package Com.backendpages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import Com.Utilities.baseClass;

public class BackendSettingspageObjects extends baseClass {

	public BackendSettingspageObjects() {
		AjaxElementLocatorFactory element = new AjaxElementLocatorFactory(
				driver, 15);
		PageFactory.initElements(element, this);
	}

	// TODO Auto-generated constructor stub

	@FindBy(how = How.XPATH, using = ".//*[@id='my_account_forum_menu']/ul/li[7]/a")
	@CacheLookup
	public WebElement settings;

	@FindBy(how = How.XPATH, using = "//a[text()='Display']")
	@CacheLookup
	public WebElement display;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[2]")
	@CacheLookup
	public WebElement General;

	@FindBy(how = How.XPATH, using = ".//*[@id='enable_polls']")
	@CacheLookup
	public WebElement PollClick;

	@FindBy(how = How.XPATH, using = ".//*[@id='enable_calendar']")
	@CacheLookup
	public WebElement CalenderClick;

	@FindBy(how = How.XPATH, using = ".//*[@id='reputation']")
	@CacheLookup
	public WebElement Reputation;

	@FindBy(how = How.XPATH, using = ".//*[@id='enable_album']")
	@CacheLookup
	public WebElement PhotoAlbums;

	@FindBy(how = How.XPATH, using = ".//*[@id='esb']")
	@CacheLookup
	public WebElement SocialSharing;

	@FindBy(how = How.XPATH, using = ".//*[@id='allow_pm']")
	@CacheLookup
	public WebElement PrivateMessaging;

	@FindBy(how = How.XPATH, using = ".//*[@id='REQreg']")
	@CacheLookup
	public WebElement UserAccounts;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[3]")
	@CacheLookup
	public WebElement sequrity;

	@FindBy(how = How.XPATH, using = ".//*[@id='reqregapp']")
	@CacheLookup
	public WebElement ApproveNewRegistrations;

	@FindBy(how = How.XPATH, using = ".//*[@id='post_approval']")
	@CacheLookup
	public WebElement ApproveNewPosts;

	@FindBy(how = How.XPATH, using = ".//*[@id='force_login']")
	@CacheLookup
	public WebElement ForceGuestLogin;

	@FindBy(how = How.XPATH, using = ".//*[@id='confirm_email']")
	@CacheLookup
	public WebElement EmailAddressVerification;

	@FindBy(how = How.XPATH, using = ".//*[@id='aEMS']")
	@CacheLookup
	public WebElement UsertouserEmailing;

	@FindBy(how = How.XPATH, using = ".//*[@id='new_user_registration']")
	@CacheLookup
	public WebElement NewRegistrations;

	@FindBy(how = How.XPATH, using = ".//*[@id='forum_pw_cb']")
	@CacheLookup
	public WebElement PasswordProtection;

	@FindBy(how = How.XPATH, using = ".//*[@id='captcha_registration']")
	@CacheLookup
	public WebElement ImageVerification;

	@FindBy(how = How.XPATH, using = ".//*[@id='tab_wrapper']/div[2]/table/tbody/tr[9]/td[2]/select")
	@CacheLookup
	public WebElement ProfanityFilter;
//sss
	@FindBy(how = How.XPATH, using = ".//*[@id='username_regexp']")
	@CacheLookup
	public WebElement UsernameFormats;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[4]")
	@CacheLookup
	public WebElement chat;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[5]")
	@CacheLookup
	public WebElement fileuploading;

	@FindBy(how = How.ID, using = ".//*[@id='avatar_uploading']")
	@CacheLookup
	public WebElement AvatarButtonClick;


	@FindBy(how = How.XPATH, using = ".//*[@id='profile_picture']")
	@CacheLookup
	public WebElement ProfilePictures;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[6]")
	@CacheLookup
	public WebElement Notifications;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[7]")
	@CacheLookup
	public WebElement time;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[8]")
	@CacheLookup
	public WebElement SingleSignOnButton;

	@FindBy(how = How.ID, using = "facebook_connect")
	@CacheLookup
	public WebElement facebookEnableDisablebutton;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[9]")
	@CacheLookup
	public WebElement PaidAccess;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[8]")
	@CacheLookup
	public WebElement pageon;

	@FindBy(how = How.XPATH, using = "//div/a[text()='General']")
	@CacheLookup
	public WebElement GeneralSubMenu;

	@FindBy(how = How.XPATH, using = "//div/a[text()='Security']")
	@CacheLookup
	public WebElement SecuritySubMenu;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[9]")
	@CacheLookup
	public WebElement paidaccess;

	@FindBy(how = How.ID, using = "force_login")
	@CacheLookup
	public WebElement ForceGuestLogin_checkbox;

	@FindBy(xpath = "//button[@type='submit']")
	@CacheLookup
	public WebElement SaveButton;

	@FindBy(how = How.ID, using = "login_page_url")
	@CacheLookup
	public WebElement logingmailpage;

	/* Locator on File Uploading Settings page  */
	@FindBy(how = How.XPATH, using = "//*[text()='File Uploading']")
	@CacheLookup
	public WebElement fileUploadingSubmenu;
	
	@FindBy(how = How.NAME, using = "file_uploading")
	@CacheLookup
	public WebElement Attachments_checkbox;
	
	@FindBy(how = How.XPATH, using = "//textarea[@name='file_types']")
	@CacheLookup
	public WebElement fileTypetextfield;

	@FindBy(how = How.XPATH, using = "//*[text()='Browse file types']")
	@CacheLookup
	public WebElement BrowseFileTypeLink;
	
	@FindBy(how = How.XPATH, using = "//*[text()='Browse file types']")
	@CacheLookup
	public WebElement Browse;
	
	//Terms And Rules
	 	
	     @FindBy(how = How.XPATH, using = ".//*[@id='rules_edit']/a")
	  	@CacheLookup
	    public WebElement TermsandRulesEditButton;
	 	
	 	@FindBy(how = How.XPATH, using = ".//*[@id='forum_rules']")
	 	@CacheLookup
	 	public WebElement TermsandRulesTextField;
	
	   //UserFormate
	 	@FindBy(how = How.ID, using = "username_regexp")
	 	@CacheLookup
	 	public WebElement UserNameFormat;
	

	/* ----locator for display page------- */

	@FindBy(how = How.XPATH, using = "//*[text()='Forum Title']/parent::tr/td[2]/input")
	@CacheLookup
	public WebElement forumTitletextfield;

}
