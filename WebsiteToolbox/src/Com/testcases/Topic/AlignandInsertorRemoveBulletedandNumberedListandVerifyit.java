package Com.testcases.Topic;

import java.awt.AWTException;
import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.interactions.Actions;
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

public class AlignandInsertorRemoveBulletedandNumberedListandVerifyit extends baseClass {
	String username, password;
	String subject, message, category, color;
	int rowNum;

	@BeforeClass
	public void loginToApp() throws IOException, InterruptedException {
		username=username("UploadFile&Editor", 41, 1);
		password=password("UploadFile&Editor", 41, 2);

		Frontendlogin.loginToApp(username, password);
		
		
	}
	
@Test(priority=0)
	public void LeftAlignMessageandVerifyalignment() throws InterruptedException, AWTException, IOException{		
		rowNum =41;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		
		changeAlignmentofEnteredMessage(subject, message, category, "Left Align");
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[@style='text-align: left;']")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@Test(priority=1)
	public void CenterAlignMessageandVerifyalignment() throws InterruptedException, AWTException, IOException{		
		rowNum =42;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		
		changeAlignmentofEnteredMessage(subject, message, category, "Center Align");
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[@style='text-align: center;']")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@Test(priority=2)
	public void RightAlignMessageandVerifyalignment() throws InterruptedException, AWTException, IOException{		
		rowNum =43;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		
		changeAlignmentofEnteredMessage(subject, message, category, "Right Align");
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[@style='text-align: right;']")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@Test(priority=3)
	public void insertBulletedListandVerifyit() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		
		rowNum = 44;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();

		insertBulletedorNumberedList(subject, message, category, "Bulleted List");
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(editor.BulletedListonPost));

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
	}
	
	@Test(priority=4)
	public void removeBulletedListandVerifyit() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		rowNum = 44;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();

		FrontendaddNewTopic.selectCategory(category);
		
		driver.findElement(topic.TopicInListBy(subject)).click();
		Thread.sleep(3000);
		
		Actions action=new Actions(driver);
		action.moveToElement(driver.findElement(editor.BulletedListonPost)).build().perform();
		topic.dropdownOnfirstPost.click();
		topic.EditOnfirstPost.click();
		Thread.sleep(3000);
	
		driver.switchTo().frame(topic.EditpostMessageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL,"a");
		driver.switchTo().defaultContent();
		editor.BulletedListIcon_Edit.click();
		Thread.sleep(2000);
		topic.Modified_Savebutton.click();
		Assert.assertFalse(verifyPresenceOfElement(editor.BulletedListonPost));

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	
	@Test(priority=5)
	public void insertNumberedListandVerifyit() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		
		rowNum = 45;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
	
		insertBulletedorNumberedList(subject, message, category, "Numbered List");
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(editor.NumberedListonPost));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@Test(priority=6)
	public void removeNumberedListandVerifyit() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		rowNum = 45;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		
		FrontendaddNewTopic.selectCategory(category);
		
		topic.TopicInList(subject).click();
		Thread.sleep(3000);
		
		Actions action=new Actions(driver);
		action.moveToElement(driver.findElement(editor.NumberedListonPost)).build().perform();
		topic.dropdownOnfirstPost.click();
		topic.EditOnfirstPost.click();
		Thread.sleep(3000);
	
		driver.switchTo().frame(topic.EditpostMessageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL,"a");
		driver.switchTo().defaultContent();
		editor.NumberedList_Edit.click();
		Thread.sleep(2000);
		topic.Modified_Savebutton.click();
		Assert.assertFalse(verifyPresenceOfElement(editor.NumberedListonPost));

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
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

	
	public void changeAlignmentofEnteredMessage(String subject, String message,
			String category, String alignment) throws InterruptedException {

		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL, "a");
		driver.switchTo().defaultContent();
		if (alignment.equalsIgnoreCase("Left Align")) {
			editor.LeftAlign_icon.click();
		}
		if (alignment.equalsIgnoreCase("Center Align")) {
			editor.CenterAlign_icon.click();
		}
		if (alignment.equalsIgnoreCase("Right Align")) {
			editor.RightAlign_icon.click();
		}
		Thread.sleep(2000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);

	}
	
	public void insertBulletedorNumberedList(String subject, String message,
			String category, String textList) throws InterruptedException {

		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL, "a");
		driver.switchTo().defaultContent();
		if (textList.equalsIgnoreCase("Bulleted List")) {
			editor.BulletedList_icon.click();
		}
		if (textList.equalsIgnoreCase("Numbered list")) {
			editor.NumberedList_icon.click();
		}
		

	}
	
	
}
