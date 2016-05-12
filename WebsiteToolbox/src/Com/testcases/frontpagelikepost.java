package Com.testcases;


import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.Forum11dropdownlikepost;
import Com.frontendpages.frontpagelogin;

public class frontpagelikepost extends baseClass {
	 @Test(priority=0)
	 
   public  void loginfrontpage() throws InterruptedException{
			

		frontpagelogin login= new frontpagelogin();
//click on login tap on present Home page
       login.loginbuttonOnHome.click();

	      for(String winHandle : driver.getWindowHandles())
	      {
	          driver.switchTo().window(winHandle);		      }
		    login.username.sendKeys("ayyappa123");
			login.password.sendKeys("ayyappa");
			login.loginbutton.click();
			
		}
  @Test(priority=1)
   public  void Forum11dropdownlikepost() throws InterruptedException
  {
Forum11dropdownlikepost likepost= new Forum11dropdownlikepost();
likepost.Forum11dropdowlistButton.click();
Thread.sleep(5000);
likepost.Categories.click();
Thread.sleep(5000);
likepost.Testforum.click();likepost.ClickonlikepostIcon.click();

Thread.sleep(5000);
}}
  