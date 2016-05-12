package Com.testcases.editpage;

import java.io.IOException;

import junit.framework.Assert;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.UserPermission.VerifyStartTopic_CategoryPermissions;

	@SuppressWarnings("deprecation")
	public class VerifyCustomTitleEdit_Profile_AccountPermessionsBackend extends baseClass
	{
		 String username, password,CustomUserTitle;
			public VerifyCustomTitleEdit_Profile_AccountPermessionsBackend() throws IOException{

				username = readExcel("Editpage").getRow(28).getCell(1).getStringCellValue();
				password = readExcel("Editpage").getRow(28).getCell(2).getStringCellValue();
				CustomUserTitle = readExcel("Editpage").getRow(28).getCell(3).getStringCellValue();
				
			    }
		
		@Test(priority=0)
		public void VerifyCustomTitle_Disable_AccountSettings() throws InterruptedException, IOException{
			@SuppressWarnings("unused")
			AccountSettingsPageObjects Profilepage=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject AccontPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					AccontPermission.Managelink_RegisteredUsers,
					AccontPermission.ChangePermission_RegisteredUser,
					AccontPermission.CustomTitle_checkbox, false);
			
			Frontendlogin.loginToApp(username, password);

            Thread.sleep(3000);
            VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
			Assert.assertFalse(verifyPresenceOfElement(By.xpath("//input[@name='usertitle']")));	
			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
		
		@Test(priority=1)
		public void VerifyCustomTitle_Enable_AccountSettings() throws InterruptedException, IOException{
			AccountSettingsPageObjects Profilepage=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
			userPermission.Managelink_RegisteredUsers,
			userPermission.ChangePermission_RegisteredUser,
			userPermission.CustomTitle_checkbox, true);
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
			
			 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
			 if(verifyPresenceOfElement(By.xpath("//input[@name='usertitle']"))){
				   Profilepage.CustomUserTitle.sendKeys(CustomUserTitle);
				  }if(verifyPresenceOfElement(By.xpath(".//*[@id='change_user_title']/small"))){
				  
			mousehover(Profilepage.EditCustomUserTitle, Profilepage.CustomUserTitleMouseHoverButton);
			
			Thread.sleep(5000);
			Profilepage.CustomUserTitleText.clear();
			Thread.sleep(5000);
		    Profilepage.CustomUserTitleText.sendKeys(CustomUserTitle);
		    Thread.sleep(5000);
		    Profilepage.CustomUserTitleEditOkButton.click();
		    Thread.sleep(5000);
			  } 
		    Thread.sleep(5000);
		    
		   Profilepage.SavechangesButton.click();
		    Thread.sleep(5000);
		    Assert.assertTrue(Profilepage.SettingsUpdateSecessfullMessage.getText().contains("Your settings have been updated"));
 			
			Thread.sleep(3000);
			driver.navigate().to((String) Credential.get("FrontendURL"));

			
		}
	
}
