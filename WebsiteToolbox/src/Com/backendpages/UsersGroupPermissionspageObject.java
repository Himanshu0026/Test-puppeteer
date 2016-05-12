package Com.backendpages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import Com.Utilities.baseClass;

public class UsersGroupPermissionspageObject extends baseClass {
	
public UsersGroupPermissionspageObject(){
		
		AjaxElementLocatorFactory element= new AjaxElementLocatorFactory(driver, 15);
		PageFactory.initElements(element, this);
		
	}
	
	@FindBy(how=How.XPATH, using="//td[text()='Registered Users']/following::td[3]/a")
    	@CacheLookup
    	public WebElement Managelink_RegisteredUsers;	
	
	@FindBy(how=How.XPATH, using="//td[text()='Registered Users']/parent::tr/td[4]/div/a")
		@CacheLookup
		public WebElement ChangePermission_RegisteredUser;
	
	@FindBy(how=How.XPATH, using="//p/font[@class='heading']")
		@CacheLookup
		public WebElement updationMessage;
	
	@FindBy(how=How.XPATH, using="//td[text()='Unregistered / Not Logged In']/following::td[3]/a")
		@CacheLookup
		public WebElement Managelinks_Unregistered;

	@FindBy(how=How.XPATH, using="//td[text()='Unregistered / Not Logged In']/parent::tr/td[4]/div/a")
		@CacheLookup
		public WebElement ChangePermission_Unregistered;
	
	@FindBy(how=How.XPATH, using="//td[text()='Pending Email Verification']/following::td[3]/a")
		@CacheLookup
		public WebElement Managelinks_PendingEmail;

	@FindBy(how=How.XPATH, using="//td[text()='Pending Email Verification']/parent::tr/td[4]/div/a")
		@CacheLookup
		public WebElement ChangePermission_PendingEmail;
	
	@FindBy(how=How.ID, using="view_forum")
		@CacheLookup
		public WebElement ViewCategory_checkbox;
	
	@FindBy(how=How.ID, using="post_threads")
		@CacheLookup
		public WebElement StartTopic_checkbox;
	
	@FindBy(how=How.ID, using="other_post_replies")
		@CacheLookup
		public WebElement ReplyTopic_checkbox;
	
	@FindBy(how=How.ID, using="upload_attachments")
		@CacheLookup
		public WebElement uploadAttachment_checkbox;
	
	@FindBy(how=How.ID, using="view_attachments")
		@CacheLookup
		public WebElement viewAttachment_checkbox;
	
	@FindBy(how=How.ID, using="view_thread_content")
		@CacheLookup
		public WebElement viewTopicContent_checkbox;
	
	@FindBy(how=How.ID, using="view_others_threads")
		@CacheLookup
		public WebElement viewOthersTopic_checkbox;
	
	@FindBy(how=How.ID, using="post_replies")
		@CacheLookup
		public WebElement replyOwnTopic_checkbox;
	
	@FindBy(how=How.ID, using="edit_posts")
		@CacheLookup
		public WebElement editOwnPost_checkbox;
	
	@FindBy(how=How.ID, using="delete_posts")
	@CacheLookup
	public WebElement deleteOwnPost_checkbox;
	
	@FindBy(how=How.ID, using="delete_threads")
	@CacheLookup
	public WebElement deleteOwnTopic_checkbox;
	
	@FindBy(how=How.ID, using="move_own_threads")
	@CacheLookup
	public WebElement moveOwnTopic_checkbox;
	
	@FindBy(how=How.XPATH, using="//button[text()='Save']")
		@CacheLookup
		public WebElement Savebutton;
	
	//Account Permessions
	@FindBy(how=How.ID, using="edit_profile")
	@CacheLookup
	public WebElement  EditOwnProfile_checkbox;
	
	@FindBy(how=How.ID, using="delete_profile")
	@CacheLookup
	public WebElement  deletOwnProfile_checkbox;
	
	@FindBy(how=How.ID, using="allow_invisible")
	@CacheLookup
	public WebElement  Selfsetaninvisible_checkbox;
	
	@FindBy(how=How.ID, using="allow_signature")
	@CacheLookup
	public WebElement  Signature_checkbox;
	
	@FindBy(how=How.ID, using="allow_customtitle")
	@CacheLookup
	public WebElement  CustomTitle_checkbox;
	
	@FindBy(how=How.ID, using="change_username")
	@CacheLookup
	public WebElement  ChangeUsername_checkbox;
}
