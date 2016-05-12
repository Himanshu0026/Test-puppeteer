package Com.frontendpages;


import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import Com.Utilities.baseClass;

public class Forum11dropdownlikepost extends baseClass
{
	public Forum11dropdownlikepost()
	 {
		 PageFactory.initElements(driver, this);
	 }
	   @FindBy(how=How.XPATH, using=".//*[@id='links-nav']/i")
	    @CacheLookup
	    public WebElement Forum11dropdowlistButton;
	   
	
	    @FindBy(how=How.XPATH, using=".//*[@id='forums_toggle_link']/li/a")
	    @CacheLookup
	    public WebElement Categories;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='forum_188196']/span/span[1]/h3/a/span")
	    @CacheLookup
	    public WebElement Testforum;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='first_post_vote_32765331']/i")
	    @CacheLookup
	    public WebElement ClickonlikepostIcon;
	   
	    
	    @FindBy(how=How.ID, using="inputname")
	    @CacheLookup
	    public WebElement Fullnametext;
	    
	    @FindBy(how=How.ID, using="imType")
	    @CacheLookup
	    public WebElement Instantmesseagingdropdown;
	    
	    @FindBy(how=How.ID, using="birthDatepicker")
	    @CacheLookup
	    public WebElement Birthdaypicker;
	    
	    @FindBy(how=How.ID, using="attachProfile")
	    @CacheLookup
	    public WebElement Profilepicture;
	      
	    @FindBy(how=How.ID, using="signature")
	    @CacheLookup
	    public WebElement signature;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='registerEditProfile']/div/form/div[15]/div/button")
	    @CacheLookup
	    public WebElement createaccountbutton;
	    
	    
}
