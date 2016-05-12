package Com.testcases.UserPermission;

import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Betahomepageobjects;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.CategoryTopicandPostPageObject;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.Topic.FrontendaddNewTopic;

public class VerifyViewcategory_CategoryPermissions extends baseClass {
	public String pendingUsers, pendingPwd;	
	String username, password;
	String categoryName, topicName, permissionMessage;
	int rowNum=27;
	
	public VerifyViewcategory_CategoryPermissions() throws IOException{
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName=readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		permissionMessage=readExcel("Topic").getRow(rowNum).getCell(7).getStringCellValue();
		pendingUsers = readExcel("Topic").getRow(rowNum).getCell(9).getStringCellValue();
		pendingPwd = readExcel("Topic").getRow(rowNum).getCell(10).getStringCellValue();
		@SuppressWarnings("unused")
		VerifyStartTopic_CategoryPermissions credential=new VerifyStartTopic_CategoryPermissions();	
		
	}


	@Test(priority = 0)
	public void VerifyPermisiontoViewCategory_disableViewCategoryforRegisteredUser()
			throws InterruptedException, IOException {

		CategoryTopicandPostPageObject category = new CategoryTopicandPostPageObject();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.ViewCategory_checkbox, false);
		
		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.selectCategory(categoryName);

		Assert.assertTrue(category.PermissionMessage.getText().contains(permissionMessage));

		category.Backlink.click();

		Frontendlogin.logoutFromApp();

	}

	@Test(priority = 1)
	public void enableViewCategoryPermissionfromBackend_RegisteredUser()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.ViewCategory_checkbox, true);

	}


	@Test(priority = 2)
	public void VerifyPermisiontoViewCategory_disableViewCategoryforUnRegistered()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.ViewCategory_checkbox, false);

		FrontendaddNewTopic.selectCategory(categoryName);

		Assert.assertTrue(driver.getTitle().contains("Login"));

		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test(priority = 3)
	public void enableViewCategoryPermissionfromBackend_unRegisteredUser()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.ViewCategory_checkbox, true);
	}


	@Test(priority = 4)
	public void VerifyPermisiontoViewCategory_disableViewCategoryforPendingEmailUsers()
			throws InterruptedException, IOException {

		CategoryTopicandPostPageObject category = new CategoryTopicandPostPageObject();
		
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_PendingEmail,
				userPermission.ChangePermission_PendingEmail,
				userPermission.ViewCategory_checkbox, false);
		
		Frontendlogin.loginToApp(pendingUsers, pendingPwd);

		FrontendaddNewTopic.selectCategory(categoryName);

		Assert.assertTrue(category.PermissionMessage.getText().contains(permissionMessage));

		category.Backlink.click();

		Frontendlogin.logoutFromApp();

	}

	@Test(priority = 5)
	public void enableViewCategoryPermissionfromBackend_PendingEmailUsersr()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_PendingEmail,
				userPermission.ChangePermission_PendingEmail,
				userPermission.ViewCategory_checkbox, true);

	}
	
	
	@AfterMethod
	// perform action to reach on Home page after failure any test script
	public static void afterMethod(ITestResult testResult) throws Exception {
		Betahomepageobjects backend= new Betahomepageobjects();
		@SuppressWarnings("unused")
		frontpagelogin frontend= new frontpagelogin();
		if (testResult.getStatus() == ITestResult.FAILURE) {
			driver.navigate().refresh();
			if(driver.getTitle().contains(forumTitle)){
			try{driver.findElement(By.id("private_message_notification")).isDisplayed();
			Frontendlogin.logoutFromApp();
			}catch(Exception e){
				e.getMessage();}
			driver.navigate().to((String) Credential.get("FrontendURL"));}
			if(driver.getTitle().contains("Website Toolbox")){
				try{if(backend.userAccount.isDisplayed()){
				Frontendlogin.logoutFromApp();
					}
				}catch(Exception e){
					e.getMessage();
				}
				driver.navigate().to((String) Credential.get("BackendURL"));
				switchtab();
			}	
		}
		
	}

}
