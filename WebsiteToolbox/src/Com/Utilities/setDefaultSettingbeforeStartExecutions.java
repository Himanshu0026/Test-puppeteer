package Com.Utilities;

import java.io.IOException;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.Test;

import Com.backendpages.BackendSettingspageObjects;
import Com.backendpages.Backendusersdropdownobjects;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.testcases.Login.Backendlogin;

public class setDefaultSettingbeforeStartExecutions extends baseClass{
	String portalUser, portalPwd, portalUpdationMessage;
	
	public setDefaultSettingbeforeStartExecutions() throws IOException{
		portalUser = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		portalPwd = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		portalUpdationMessage = readExcel("BackendLogin").getRow(1).getCell(3).getStringCellValue();
	}
	
	@Test
	public void loginToBackend() throws InterruptedException{
		switchtab();
		Backendlogin.LoginToAPP(portalUser, portalPwd);
		
	}
	
	@Test(dependsOnMethods = { "loginToBackend" })
	//method for disable force Guest Login settings from backend
	public static void DisableForceGuestLogin() throws InterruptedException{

		BackendSettingspageObjects backend=new BackendSettingspageObjects();
		backend.settings.click();
		Thread.sleep(2000);
		backend.SecuritySubMenu.click();
		Thread.sleep(3000);
		
		EnableorDisable_Checkbox(backend.ForceGuestLogin_checkbox, false);
		Thread.sleep(3000);
		backend.SaveButton.click();
		Thread.sleep(3000);
		
	}
	
	@Test(dependsOnMethods = { "loginToBackend" })
	//method for enable attachment checkbox from file Uploading setting
	public void enableAttachment_settings() throws InterruptedException{
		
		BackendSettingspageObjects backend=new BackendSettingspageObjects();
		backend.settings.click();
		Thread.sleep(2000);
		backend.fileUploadingSubmenu.click();

		EnableorDisable_Checkbox(backend.Attachments_checkbox, true);
		Thread.sleep(2000);
		backend.SaveButton.click();
		Thread.sleep(3000);
	}
	
	@Test(dependsOnMethods = { "loginToBackend" })
	//method for enable Social Sharing checkbox from General Settings
	public void enableSocialSharingSetting() throws InterruptedException{
		BackendSettingspageObjects backend=new BackendSettingspageObjects();
		backend.settings.click();
		Thread.sleep(2000);
		backend.GeneralSubMenu.click();
		
		EnableorDisable_Checkbox(backend.SocialSharing, true);
		Thread.sleep(2000);
		backend.SaveButton.click();
		Thread.sleep(3000);
		
	}
	
	@Test(dependsOnMethods = { "loginToBackend" })
	//method for enable user permission for registered user from group permissions
	public void enablePermissionForRegisteredUser() throws InterruptedException{
		UsersGroupPermissionspageObject permission = new UsersGroupPermissionspageObject();
		Backendusersdropdownobjects category = new Backendusersdropdownobjects();
		Actions action = new Actions(driver);
		category.Users.click();
		action.moveToElement(category.Groupspermissions).click();
		action.build().perform();
		Thread.sleep(3000);
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollBy(0,250)", "");
		Thread.sleep(2000);
		clickElement(permission.Managelink_RegisteredUsers);
		Thread.sleep(3000);
		action.moveToElement(permission.ChangePermission_RegisteredUser).click();
		action.build().perform();
		Thread.sleep(5000);

		//enable Category Permissions
		EnableorDisable_Checkbox(permission.ViewCategory_checkbox, true);
		EnableorDisable_Checkbox(permission.StartTopic_checkbox, true);
		EnableorDisable_Checkbox(permission.ReplyTopic_checkbox, true);
		EnableorDisable_Checkbox(permission.uploadAttachment_checkbox, true);
		EnableorDisable_Checkbox(permission.viewAttachment_checkbox, true);
		Thread.sleep(2000);
		executor.executeScript("window.scrollBy(0,250)", "");
		//enable Post / Topic permissions
		EnableorDisable_Checkbox(permission.viewTopicContent_checkbox, true);
		EnableorDisable_Checkbox(permission.viewOthersTopic_checkbox, true);
		EnableorDisable_Checkbox(permission.replyOwnTopic_checkbox, true);
		EnableorDisable_Checkbox(permission.replyOwnTopic_checkbox, true);
		EnableorDisable_Checkbox(permission.editOwnPost_checkbox, true);
		EnableorDisable_Checkbox(permission.deleteOwnPost_checkbox, true);
		EnableorDisable_Checkbox(permission.deleteOwnTopic_checkbox, true);
		EnableorDisable_Checkbox(permission.moveOwnTopic_checkbox, true);
		Thread.sleep(2000);
		
		//enable Account Permissions
		EnableorDisable_Checkbox(permission.EditOwnProfile_checkbox, true);
		EnableorDisable_Checkbox(permission.deletOwnProfile_checkbox, true);
		EnableorDisable_Checkbox(permission.ChangeUsername_checkbox, true);
		EnableorDisable_Checkbox(permission.CustomTitle_checkbox, true);
		Thread.sleep(2000);
		
		permission.Savebutton.click();
		Assert.assertTrue(permission.updationMessage.getText().contains(portalUpdationMessage));
	
	}
	
	@AfterClass
	public void logoutFromBackendApp() throws InterruptedException{
		
		Backendlogin.logoutFromApp();
		switchtab();
	}
	
	
	
	

}
