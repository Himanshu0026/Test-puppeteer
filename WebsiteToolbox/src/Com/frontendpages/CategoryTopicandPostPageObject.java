package Com.frontendpages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import Com.Utilities.baseClass;

public class CategoryTopicandPostPageObject extends baseClass {
	
public CategoryTopicandPostPageObject(){
		
		AjaxElementLocatorFactory element= new AjaxElementLocatorFactory(driver, 15);
		PageFactory.initElements(element, this);
		
	}
	
	@FindBy(how=How.ID, using="modify_forum_filter")
    	@CacheLookup
    	public WebElement modifyFilterlink_category;
	
	@FindBy(how=How.XPATH, using="//*[@id='filter-modal']/div/div")
		@CacheLookup
		public WebElement categoryFilterpopUp;
	
	@FindBy(how=How.ID, using="apply_forum_filter")
		@CacheLookup
		public WebElement ApplyFilterbutton;
	
	
	@FindBy(how=How.ID, using="clear_forum_filter")
		@CacheLookup
		public WebElement ClearFilterbutton;
	
	@FindBy(how=How.XPATH, using="//div[@class='text-center bmessage text-danger']")
		@CacheLookup
		public WebElement PermissionMessage;
	
	@FindBy(how=How.XPATH, using="//a[contains(text(),'Back')]")
		@CacheLookup
		public WebElement Backlink;

	@FindBy(how=How.XPATH, using="//ul[@class='post-attachments']/li/a")
		@CacheLookup
		public WebElement postAttachedFile;
	
	@FindBy(how=How.XPATH, using="//span[@class='alert alert-info text-block text-center']")
	@CacheLookup
	public WebElement MessageforNoTopicDisplay;
	
	@FindBy(how=How.ID, using="move_threads_dropdown")
	@CacheLookup
	public WebElement moveTopicdropdown;
	
	@FindBy(how=How.XPATH, using="//*[(text()='Move Topics') and (@type='submit')]")
	@CacheLookup
	public WebElement moveTopicbutton;
	
	@FindBy(how=How.ID, using="submenu_follow_topic")
	@CacheLookup
	public WebElement followTopic_postPage;
	public By followTopic_postPage_id = By.id("submenu_follow_topic");
	
	@FindBy(how=How.ID, using="submenu_unfollow_topic")
	@CacheLookup
	public WebElement unFollowTopic_postpage;
	public By unFollowTopic_postpage_id = By.id("submenu_unfollow_topic");
	
	@FindBy(how=How.ID, using="submenu_follow_forum")
	@CacheLookup
	public WebElement FollowCategory;
	
	@FindBy(how=How.XPATH, using="//*[@data-original-title='Moderate topic']")
	@CacheLookup
	public WebElement ModerateTopic;
	
	
	@FindBy(how=How.XPATH, using="//*[text()='Lock']")
	@CacheLookup
	public WebElement LockonPostpage;
	
	@FindBy(how=How.XPATH, using="//*[text()='Unlock']")
	@CacheLookup
	public WebElement unLockonPostpage;
	
	@FindBy(how=How.XPATH, using="//*[text()='Move']")
	@CacheLookup
	public WebElement MoveTopic_Postpage;
	
	@FindBy(how=How.XPATH, using="//*[text()='Pin']")
	@CacheLookup
	public WebElement PinTopicfromPostpage;
	
	@FindBy(how=How.XPATH, using="//*[text()='Unpin']")
	@CacheLookup
	public WebElement unPinTopicfromPostpage;
	
	
	@FindBy(how=How.XPATH, using="//*[@class='alert alert-warning text-center']")
	@CacheLookup
	public WebElement AlertMessage;
	
	
}
