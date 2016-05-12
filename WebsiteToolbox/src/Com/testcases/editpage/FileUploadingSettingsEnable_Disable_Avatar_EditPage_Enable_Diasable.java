package Com.testcases.editpage;

import java.awt.AWTException;
import java.io.IOException;


import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotVisibleException;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.AccountSettingsPageObjects;

import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class FileUploadingSettingsEnable_Disable_Avatar_EditPage_Enable_Diasable extends baseClass
{
	String username, password;

	public FileUploadingSettingsEnable_Disable_Avatar_EditPage_Enable_Diasable() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		username = readExcel("Registrationpage").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("Registrationpage").getRow(1).getCell(2).getStringCellValue();
	}
	
	      @Test(priority = 1)
	   			public void VerifyProfilePictureEditpage_EnableOnbackend1(String filepath)
	   			throws InterruptedException, AWTException {
	   				switchtoBackendendURL();
	   				 BackendSettingspageObjects Avatar=new BackendSettingspageObjects();
	   				Backendlogin.LoginToAPP(username,password);
	   				AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
	   				 Avatar.settings.click();
	   				 Avatar.fileuploading.click();
	   				Thread.sleep(5000);
	             	EnableorDisable_Checkbox(Avatar.AvatarButtonClick, true);
	   			    Thread.sleep(5000);
	   			   Avatar.SaveButton.click();
	   		  	    Thread.sleep(5000);
	   		 	      switchtoFrontendURL(); 
                   driver.navigate().refresh();
                   Frontendlogin.loginToApp("pavani999", "pavani999");
   				AccountSettingsPageObjects EditpageSignature=new AccountSettingsPageObjects();
   				
   				EditpageSignature.Signoutbuttondropdown.click();
   				EditpageSignature.EditProfile.click();
   				
            attachfile(newTopic.AttachFilesbutton, filepath);
   				Thread.sleep(5000);
   				
   					
   					
   				Frontendlogin.logoutFromApp();
   			}
   			
		  		@Test(priority = 2)
	   			public void VerifyProfilePictureEditpage_DisableOnbackend1()
	   			throws InterruptedException, AWTException {
	   				switchtoBackendendURL();
	   				 BackendSettingspageObjects Avatar=new BackendSettingspageObjects();
	   				Avatar.settings.click();
	   				Avatar.fileuploading.click();
	   				Thread.sleep(5000);
	             	EnableorDisable_Checkbox(Avatar.AvatarButtonClick, false);
	   		       Thread.sleep(5000);
	   		        Avatar.SaveButton.click();
	   		  	    Thread.sleep(5000);
	   		 	      switchtoFrontendURL(); 
                       driver.navigate().refresh();
                          Thread.sleep(5000);
      			 Frontendlogin.loginToApp("pavani999", "pavani999");
      				AccountSettingsPageObjects 		
      				EditpageProfilePicture=new AccountSettingsPageObjects();
      				EditpageProfilePicture.Signoutbuttondropdown.click();
      				EditpageProfilePicture.EditProfile.click();
      				//frontendregisterpage fullname=new frontendregisterpage();
      				Thread.sleep(5000);

      				System.out.println("called before try");
      				try{
      					if (driver.findElement(By
      						.xpath(".//*[@id='attachAvatar']")).isDisplayed()) {
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

		   
		  		