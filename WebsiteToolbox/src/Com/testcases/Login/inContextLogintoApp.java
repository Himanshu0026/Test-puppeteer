package Com.testcases.Login;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Topic.FrontendaddNewTopic;

public class inContextLogintoApp extends baseClass{
String username, password;
String topicName, categoryName;
	
	public inContextLogintoApp() throws IOException{
		username=username("Login", 20, 1);
		password=password("Login", 20, 2);
		topicName = readExcel("Login").getRow(20).getCell(4).getStringCellValue();
		categoryName = readExcel("Login").getRow(20).getCell(3).getStringCellValue();
		
		@SuppressWarnings("unused")
		Forceguestlogin login=new Forceguestlogin();
		
	}
	
	@Test(priority=0)
	public void inContextLoginfromAddNewPost() throws InterruptedException{
		
		AddNewTopicandReplyTopic newTopic=new AddNewTopicandReplyTopic();
		
		newTopic.StartnewTopicbutton.click();
		Assert.assertTrue(driver.getTitle().contains("Login"));
		Frontendlogin.loginToApp(username, password);
		
		Assert.assertTrue(driver.getTitle().contains("New Topic"));
		Thread.sleep(3000);
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test(priority=1)
	public void incontextLoginfromLikeThisTopicIcon() throws InterruptedException{
		AddNewTopicandReplyTopic inContext=new AddNewTopicandReplyTopic();
		
		//Click on Like This Post icon present under topic list
		inContext.LikethisTopic_icon.click();
		
		inContextLogin(username, password);
		Thread.sleep(3000);
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	@Test(priority=2)
	public void incontextLoginfromLikethisPost() throws InterruptedException{
		AddNewTopicandReplyTopic inContext=new AddNewTopicandReplyTopic();
		//Click on Like This Post icon present under topic list
		
		inContext.firstTopicInList.click();
		inContext.LikethisPost_icon.click();
		
		inContextLogin(username, password);
		Thread.sleep(3000);
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	@Test(priority=3)
	public void incontextLoginfromDislikethisPost() throws InterruptedException{
		AddNewTopicandReplyTopic inContext=new AddNewTopicandReplyTopic();
		//Click on Like This Post icon present under topic list
		
		inContext.firstTopicInList.click();
		inContext.DislikethisPost_icon.click();
		
		inContextLogin(username, password);
		Thread.sleep(3000);
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	@Test(priority=4)
		public void VerifyForgotPasswordlinkOnLoginPopup() throws InterruptedException{
			AddNewTopicandReplyTopic inContext=new AddNewTopicandReplyTopic();
			//Click on Like This Post icon present under topic list
			frontpagelogin Login=new frontpagelogin();
			
			inContext.LikethisTopic_icon.click();
			Login.inContextLoginPopUp.click();
			Thread.sleep(3000);
			Login.inContextForgotPassword.click();
			Thread.sleep(3000);
			Assert.assertTrue(driver.getTitle().contains("Lost Your Password?"));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
	@Test(priority=5)
	public void inContextLoginfromEmailonUsersProfile() throws InterruptedException{
		
		AddNewTopicandReplyTopic incontext = new AddNewTopicandReplyTopic();
		AccountSettingsPageObjects email=new AccountSettingsPageObjects();
		
		incontext.firstUsernameinTopicList.click();
		email.EmailbuttonOnViewProfilepage.click();
		
		inContextLogin(username, password);
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
		
	}
	
	@Test(priority=6)
	public void inContextLoginfromQuoteagaistTopic() throws InterruptedException{
		
		AddNewTopicandReplyTopic incontext = new AddNewTopicandReplyTopic();
		
		incontext.firstTopicInList.click();
		incontext.firstQuoteinList.click();
		
		inContextLogin(username, password);
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
		
	}
	
	@Test(priority=7)
	public void inContextLoginfromVoteanyPost() throws InterruptedException{
		
		frontpagelogin incontext = new frontpagelogin();
		
		FrontendaddNewTopic.selectCategory(categoryName);
		driver.findElement(By.xpath("//a/span[contains(text(),'" + topicName + "')]")).click();
		Thread.sleep(3000);
		incontext.LoginonGuestUserVote.click();

		inContextLogin(username, password);
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
		
	}
	
	@Test(priority=8)
	public void inContextLoginFromGuestUserMessage_inTopiclist() throws InterruptedException{
		frontpagelogin login=new frontpagelogin();
		AddNewTopicandReplyTopic incontext = new AddNewTopicandReplyTopic();
		Actions action=new Actions(driver);
		action.moveToElement(incontext.firstUsernameinTopicList).build().perform();
		Thread.sleep(2000);
		action.click(login.LoginonGuestUserMessage).build().perform();
		Thread.sleep(5000);
		inContextLogintoApp.inContextLogin(username, password);
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
	}
	

	
	public static void inContextLogin(String username, String password) throws InterruptedException{
		frontpagelogin inContext=new frontpagelogin();
		
		inContext.inContextLoginPopUp.click();
		
		inContext.inContextUsername.clear();
		inContext.inContextUsername.sendKeys(username);
		
		inContext.inContextPassword.clear();
		inContext.inContextPassword.sendKeys(password);
		
		inContext.inContextLoginbutton.click();		
		
	}
	
	@AfterMethod
	// perform action to reach on Home page after failure any test script
	public static void afterMethod(ITestResult testResult) throws Exception {

		if (testResult.getStatus() == ITestResult.FAILURE) {
			driver.navigate().refresh();
			if(verifyPresenceOfElement(By.id("private_message_notification"))){
				Frontendlogin.logoutFromApp();
				Thread.sleep(3000);
			}
			driver.navigate().to((String) Credential.get("FrontendURL"));
			
		}
	}
	

}
