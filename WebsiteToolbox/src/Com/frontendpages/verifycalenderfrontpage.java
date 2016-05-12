package Com.frontendpages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import Com.Utilities.baseClass;


	public class verifycalenderfrontpage extends baseClass
	{
		public verifycalenderfrontpage()
		 {
			 PageFactory.initElements(driver, this);
		 }
	   @FindBy(how=How.ID, using=".td_tab_calendar")
	    @CacheLookup
	    public WebElement calender;
	   
	
	    @FindBy(how=How.XPATH, using=".//*[@id='main_container']/div[3]/table[1]/tbody/tr/td[1]/table/tbody/tr/td[2]/a")
	    @CacheLookup
	    public WebElement Showtodaydate;
	    
	    @FindBy(how=How.ID, using="linkThreadTools")
	    @CacheLookup
	    public WebElement calendermode;
	  
	    @FindBy(how=How.XPATH, using=".//*[@id='linkThreadTools']")
	    @CacheLookup
	    public WebElement AddNewEvent;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='divThreadEvents']/a[1]")
	    @CacheLookup
	    public WebElement SingleAlldayEvent;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='divThreadEvents']/a[2]")
	    @CacheLookup
	    public WebElement RangedEvent;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='divThreadEvents']/a[3]")
	    @CacheLookup
	    public WebElement RecurringEvent;
	

}
