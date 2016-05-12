package Com.backendpages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import Com.Utilities.baseClass;

public class Betapage3 extends baseClass
{
	public Betapage3()
	 {
		 PageFactory.initElements(driver, this);
	 }
	   @FindBy(how=How.XPATH, using=".//*[@id='my_account_forum_menu']/ul/li[7]/a")
	    @CacheLookup
	    public WebElement setings;
	 
	
	    @FindBy(how=How.XPATH, using=".//*[@id='ddSettings']/div/a[8]")
	    @CacheLookup
	    public WebElement pageon;
		
	    @FindBy(how=How.ID, using="facebook_connect")
		public WebElement facebook;
		@FindBy(xpath=".//*[@id='frmForumSettings']/div[3]/button")
	    @CacheLookup
		public WebElement save;
		
      @FindBy(how=How.ID, using="login_page_url")
	    @CacheLookup
		public WebElement logingmailpage ;


}
