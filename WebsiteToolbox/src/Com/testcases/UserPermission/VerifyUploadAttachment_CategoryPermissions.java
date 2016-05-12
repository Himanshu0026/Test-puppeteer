package Com.testcases.UserPermission;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
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

public class VerifyUploadAttachment_CategoryPermissions extends baseClass {
	String username, password, filePath, picturePath;
	int rowNum=30;

	public VerifyUploadAttachment_CategoryPermissions() throws IOException {
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		filePath = readExcel("Topic").getRow(rowNum).getCell(2).getStringCellValue();
		picturePath = readExcel("Topic").getRow(rowNum).getCell(2).getStringCellValue();
		@SuppressWarnings("unused")
		VerifyStartTopic_CategoryPermissions credential = new VerifyStartTopic_CategoryPermissions();

	}

	//@Test(priority = 1)
	public void VerifyUploadAttachmentonAddNewTopic_DisabledUploadAttachmentforRegisteredUsers()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		// update user permission by un-checking Upload Attachment checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.uploadAttachment_checkbox, false);

		// Verify New Topic page on frontend for Registered Users
		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.gotoNewTopicpage();

		// Verify presence of attach file icon on the page
		Assert.assertFalse(verifyPresenceOfElement(topic.Attachfilebutton_xpath));
		// Verify presence of insert picture icon on the page
		Assert.assertFalse(verifyPresenceOfElement(topic.InsertPhotoIcon_id));

		Frontendlogin.logoutFromApp();
		Thread.sleep(10000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test(priority=2)
	public void VerifyUploadAttachmentonAddNewTopic_EnabledUploadAttachmentforRegisteredUsers()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		// update user permission by checking Upload Attachment checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.uploadAttachment_checkbox, true);

		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		// Verify presence of attach file icon on the page
		Assert.assertTrue(verifyPresenceOfElement(topic.Attachfilebutton_xpath));
		// Verify presence of insert picture icon on the page
		Assert.assertTrue(verifyPresenceOfElement(topic.InsertPhotoIcon_id));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test(priority=3)
	public void enableReplyTopicPermission_Backend()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();

		// update user permission by checking Start Topic checkbox for
		// registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.ReplyTopic_checkbox, true);

	}

	@Test(priority=4)
	public void VerifyUploadAttachmentonReplyTopic_DisabledUploadAttachmentforRegisteredUsers()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		// update user permission by checking Upload Attachment checkbox for
		// registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.uploadAttachment_checkbox, false);

		Frontendlogin.loginToApp(username, password);
		topic.firstTopicInList.click();

		Actions action=new Actions(driver);
		action.moveToElement(topic.RepliedTextarea).build();
		topic.RepliedTextarea.click();
		action.build().perform();
		Thread.sleep(3000);
		
		// Verify presence of attach file icon on the page
		Assert.assertFalse(verifyPresenceOfElement(topic.Attachfilebutton_xpath));
		// Verify presence of insert picture icon on the page
		Assert.assertFalse(verifyPresenceOfElement(topic.InsertPhotoIcon_id));
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test(priority=5)
	public void VerifyUploadAttachmentonReplyTopic_EnabledUploadAttachmentforRegisteredUsers()
			throws InterruptedException, IOException {
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		// update user permission by checking Upload Attachment checkbox for
		// registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.uploadAttachment_checkbox, true);

		Frontendlogin.loginToApp(username, password);
		topic.firstTopicInList.click();

		Actions action=new Actions(driver);
		action.moveToElement(topic.RepliedTextarea).build();
		topic.RepliedTextarea.click();
		action.build().perform();
		Thread.sleep(3000);
		
		// Verify presence of attach file icon on the page
		Assert.assertTrue(verifyPresenceOfElement(topic.Attachfilebutton_xpath));
		// Verify presence of insert picture icon on the page
		Assert.assertTrue(verifyPresenceOfElement(topic.InsertPhotoIcon_id));
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
