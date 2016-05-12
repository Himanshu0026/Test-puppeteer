package Com.frontendpages;


import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import Com.Utilities.baseClass;

public class frontendregisterpage extends baseClass
{
	public frontendregisterpage()
	 {
		 PageFactory.initElements(driver, this);
	 }
	   @FindBy(how=How.XPATH, using="//li/a[@href='/register/register']")
	    @CacheLookup
	    public WebElement clickregister;
	   
	   //strat new topic registration
	   @FindBy(how=How.XPATH, using="//div/a[@href='/register/register']")
	    @CacheLookup
	    public WebElement Registerbutton;
	   
	   //Create Account Button
	   @FindBy(how=How.XPATH, using="//div/div/a[@href='/register/register']")
	    @CacheLookup
	    public WebElement startnewtopicCreatanaccountbutton;
	   
		@FindBy(how=How.XPATH, using="//a[contains(@href,'/post/printadd')]")
		@CacheLookup
		public WebElement StartnewTopicbutton;
		
		//front Registration
		@FindBy(id="td_tab_login")			
		@CacheLookup
		public WebElement loginbuttonOnHome;
		
		@FindBy(xpath=".//*[@id='user_login']/div/div")
		@CacheLookup
		public WebElement loginChildwindow;
		
		@FindBy(xpath="//div[@class='modal-footer']")
		@CacheLookup
		public WebElement modelfoter;
	
	     
	   public By RegisterButton_xpath=By.xpath("//li/a[@href='/register/register']");
	   
	   @FindBy(how=How.XPATH, using=".//*[@id='fblogin']")
	    @CacheLookup
	    public WebElement FacebookClickButtton;
	   
	   @FindBy(id="email")
		@CacheLookup
		public WebElement facebookEmail;
		
		@FindBy(id="pass")
		@CacheLookup
		public WebElement facebookPassword;
		
		@FindBy(name="login")
		@CacheLookup
		public WebElement facebookLogin;
	
		//expected and error messages
		@FindBy(xpath="//div[@class='text-center bmessage text-danger']")
		@CacheLookup
		public WebElement ExpectedMsgforinvalidCredential;
		
		@FindBy(xpath="//div[@class='alert alert-danger text-center']")
		@CacheLookup
		public WebElement errorMsgforinvalidregistredusername;
		
	
		
		@FindBy(xpath="//input[@class='form-control input-error error-tooltip']")
		@CacheLookup
		public WebElement errorMsgforBlankusername;
		
		@FindBy(xpath="//input[@class='form-control input-error error-tooltip']")
		@CacheLookup
		public WebElement errorMsgforBlankEmail;
		
		@FindBy(xpath="//input[@class='form-control input-error error-tooltip']")
		@CacheLookup
		public WebElement errorMsgforBlankpassword;
		
		

		
		  @FindBy(how=How.ID, using="imID")
		@CacheLookup
		public WebElement errorMsgforInstantMessagescreenBlank;
		
		
		
		@FindBy(xpath="//div[@class='alert alert-danger text-center']")
		@CacheLookup
		public WebElement errorMsgforinvalidregistredEmailId;
		
		
		@FindBy(xpath="//div[@class='alert alert-danger text-center']")
		@CacheLookup
		public WebElement errorMsgforinvalidBirthday;
		
		@FindBy(xpath="//input[@class='form-control input-error error-tooltip']")
		@CacheLookup
		public WebElement errorMsgforinvalidemailid;
		
		
		
		@FindBy(how=How.XPATH, using="//a[contains(text(),'Back to Category')]")
		@CacheLookup
		public WebElement BacktoCategory;
  
	    @FindBy(how=How.ID, using="inputusername")
	    @CacheLookup
	    public WebElement Username;
	    
	    @FindBy(how=How.ID, using="inputpassword")
	    @CacheLookup
	    public WebElement password;
	    
	    @FindBy(how=How.ID, using="inputemail")
	    @CacheLookup
	    public WebElement Email;
	    
	    @FindBy(how=How.ID, using="inputname")
	    @CacheLookup
	    public WebElement Fullnametext;
	    
	    @FindBy(how=How.ID, using="imType")
	    @CacheLookup
	    public WebElement Instantmesseagingdropdown;
	    
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='imID']")
	    @CacheLookup
	    public WebElement InstantmessageSreenNameText;
	    
	    
	    @FindBy(how=How.ID, using="birthDatepicker")
	    @CacheLookup
	    public WebElement Birthdaypicker;
	    
	    @FindBy(how=How.ID, using="attachProfile")
	    @CacheLookup
	    public WebElement Profilepicture;
	      
	    @FindBy(how=How.XPATH, using=".//*[@id='signature']")
	    @CacheLookup
	    public WebElement signature;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='attachProfile']")
	    @CacheLookup
	    public WebElement UploadPicture;
	    
	    @FindBy(how=How.XPATH, using="//div/button[@name='submit']")
	    @CacheLookup
	    public WebElement createaccountbutton;
	
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='forum_header']/div[1]/ul/li[1]/ul/span[2]/li[1]/a")
	    @CacheLookup
	    public WebElement Profileclick;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='forum_header']/div[1]/ul/li[1]/button")
	    @CacheLookup
	    public WebElement Signoutbuttondropdown;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='forum_header']/div[1]/ul/li[1]/ul/span[2]/li[3]/a")
	    @CacheLookup
	    public WebElement EditProfileClick;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='uploadAvatar']/ul[2]/li[1]/span[2]")
	    @CacheLookup
	    public WebElement fullnamedisplayed;
	    
	    @FindBy(how=How.XPATH, using="//span[text()='Short answer']/following::div/input")
	    @CacheLookup
	    public WebElement ShotAnswers;
	    
	    @FindBy(how=How.XPATH, using="//textarea[@class='form-control']")
	    @CacheLookup
	    public WebElement ParaGrapth;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='registerEditProfile']/div/form/div[10]/div/div/button")
	    @CacheLookup
	    public WebElement MultipleChoice;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='registerEditProfile']/div/form/div[11]/div/div/label")
	    @CacheLookup
	    public WebElement CheckBoxes;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='registerEditProfile']/div/form/div[12]/div/select")
	    @CacheLookup
	    public WebElement DropDown;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='registerEditProfile']/div/form/div[13]/div/div/button")
	    @CacheLookup
	    public WebElement MultipleSelectionList;
	    
	    
	    @FindBy(how=How.ID, using="rules_checkbox")
	    @CacheLookup
	    public WebElement TermsConditionsButton;
	    //modified
	    
	    @FindBy(how=How.XPATH, using="rules_checkbox")
	    @CacheLookup
	    public WebElement TermsConditionsPopUpClose;
	    
       // incontext registration
	    
	    @FindBy(how=How.XPATH, using="//input[@placeholder='Username']")
	    @CacheLookup
	    public WebElement incontextusername;
	    
	    
	    @FindBy(how=How.XPATH, using="//input[@placeholder='Password']")
	    @CacheLookup
	    public WebElement incontextpassword;
	    
	    @FindBy(how=How.XPATH, using="//input[@placeholder='Email Address']")
	    @CacheLookup
	    public WebElement incontextEmail;
	    
	    @FindBy(id="guest_user_message")
	    @CacheLookup
	    public WebElement LoginonGuestUserMessage;
	    
	    
	    @FindBy(how=How.XPATH, using="//button[@class='btn btn-primary cleared']")
	    @CacheLookup
	    public WebElement incontextcreateaccountbutton;
	    
}
