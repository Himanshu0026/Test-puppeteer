package Com.testcases.Topic;

import java.awt.AWTException;
import java.io.IOException;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.UserPermission.VerifyStartTopic_CategoryPermissions;

public class PerformActionagainstTopic extends baseClass{
	String username, password, topicName, categoryName, message;
	int rowNum;
	@Test
	public void EnableReplyTopicUserPermission_Backend() throws InterruptedException, IOException{
		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		@SuppressWarnings("unused")
		VerifyStartTopic_CategoryPermissions credential = new VerifyStartTopic_CategoryPermissions();
		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				userPermission.Managelink_RegisteredUsers,
				userPermission.ChangePermission_RegisteredUser,
				userPermission.ReplyTopic_checkbox, true);
	}
	
	@Test(priority=0)
	public void ReplyAgainstTopicwithoutattachment() throws InterruptedException, IOException{
		rowNum=8;
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		
		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		enterMessage(categoryName, topicName, message);
		
		newTopic.Replied_Postbutton.click();
		
		Thread.sleep(5000);
		Assert.assertTrue(newTopic.RepliedMessage.getText().contains(message));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
		
	}
	
	@Test(priority=1)
	//method for Reply post against any topic with attach file
	public void ReplyAgainstTopicwithAttachFile() throws InterruptedException, AWTException, IOException{
		rowNum=9;
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();

		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		String filePath = readExcel("Topic").getRow(rowNum).getCell(6).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		enterMessage(categoryName, topicName, message);
		Thread.sleep(3000);
		
		attachfile(newTopic.AttachFilesbutton, filePath);
		
		newTopic.Replied_Postbutton.click();
		
		Thread.sleep(5000);
		Assert.assertTrue(newTopic.RepliedMessage.getText().contains(message));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	
	@Test(priority=2)
	//method for Reply post against any topic with insert Picture
	public void ReplyAgainstTopicwithInsertPhoto() throws InterruptedException, AWTException, IOException{
		rowNum=10;
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();

		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		String picturePath = readExcel("Topic").getRow(rowNum).getCell(6).getStringCellValue();
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		enterMessage(categoryName, topicName, message);
		
		attachPicture(newTopic.InsertPhotoIcon, newTopic.InsertPhotoPopup, newTopic.Browserbutton,newTopic.InsertImagebutton, picturePath);
		Thread.sleep(3000);
		
		newTopic.Replied_Postbutton.click();
		
		Thread.sleep(5000);
		Assert.assertTrue(newTopic.RepliedMessage.getText().contains(message));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test(priority=5)
	//method to delete any post and verify deleted post on the respective page
	public void deleteRepliedPost() throws InterruptedException, IOException{
		rowNum=12;

		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		FrontendaddNewTopic.selectCategory(categoryName);
		String ReplyMessage_id=PerformActionOnRepliedMessage(topicName, username, message, "Delete");
		
		Alert alert=driver.switchTo().alert();
		alert.accept();
		
		Thread.sleep(3000);
		Assert.assertFalse(verifyPresenceOfElement(By.id("post_message_"+ReplyMessage_id)));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));	

	}
	
	@Test(priority=3)
	//method for edit replied post and verify message after modification
	public void EditRepliedPost() throws InterruptedException, IOException{
		rowNum=12;
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		String ModyfiedMessage=readExcel("Topic").getRow(rowNum).getCell(7).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		FrontendaddNewTopic.selectCategory(categoryName);
		
		String replyMessage_Id=PerformActionOnRepliedMessage(topicName, username, message, "Edit");
		
		driver.switchTo().frame(newTopic.EditpostMessageBody);
		newTopic.messagetextfield.sendKeys(" "+ModyfiedMessage);
		driver.switchTo().defaultContent();
		
		//Save button while editing any replied message
		newTopic.Modified_Savebutton.click();
		Thread.sleep(5000);
		
		String RepliedMessage=driver.findElement(By.xpath("//span[@id='post_message_"+replyMessage_Id+"']")).getText();
		
		Assert.assertTrue(RepliedMessage.contains(ModyfiedMessage));

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	//First check Share Post is enable in backend(Go to "Settings>General>Social Sharing") then call this method
	@Test(priority=4)
	public void ShareRepliedPost_Facebook() throws InterruptedException, IOException{
		rowNum=13;
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		String messagewhilesharingPost=readExcel("Topic").getRow(rowNum).getCell(7).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		FrontendaddNewTopic.selectCategory(categoryName);
		
		PerformActionOnRepliedMessage(topicName, username, message, "Share");
		
		String ForumpostPage=driver.getWindowHandle();
		
		newTopic.SharePost_popUp.click();
		newTopic.FacebookShare_icon.click();
		
		for(String FacebookPage : driver.getWindowHandles()){
			driver.switchTo().window(FacebookPage);
		}
				
		Frontendlogin.loginToFacebook("sangita.digi@gmail.com", "Test@321");
		
		//Enter message while sharing any post through facebook
		newTopic.sharePostwithmessage_Facebook.sendKeys(messagewhilesharingPost);
		newTopic.PostToFacebookbutton.click();;
		
		driver.switchTo().window(ForumpostPage);	
		Thread.sleep(5000);
		driver.navigate().refresh();	

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
		
	}
	
	//First check Share Post is enable in backend(Go to "Settings>General>Social Sharing") then call this method--> Not completed
	//@Test(priority=1)
	public void ShareRepliedPost_twitter() throws InterruptedException, IOException{
		rowNum=14;
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		@SuppressWarnings("unused")

		String categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		String messagewhilesharingPost=readExcel("Topic").getRow(14).getCell(7).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		PerformActionOnRepliedMessage(topicName, username, message, "Share");
		
		String ForumpostPage=driver.getWindowHandle();
		
		newTopic.SharePost_popUp.click();
		newTopic.twitterShare_icon.click();
		
		for(String FacebookPage : driver.getWindowHandles()){
			driver.switchTo().window(FacebookPage);
		}
				
		//login to twitter
		
		
		//Enter message while sharing any post through facebook
		driver.findElement(By.xpath("//textarea[@name='xhpc_message_text']")).sendKeys(messagewhilesharingPost);
		driver.findElement(By.xpath("//span[text()='Post to Facebook']")).click();
		
		driver.switchTo().window(ForumpostPage);
		driver.navigate().refresh();	

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test
	//Edit topic and verify message on post page
	public void editTopicsMessageandverifyit() throws IOException, InterruptedException{
		rowNum=15;
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		String modifiedmessage = readExcel("Topic").getRow(rowNum).getCell(6).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		FrontendaddNewTopic.selectCategory(categoryName);
		topic.TopicInList(topicName).click();
		
		Actions action=new Actions(driver);
		action.moveToElement(topic.VerifyPostedTopic).build().perform();
		topic.dropdownOnfirstPost.click();
		topic.EditOnfirstPost.click();
		Thread.sleep(3000);
	
		driver.switchTo().frame(topic.EditpostMessageBody);
		topic.messagetextfield.sendKeys(modifiedmessage);
		driver.switchTo().defaultContent();
		
		Thread.sleep(2000);
		topic.Modified_Savebutton.click();
		Thread.sleep(3000);
		
		Assert.assertTrue(topic.VerifyPostedTopic.getText().contains(modifiedmessage));

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	//@Test
		//Bug is there in this functionality, back arrow is not working after updating subject
		//Edit topic and verify message on post page
		public void EditTopicfromFloatingHeader() throws IOException, InterruptedException{
			rowNum=16;
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			
			username=username("Topic", rowNum, 1);
			password=password("Topic", rowNum, 2);
			categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
			topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
			String topicName_modified = readExcel("Topic").getRow(rowNum).getCell(6).getStringCellValue();
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);
			FrontendaddNewTopic.selectCategory(categoryName);
			topic.TopicInList(topicName).click();
			Thread.sleep(2000);
			//String[] topic_href=driver.getCurrentUrl().split((String) Credential.get("FrontendURL"));
			mousehover(topic.EditTopic, topic.EditTopicPencilIcon);
			
			topic.EditTopicTextfield.clear();
			topic.EditTopicTextfield.sendKeys(topicName_modified+Keys.ENTER);
			Thread.sleep(3000);
			topic.backArrowOnPost.click();
			Thread.sleep(3000);
			
			Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[text()='"+topicName_modified+"']")));

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
	@Test
	//Delete topic and verify in the topic list
	public void DeleteTopicandVerifyinList() throws IOException, InterruptedException{
		rowNum=17;
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		FrontendaddNewTopic.selectCategory(categoryName);
		topic.TopicInList(topicName).click();
		
		Actions action=new Actions(driver);
		action.moveToElement(topic.VerifyPostedTopic).build().perform();
		topic.dropdownOnfirstPost.click();
		topic.DeleteOnfirstPost.click();
		Thread.sleep(3000);
	
		driver.switchTo().alert().accept();
		Thread.sleep(3000);
		
		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[text()='"+topicName+"']")));

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	
	
	
	//Send "Delete", "Edit", "Share" in PerforAction string as parameter
	public static String PerformActionOnRepliedMessage(String topicName, String username,String message, String PerformAction) throws InterruptedException{
		driver.findElement(By.xpath("//*[text()='"+topicName+"']")).click();
		Thread.sleep(3000);
		
		WebElement UserMessage=driver.findElement(By.xpath("//a[text()='"+username+"']/following::span[contains(text(),'"+message+"')]"));		
		String UserMessage_id=UserMessage.getAttribute("id"); //This return id of UserMessage and then split it and get replied message number
		String[] UserMessageNo=UserMessage_id.split("_");
		WebElement dropdown=driver.findElement(By.xpath("//a[@id='posttoggle_"+UserMessageNo[2]+"']/i"));
		
		Actions action=new Actions(driver);
		action.moveToElement(UserMessage).build().perform();
		dropdown.click();
		Thread.sleep(2000);
		
		if(PerformAction=="Delete"){
			driver.findElement(By.xpath("//a[contains(@id,'delete') and contains(@data-pid,'"+UserMessageNo[2]+"')]")).click();
		}else if(PerformAction=="Edit"){
			driver.findElement(By.xpath("//a[contains(@id,'edit_post_request') and contains(@data-pid,'"+UserMessageNo[2]+"')]")).click();
			action.build().perform();
		}else if(PerformAction=="Share"){
			driver.findElement(By.xpath("//a[@id='"+UserMessageNo[2]+"']")).click();
			action.build().perform();
		}
		Thread.sleep(5000);
		
		return UserMessageNo[2];
		
	}


	public static void enterMessage(String categoryName, String topicName, String message) throws InterruptedException{
		
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		
		FrontendaddNewTopic.selectCategory(categoryName);
		
		driver.findElement(newTopic.TopicInListBy(topicName)).click();
		Thread.sleep(3000);
		Actions action=new Actions(driver);
		action.moveToElement(newTopic.RepliedTextarea).build();
		newTopic.RepliedTextarea.click();
		action.build().perform();
		Thread.sleep(3000);
		
		driver.switchTo().frame(newTopic.messageBody);
		newTopic.messagetextfield.sendKeys(message);
		driver.switchTo().defaultContent();	
		Thread.sleep(3000);
			
	}
	
	@AfterMethod
	public void aftermethod(ITestResult result) throws InterruptedException{
		if(result.getStatus() == ITestResult.FAILURE){
			driver.navigate().refresh();
			if(verifyPresenceOfElement(By.id("private_message_notification"))){
				Frontendlogin.logoutFromApp();
				Thread.sleep(3000);
			}
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	}
	
	
}
