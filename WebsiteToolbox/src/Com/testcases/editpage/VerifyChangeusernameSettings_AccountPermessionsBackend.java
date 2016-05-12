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
	public class VerifyChangeusernameSettings_AccountPermessionsBackend extends baseClass
	{
		 String username, password,Editusername,Editpassword,EditEmail;
			public VerifyChangeusernameSettings_AccountPermessionsBackend() throws IOException{

				username = readExcel("Editpage").getRow(15).getCell(1).getStringCellValue();
				password = readExcel("Editpage").getRow(15).getCell(2).getStringCellValue();
				Editusername = readExcel("Editpage").getRow(15).getCell(3).getStringCellValue();
			    Editpassword = readExcel("Editpage").getRow(15).getCell(4).getStringCellValue();
			    EditEmail = readExcel("Editpage").getRow(15).getCell(5).getStringCellValue();

			}
		
		@Test(priority=0)
		public void VerifyAccountsettings_DisableChangeusername_AccountSttings() throws InterruptedException, IOException{
			@SuppressWarnings("unused")
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject AccontPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					AccontPermission.Managelink_RegisteredUsers,
					AccontPermission.ChangePermission_RegisteredUser,
					AccontPermission.ChangeUsername_checkbox, false);
			
			Frontendlogin.loginToApp(username, password);

            Thread.sleep(3000);
		    Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			Thread.sleep(5000);
			Assert.assertFalse(verifyPresenceOfElement(By.xpath(".//*[@id='usrName']/a[2]/small")));	
			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
		
		@Test(priority=1)
		public void VerifyAccountsettings_EnableChangeusername_AccountSttings() throws InterruptedException, IOException{
			@SuppressWarnings("unused")
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
			userPermission.Managelink_RegisteredUsers,
			userPermission.ChangePermission_RegisteredUser,
			userPermission.ChangeUsername_checkbox, true);
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
			
			Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			Thread.sleep(5000);
			FrontPage_Settings_EditDetails.AccountSettingspage(Editusername, Editpassword, EditEmail);
			
			
			Thread.sleep(3000);
			driver.navigate().to((String) Credential.get("FrontendURL"));

			
		}
		
}
