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
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.CategoryTopicandPostPageObject;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.Topic.FrontendaddNewTopic;

public class VerifyViewTopicContent_PostTopicPermissions extends baseClass {

	String username, password, permissionMessage, categoryName, topicName;
	int rowNum;

	public VerifyViewTopicContent_PostTopicPermissions() throws IOException {
		rowNum=20;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(4)
				.getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3)
				.getStringCellValue();
		permissionMessage = readExcel("Topic").getRow(rowNum).getCell(7)
				.getStringCellValue();

		@SuppressWarnings("unused")
		VerifyStartTopic_CategoryPermissions credential = new VerifyStartTopic_CategoryPermissions();

	}

	@Test
	public void VerifyViewTopicContentRegistered_disabledViewTopicContentonBackend()
			throws InterruptedException, IOException {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		CategoryTopicandPostPageObject postattachment = new CategoryTopicandPostPageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.viewTopicContent_checkbox, false);
		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.selectCategory(categoryName);

		driver.findElement(
				By.xpath("//a/span[contains(text(),'" + topicName + "')]"))
				.click();
		Thread.sleep(3000);

		Assert.assertTrue(postattachment.PermissionMessage.getText().contains(
				permissionMessage));
		postattachment.Backlink.click();
		Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test
	public void VerifyViewTopicContentforREgisteredUser_enabledViewTopicContentonBackend()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.viewTopicContent_checkbox, true);
		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.selectCategory(categoryName);

		driver.findElement(
				By.xpath("//a/span[contains(text(),'" + topicName + "')]"))
				.click();
		Thread.sleep(3000);

		Assert.assertTrue(driver.getTitle().contains(topicName));
		topic.backArrowOnPost.click();
		topic.backArrowOnTopic.click();
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test
	public void VerifyViewTopicContentforUnregistered_disabledViewTopicContentonBackend()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();

		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.viewTopicContent_checkbox, false);

		FrontendaddNewTopic.selectCategory(categoryName);

		driver.findElement(
				By.xpath("//a/span[contains(text(),'" + topicName + "')]"))
				.click();
		Thread.sleep(3000);

		Assert.assertTrue(driver.getTitle().contains("Login"));

		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test
	public void VerifyViewTopicContentforunRegisteredUser_enabledViewTopicContentonBackend()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.viewTopicContent_checkbox, true);

		FrontendaddNewTopic.selectCategory(categoryName);

		driver.findElement(
				By.xpath("//a/span[contains(text(),'" + topicName + "')]"))
				.click();
		Thread.sleep(3000);

		Assert.assertTrue(driver.getTitle().contains(topicName));
		topic.backArrowOnPost.click();
		topic.backArrowOnTopic.click();
		Thread.sleep(5000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

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
