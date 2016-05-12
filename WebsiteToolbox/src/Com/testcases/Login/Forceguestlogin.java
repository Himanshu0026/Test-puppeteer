package Com.testcases.Login;

import java.io.IOException;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.Utilities.setDefaultSettingbeforeStartExecutions;
import Com.backendpages.BackendSettingspageObjects;
import Com.backendpages.Betahomepageobjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.frontpagelogin;

public class Forceguestlogin extends baseClass {
	String username, password;
	static String portalUser, portalPwd;
	
	public Forceguestlogin() throws IOException{
		username=username("Login", 1, 1);
		password=password("Login", 1, 2);
		portalUser = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		portalPwd = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	
	
	@Test(priority=0)
	public static void EnableForceGuestLoginFromBackend() throws InterruptedException{
		switchtab();
		BackendSettingspageObjects backend=new BackendSettingspageObjects();
		Backendlogin.LoginToAPP(portalUser, portalPwd);
		
		//Actions action=new Actions(driver);
		backend.settings.click();
		Thread.sleep(2000);
		backend.SecuritySubMenu.click();
		/*action.moveToElement(backend.SecuritySubMenu).click();
		action.build().perform();*/
		Thread.sleep(3000);
		
		EnableorDisable_Checkbox(backend.ForceGuestLogin_checkbox, true);
		Thread.sleep(3000);
		backend.SaveButton.click();
		
		Thread.sleep(3000);
		
		Backendlogin.logoutFromApp();
		switchtab();
		
	}
	
	@Test(priority=1)
	public void VerifyLoginscreenonHomepage_EnabledGuestLogin() throws InterruptedException{

		driver.navigate().refresh();
		Assert.assertTrue(driver.getTitle().contains("Login"));
		
		Frontendlogin.loginToApp(username,  password);
		Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	@Test(priority=2)
	public void VerifyLoginscreenon_TopicsInSideMenu_EnabledGuestLogin() throws InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();

		topic.forumMenu.click();
		Thread.sleep(3000);
		topic.Topic.click();
		driver.navigate().refresh();

		Assert.assertTrue(driver.getTitle().contains("Login"));
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(5000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	@Test(priority=3)
	public void VerifyLoginscreenon_MembersInSideMenu_EnabledGuestLogin() throws InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		frontpagelogin login=new frontpagelogin();
		topic.forumMenu.click();
		Thread.sleep(3000);
		login.Members_ForumMenu.click();

		Assert.assertTrue(driver.getTitle().contains("Login"));
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		Assert.assertTrue(driver.getTitle().contains("members"));
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	@Test(priority=4)
	public void VerifyLoginscreenon_CalenderInSideMenu_EnabledGuestLogin() throws InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		frontpagelogin login=new frontpagelogin();
		topic.forumMenu.click();
		login.Calender_ForumMenu.click();

		Assert.assertTrue(driver.getTitle().contains("Login"));
		
		Frontendlogin.loginToApp(username,  password);
		Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	//@Test(priority=5)
	public void VerifyLoginscreenon_DonateInSideMenu_EnabledGuestLogin() throws InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		frontpagelogin login=new frontpagelogin();
		topic.forumMenu.click();
		login.Donate_ForumMenu.click();

		Assert.assertTrue(driver.getTitle().contains("Login"));
		
		Frontendlogin.loginToApp(username,  password);
		Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	@Test(priority=6)
	public static void DisableForceGuestLoginFromBackend() throws InterruptedException{
		switchtab();
		Backendlogin.LoginToAPP(portalUser, portalPwd);
		
		setDefaultSettingbeforeStartExecutions.DisableForceGuestLogin();
		Backendlogin.logoutFromApp();
		switchtab();
		
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
				if(verifyPresenceOfElement(By.id("private_message_notification"))){
					Frontendlogin.logoutFromApp();
					Thread.sleep(3000);
				}
				driver.navigate().to((String) Credential.get("FrontendURL"));
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
		}}
		
	}

}