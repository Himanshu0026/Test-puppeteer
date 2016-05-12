package Com.testcases.UserPermission;

import java.io.IOException;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Betahomepageobjects;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.Topic.FrontendaddNewTopic;
import Com.testcases.Topic.PerformActionagainstTopic;

public class VerifyDeleteOwnPost_PostTopicPermissions extends baseClass {
	
	String username, password, categoryName, topicName, message;
	int rowNum;
	
	public VerifyDeleteOwnPost_PostTopicPermissions() throws IOException{
		rowNum=25;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName=readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		topicName=readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message=readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();

	}
	

	@Test(priority=0)
	public void VerifyDeleteOwnPosts_DisableDeleteOwnPostsforRegisteredUser() throws InterruptedException, IOException{

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.deleteOwnPost_checkbox, false);
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName);
		driver.findElement(By.xpath("//a/span[contains(text(),'" + topicName + "')]")).click();
		Thread.sleep(3000);
		
		WebElement UserMessage=driver.findElement(By.xpath("//a[text()='"+username+"']/following::span[contains(text(),'"+message+"')]"));		
		String UserMessage_id=UserMessage.getAttribute("id"); //This return id of UserMessage and then split it and get replied message number
		String[] UserMessageNo=UserMessage_id.split("_");

		WebElement dropdown=driver.findElement(By.xpath("//a[@id='posttoggle_"+UserMessageNo[2]+"']/i"));
		
		Actions action=new Actions(driver);
		action.moveToElement(UserMessage).build().perform();
		dropdown.click();
		Thread.sleep(2000);

		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//a[contains(@id,'delete_post_request') and contains(@data-pid,'"+UserMessageNo[2]+"')]")));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	@Test(priority=1)
	public void VerifyDeleteOwnPosts_EnableDEleteOwnPostsforRegisteredUser() throws InterruptedException, IOException{
		
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.deleteOwnPost_checkbox, true);
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName);
		
		String messageId = PerformActionagainstTopic.PerformActionOnRepliedMessage(topicName, username, message, "Delete");
		Thread.sleep(3000);
		Alert alert=driver.switchTo().alert();
		alert.accept();
		Thread.sleep(5000);
		Assert.assertFalse(verifyPresenceOfElement(By.id("post_message_"+messageId)));
		
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
