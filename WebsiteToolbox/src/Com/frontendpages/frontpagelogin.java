package Com.frontendpages;


import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import Com.Utilities.baseClass;

public class frontpagelogin extends baseClass
{
	public frontpagelogin()
	 {
		
		 PageFactory.initElements( driver, this);
	 }
		
		@FindBy(id="td_tab_login")			
		@CacheLookup
		public WebElement loginbuttonOnHome;
		
		@FindBy(xpath=".//*[@id='user_login']/div/div")
		@CacheLookup
		public WebElement loginChildwindow;
		
		@FindBy(xpath="//label[text()='Username or Email']/following::input[@name='member']")
		@CacheLookup
		public WebElement username;
		
		@FindBy(xpath="//label[text()='Password']/following::input[@name='pw']")
		@CacheLookup
		public WebElement password;
		
		@FindBy(xpath="//*[@type='submit']")
		@CacheLookup
		public WebElement loginbutton;
		
		@FindBy(xpath="//li[@class='pull-right user-panel']")
		@CacheLookup
		public WebElement userAccountPanel;
	
		@FindBy(id="logout")
		@CacheLookup
		public WebElement logoutbutton;
		
		@FindBy(xpath="//div[@class='alert alert-danger text-center']")
		@CacheLookup
		public WebElement errorMsgforinvalidCredential;
		
		@FindBy(name="Cancel")
		@CacheLookup
		public WebElement CancelbuttonOnLoginPage;
		
		@FindBy(id="fb_login")
		@CacheLookup
		public WebElement LoginwithFacebook;
		
		
		@FindBy(id="email")
		@CacheLookup
		public WebElement facebookEmail;
		
		@FindBy(id="pass")
		@CacheLookup
		public WebElement facebookPassword;
		
		@FindBy(name="login")
		@CacheLookup
		public WebElement facebookLogin;
		
		@FindBy(id="anchor_tab_forget_password")
		@CacheLookup
		public WebElement forgotPassword;
		
		@FindBy(xpath="//label[text()='Username']/following::input[@name='member']")
		@CacheLookup
		public WebElement forgotPwdUsernametextfield;
		
		@FindBy(xpath="//div/input[@name='email']")
		@CacheLookup
		public WebElement forgotPwdEmailtextfield;
		
		@FindBy(name="Submit")
		@CacheLookup
		public WebElement forgotPwdSubmitbutton;
		
		@FindBy(xpath="//div[@class='text-center bmessage text-danger']")
		@CacheLookup
		public WebElement forgotPwdSuccessMsg;
		
		@FindBy(xpath="//*[@class='alert alert-danger text-center']")
		@CacheLookup
		public WebElement forgotPwdErrorMsg;
		
		@FindBy(xpath="//a[contains(text(),'Back to Categories')]")
		@CacheLookup
		public WebElement BacktoCategory;
		
		@FindBy(id="cancelPassword")
		@CacheLookup
		public WebElement CancelPasswordbutton;
		
		@FindBy(xpath="//input[@placeholder='Username or Email']")
		@CacheLookup
		public WebElement inContextUsername;
		
		@FindBy(xpath="//input[@placeholder='Username or Email']/following::input")
		@CacheLookup
		public WebElement inContextPassword;
		
		@FindBy(xpath="//input[@placeholder='Username or Email']/following::button")
		@CacheLookup
		public WebElement inContextLoginbutton;
		
		@FindBy(xpath=".//*[@id='form-dialog']/div")
		@CacheLookup
		public WebElement inContextLoginPopUp;
		
		@FindBy(xpath="//input[@placeholder='Username or Email']/following::a")
		@CacheLookup
		public WebElement inContextForgotPassword;
		
		public By Membersparagraph_xpath=By.xpath("//strong[text()='pavani999']/parent::a/following::span[6]");
		public By MembersShortanswer_xpath=By.xpath("//strong[text()='pavani999']/parent::a/following::span[5]");
		
		@FindBy(xpath=".//*[@id='links-nav']/i")
		@CacheLookup
		public WebElement FroumMainMenu;
		
		@FindBy(xpath="//*[@id='members_list_show']/a")
		@CacheLookup
		public WebElement Members_ForumMenu;
		
		@FindBy(xpath="//*[@id='calenders_show']/a")
		@CacheLookup
		public WebElement Calender_ForumMenu;
		
		public By CalenderButton_xpath=By.xpath("//*[@id='calenders_show']/a");
		
		@FindBy(id="paid_access_donate_link")
		@CacheLookup
		public WebElement Donate_ForumMenu;
		
		@FindBy(id="guest_user_vote")
		@CacheLookup
		public WebElement LoginonGuestUserVote;
		
		@FindBy(id="guest_user_message")
		@CacheLookup
		public WebElement LoginonGuestUserMessage;
		
		@FindBy(how=How.ID, using="anchor_tab_chat")
	    @CacheLookup
	    public WebElement Chat_Sidemenu;
		
		
		
		
		
		
		
		
		
		
		
		
		
		
}
		 
	     

