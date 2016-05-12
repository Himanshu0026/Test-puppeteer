package Com.testcases.UserPermission;

import java.io.IOException;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Betahomepageobjects;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.Topic.FrontendaddNewTopic;

public class VerifyReplyTopic_CategoryPermissions extends baseClass {

	public String pendingUsers = "website";
	public String pendingPwd = "sangita";

	String username, password, message;
	String categoryName, topicName;
	int rowNum = 29;

	public VerifyReplyTopic_CategoryPermissions() throws IOException {
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		
	}

	@Test(priority = 0)
	// Verify Reply a Post button as an unregistered user on
	// Frontendafterdisabeling Reply Topic User Permission from Backend
	public void VerifyPermisionforReplyTopic_disableReplyTopicforUnregisteredUsers()
			throws InterruptedException, IOException {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		// un-check the checkbox "Reply Topic" User Permission for un-Registered
		// user from backend
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.ReplyTopic_checkbox, false);

		// Verify Reply Topic option against any topic
		driver.findElement(By.xpath("//span[text()='" + topicName + "']"))
				.click();

		Assert.assertFalse(verifyPresenceOfElement(topic.ReplyaPostbutton_id));
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	}

	@Test(priority = 1)
	// Verify New Topic page on Frontend for Registered users after
	// disabelingStart Topic User Permission from Backend
	public void VerifyPermisionforReplyTopic_EnabledReplyTopicforUnregisteredUsers()
			throws Exception {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		// un-check the checkbox "Start Topic" User Permission for Registered
		// user from backend
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.ReplyTopic_checkbox, true);

		// Verify Reply Topic option against any topic
		driver.findElement(By.xpath("//span[text()='" + topicName + "']"))
				.click();
		Assert.assertTrue(verifyPresenceOfElement(topic.ReplyaPostbutton_id));
		topic.ReplyaPostbutton.click();

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	}

	@Test(priority = 2)
	// Verify Reply a Post button on Reply post screen of other user as a
	// registered user on Frontend after disabeling Reply Topic User Permission
	// from Backend
	public void VerifyPermisionforReplyTopic_DisabledReplyTopicforRegisteredUsers()
			throws Exception {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);

		// un-check the checkbox "Start Topic" User Permission for Registered
		// user from backend
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.ReplyTopic_checkbox, false);

		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName);
		// Verify Reply Topic option against other topic which is not owned by logged in users
		driver.findElement(By.xpath("//span[text()='" + topicName + "']"))
				.click();
		Assert.assertFalse(verifyPresenceOfElement(topic.ReplyaPostbutton_id));

		Frontendlogin.logoutFromApp();
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);

	}

	@Test(priority = 3)
	// Verify New Topic page on Frontend for Pending Email Verification users
	// after disabeling Start Topic User Permission from Backend
	public void VerifyPermisionforReplyTopic_EnabledReplyTopicforRegisteredUsers()
			throws Exception {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		// un-check the checkbox "Reply Topic" User Permission for Registered
		// user from backend
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.ReplyTopic_checkbox, true);

		Frontendlogin.loginToApp(username, password);

		// Verify Reply Topic option against any topic
		driver.findElement(By.xpath("//span[text()='" + topicName + "']"))
				.click();
		Assert.assertTrue(verifyPresenceOfElement(topic.ReplyaPostbutton_id));
		topic.ReplyaPostbutton.click();

		clickElement(topic.RepliedTextarea);
		Thread.sleep(3000);

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(message);
		driver.switchTo().defaultContent();
		topic.Replied_Postbutton.click();
		Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test(priority = 4)
	// Verify Reply a Post button on Reply post screen of other user as a registered user on Frontend 
	// after disabeling Reply Topic User Permission from Backend
	public void VerifyPermisionforReplyTopic_DisabledReplyTopicforPendingEmailVerification()
			throws Exception {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		// un-check the checkbox "Start Topic" User Permission for Registered user from backend
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_PendingEmail,
				userPermission.ChangePermission_PendingEmail,
				userPermission.ReplyTopic_checkbox, false);

		Frontendlogin.loginToApp(pendingUsers, pendingPwd);

		// Verify Reply Topic option against other topic which is not owned by
		// logged in users
		driver.findElement(By.xpath("//span[text()='" + topicName + "']"))
				.click();
		Assert.assertFalse(verifyPresenceOfElement(topic.ReplyaPostbutton_id));

		Frontendlogin.logoutFromApp();
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);

	}

	@Test(priority = 5)
	// Verify New Topic page on Frontend for Pending Email Verification users
	// after disabeling Start Topic User Permission from Backend
	public void VerifyPermisionforReplyTopic_EnabledReplyTopicforPendingEmailVerification()
			throws Exception {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		// un-check the checkbox "Start Topic" User Permission for Registered
		// user from backend
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_PendingEmail,
				userPermission.ChangePermission_PendingEmail,
				userPermission.ReplyTopic_checkbox, true);

		Frontendlogin.loginToApp(pendingUsers, pendingPwd);

		// Verify Reply Topic option against any topic
		driver.findElement(By.xpath("//span[text()='" + topicName + "']"))
				.click();

		Assert.assertTrue(verifyPresenceOfElement(topic.ReplyaPostbutton_id));
		topic.ReplyaPostbutton.click();

		clickElement(topic.RepliedTextarea);
		Thread.sleep(3000);
		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(message);
		driver.switchTo().defaultContent();
		topic.Replied_Postbutton.click();
		Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@AfterMethod
	// perform action to reach on Home page after failure any test script
	public static void afterMethod(ITestResult testResult) throws Exception {
		Betahomepageobjects backend = new Betahomepageobjects();
		@SuppressWarnings("unused")
		frontpagelogin frontend = new frontpagelogin();
		if (testResult.getStatus() == ITestResult.FAILURE) {
			driver.navigate().refresh();
			if (driver.getTitle().contains(forumTitle)) {
				try {
					driver.findElement(By.id("private_message_notification"))
							.isDisplayed();
					Frontendlogin.logoutFromApp();
				} catch (Exception e) {
					e.getMessage();
				}
				driver.navigate().to((String) Credential.get("FrontendURL"));
			}
			if (driver.getTitle().contains("Website Toolbox")) {
				try {
					if (backend.userAccount.isDisplayed()) {
						Frontendlogin.logoutFromApp();
					}
				} catch (Exception e) {
					e.getMessage();
				}
				driver.navigate().to((String) Credential.get("BackendURL"));
				switchtab();
			}
		}

	}

}
