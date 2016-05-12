package Com.testcases.editpage;

import java.awt.AWTException;





import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotVisibleException;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.Startnewtropicandpoll;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;


public class SocialSharing_Enable_Disable_Frontend_Backend extends baseClass
{
	String username, password;

		public  SocialSharing_Enable_Disable_Frontend_Backend() throws InterruptedException, IOException
		{
            
			username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
			password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
			
		}
		
   @Test(priority = 1)
			public void VerifySocialSharingForntEnd_EnableOnbackend()
			throws InterruptedException {
				switchtoBackendendURL();
				 BackendSettingspageObjects SocialSharing=new BackendSettingspageObjects();
					Backendlogin.LoginToAPP(username,password);
				 SocialSharing.settings.click();
				 SocialSharing.General.click();
				Thread.sleep(5000);
          	EnableorDisable_Checkbox(SocialSharing.SocialSharing, true);
			    Thread.sleep(5000);
			    SocialSharing.SaveButton.click();
		  	    Thread.sleep(5000);
		 	      switchtoFrontendURL(); 
            driver.navigate().refresh();
            
            AddNewTopicandReplyTopic socialSharing=new AddNewTopicandReplyTopic();
            socialSharing.forumMenu.click();
            socialSharing.Topic.click();
    		driver.findElement(By.xpath("//span[text()='ngngn']")).click();
            Thread.sleep(5000);
       
        
           			}
   
   
   
   
   
   
       // @Test(priority = 2)
	public void  VerifyPOLLForntEnd_DisableOnbackend()
	throws InterruptedException, AWTException {
		switchtoBackendendURL();
		 BackendSettingspageObjects Poll=new BackendSettingspageObjects();
		 Poll.settings.click();
	    Poll.General.click();
		Thread.sleep(5000);
 	EnableorDisable_Checkbox(Poll.PollClick, false);
	    Thread.sleep(5000);
	   Poll.SaveButton.click();
 	    Thread.sleep(5000);
	      switchtoFrontendURL(); 
   driver.navigate().refresh();
   Frontendlogin.loginToApp("pavani999", "pavani999");
   Thread.sleep(5000);
   Startnewtropicandpoll pollsend=new Startnewtropicandpoll();
	 pollsend.Startnewtropicbutton.click();
	 Thread.sleep(5000);
	 System.out.println("called before try");
		try{
			if (driver.findElement(By
				.xpath(".//*[@id='PostTopic']/div/div[1]/div/ul/li[2]/a")).isDisplayed()) {
				System.out.println("called from try");
				ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
				throw e;
			}
			else{
				System.out.println(" should not visible");
			}
		
		}
		catch(Exception e){
			
			System.out.println("called from catch");
			e.printStackTrace();
			System.out.println("Exception:"+ e.getMessage());
		}
		         Frontendlogin.logoutFromApp();
	}
	 
   
   }