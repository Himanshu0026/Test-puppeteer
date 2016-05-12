package Com.testcases.UserPermission;

import java.io.IOException;

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
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.Topic.FrontendaddNewTopic;

public class VerifyDeleteOwnTopic_PostTopicPermissions extends baseClass{
	
	String username, password, categoryName, topicName, message;
	int rowNum=32;
	
	public VerifyDeleteOwnTopic_PostTopicPermissions() throws IOException{

		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();	

	}

	@Test(priority=0)
	public void VerifyDeleteoptionOnOwnTopicinTopiclist_DisableEditOwnTopicforRegisteredUser() throws InterruptedException, IOException{
		topicName = readExcel("Topic").getRow(31).getCell(3).getStringCellValue();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.deleteOwnTopic_checkbox, false);
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName);
		String topicurl=driver.findElement(By.xpath("//*[contains(text(),'"+topicName+"')]/parent::a")).getAttribute("href");
		String[] topicUrl_id=topicurl.split("\\?(?!\\?)");
		String[] topic_id=topicUrl_id[0].split("-");
		driver.findElement(By.xpath("//input[@value='"+topic_id[topic_id.length-1]+"']")).click();
		Thread.sleep(3000);
		
		Assert.assertFalse(verifyPresenceOfElement(By.id("delete")));	
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	
	@Test(priority=1)
	public void VerifyDeleteoptionOnOwnTopicinTopiclist_EnableEditOwnTopicforRegisteredUser() throws InterruptedException, IOException{
		topicName = readExcel("Topic").getRow(31).getCell(3).getStringCellValue();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.deleteOwnTopic_checkbox, true);
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName);
		
		WebElement topic_href = driver.findElement(By.xpath("//*[text()='"+topicName+"']/parent::a"));
		checkCheckboxagainstTopic_inTopiclist(topic_href);
		
		driver.findElement(By.id("delete")).click();
		driver.switchTo().alert().accept();
		
		Thread.sleep(5000);
		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[text()='"+topicName+"']")));	
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	
	}
	
	@Test(priority=2)
	public void VerifyDeleteoptionOnOwnTopiconPostpage_DisableDeleteOwnTopicforRegisteredUser() throws InterruptedException, IOException{
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.deleteOwnTopic_checkbox, false);
		
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName);
		driver.findElement(By.xpath("//*[text()='"+topicName+"']")).click();
		Thread.sleep(3000);
		
		String FirstPost=topic.firstPostinList.getAttribute("id");
		String[] FirstPost_id=FirstPost.split("_");
		WebElement dropdown=driver.findElement(By.xpath("//a[@id='posttoggle_"+FirstPost_id[2]+"']/i"));
		
		Actions action=new Actions(driver);
		action.moveToElement(topic.firstPostinList).build().perform();
		dropdown.click();
		Thread.sleep(2000);

		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//a[contains(@id,'delete') and contains(@data-pid,'"+FirstPost_id[2]+"')]")));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	
	}
	
	
	@Test(priority=3)
	public void VerifyDeleteoptionOnOwnTopiconPostpage_EnableDeleteOwnTopicforRegisteredUser() throws InterruptedException, IOException{
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.deleteOwnTopic_checkbox, true);
		
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName);
		Thread.sleep(3000);
		driver.findElement(By.xpath("//*[text()='"+topicName+"']")).click();
		Thread.sleep(3000);
				
		String FirstPost=topic.firstPostinList.getAttribute("id");
		String[] FirstPost_id=FirstPost.split("_");
		WebElement dropdown=driver.findElement(By.xpath("//a[@id='posttoggle_"+FirstPost_id[2]+"']/i"));
		
		Actions action=new Actions(driver);
		action.moveToElement(topic.firstPostinList).build().perform();
		dropdown.click();
		Thread.sleep(2000);
		driver.findElement(By.xpath("//a[contains(@id,'delete') and contains(@data-pid,'"+FirstPost_id[2]+"')]")).click();
		Thread.sleep(2000);
		driver.switchTo().alert().accept();
		Thread.sleep(3000);
	
		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[text()='"+topicName+"']")));	
		
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
