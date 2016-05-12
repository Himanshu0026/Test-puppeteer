package Com.frontendpages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import Com.Utilities.baseClass;

public class AdvanceSearchPageObjects extends baseClass {
	public AdvanceSearchPageObjects() {

		AjaxElementLocatorFactory element = new AjaxElementLocatorFactory(
				driver, 15);
		PageFactory.initElements(element, this);

	}
     //main menu
	@FindBy(how = How.ID, using = "links-nav")
	@CacheLookup
	public WebElement forumMenu;

	// memeber
	@FindBy(how = How.ID, using = "members_list_show")
	@CacheLookup
	public WebElement Member;
	
	//Account memeber delete button 
	@FindBy(how = How.ID, using = "del_mem_btn")
	@CacheLookup
	public WebElement MemberDeleteButton;

	@FindBy(how = How.ID, using = "searchContent")
	@CacheLookup
	public WebElement CategoriesDropDownButton;

	@FindBy(how = How.ID, using = "advancedSearch")
	@CacheLookup
	public WebElement AdvancedSearchButton;

	// Post Page Locators

	@FindBy(how = How.ID, using = "anchor_tab_post_search")
	@CacheLookup
	public WebElement PostButton;

	@FindBy(how = How.ID, using = "search-keyword")
	@CacheLookup
	public WebElement KeyWordsText;

	@FindBy(how = How.ID, using = "search-user")
	@CacheLookup
	public WebElement AuthorText;

	@FindBy(how = How.ID, using = "forumsDropdown")
	@CacheLookup
	public WebElement Categories;

	@FindBy(how = How.XPATH, using = "//select[@name='replies']")
	@CacheLookup
	public WebElement RepliesDropDown;

	@FindBy(how = How.XPATH, using = "//input[@name='numreplies']")
	@CacheLookup
	public WebElement RepliesText;

	@FindBy(how = How.XPATH, using = ".//*[@id='daterange']")
	@CacheLookup
	public WebElement DateDropDown;

	@FindBy(how = How.XPATH, using = "//select[@name='sort']")
	@CacheLookup
	public WebElement SortDropDown;

	@FindBy(how = How.XPATH, using = "//input[@name='btnSearch']")
	@CacheLookup
	public WebElement SearchButtonPost;

	// Members page locators

	@FindBy(how = How.ID, using = "anchor_tab_member_search")
	@CacheLookup
	public WebElement MemberButton;

	@FindBy(how = How.XPATH, using = "//input[@class='form-control autoSuggestTypeahead tt-input']")
	@CacheLookup
	public WebElement UserName;

	@FindBy(how = How.XPATH, using = "//input[@name='s_fullname']")
	@CacheLookup
	public WebElement FullName;

	public By ShotAnswers_xpath = By
			.xpath("//div/label[text()='Short answer']/following::div/input");

	@FindBy(how = How.XPATH, using = "//div/label[text()='Short answer']/following::div/input")
	@CacheLookup
	public WebElement ShortAnswer;

	// will modify Paragraph

	public By Paragraph_xpath = By
			.xpath("//div/label[text()='Short answer']/following::div/input");

	@FindBy(how = How.XPATH, using = "//div/label[text()='Short answer']/following::div/input")
	@CacheLookup
	public WebElement Paragraphr;

	@FindBy(how = How.XPATH, using = "//input[@name='s_im']")
	@CacheLookup
	public WebElement InstantMessage;

	@FindBy(how = How.XPATH, using = ".//*[@id='registeredOn']")
	@CacheLookup
	public WebElement RegistrationDateBeforeDropDown;

	@FindBy(how = How.XPATH, using = ".//*[@id='registerationDate']")
	@CacheLookup
	public WebElement RegistrationDatePickerText;

	@FindBy(how = How.XPATH, using = ".//*[@id='last_post_date']")
	@CacheLookup
	public WebElement LastPostDropDown;

	@FindBy(how = How.XPATH, using = ".//*[@id='lastPostDate']")
	@CacheLookup
	public WebElement LastPostDatePickerText;

	@FindBy(how = How.XPATH, using = ".//*[@id='postsLimit']")
	@CacheLookup
	public WebElement PostsDropDown;

	@FindBy(how = How.XPATH, using = ".//*[@id='posts_less_greater']")
	@CacheLookup
	public WebElement PostsTextField;

	@FindBy(how = How.XPATH, using = "//input[@name='Submit']")
	@CacheLookup
	public WebElement SearchButtonMember;

}
