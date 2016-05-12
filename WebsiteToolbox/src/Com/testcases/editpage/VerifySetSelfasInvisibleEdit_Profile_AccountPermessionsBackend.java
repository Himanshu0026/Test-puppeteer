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
	public class VerifySetSelfasInvisibleEdit_Profile_AccountPermessionsBackend extends baseClass
	{
		 String username, password,Editusername,Editpassword,EditEmail;
			public VerifySetSelfasInvisibleEdit_Profile_AccountPermessionsBackend() throws IOException{

				username = readExcel("Editpage").getRow(30).getCell(1).getStringCellValue();
				password = readExcel("Editpage").getRow(30).getCell(2).getStringCellValue();
				
			    }
		
		@Test(priority=0)
		public void VerifySignature_Disable_EditProfilepage() throws InterruptedException, IOException{
			AccountSettingsPageObjects Profilepage=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject AccontPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					AccontPermission.Managelink_RegisteredUsers,
					AccontPermission.ChangePermission_RegisteredUser,
					AccontPermission.Selfsetaninvisible_checkbox, false);
			
			Frontendlogin.loginToApp(username, password);

            Thread.sleep(3000);
            Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			Assert.assertFalse(verifyPresenceOfElement(By.id("INVS")));	
			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
		
		    @Test(priority=1)
		    public void VerifySignature_Enable_EditProfilepage() throws InterruptedException, IOException{
			AccountSettingsPageObjects Profilepage=new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
			// Account  user permission by checking Account Settings  for registered user
			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
			userPermission.Managelink_RegisteredUsers,
			userPermission.ChangePermission_RegisteredUser,
			userPermission.Selfsetaninvisible_checkbox, true);
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
		    Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			 Thread.sleep(5000);
			 EnableorDisable_Checkbox(Profilepage.InvisibleModeCheckBox, true); 
		  Thread.sleep(5000);

		   Profilepage.UpdateButton.click();
		    Thread.sleep(5000);
		    Assert.assertTrue(Profilepage.Accountsettingssucessfulmessage.getText().contains("Your preferences have been updated successfully."));
 			
			Thread.sleep(3000);
			driver.navigate().to((String) Credential.get("FrontendURL"));

			
		}
	}
