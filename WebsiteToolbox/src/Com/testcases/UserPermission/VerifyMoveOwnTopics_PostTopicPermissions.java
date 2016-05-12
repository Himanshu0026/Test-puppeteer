package Com.testcases.UserPermission;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.frontendpages.CategoryTopicandPostPageObject;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.Topic.FrontendaddNewTopic;

public class VerifyMoveOwnTopics_PostTopicPermissions extends baseClass {
	
	String username, password, categoryName1, topicName,categoryName2, message;
	int rowNum;
	
	public VerifyMoveOwnTopics_PostTopicPermissions() throws IOException{
		rowNum=33;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName1=readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		categoryName2=readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName=readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();

	}
	
	
	@Test(priority=0)
	//this methods to verify Move topic option after disabling Move Own Topic checkbox from group permission
	public void VerifyMoveTopicfromTopiclists_DisableMoveOwnTopicforRegisteredUser() throws InterruptedException, IOException{
		
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.moveOwnTopic_checkbox, false);
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName1);
		
		try{WebElement topic_href = driver.findElement(By.xpath("//*[text()='"+topicName+"']/parent::a"));
		checkCheckboxagainstTopic_inTopiclist(topic_href);
		}catch(Exception e){
			e.getMessage();
			System.out.println("Checkbox is not available --> Delete Own Topic and Move Own Topic both are disabled from backend");
		}
		
		
		Assert.assertFalse(verifyPresenceOfElement(By.id("move")));		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
		
		
	}
	
	@Test(priority=1)
	//this methods to verify Move topic from one category to another from topic list
	public void VerifyMoveTopicfromTopiclists_EnableMoveOwnTopicforRegisteredUser() throws InterruptedException, IOException{
		CategoryTopicandPostPageObject movetopic=new CategoryTopicandPostPageObject();
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.moveOwnTopic_checkbox, true);
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName1);
		
		WebElement topic_href = driver.findElement(By.xpath("//*[text()='"+topicName+"']/parent::a"));
		checkCheckboxagainstTopic_inTopiclist(topic_href);
		
		driver.findElement(By.id("move")).click();
		selectElementfromDropdown(movetopic.moveTopicdropdown, categoryName2);
		movetopic.moveTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[text()='"+topicName+"']")));
		
		FrontendaddNewTopic.selectCategory(categoryName2);
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[text()='"+topicName+"']")));		
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	
	@Test(priority=2)
	public void moveTopicfromProfilepageandVerifyit() throws InterruptedException, IOException{
		AccountSettingsPageObjects moveTopic = new AccountSettingsPageObjects();
		CategoryTopicandPostPageObject category=new CategoryTopicandPostPageObject();
		rowNum=34;
		categoryName1=readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		topicName=readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		Frontendlogin.loginToApp(username, password);
		
		moveTopic.userAccountPanel.click();
		moveTopic.Profile.click();
		moveTopic.TopicStarted_tab.click();
		
		JavascriptExecutor executor=(JavascriptExecutor)driver;
		executor.executeScript("window.scrollTo(0, 500)");	
		Actions action = new Actions(driver);
		WebElement TopicInList = driver.findElement(By.xpath("//span[@class='post-body-author']/a[text()='"+topicName+"']"));
		action.moveToElement(TopicInList).build();
		Thread.sleep(3000);
		checkCheckboxagainstTopic_inTopiclist(TopicInList);
		moveTopic.MoveIcon.click();
		Thread.sleep(2000);
		
		selectElementfromDropdown(category.moveTopicdropdown, categoryName1);
		category.moveTopicbutton.click();
		Thread.sleep(3000);
		
		FrontendaddNewTopic.selectCategory(categoryName1);
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[text()='"+topicName+"']")));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

}
