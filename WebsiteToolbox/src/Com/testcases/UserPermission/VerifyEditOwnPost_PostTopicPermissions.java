package Com.testcases.UserPermission;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.Topic.FrontendaddNewTopic;
import Com.testcases.Topic.PerformActionagainstTopic;

public class VerifyEditOwnPost_PostTopicPermissions extends baseClass {
	
	String username, password, categoryName, topicName, message, ModyfiedMessage;
	int rowNum;
	
	public VerifyEditOwnPost_PostTopicPermissions() throws IOException{
		rowNum=24;

		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		ModyfiedMessage = readExcel("Topic").getRow(rowNum).getCell(8).getStringCellValue();	
		@SuppressWarnings("unused")
		VerifyStartTopic_CategoryPermissions credential = new VerifyStartTopic_CategoryPermissions();

	}
	
	@Test(priority=0)
	public void VerifyEditoptionOnOwnPost_DisableEditOwnPostforRegisteredUser() throws InterruptedException, IOException{

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.editOwnPost_checkbox, false);
		
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
		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//a[contains(@id,'edit_post_request') and contains(@data-pid,'"+UserMessageNo[2]+"']")));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	
	@Test(priority=1)
	public void VerifyEditoptionOnOwnPost_EnableEditOwnPostforRegisteredUser() throws InterruptedException, IOException{

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		// update user permission by checking Start Topic checkbox for registered user
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
		userPermission.Managelink_RegisteredUsers,
		userPermission.ChangePermission_RegisteredUser,
		userPermission.editOwnPost_checkbox, true);
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		
		Frontendlogin.loginToApp(username, password);
		FrontendaddNewTopic.selectCategory(categoryName);
		Thread.sleep(3000);
		
		String replyMessage_Id=PerformActionagainstTopic.PerformActionOnRepliedMessage(topicName, username, message, "Edit");
		
		driver.switchTo().frame(driver.findElement(By.id("message1_ifr")));
		newTopic.messagetextfield.sendKeys(ModyfiedMessage);
		driver.switchTo().defaultContent();
		
		//Save button while editing any replied message
		clickElement(newTopic.Modified_Savebutton);
		Thread.sleep(5000);
		
		String RepliedMessage=driver.findElement(By.xpath("//span[@id='post_message_"+replyMessage_Id+"']")).getText();
		
		Assert.assertTrue(RepliedMessage.contains(ModyfiedMessage));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}


}
