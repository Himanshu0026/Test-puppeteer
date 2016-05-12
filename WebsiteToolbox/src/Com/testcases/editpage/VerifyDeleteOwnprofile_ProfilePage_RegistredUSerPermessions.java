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

	
//Verify delete account on account Profile page a  Registred  user with back end account Profile Enable/Disable For Registred Email user  Permessions 
      @SuppressWarnings("deprecation")
	public class VerifyDeleteOwnprofile_ProfilePage_RegistredUSerPermessions extends baseClass
	{
		 String username, password,password1,username1 ;
			public VerifyDeleteOwnprofile_ProfilePage_RegistredUSerPermessions() throws IOException{

				username = readExcel("Editpage").getRow(45).getCell(1).getStringCellValue();
				username1 = readExcel("Editpage").getRow(45).getCell(3).getStringCellValue();
				password = readExcel("Editpage").getRow(45).getCell(2).getStringCellValue();
				password1= readExcel("Editpage").getRow(45).getCell(4).getStringCellValue();
				
			}
			// Disable  delete own profile  settings from back end and verify  delete account on Account Profile page 
		
		@Test(priority=0)
		public void VerifyAccountsettings_Disable_AccountSttingsDeleteOwnProfile() throws InterruptedException, IOException{
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject AccontPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
			AccontPermission.Managelink_RegisteredUsers,
			AccontPermission.ChangePermission_RegisteredUser,
			AccontPermission.deletOwnProfile_checkbox, false);
			
			Frontendlogin.loginToApp(username, password);

           Thread.sleep(3000);
			
           profilepage();
			
		 Assert.assertFalse(verifyPresenceOfElement(By.id("deleteAccountDialog")));	
			Thread.sleep(5000);
		
		 Frontendlogin.logoutFromApp();
			Thread.sleep(3000);
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
		// Enable  delete own profile  settings from back end and check account account functionality after  click on No option  for registred Users
		@Test(priority=1)
		public void verifyAccountsettings_Enable_DeleteAccountNO_ONProfilegpage() throws InterruptedException, IOException{
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
			userPermission.Managelink_RegisteredUsers,
			userPermission.ChangePermission_RegisteredUser,
			userPermission.deletOwnProfile_checkbox, true);
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
			
			profilepage();
			Thread.sleep(5000);
			FrontPage_Settings_EditDetails.VerifyAccountDeletNo();
			Thread.sleep(5000);
		
				
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		//Enable  delete own profile settings from back end and check  Delete account  functionality For registered user 
	  	@Test(priority=2)
		public void verifyAccountsettings_Enable_DeleteAccountYES_ONProfilegpage() throws InterruptedException, IOException{
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
			userPermission.Managelink_RegisteredUsers,
			userPermission.ChangePermission_RegisteredUser,
			userPermission.deletOwnProfile_checkbox, true);
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
			
			
			FrontPage_Settings_EditDetails.VerifyAccountDeletYes();
			  
			Accountsettings.Textfield_Passwordpopup.sendKeys(password);
			
		     Accountsettings.ContinueButton.click();
		     Thread.sleep(5000);
		     Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username+"']")));
				
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
			public static  void profilepage() throws InterruptedException
			{
				AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
				SettingsEdit.Signoutbuttondropdown.click();
			    Thread.sleep(5000);
			    SettingsEdit.Profile.click();

			}
		}
			