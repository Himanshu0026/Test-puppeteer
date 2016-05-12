package Com.testcases.UserPermission;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Backendusersdropdownobjects;
import Com.backendpages.Betahomepageobjects;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.CategoryTopicandPostPageObject;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.Topic.FrontendaddNewTopic;

public class VerifyStartTopic_CategoryPermissions extends baseClass {

	String username, password, pendingUsers, pendingPwd;
	String categoryName, message, subject, permissionMessage;
	int rowNum=28;
	
	public VerifyStartTopic_CategoryPermissions() throws IOException{
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		subject = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		permissionMessage = readExcel("Topic").getRow(rowNum).getCell(7).getStringCellValue();
		pendingUsers = readExcel("Topic").getRow(rowNum).getCell(9).getStringCellValue();
		pendingPwd = readExcel("Topic").getRow(rowNum).getCell(10).getStringCellValue();
		
		
	}

	@Test(priority = 0)
	// Verify New Topic page on Frontend for Registered users after disabeling Start Topic User Permission from Backend
	public void VerifyPermisionforStartTopic_disableStartTopicforRegisteredUsers()
			throws InterruptedException, IOException {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();

		// un-check the checkbox "Start Topic" User Permission for Registered user from backend
		ChangeUsersGroupPermissions(userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.StartTopic_checkbox, false);

		// Verify New Topic page on frontend for Registered Users
		CategoryTopicandPostPageObject category = new CategoryTopicandPostPageObject();

		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.gotoNewTopicpage();

		Assert.assertTrue(category.PermissionMessage.getText().contains(permissionMessage));

		category.Backlink.click();

		Frontendlogin.logoutFromApp();

	}

	@Test(priority = 1)
	// Verify New Topic page on Frontend for Registered users after enabeling Start Topic User Permission from Backend
	public void VerifyPermisionforStartTopic_enabledStartTopicforRegisteredUsers()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();

		// Enable checkbox for "Start Topic" User Permission for Registered user from backend
		ChangeUsersGroupPermissions(userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.StartTopic_checkbox, true);

		// Verify New Topic page on frontend and submit new Topic for REgistered users
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();

		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.gotoNewTopicpage();

		Assert.assertTrue(driver.getTitle().contains("New Topic"));

		FrontendaddNewTopic.enterSubjectnMessage(subject, message, categoryName);
		Thread.sleep(3000);
		newTopic.postNewTopicbutton.click();
		Thread.sleep(3000);

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test(priority = 2)
	// Verify New Topic page on Frontend for un-registered users after enabeling Start Topic User Permission from Backend
	public void VerifyPermisiononFrontend_enabledStartTopicforUnRegisteredfromBackend()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();

		// Check the Checkbox for Start Topic User Permission for Un-Registered User from backend
		ChangeUsersGroupPermissions(userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.StartTopic_checkbox, true);

		// Verify New Topic page on Frontend for un-registered users
		FrontendaddNewTopic.gotoNewTopicpage();

		Assert.assertTrue(driver.getTitle().contains("New Topic"));

		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test(priority = 3)
	// Verify Start Topic User Permission on Frontend for un-registered users after enabeling Start Topic User Permission from Backend
	public void VerifyPermisionforStartTopic_disableViewCategoryforUnRegistered()
			throws InterruptedException, IOException {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();

		// Un-check the Checkbox for Start Topic User Permiss_ion for Un-Registered User from backend
		ChangeUsersGroupPermissions(userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.StartTopic_checkbox, false);

		// Verify Add New Topic Permission on Frontend for un-registered users
		FrontendaddNewTopic.gotoNewTopicpage();

		Assert.assertTrue(driver.getTitle().contains("Login"));

		driver.navigate().to((String) Credential.get("FrontendURL"));

	}


	@Test(priority = 4)
	// Verify Start Topic user Permission on Frontend for Pending Email Verification users after disabeling Start Topic User Permission from Backend
	public void VerifyPermisionforStartTopic_disableStartTopicforPendingEmailUsers()
			throws InterruptedException, IOException {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		
		//Un-check the Checkbox for Start Topic User Permission for Pending Email Verification from backend
		ChangeUsersGroupPermissions(userPermission.Managelinks_PendingEmail,
				userPermission.ChangePermission_PendingEmail,
				userPermission.StartTopic_checkbox, false);
		
		//
		CategoryTopicandPostPageObject category = new CategoryTopicandPostPageObject();

		Frontendlogin.loginToApp(pendingUsers, pendingPwd);

		FrontendaddNewTopic.gotoNewTopicpage();

		Assert.assertTrue(category.PermissionMessage.getText().contains(permissionMessage));

		category.Backlink.click();

		Frontendlogin.logoutFromApp();

	}

	
	@Test(priority = 5)
	// Verify Start Topic user Permission on Frontend for Pending Email Verification users after enabeling Start Topic User Permission from Backend
	public void VerifyPermisionforStartTopic_enabledStartTopicforPendingEmailUsers()
			throws InterruptedException, IOException {
		
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		
		//check the Checkbox for Start Topic User Permission for Pending Email Verification from backend
		ChangeUsersGroupPermissions(userPermission.Managelinks_PendingEmail,
				userPermission.ChangePermission_PendingEmail,
				userPermission.StartTopic_checkbox, true);
		

		Frontendlogin.loginToApp(pendingUsers, pendingPwd);

		FrontendaddNewTopic.gotoNewTopicpage();

		Assert.assertTrue(driver.getTitle().contains("New Topic"));

		Frontendlogin.logoutFromApp();
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	
	
	//Methhod to enable/disable any Users Group Permissions
	public static void ChangeUsersGroupPermissions(WebElement Managelink,
			WebElement changePermission, WebElement checkbox, Boolean status)
			throws InterruptedException, IOException {
		
		String portalUser = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		String portalPwd = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		String portalUpdationMessage = readExcel("BackendLogin").getRow(1).getCell(3).getStringCellValue();
		
		Backendusersdropdownobjects category = new Backendusersdropdownobjects();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		switchtab();
		Backendlogin.LoginToAPP(portalUser, portalPwd);
		Actions action = new Actions(driver);
		category.Users.click();
		action.moveToElement(category.Groupspermissions).click();
		action.build().perform();
		Thread.sleep(3000);
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollBy(0,250)", "");
		Thread.sleep(2000);
		clickElement(Managelink);
		Thread.sleep(3000);
		action.moveToElement(changePermission).click();
		action.build().perform();
		Thread.sleep(5000);

		// userPermission.ViewCategory_checkbox.click();
		EnableorDisable_Checkbox(checkbox, status);
		userPermission.Savebutton.click();
		Thread.sleep(3000);

		Assert.assertTrue(userPermission.updationMessage.getText().contains(portalUpdationMessage));
		
		Backendlogin.logoutFromApp();

		switchtab();

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
