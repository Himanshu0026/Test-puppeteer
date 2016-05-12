package Com.testcases.editpage;

import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.UserPermission.VerifyStartTopic_CategoryPermissions;

//Verify delete account on account settings page a  Pending Email user with back end account settings Enable/Disable For Pending Email user  Permessions 
@SuppressWarnings("deprecation")
	public class VerifyDeleteOwnProfileAccountSettings_PendingEmailPermessions extends baseClass
	{
		 String username, password;
			public VerifyDeleteOwnProfileAccountSettings_PendingEmailPermessions() throws IOException{

				username = readExcel("Editpage").getRow(53).getCell(1).getStringCellValue();
				password = readExcel("Editpage").getRow(53).getCell(2).getStringCellValue();
				
			}
			// Disable  delete own profile  settings from back end and verify  delete account on Account settings page 
		
		@Test(priority=0)
		public void VerifyAccountsettings_Disable_AccountSttingsDeleteOwnProfile() throws InterruptedException, IOException{
			@SuppressWarnings("unused")
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission  = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					userPermission.Managelinks_PendingEmail,
					userPermission.ChangePermission_PendingEmail,
					userPermission.deletOwnProfile_checkbox, false);
			
			Frontendlogin.loginToApp(username, password);

           Thread.sleep(3000);
			
			Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			Thread.sleep(5000);
			
		 Assert.assertFalse(verifyPresenceOfElement(By.id("deleteAccountDialog")));	
			Thread.sleep(5000);
		
		 Frontendlogin.logoutFromApp();
			Thread.sleep(3000);
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
		// Enable  delete own profile  settings from back end and check account account functionality after  click on No option  for pending Email Users
		
		@Test(priority=1)
		public void erifyAccountsettings_Enable_DeleteAccountNO_ONSettingpage() throws InterruptedException, IOException{
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission  = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					userPermission.Managelinks_PendingEmail,
					userPermission.ChangePermission_PendingEmail,
					userPermission.deletOwnProfile_checkbox, true);
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
			
			Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			Thread.sleep(5000);
			FrontPage_Settings_EditDetails.VerifyAccountDeletNo();
			Thread.sleep(5000);
		
				
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		
		//Enable  delete own profile  settings from back end and check  Delete account  functionality For Pending Email  user 
		@Test(priority=2)
		public void erifyAccountsettings_Enable_DeleteAccountYESONSettingpage() throws InterruptedException, IOException{
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission  = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					userPermission.Managelinks_PendingEmail,
					userPermission.ChangePermission_PendingEmail,
					userPermission.deletOwnProfile_checkbox, true);
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
			
			Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			Thread.sleep(5000);
			FrontPage_Settings_EditDetails.VerifyAccountDeletYes();
			  
			Accountsettings.Textfield_Passwordpopup.sendKeys(password);
			
		     Accountsettings.ContinueButton.click();
		     Thread.sleep(5000);
		     Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username+"']")));
				
			driver.navigate().to((String) Credential.get("FrontendURL"));
		 
			
				
	

		}
			
		}
			
