package Com.frontendpages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import Com.Utilities.baseClass;

public class AddNewTopicandReplyTopic extends baseClass{
	public AddNewTopicandReplyTopic(){
		
		AjaxElementLocatorFactory element= new AjaxElementLocatorFactory(driver, 15);
		PageFactory.initElements(element, this);
		
	}
	
	@FindBy(how=How.ID, using="forum_logo")
		@CacheLookup
		public WebElement forumLogo;
	
	@FindBy(how=How.ID, using="links-nav")
    	@CacheLookup
    	public WebElement forumMenu;
	
	@FindBy(how=How.XPATH, using="//a[@href='/latest']")
    	@CacheLookup
    	public WebElement Topic;
	
	@FindBy(how=How.XPATH, using="//a[contains(@href,'/post/printadd')]")
		@CacheLookup
		public WebElement StartnewTopicbutton;
	
	 @FindBy(how=How.NAME, using="subject")
	    @CacheLookup
	    public WebElement subject;
	 
	 @FindBy(how=How.ID, using="message_ifr")
	    @CacheLookup
	    public WebElement messageBody;
	 
	 @FindBy(how=How.ID, using="tinymce")
	    @CacheLookup
	    public WebElement messagetextfield;
	 
	 @FindBy(how=How.ID, using="post_submit")
	    @CacheLookup
	    public WebElement postNewTopicbutton;
	 
	 @FindBy(how=How.ID, using="cancel_post")
	    @CacheLookup
	    public WebElement Cancelbutton;
	 
	 @FindBy(how=How.ID, using="previewpost_sbt")
	    @CacheLookup
	    public WebElement PostPriviewnbutton;
	 
	 @FindBy(how=How.ID, using="post_message_0")
	    @CacheLookup
	    public WebElement Priviewmessage;
	
	 @FindBy(how=How.XPATH, using="//a[@id='fancy_attach_']")
	    @CacheLookup
	    public WebElement AttachFilesbutton;
	 
	 public By Attachfilebutton_xpath=By.xpath("//a[@id='fancy_attach_']");
	 
	 @FindBy(how=How.XPATH, using="//*[@id='insert_image_dialog_']/i")
	    @CacheLookup
	    public WebElement InsertPhotoIcon;
	 
	 public By InsertPhotoIcon_id=By.id("insert_image_dialog_");
	 
	 @FindBy(how=How.XPATH, using=".//*[@id='insertimagemodal']/div[1]/div")
	    @CacheLookup
	    public WebElement InsertPhotoPopup;
	 
	 @FindBy(how=How.ID, using="insertImage_")
	    @CacheLookup
	    public WebElement Browserbutton;
	 
	 @FindBy(how=How.ID, using="insert_image_btn")
	    @CacheLookup
	    public WebElement InsertImagebutton;
	 
	 @FindBy(how=How.ID, using="all_forums_dropdown")
	    @CacheLookup
	    public WebElement categorydropdown;
	 
	 @FindBy(how=How.XPATH, using="//*[contains(@id,'post_message_')]")
	    @CacheLookup
	    public WebElement VerifyPostedTopic;
	
	 @FindBy(how=How.ID, using="backArrowPost")
	    @CacheLookup
	    public WebElement backArrowOnPost;
	 
	 @FindBy(how=How.ID, using="back_arrow_topic")
	    @CacheLookup
	    public WebElement backArrowOnTopic;
	 
	 @FindBy(how=How.XPATH, using="//ul[@class='nav nav-tabs']//following::li/a[text()='Categories']")
		@CacheLookup
		public WebElement category_tab;
	 
	 @FindBy(how=How.XPATH, using=".//*[@id='forums_toggle_link']/li/a")
		@CacheLookup
		public WebElement SideMenu_category;
		
	@FindBy(how=How.XPATH, using="//a[contains(@class,'thread_title')]")
		@CacheLookup
		public WebElement category_forumthread;
	
	@FindBy(how=How.XPATH, using="//*[(@type='checkbox') and (@name='e_reply')]")
		@CacheLookup
		public WebElement followTopicCheckbox;
	
	@FindBy(how=How.ID, using="edit_post_request")
		@CacheLookup
		public WebElement EditOnfirstPost;
	
	@FindBy(how=How.XPATH, using="//*[contains(@id,'delete_first_post')]")
	@CacheLookup
	public WebElement DeleteOnfirstPost;
	
	@FindBy(how=How.ID, using="editable_subjuct")
	@CacheLookup
	public WebElement EditTopic;
	
	@FindBy(how=How.ID, using="editTopic")
	@CacheLookup
	public WebElement EditTopicPencilIcon;
	
	@FindBy(how=How.XPATH, using="//*[@class='editable-input']/input")
	@CacheLookup
	public WebElement EditTopicTextfield;
	
	@FindBy(how=How.XPATH, using="//*[contains(@id,'posttoggle')]/i")
	@CacheLookup
	public WebElement dropdownOnfirstPost;
	
	@FindBy(how=How.ID, using="message1_ifr")
	@CacheLookup
	public WebElement EditpostMessageBody;
	
	@FindBy(how=How.XPATH, using="//form[@id='quickReplyPost']//following::textarea[@name='message']")
		@CacheLookup
		public WebElement RepliedTextarea;
	
	@FindBy(how=How.ID, using="messagetopquickeditor_ifr")
		@CacheLookup
		public WebElement ReplyMessagebody;
	
