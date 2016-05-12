package Com.testcases.Topic;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.CategoryTopicandPostPageObject;
import Com.testcases.Login.Frontendlogin;

public class LockunLockTopicandVerifyit extends baseClass {
	
	String username, password;
	String topicName,  category;
	int rowNum=47;
	
	
	@BeforeClass
	public void LoginToApp() throws IOException, InterruptedException{
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		
		Frontendlogin.loginToApp(username, password);
		
	}
	
	@Test(priority=0)
		//method to verify lock functionality from topic listing page under category
		public void verifyLockTopicfromTopiclist() throws IOException, InterruptedException{

			topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
			category = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
			
			FrontendaddNewTopic.selectCategory(category);
			String topicId = lockunLockTopic(topicName,"Lock");
			Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[@value='"+topicId+"']/parent::span/i[@class='glyphicon glyphicon-lock']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);
			
			
		}
		
		
		@Test(priority=1)
		//method to verify unlock functionality from topic listing page under category
		public void verifyUnLockTopicfromTopiclist() throws IOException, InterruptedException{

			username = readExcel("Topic").getRow(rowNum).getCell(1).getStringCellValue();
			password = readExcel("Topic").getRow(rowNum).getCell(2).getStringCellValue();
			topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
			category = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();

			FrontendaddNewTopic.selectCategory(category);
			String topicId = lockunLockTopic(topicName,"unLock");

			Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[@value='"+topicId+"']/parent::span/i[@class='glyphicon glyphicon-lock']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);
			
			
		}
		
		@Test(priority=2)
		//method to verify unlock functionality from topic listing page under category
		public void verifyLockTopicfromLatestTopiclist() throws IOException, InterruptedException{
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			int rowNum1=rowNum+1;
			topicName = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();

			topic.forumMenu.click();
			Thread.sleep(2000);
			topic.Topic.click();
			String topicId = lockunLockTopic(topicName,"Lock");

			Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[@value='"+topicId+"']/parent::span/i[@class='glyphicon glyphicon-lock']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);
			
			
		}
		
		@Test(priority=3)
		//method to verify unlock functionality from topic listing page under category
		public void verifyunLockTopicfromLatestTopiclist() throws IOException, InterruptedException{
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			int rowNum1=rowNum+1;
			topicName = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();

			topic.forumMenu.click();
			Thread.sleep(2000);
			topic.Topic.click();
			String topicId = lockunLockTopic(topicName,"unLock");

			Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[@value='"+topicId+"']/parent::span/i[@class='glyphicon glyphicon-lock']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);
			
			
		}
		
		@Test(priority=4)
		//test case for lock topic from Profile page and verify lock icon on locked topic
		public void LockTopicfromUserProfilepage() throws InterruptedException, IOException{
			
			AccountSettingsPageObjects profile = new AccountSettingsPageObjects();
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			
			int rowNum1=rowNum+2;
			topicName = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();
			
			profile.userAccountPanel.click();
			profile.Profile.click();
			
			profile.TopicStarted_tab.click();
			Thread.sleep(3000);
			JavascriptExecutor executor=(JavascriptExecutor)driver;
			executor.executeScript("window.scrollTo(0, 200)");
			Actions action = new Actions(driver);
			WebElement TopicInList = driver.findElement(By.xpath("//span[@class='post-body-author']/a[text()='"+topicName+"']"));
			action.moveToElement(TopicInList).build();
			Thread.sleep(3000);
			checkCheckboxagainstTopic_inTopiclist(TopicInList);
			topic.LockIconinDropdown.click();
			Thread.sleep(2000);
			topic.LockOption.click();
			Thread.sleep(3000);
			
			Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[text()='"+topicName+"']/parent::span[@class='post-body-author']/span/i")));	
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);
		}
		
		@Test(priority=5)
		//test case for unlock topic from Profile page and verify visibility of lock icon on unlocked topic
		public void unLockTopicfromUserProfilepage() throws InterruptedException, IOException{
			
			AccountSettingsPageObjects profile = new AccountSettingsPageObjects();
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			int rowNum1=rowNum+2;
			topicName = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();
			
			profile.userAccountPanel.click();
			profile.Profile.click();
			profile.TopicStarted_tab.click();
			JavascriptExecutor executor=(JavascriptExecutor)driver;
			executor.executeScript("window.scrollTo(0, 200)");
			Actions action = new Actions(driver);
			WebElement TopicInList = driver.findElement(By.xpath("//span[@class='post-body-author']/a[text()='"+topicName+"']"));
			action.moveToElement(TopicInList).build();
			Thread.sleep(3000);
			checkCheckboxagainstTopic_inTopiclist(TopicInList);
			
			topic.LockIconinDropdown.click();
			Thread.sleep(2000);
			topic.unLockOption.click();
			Thread.sleep(3000);
			
			Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[text()='"+topicName+"']/parent::span[@class='post-body-author']/span/i")));	
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);
		}
	
	@Test(priority=6)
	public void LockTopicfromPostpage() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		CategoryTopicandPostPageObject post = new CategoryTopicandPostPageObject();

		int rowNum1=rowNum+3;
		topicName = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();
		category = readExcel("Topic").getRow(rowNum1).getCell(5).getStringCellValue();
		String alertMessage = readExcel("Topic").getRow(rowNum1).getCell(6).getStringCellValue();
		FrontendaddNewTopic.selectCategory(category);
		topic.TopicInList(topicName).click();
		Thread.sleep(3000);
		
		post.ModerateTopic.click();
		clickElement(post.LockonPostpage);
		Thread.sleep(3000);
		
		Assert.assertTrue(post.AlertMessage.getText().contains(alertMessage));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	
		
	}
	
	@Test(priority=7)
	public void unLockTopicfromPostpage() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		CategoryTopicandPostPageObject post = new CategoryTopicandPostPageObject();

		int rowNum1=rowNum+3;
		topicName = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();
		category = readExcel("Topic").getRow(rowNum1).getCell(5).getStringCellValue();
	
		FrontendaddNewTopic.selectCategory(category);
		topic.TopicInList(topicName).click();
		String[] topicUrl_id=driver.getCurrentUrl().split("\\?(?!\\?)");
		String[] topic_id=topicUrl_id[0].split("-");
		String topicId= topic_id[topic_id.length-1];
		post.ModerateTopic.click();
		Thread.sleep(2000);
		post.unLockonPostpage.click();
		 //topic.backArrowOnPost.click();
		 Thread.sleep(2000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 Thread.sleep(3000);
		 
		 Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[@value='"+topicId+"']/parent::span/i[@class='glyphicon glyphicon-lock']")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
		
		
		
		//method to perform lock/unlock action on topic
		public String  lockunLockTopic(String topicName, String action) throws InterruptedException{
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			String topicurl=driver.findElement(By.xpath("//*[text()='"+topicName+"']/parent::a")).getAttribute("href");
			String[] topicUrl_id=topicurl.split("\\?(?!\\?)");
			String[] topic_id=topicUrl_id[0].split("-");
			String topicId= topic_id[topic_id.length-1];
			driver.findElement(By.xpath("//input[@value='"+topicId+"']")).click();
			Thread.sleep(2000);
			
			topic.LockIconinDropdown.click();
			Thread.sleep(2000);
			if(action=="Lock"){
				topic.LockOption.click();
			}if(action=="unLock"){
			topic.unLockOption.click();
			}Thread.sleep(3000);
			return topicId;
			
		}
		
		@AfterClass
		public void logoutFromApp(){
			Frontendlogin.logoutFromApp();
		}
		
		@AfterMethod
		// perform action to reach on Home page after failure any test script
		public static void afterMethod(ITestResult testResult) throws Exception {

			if (testResult.getStatus() == ITestResult.FAILURE) {
				driver.navigate().refresh();
				driver.navigate().to((String) Credential.get("FrontendURL"));
				
			}
		}
		
		

}
