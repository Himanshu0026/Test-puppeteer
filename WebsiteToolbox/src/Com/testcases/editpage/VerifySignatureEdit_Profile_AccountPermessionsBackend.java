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
	public class VerifySignatureEdit_Profile_AccountPermessionsBackend extends baseClass
	{
		 String username, password,Editusername,Editpassword,EditEmail;
			public VerifySignatureEdit_Profile_AccountPermessionsBackend() throws IOException{

				username = readExcel("Editpage").getRow(26).getCell(1).getStringCellValue();
				password = readExcel("Editpage").getRow(26).getCell(2).getStringCellValue();
				
			    }
		
		@Test(priority=0)
		public void VerifySignature_Disable_Registrationpage() throws InterruptedException, IOException{
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
		         Editprofilepage();
			Assert.assertFalse(verifyPresenceOfElement(By.xpath(".//*[@id='edit_signature']/small")));	
			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
		
		@Test(priority=1)
		public void VerifySignature_Enable_Registrationpage() throws InterruptedException, IOException{
			AccountSettingsPageObjects Profilepage=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
			userPermission.Managelink_RegisteredUsers,
			userPermission.ChangePermission_RegisteredUser,
			userPermission.CustomTitle_checkbox, true);
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
			
		    Editprofilepage();
		    mousehover(Profilepage.EditSignature, Profilepage.SignaturemousehoverEditButton);
		    Thread.sleep(5000);
		    
		   Profilepage.SavechangesButton.click();
		    Thread.sleep(5000);
		    Assert.assertTrue(Profilepage.SettingsUpdateSecessfullMessage.getText().contains("Your settings have been updated"));
 			
			Thread.sleep(3000);
			driver.navigate().to((String) Credential.get("FrontendURL"));

			
		}
		public static  void Editprofilepage() throws InterruptedException
		{
			AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
			SettingsEdit.Signoutbuttondropdown.click();
		    Thread.sleep(5000);
		    SettingsEdit.EditProfile.click();
}}
