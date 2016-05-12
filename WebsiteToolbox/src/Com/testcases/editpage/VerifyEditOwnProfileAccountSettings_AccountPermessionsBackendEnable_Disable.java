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

	@SuppressWarnings("deprecation")
	public class VerifyEditOwnProfileAccountSettings_AccountPermessionsBackendEnable_Disable extends baseClass
	{
		 String username, password,Editusername,Editpassword,EditEmail;
			public VerifyEditOwnProfileAccountSettings_AccountPermessionsBackendEnable_Disable() throws IOException{

				username = readExcel("Editpage").getRow(17).getCell(1).getStringCellValue();
				password = readExcel("Editpage").getRow(17).getCell(2).getStringCellValue();
				Editusername = readExcel("Editpage").getRow(17).getCell(3).getStringCellValue();
			    Editpassword = readExcel("Editpage").getRow(17).getCell(4).getStringCellValue();
			    EditEmail = readExcel("Editpage").getRow(17).getCell(5).getStringCellValue();

			}
		//VerifyEditOwnProfileAccountSettings_AccountPermessionsBackenddisable_Disable
		@Test(priority=0)
		public void VerifyAccountsettings_Disable_AccountSttingsEditOwnProfile() throws InterruptedException, IOException{
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject AccontPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
			AccontPermission.Managelink_RegisteredUsers,
			AccontPermission.ChangePermission_RegisteredUser,
			AccontPermission.EditOwnProfile_checkbox, false);
			
			Frontendlogin.loginToApp(username, password);

              Accountsettings.Signoutbuttondropdown.click();
             Accountsettings.Settings.click();
			Thread.sleep(5000);
			
		 Assert.assertFalse(verifyPresenceOfElement(By.xpath(".//*[@id='usrName']/a[2]/small")));	
			Thread.sleep(5000);
		 Assert.assertTrue(Accountsettings.errormessaageAccountsettings.getText().contains("Sorry! You don't have permission to perform this action"));
		 Accountsettings.Bakbutton.click();
			Thread.sleep(5000);
		 Frontendlogin.logoutFromApp();
			Thread.sleep(3000);
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
		//VerifyEditOwnProfileAccountSettings_AccountPermessionsBackendEnable_Disable
		@Test(priority=1)
		public void VerifyAccountsettings_Enable_AccountSttingsEditOwnProfile() throws InterruptedException, IOException{
			AccountSettingsPageObjects Accountsettings=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
			userPermission.Managelink_RegisteredUsers,
			userPermission.ChangePermission_RegisteredUser,
			userPermission.EditOwnProfile_checkbox, true);
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
			
			Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			Thread.sleep(5000);
			FrontPage_Settings_EditDetails.AccountSettingspage(Editusername, Editpassword, EditEmail);
			Thread.sleep(5000);
			
			driver.navigate().to((String) Credential.get("FrontendURL"));

			
		}
		
}
