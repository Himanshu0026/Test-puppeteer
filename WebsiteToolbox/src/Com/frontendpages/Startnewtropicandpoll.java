package Com.frontendpages;


import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import Com.Utilities.baseClass;

public class Startnewtropicandpoll extends baseClass
{
	public Startnewtropicandpoll()
	 {
		 PageFactory.initElements(driver, this);
	 }
	   @FindBy(how=How.XPATH, using=".//*[@id='topics']/a[1]")
	    @CacheLookup
	    public WebElement Startnewtropicbutton;
	   
	
	    @FindBy(how=How.XPATH, using=".//*[@id='PostTopic']/div/div[1]/div/ul/li[2]/a")
	    @CacheLookup
	    public WebElement Clickonpollbutton;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='poll_question']")
	    @CacheLookup
	    public WebElement Pollquestiontext;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='poll_option_1']/div[1]/input")
	    @CacheLookup
	    public WebElement pollquestiontext1;
	   
	    @FindBy(how=How.XPATH, using=".//*[@id='poll_option_2']/div[1]/input")
	    @CacheLookup
	    public WebElement pollquestiontext2;
	
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='save_poll']")
	    @CacheLookup
	    public WebElement clicksavepollbutton;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='topic-details']/div/div/div[2]/div/input")
	    @CacheLookup
	    public WebElement Titletext;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='tinymce']")
	    @CacheLookup
	    public WebElement Contenttext;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='post_submit']")
	    @CacheLookup
	    public WebElement Postsubmitbutton;
	      
	    @FindBy(how=How.XPATH, using=".//*[@id='all_forums_dropdown']")
	    @CacheLookup
	    public WebElement Selectcategory;
	    
	    @FindBy(how=How.XPATH, using=".//*[@id='registerEditProfile']/div/form/div[15]/div/button")
	    @CacheLookup
	    public WebElement createaccountbutton;
	    
	    
}
