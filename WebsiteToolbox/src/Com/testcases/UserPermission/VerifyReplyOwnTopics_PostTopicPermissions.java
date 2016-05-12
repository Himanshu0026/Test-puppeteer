package Com.testcases.UserPermission;

import java.io.IOException;

import junit.framework.Assert;

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
import Com.testcases.Topic.PerformActionagainstTopic;

@SuppressWarnings("deprecation")
public class VerifyReplyOwnTopics_PostTopicPermissions extends baseClass{
	String username, password, NoTopicMessage, categoryName, topicName, message;
	int rowNum;
	
	public VerifyReplyOwnTopics_PostTopicPermissions() throws IOException{
		rowNum=23;

		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName=readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		topicName=readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message=readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();

	}
	
	@Test(priority=0)
	public void VerifyReplyOwnTopics_DisableReplyOwnTopicforRegisteredUser() throws InterruptedException, IOException{
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.replyOwnTopic_checkbox, false);
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName);
		driver.findElement(By.xpath("//a/span[contains(text(),'" + topicName + "')]")).click();
		
		Thread.sleep(3000);
		Assert.assertFalse(verifyPresenceOfElement(newTopic.ReplyaPostbutton_id));
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	@Test(priority=1)
	public void VerifyReplyOwnTopics_EnableReplyOwnTopicforRegisteredUser() throws InterruptedException, IOException{
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.replyOwnTopic_checkbox, true);
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		PerformActionagainstTopic.enterMessage(categoryName, topicName, message);
		
		newTopic.Replied_Postbutton.click();
		Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
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
