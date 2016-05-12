package Com.backendpages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import Com.Utilities.baseClass;


	public class Backendusersdropdownobjects extends baseClass
	{
		public Backendusersdropdownobjects()
		 {
			 PageFactory.initElements(driver, this);
		 }
		
		@FindBy(how=How.XPATH, using=".//*[@id='my_account_forum_menu']/ul/li[13]/a")
	    @CacheLookup
	    public WebElement Users;
	   
	
	    @FindBy(how=How.XPATH, using=".//*[@id='ddUsers']/div/a[1]")
	    @CacheLookup
	    public WebElement Groupspermissions;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='ddUsers']/div/a[2]")
	    @CacheLookup
	    public WebElement Newuser;
	    
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='ddUsers']/div/a[3]")
	    @CacheLookup
	    public WebElement Administerators;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='ddUsers']/div/a[4]")
	    @CacheLookup
	    public WebElement Invite;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='ddUsers']/div/a[5]")
	    @CacheLookup
	    public WebElement Fields;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='tab_wrapper']/div/ul/li[2]/a/span")
	    @CacheLookup
	    public WebElement DefaultRegisrationOptions;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[2]/td[2]/select")
	    @CacheLookup
	    public WebElement invisiblemodeDefaultvalueSelectlist;
	    
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[3]/td[2]/select")
	    @CacheLookup
	    public WebElement Visibilitysleectlist;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[5]/td[2]/select")
	    @CacheLookup
	    public WebElement FullnameRequired;
	     
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[6]/td[2]/select")
	    @CacheLookup
	    public WebElement FullnameVisibility;
	    

	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[8]/td[2]/select")
	    @CacheLookup
	    public WebElement Instantmessegerequired;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[9]/td[2]/select")
	    @CacheLookup
	    public WebElement InstantmessegeVisibilitySelectlist;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[11]/td[2]/select")
	    @CacheLookup
	    public WebElement Birthdayequired;
	    
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[12]/td[2]/select")
	    @CacheLookup
	    public WebElement BirthdayVisibilitySelectlis;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[14]/td[2]/select")
	    @CacheLookup
	    public WebElement SignatureRequired;
	    
	
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[15]/td[2]/select")
	    @CacheLookup
	    public WebElement SignarureVisibilitySelectlis;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[17]/td[2]/select")
	    @CacheLookup
	    public WebElement AvatarRequired;
	    
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[18]/td[2]/select")
	    @CacheLookup
	    public WebElement AvatarVisibilitySelectlis;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[17]/td[2]/select")
	    @CacheLookup
	    public WebElement ProfilePictureRequired;
	    
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div[6]/form/table/tbody/tr[18]/td[2]/select")
	    @CacheLookup
	    public WebElement ProfilePictureVisibilitySelectlis;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='ddUsers']/div/a[6]")
	    @CacheLookup
	    public WebElement Email;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='ddUsers']/div/a[7]")
	    @CacheLookup
	    public WebElement Titles;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='ddUsers']/div/a[8]")
	    @CacheLookup
	    public WebElement Moderatorlogs;
	    

	    @FindBy(how=How.XPATH, using=".//*[@id='ddUsers']/div/a[9]")
	    @CacheLookup
	    public WebElement Import;

	    @FindBy(how=How.XPATH, using="//a/img[@alt='Add New Field']")
	    @CacheLookup
	    public WebElement AddNewFieldButton;

	    @FindBy(how=How.ID, using="fieldtype")
	    @CacheLookup
	    public WebElement NewFiledTypeDropdownList;
	    
	    @FindBy(how=How.XPATH, using="//td/input[@name='fieldname']")
	    @CacheLookup
	    public WebElement NewFieldTitleText;
	    
	    @FindBy(how=How.XPATH, using="//td/textarea[@name='description']")
	    @CacheLookup
	    public WebElement NewFieldDiscription;
	   
	    @FindBy(how=How.ID, using="fieldmandatory")
	    @CacheLookup
	    public WebElement NewFieldRequiredCheckBox;
	    
	    @FindBy(how=How.ID, using="searchable")
	    @CacheLookup
	    public WebElement NewFieldSearchableCheckBox;
	    
	    @FindBy(how=How.ID, using="show_members_list")
	    @CacheLookup
	    public WebElement NewFieldshow_members_listCheckBox;
	    
	    @FindBy(how=How.ID, using="private")
	    @CacheLookup
	    public WebElement NewFieldPrivateCheckBox;
	    
	    @FindBy(how=How.ID, using="display_register")
	    @CacheLookup
	    public WebElement NewFieldDisplay_registerCheckBox;
	    
	    @FindBy(how=How.ID, using="editable_user")
	    @CacheLookup
	    public WebElement NewFieldEditable_userCheckBox;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='profileFieldOptions']/li[1]/input")
	    @CacheLookup
	    public WebElement MultipleCheckBoxListOptions;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='profileFieldOptions']/li[1]/input")
	    @CacheLookup
	    public WebElement MultipleChoice;
	    
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='profileFieldOptions']/li[1]/input")
	    @CacheLookup
	    public WebElement DropDown;
	    

	    @FindBy(how=How.XPATH, using=".//*[@id='profileFieldOptions']/li[1]/input")
	    @CacheLookup
	    public WebElement Checkboxes;
	    
	    @FindBy(how=How.XPATH, using="//button[@class='button btn-m btn-blue']")
	    @CacheLookup
		public WebElement SaveButtonClick;
	    
	  //new user  registration  page objects   
		
	    @FindBy(how=How.XPATH, using="//input[@name='member']")
	    @CacheLookup
		public WebElement Username;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='pw']")
	    @CacheLookup
		public WebElement Password;
	    
	    @FindBy(how=How.XPATH, using="//input[@name='email']")
	    @CacheLookup
		public WebElement Emailtext;
	    
	    @FindBy(how=How.XPATH, using="//select[@name='usergroupid']")
	    @CacheLookup
		public WebElement GroupDropDown;
	    
	    @FindBy(how=How.XPATH, using="//textarea[@name='note']")
	    @CacheLookup
		public WebElement PersonalNote;
	    
	    @FindBy(how=How.XPATH, using="//button[@type='submit']")
	    @CacheLookup
		public WebElement RegisterNewUserButton;
	    
	    //Backend Account Delete Objects
	   
	    @FindBy(how=How.ID, using="autosuggest")
	    @CacheLookup
		public WebElement username;
	    
	    @FindBy(how=How.XPATH, using="//a[@class='button']")
	    @CacheLookup
		public WebElement Deletebutton;
	    
	    
	    @FindBy(how=How.XPATH, using="//*[text()='Registered Users']/parent::tr/td[2]/a")
	    @CacheLookup
		public WebElement RegisterprimaryUsers;
	    

	    @FindBy(how=How.XPATH, using="//*[text()='Pending Email Verification']/parent::tr/td[2]/a")
	    @CacheLookup
		public WebElement PendingEmailPrimaryUsers;
	    

	    @FindBy(how=How.XPATH, using="//*[text()='Administrators']/parent::tr/td[2]/a")
	    @CacheLookup
		public WebElement AdminstratorPrimaryUsers;
	    
	    
	    @FindBy(how=How.XPATH, using="//select[@name='action']")
	    @CacheLookup
		public WebElement SelectedDropDown;
	    
	   // @FindBy(how=How.XPATH, using="//*[text()='"+username+"']/parent::td/parent::tr/td/input")
	    
	    // new account Registration Errormessages 
	    
	    @FindBy(xpath="//*[text()='Please enter a username.']")
		@CacheLookup
		public WebElement errormsgforblankUsername;
	    
	    @FindBy(xpath="//*[text()='Please enter a password.']")
		@CacheLookup
		public WebElement errormsgforblankPassword;
	    
		
		@FindBy(xpath="//*[text()='Please enter an email address.']")
		@CacheLookup
		public WebElement errormsgforblankEmail;
		
		@FindBy(xpath="//*[text()='You entered an invalid email address.']")
		@CacheLookup
		public WebElement errorMsgforInvalidEmail;
		
		@FindBy(xpath="//*[contains(text(),' There is already a user registered with the username')]")
		@CacheLookup
		public WebElement errorMsgforAlreadyRegistredusername;
		

		@FindBy(xpath="//*[contains(text(),' There is already a user registered with the email')]")
		@CacheLookup
		public WebElement errorMsgforAlreadyRegistredEmail;
		
      }
