package Com.backendpages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import Com.Utilities.baseClass;

public class Betaservices extends baseClass
{
	public Betaservices()
	 {
		 PageFactory.initElements(driver, this);
	 }
	   @FindBy(how=How.XPATH, using=".//*[@id='account_sub_menu']/a[1]")
	    @CacheLookup
	    public WebElement services;
	 
	
	    @FindBy(how=How.XPATH, using=".//*[@id='ddServices']/a[1]")
	    @CacheLookup
	    public WebElement forum;
		
	    @FindBy(how=How.ID, using=".//*[@id='ddServices']/a[2]")
	    @CacheLookup
		public WebElement chatroom;
		
	    @FindBy(how=How.ID, using=".//*[@id='dashboard']/div[2]/div/div[2]/table/tbody/tr/td/table/tbody/tr/td/ol/li[1]/a")
	    @CacheLookup
		public WebElement Viewyourforum;
		
}
