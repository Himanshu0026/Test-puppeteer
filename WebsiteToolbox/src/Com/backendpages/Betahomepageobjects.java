package Com.backendpages;



import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import Com.Utilities.baseClass;
;


public class Betahomepageobjects extends baseClass
{
   

public Betahomepageobjects()
 {
	AjaxElementLocatorFactory element= new AjaxElementLocatorFactory(driver, 15);
	PageFactory.initElements(element, this);
 }
	
    @FindBy(how=How.ID, using="login")
      @CacheLookup
     public WebElement backendlogbutton;

	
	 @FindBy(how=How.NAME, using="username")
	 @CacheLookup
	 public WebElement uid;
	 
	@FindBy(how=How.NAME, using="password")
    @CacheLookup
    public WebElement paw;
   
    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/form/table/tbody/tr[5]/td/div/button")
    @CacheLookup
    public WebElement backendloginbutton2;
    
    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/form/table/tbody/tr[6]/td/div/a[1]")
    @CacheLookup
    public WebElement Lostpasswordbutton;
    
    
    @FindBy(xpath=".//*[@id='content_wrapper']/div")
	@CacheLookup
	public WebElement errorMsgforinvalidCredential;
    
    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/form/table/tbody/tr[6]/td/div/a[2]")
    @CacheLookup
    public WebElement lostusernamebutton;
    
    @FindBy(how=How.NAME, using="username")
    @CacheLookup
    public WebElement fogetpageusername;
    
    @FindBy(how=How.NAME, using="email")
    @CacheLookup
    public WebElement fogetpageemailtext;
    
    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div/form/table/tbody/tr[4]/td/button")
    @CacheLookup
    public WebElement passwordforgetpagesubmitbutton;
    

    @FindBy(how=How.XPATH, using=".//*[@id='content_wrapper']/div/span")
    @CacheLookup
    public WebElement invalidemailiderrormsg;

    
   
    @FindBy(how=How.XPATH, using="//a[@data-tooltip-elm='ddAccount']")
    @CacheLookup
    public WebElement userAccount;
 

    @FindBy(how=How.XPATH, using=".//*[@id='ddAccount']/a[1]")
    @CacheLookup
    public WebElement billing;
 
    @FindBy(how=How.ID, using=".//*[@id='ddAccount']/a[2]")
    @CacheLookup
    public WebElement beta10settings;
 
    @FindBy(how=How.XPATH, using="//a[text()='Logout']")
    @CacheLookup
    public WebElement logout;
    

}
