package Com.testcases.Topic;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.EditorPageObjects;
import Com.testcases.Login.Frontendlogin;

public class InsertVideoLinkOnAddnewTopic_EditorAction extends baseClass {

	String username, password;
	String subject, message, category, link, errorMessage;
	 int  rowNum=2;
	
	@BeforeClass
	public void loginToApp() throws IOException, InterruptedException{

		username=username("EditorActions", rowNum, 1);
		password=password("EditorActions", rowNum, 2);
		
		Frontendlogin.loginToApp(username, password);

	}
	
	@Test(priority=0)
	public void verifyErrorOnInsertVideoPopup_leavingBlank() throws InterruptedException, IOException, AWTException{
		errorMessage = readExcel("EditorActions").getRow(rowNum).getCell(8).getStringCellValue();
		FrontendaddNewTopic.gotoNewTopicpage();
		insertVideoURL("");
		Thread.sleep(2000);
		String alertMessage = driver.switchTo().alert().getText();
		driver.switchTo().alert().accept();
		Assert.assertTrue(alertMessage.contains(errorMessage));
		driver.navigate().refresh();
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
	
	@Test(priority=1)
	public void insertInvalidURLandVerifyErrorMessage() throws InterruptedException, IOException, AWTException{
		int rowNum1 = rowNum+1;
		link = readExcel("EditorActions").getRow(rowNum1).getCell(6).getStringCellValue();
		errorMessage = readExcel("EditorActions").getRow(rowNum1).getCell(8).getStringCellValue();
		FrontendaddNewTopic.gotoNewTopicpage();
		insertVideoURL(link);
		Thread.sleep(2000);
		String alertMessage = driver.switchTo().alert().getText();
		driver.switchTo().alert().accept();
		Assert.assertTrue(alertMessage.contains(errorMessage));
		driver.navigate().refresh();
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
		
	}
	
	@Test(priority=2)
	public void enterTextandVerifyErrorMessage() throws InterruptedException, IOException, AWTException{
		int rowNum1 = rowNum+2;
		link = readExcel("EditorActions").getRow(rowNum1).getCell(6).getStringCellValue();
		errorMessage = readExcel("EditorActions").getRow(rowNum1).getCell(8).getStringCellValue();
		FrontendaddNewTopic.gotoNewTopicpage();
		insertVideoURL(link);
		Thread.sleep(2000);
		String alertMessage = driver.switchTo().alert().getText();
		driver.switchTo().alert().accept();
		Assert.assertTrue(alertMessage.contains(errorMessage));
		driver.navigate().refresh();
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
		
	}
	
	
	@Test(priority=3)
	public void enterScriptTagandVerifyErrorMessage() throws InterruptedException, IOException, AWTException{
		
		int rowNum1 = rowNum+3;
		link = readExcel("EditorActions").getRow(rowNum1).getCell(6).getStringCellValue();
		errorMessage = readExcel("EditorActions").getRow(rowNum1).getCell(8).getStringCellValue();
		FrontendaddNewTopic.gotoNewTopicpage();
		insertVideoURL(link);
		Thread.sleep(2000);
		String alertMessage = driver.switchTo().alert().getText();
		driver.switchTo().alert().accept();
		Assert.assertTrue(alertMessage.contains(errorMessage));
		driver.navigate().refresh();
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
		
	}
	
	@Test(priority=4)
	public void enterBlankSpaceandVerifyErrorMessage() throws InterruptedException, IOException, AWTException{
		
		int rowNum1 = rowNum+4;
		errorMessage = readExcel("EditorActions").getRow(rowNum1).getCell(8).getStringCellValue();
		FrontendaddNewTopic.gotoNewTopicpage();
		insertVideoURL("              ");
		Thread.sleep(2000);
		String alertMessage = driver.switchTo().alert().getText();
		driver.switchTo().alert().accept();
		Assert.assertTrue(alertMessage.contains(errorMessage));
		driver.navigate().refresh();
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
		
	}
	
	@Test(priority=5)
	public void verifyVideolinkforFacebook() throws InterruptedException, IOException, AWTException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		
		int rowNum1 = rowNum+5;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		link = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		String siteURL =readExcel("EditorActions").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		
		insertVideoURL_validData(link);
		Thread.sleep(2000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(5000);
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//iframe[contains(@src,'"+siteURL+"') and contains(@src,'video')]")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
	
	
	@Test(priority=6)
	public void verifyVideolinkforDailymotion() throws InterruptedException, IOException, AWTException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		
		int rowNum1 = rowNum+6;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		link = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		String siteURL =readExcel("EditorActions").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		
		insertVideoURL_validData(link);
		Thread.sleep(2000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(5000);
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//iframe[contains(@src,'"+siteURL+"') and contains(@src,'video')]")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
	
	@Test(priority=7)
	public void verifyVideolinkforYoutube() throws InterruptedException, IOException, AWTException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		
		int rowNum1 = rowNum+7;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		link = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		String siteURL =readExcel("EditorActions").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		
		insertVideoURL_validData(link);
		Thread.sleep(2000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(5000);
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//iframe[contains(@src,'"+siteURL+"') and contains(@src,'embed')]")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
	
	@Test(priority=8)
	public void verifyVideolinkforMetacafe() throws InterruptedException, IOException, AWTException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		
		int rowNum1 = rowNum+8;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		link = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		String siteURL =readExcel("EditorActions").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		
		insertVideoURL_validData(link);
		Thread.sleep(2000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(5000);
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//iframe[contains(@src,'"+siteURL+"') and contains(@src,'embed')]")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	
	}
	
	@Test(priority=9)
	public void verifyVideolinkforVimeo() throws InterruptedException, IOException, AWTException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		
		int rowNum1 = rowNum+9;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		link = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		String siteURL =readExcel("EditorActions").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		
		insertVideoURL_validData(link);
		Thread.sleep(2000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		Thread.sleep(3000);
		
		topic.postNewTopicbutton.click();
		Thread.sleep(5000);
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//iframe[contains(@src,'"+siteURL+"') and contains(@src,'video')]")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
	
	
	public void insertVideoURL(String videoLink) throws InterruptedException, AWTException{
		EditorPageObjects editor =  new EditorPageObjects();
		editor.insertVideo_Editor.click();
		editor.insertVideo_popUp.click();
		editor.insertVideo_textfield.sendKeys(videoLink);
		editor.insertURL_button.click();
		
	
	}
	
	public void insertVideoURL_validData(String link) throws InterruptedException, AWTException{
		EditorPageObjects editor =  new EditorPageObjects();
		// put path to your image in a clipboard
		StringSelection fil = new StringSelection(link);
		Toolkit.getDefaultToolkit().getSystemClipboard().setContents(fil, null);

		FrontendaddNewTopic.gotoNewTopicpage();
		Robot robot=new Robot();
		editor.insertVideo_Editor.click();
		editor.insertVideo_popUp.click();
		Thread.sleep(3000);
		editor.insertVideo_textfield.clear();
		
		robot.keyPress(KeyEvent.VK_CONTROL);
		robot.keyPress(KeyEvent.VK_V);
		robot.keyRelease(KeyEvent.VK_V);
		robot.keyRelease(KeyEvent.VK_CONTROL);
		editor.insertURL_button.click();
		
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
