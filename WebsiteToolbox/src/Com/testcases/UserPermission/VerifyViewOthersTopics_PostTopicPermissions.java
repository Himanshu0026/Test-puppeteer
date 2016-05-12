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

public class VerifyViewOthersTopics_PostTopicPermissions extends baseClass {
	
	String username, password, NoTopicMessage, categoryName, topicName;
	int rowNum;

	public VerifyViewOthersTopics_PostTopicPermissions() throws IOException {
		rowNum=21;
		NoTopicMessage = readExcel("Topic").getRow(rowNum).getCell(7)
				.getStringCellValue();

	}
	
	@Test(priority=0)
	//Disabling View Others Topic checkbox from backend for registered user
	public void disableViewOthersTopic_fromBackend() throws InterruptedException, IOException{
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.viewOthersTopic_checkbox, false);
	}

	@Test(priority=1)
	//(dependsOnMethods = {"disableViewOthersTopic_fromBackend"})
	//Verify to view other's topic in category's topic list after disabling View Others Topic checkbox from backend
	public void VerifyViewOthersTopicsincategory_disabledViewOthersTopicsonBackendForRegisteredUser()
			throws InterruptedException, IOException {
		rowNum=21;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName= readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		CategoryTopicandPostPageObject viewTopic = new CategoryTopicandPostPageObject();
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.selectCategory(categoryName);
		Assert.assertTrue(viewTopic.MessageforNoTopicDisplay.getText().contains(
				NoTopicMessage));
		topic.backArrowOnTopic.click();
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	
	@Test(priority=2)
	//(dependsOnMethods = {"disableViewOthersTopic_fromBackend"})
	//Verify to view other's topic in topic list after disabling View Other's Topic checkbox from backend
	public void VerifyViewOthersTopicsoinTopicList_disabledViewOthersTopicsonBackendForRegisteredUser()
			throws InterruptedException, IOException {
		rowNum=22;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.selectCategory(categoryName);
		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//a/span[contains(text(),'" + topicName + "')]")));
		
		topic.backArrowOnTopic.click();
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	
	@Test(priority=3)
	//Verify to view other's topic in topic list after enabling View Others Topic checkbox from backend for registered user
	public void VerifyViewOthersTopics_enabledViewOthersTopicsonBackendforRegistered() throws InterruptedException, IOException{
		rowNum=22;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.viewOthersTopic_checkbox, true);
		
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		Frontendlogin.loginToApp(username, password);

		FrontendaddNewTopic.selectCategory(categoryName);
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//a/span[contains(text(),'" + topicName + "')]")));
		
		topic.backArrowOnTopic.click();
		Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test(priority=4)
	//Verify to view other's topic in topic list after disabling View Others Topic checkbox from backend for unregistered user
	public void VerifyViewOthersTopics_disabledViewOthersTopicsonBackendforUnRegistered()
			throws InterruptedException, IOException {
		rowNum=21;
		categoryName= readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.viewOthersTopic_checkbox, false);
		CategoryTopicandPostPageObject viewTopic = new CategoryTopicandPostPageObject();
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();

		FrontendaddNewTopic.selectCategory(categoryName);
		Assert.assertTrue(viewTopic.MessageforNoTopicDisplay.getText().contains(
				NoTopicMessage));
		topic.backArrowOnTopic.click();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	
	@Test(priority=5)
	//Enabling View Others Topic checkbox from backend for unregistered user
	public void enabledViewOthersTopicsonBackendforUnRegistered()
			throws InterruptedException, IOException {

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();

		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelinks_Unregistered,
				userPermission.ChangePermission_Unregistered,
				userPermission.viewOthersTopic_checkbox, true);


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
