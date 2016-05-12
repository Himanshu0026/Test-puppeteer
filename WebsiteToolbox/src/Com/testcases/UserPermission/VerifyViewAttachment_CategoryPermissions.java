package Com.testcases.UserPermission;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;
import java.io.IOException;
import java.util.Set;

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

public class VerifyViewAttachment_CategoryPermissions extends baseClass {
	
	String username, password;
	String categoryName, topicName, permissionMessage;
	int rowNum=26;
	
	public VerifyViewAttachment_CategoryPermissions() throws IOException{
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName=readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		topicName=readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		permissionMessage=readExcel("Topic").getRow(rowNum).getCell(7).getStringCellValue();		
		
	}
	
	@Test
	public void VerifyViewAttachmentonPost_EnabledViewAttachmentforRegisteredUser() throws InterruptedException, AWTException, IOException{
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		CategoryTopicandPostPageObject postattachment=new CategoryTopicandPostPageObject();
		//update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(userPermission.Managelink_RegisteredUsers, userPermission.ChangePermission_RegisteredUser, userPermission.viewAttachment_checkbox, true);
		Frontendlogin.loginToApp(username, password);
		
		FrontendaddNewTopic.selectCategory(categoryName);
		
		driver.findElement(By.xpath("//a/span[contains(text(),'"+topicName+"')]")).click();
		Thread.sleep(3000);

		clickElement(postattachment.postAttachedFile);
		Robot robot = new Robot();
		Thread.sleep(3000);
		robot.keyPress(KeyEvent.VK_ENTER);
		robot.keyRelease(KeyEvent.VK_ENTER);
		Thread.sleep(5000);
		
		driver.navigate().back();
		Frontendlogin.logoutFromApp();	
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	
	}
	
	@Test
	public void VerifyViewAttachmentonPost_DisabledViewAttachmentforRegisteredUser() throws InterruptedException, IOException{
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		CategoryTopicandPostPageObject postattachment=new CategoryTopicandPostPageObject();
		//update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(userPermission.Managelink_RegisteredUsers, userPermission.ChangePermission_RegisteredUser, userPermission.viewAttachment_checkbox, false);
		Frontendlogin.loginToApp(username, password);
		
		FrontendaddNewTopic.selectCategory(categoryName);
		
		driver.findElement(By.xpath("//a/span[contains(text(),'"+topicName+"')]")).click();
		Thread.sleep(5000);
		clickElement(postattachment.postAttachedFile);
		
		Set<String> tabs= driver.getWindowHandles();
		System.out.println(tabs.size());
		if(tabs.size()>1){
			String parentWindow=driver.getWindowHandle();
			System.out.println(driver.getTitle());
			for(String childwindow:driver.getWindowHandles()){
				driver.switchTo().window(childwindow);
			}
			Assert.assertTrue(postattachment.PermissionMessage.getText().contains(permissionMessage));
			driver.close();
			driver.switchTo().window(parentWindow);
		}else{
		Assert.assertTrue(postattachment.PermissionMessage.getText().contains(permissionMessage));
		postattachment.Backlink.click();}		
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