	@FindBy(how=How.XPATH, using="//time[contains(text(),'seconds ago')]/following::span[contains(@id,'post_message_')]")
		@CacheLookup
		public WebElement RepliedMessage;
	
	@FindBy(how=How.XPATH, using=".//*[@id='reply_options']/div/input[@id='reply_submit']")
		@CacheLookup
		public WebElement Replied_Postbutton;
	
	@FindBy(how=How.ID, using="sub_post_reply")
	@CacheLookup
	public WebElement ReplyaPostbutton;
	
	public By ReplyaPostbutton_id=By.id("sub_post_reply");
	
	@FindBy(how=How.XPATH, using="//span/input[@name='save']")
		@CacheLookup
		public WebElement Modified_Savebutton;
		
	@FindBy(how=How.XPATH, using=".//*[@id='share-modal']/div")
		@CacheLookup
		public WebElement SharePost_popUp;
	
	@FindBy(how=How.XPATH, using="//a[@id='fb_share']/i")
		@CacheLookup
		public WebElement FacebookShare_icon;
	
	@FindBy(how=How.XPATH, using="//a[@id='twitter_share']/i")
		@CacheLookup
		public WebElement twitterShare_icon;
	
	@FindBy(how=How.XPATH, using="//*[contains(@data-original-title,'Like this topic')]")
	@CacheLookup
	public WebElement LikethisTopic_icon;
	
	@FindBy(how=How.XPATH, using="//*[contains(@data-original-title,'Like this post')]")
		@CacheLookup
		public WebElement LikethisPost_icon;
	
	@FindBy(how=How.XPATH, using="//a[@class='dislike_post text-muted']")
		@CacheLookup
		public WebElement DislikethisPost_icon;
	
	@FindBy(how=How.XPATH, using="//span[@class='topic-content']//a")
		@CacheLookup
		public WebElement firstTopicInList;

	@FindBy(how=How.ID, using="delete_post_request")
		@CacheLookup
		public WebElement DeleteaPost;
	public By DeleteaPost_id=By.id("delete_post_request");
	
	@FindBy(how=How.XPATH, using="//*[contains(@id,'post_list')]")
	@CacheLookup
	public WebElement firstPostinList;	
	
	@FindBy(how=How.XPATH, using="//*[contains(@class,'username usergroup')]")
	@CacheLookup
	public WebElement firstUsernameinTopicList;
	
	@FindBy(how=How.XPATH, using="//*[contains(@id,'reply_with_quote')]")
	@CacheLookup
	public WebElement firstQuoteinList;
	
	@FindBy(how=How.XPATH, using="//textarea[@name='xhpc_message_text']")
	@CacheLookup
	public WebElement sharePostwithmessage_Facebook;
	
	@FindBy(how=How.XPATH, using="//span[text()='Post to Facebook']")
	@CacheLookup
	public WebElement PostToFacebookbutton;
	
	@FindBy(how=How.XPATH, using="//*[contains(text(),'Insert Inline')]")
	@CacheLookup
	public WebElement insertInline;
	
	public By inlinedGraphicsfile(String filename){
		By inlinedAttch = By.xpath("//*[(@alt='"+ filename + "') and (@class='bbc_img')]");
		return inlinedAttch;
	}
	
	public By inlinedOtherfile(String filename){
		By inlinedAttch = By.xpath("//strong[text()='"+filename+"']");
		return inlinedAttch;
	}
	
	public By postAttachedGraphicsfile(String filename){
		By attchedFile = By.xpath("//*[contains(@title,'" + filename + "')]");
		return attchedFile;
	}
	
	public By postAttachedNongraphicsfile(String filename){
		By attchedFile = By.xpath("//*[text()='"+ filename + "']");
		return attchedFile;
	}
	
	public WebElement TopicInList(String topicName){
		WebElement topic = driver.findElement(By.xpath("//*[text()='"+topicName+"']"));
		return topic;
	}
	public By TopicInListBy(String topicName){
		By topic = By.xpath("//*[text()='"+topicName+"']");
		return topic;
	}
	
	@FindBy(how=How.XPATH, using="//a[contains(@id,'delete_attachment')]")
	@CacheLookup
	public WebElement DeleteAttachment;
	
	@FindBy(how=How.XPATH, using="//*[@data-original-title='Lock/Un-lock']")
	@CacheLookup
	public WebElement LockIconinDropdown;
	
	@FindBy(how=How.ID, using="lock")
	@CacheLookup
	public WebElement LockOption;
	
	@FindBy(how=How.ID, using="unlock")
	@CacheLookup
	public WebElement unLockOption;
	
	@FindBy(how=How.XPATH, using="//*[@data-original-title='Pin/Un-Pin']")
	@CacheLookup
	public WebElement PinIconinDropdown;
	
	@FindBy(how=How.ID, using="pin")
	@CacheLookup
	public WebElement PinOption;
	
	@FindBy(how=How.ID, using="unpin")
	@CacheLookup
	public WebElement unPinOption;
	
	@FindBy(how=How.XPATH, using="//*[@id='imagesError']/span")
	@CacheLookup
	public WebElement errorMessage_insertPicture;
	
	@FindBy(xpath="//*[@class='alert alert-danger text-center']")
	@CacheLookup
	public WebElement ErrorMsgOnAddNewTopicpage;
	
	@FindBy(id="editable_subjuct")
	@CacheLookup
	public WebElement subject_floatingHeader;
	
	
	
}
