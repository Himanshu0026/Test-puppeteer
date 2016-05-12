package Com.testcases.registration;

import java.awt.AWTException;
import java.io.IOException;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotVisibleException;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class FileUploadingSettingsEnable_Disable_ProfilePicture_EditPage_RegistrationPage extends baseClass
{
	String username, password;

	public  FileUploadingSettingsEnable_Disable_ProfilePicture_EditPage_RegistrationPage() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	
				 @Test(priority = 1)
		   			public void VerifyProfilePictureRegisterpage_EnableOnbackend1()
		   			throws InterruptedException, AWTException {
		   				switchtoBackendendURL();
		   				 BackendSettingspageObjects ProfilePictures=new BackendSettingspageObjects();
		   				Backendlogin.LoginToAPP(username,password);
		   				ProfilePictures.setings.click();
		   		        ProfilePictures.fileuploading.click();
		   				Thread.sleep(5000);
		             	EnableorDisable_Checkbox(ProfilePictures.ProfilePictures, true);
		   			
		   		 	     Thread.sleep(5000);
		   		        ProfilePictures.SaveButton.click();
		   		  	    Thread.sleep(5000);
		   		 	      switchtoFrontendURL(); 
	                   driver.navigate().refresh();
		   				frontendregisterpage frontpage=new frontendregisterpage();
		   				Thread.sleep(5000);
		   				frontpage.clickregister.click();
		   				Thread.sleep(5000);
		   				//frontpage.Profilepicture.click(); 
		   				driver.findElement(By.xpath(".//*[@id='attachProfile']")).click();
		   				Thread.sleep(5000);
		   				Boolean ProfilePicturesButtonVisible = driver.findElement(By
		   						.xpath(".//*[@id='attachProfile']")).isDisplayed();
		   				 Thread.sleep(5000);
	                  attachfile(frontpage.UploadPicture, "C:\\Users\\ayyappa\\Downloads\\download-images-of-flowers-1 (1).jpg");
		   			  
		   					
	                  if (ProfilePicturesButtonVisible) {
		   					
		   					Thread.sleep(5000);

		   				}
		   					else{
		   						NoSuchElementException e= new NoSuchElementException();
		   						throw e;
		   					}
		   				driver.navigate().to((String) Credential.get("FrontendURL"));
		   			}
		   			
		  		@Test(priority = 2)
	   			public void VerifyProfilePictureRegisterpage_DisableOnbackend1()
	   					throws InterruptedException {
	   				switchtoBackendendURL();
	   			 BackendSettingspageObjects ProfilePictures=new BackendSettingspageObjects();
	   				ProfilePictures.setings.click();
	   		        ProfilePictures.fileuploading.click();
	   				Thread.sleep(5000);
	   	
	   	           	EnableorDisable_Checkbox(ProfilePictures.ProfilePictures, false);
	   		 	     Thread.sleep(5000);
	   		        ProfilePictures.SaveButton.click();
	   		  	    Thread.sleep(5000);
	   		     switchtoFrontendURL();           	
	            driver.navigate().refresh();
	   				frontendregisterpage frontpage=new frontendregisterpage();
	   				Thread.sleep(5000);
	   				frontpage.clickregister.click();

		   				System.out.println("called before try");
		   				try{
		   					if (driver.findElement(By
		   							.xpath(".//*[@id='attachProfile']")).isDisplayed()) {
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
		   				driver.navigate().to((String) Credential.get("FrontendURL"));   
		   	}
		  		
		  		@Test(priority = 3)
	   			public void VerifyProfilePictureEditpage_EnableOnbackend1()
	   			throws InterruptedException, AWTException {
	   				switchtoBackendendURL();
	   				 BackendSettingspageObjects ProfilePictures=new BackendSettingspageObjects();
	   				ProfilePictures.setings.click();
	   		        ProfilePictures.fileuploading.click();
	   				Thread.sleep(5000);
	             	EnableorDisable_Checkbox(ProfilePictures.ProfilePictures, true);
	   			
	   		 	     Thread.sleep(5000);
	   		        ProfilePictures.SaveButton.click();
	   		  	    Thread.sleep(5000);
	   		 	      switchtoFrontendURL(); 
                   driver.navigate().refresh();
                   Frontendlogin.loginToApp("pavani999", "pavani999");
   				AccountSettingsPageObjects EditpageSignature=new AccountSettingsPageObjects();
   				
   				EditpageSignature.Signoutbuttondropdown.click();
   				EditpageSignature.EditProfile.click();
   				Thread.sleep(5000);
   				Boolean fullnameLabelVisible = driver.findElement(By
   						.xpath(".//*[@id='attachProfile']")).isDisplayed();

   				if (fullnameLabelVisible) {
   					
   					Thread.sleep(5000);

   					attachfile(driver.findElement(By.xpath(".//*[@id='attachProfile']")), "C:\\Users\\ayyappa\\Downloads\\download-images-of-flowers-1 (1).jpg");
   					}
   					else{
   						NoSuchElementException e= new NoSuchElementException();
   						throw e;
   					}
   				Frontendlogin.logoutFromApp();
   			}
   			
		  		@Test(priority = 3)
	   			public void VerifyProfilePictureEditpage_DisableOnbackend1()
	   			throws InterruptedException, AWTException {
	   				switchtoBackendendURL();
	   				 BackendSettingspageObjects ProfilePictures=new BackendSettingspageObjects();
	   				ProfilePictures.setings.click();
	   		        ProfilePictures.fileuploading.click();
	   				Thread.sleep(5000);
	             	EnableorDisable_Checkbox(ProfilePictures.ProfilePictures, false);
	   		       Thread.sleep(5000);
	   		        ProfilePictures.SaveButton.click();
	   		  	    Thread.sleep(5000);
	   		 	      switchtoFrontendURL(); 
                       driver.navigate().refresh();
                          Thread.sleep(5000);
      			 Frontendlogin.loginToApp("pavani999", "pavani999");
      				AccountSettingsPageObjects 		EditpageProfilePicture=new AccountSettingsPageObjects();
      				EditpageProfilePicture.Signoutbuttondropdown.click();
      				EditpageProfilePicture.EditProfile.click();
      				//frontendregisterpage fullname=new frontendregisterpage();
      				Thread.sleep(5000);

      				System.out.println("called before try");
      				try{
      					if (driver.findElement(By
      						.xpath(".//*[@id='attachProfile']")).isDisplayed()) {
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

		   
		  		