package Com.testcases.editpage;


import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.Forum11dropdownlikepost;

import Com.testcases.Login.Frontendlogin;

public class frontpagelikepost extends baseClass {
	 @Test(priority=0)
	 
   public  void loginfrontpage() throws InterruptedException{
			

		 Frontendlogin.loginToApp("pavani999", "pavani999");
		}
  @Test(priority=1)
   public  void Forum11dropdownlikepost() throws InterruptedException
  {
Forum11dropdownlikepost likepost= new Forum11dropdownlikepost();
likepost.Forum11dropdowlistButton.click();
Thread.sleep(5000);
likepost.Categories.click();
Thread.sleep(5000);
likepost.Testforum.click();
likepost.ClickonlikepostIcon.click();

Thread.sleep(5000);
}}
  