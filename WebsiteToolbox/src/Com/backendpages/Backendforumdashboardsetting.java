package Com.backendpages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import Com.Utilities.baseClass;

public class Backendforumdashboardsetting extends baseClass {
	public Backendforumdashboardsetting() {
		AjaxElementLocatorFactory element= new AjaxElementLocatorFactory(driver, 15);
		PageFactory.initElements(element, this);
	}

	@FindBy(how = How.XPATH, using = ".//*[@id='my_account_forum_menu']/ul/li[7]/a")
	@CacheLookup
	public WebElement setings;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[3]")
	@CacheLookup
	public WebElement sequrity;

	@FindBy(how = How.XPATH, using = ".//*[@id='force_login']")
	@CacheLookup
	public WebElement forceguestlogin;

	@FindBy(how = How.XPATH, using = ".//*[@id='ddSettings']/div/a[8]")
	@CacheLookup
	public WebElement pageon;

	@FindBy(how = How.ID, using = "facebook_connect")
	public WebElement facebook;
	@FindBy(xpath = ".//*[@id='frmForumSettings']/div[3]/button")
	@CacheLookup
	public WebElement save;

	@FindBy(how = How.ID, using = "login_page_url")
	@CacheLookup
	public WebElement logingmailpage;

	@FindBy(how = How.XPATH, using = "//div/a[text()='General']")
	@CacheLookup
	public WebElement GeneralSubMenu;

	@FindBy(how = How.XPATH, using = "//div/a[text()='Security']")
	@CacheLookup
	public WebElement SecuritySubMenu;

	@FindBy(how = How.ID, using = "force_login")
	@CacheLookup
	public WebElement ForceGuestLogin_checkbox;
	
	  @FindBy(how=How.XPATH, using="//button[@class='button btn-m btn-blue']")
	    @CacheLookup
		public WebElement SaveButtonClick;

}
