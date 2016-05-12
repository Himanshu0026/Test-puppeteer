package Com.testcases.Topic;

import java.awt.AWTException;
import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.testcases.Login.Frontendlogin;

public class FrontendaddNewTopic extends baseClass {
	
	String username, password;
	String subject, message, category, filePath, picturePath;
	int rowNum;

	@Test(priority=0)
	public void addNewTopicwithHindiText() throws InterruptedException, AWTException, IOException {
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		rowNum = 1;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		subject = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		category = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();

		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		gotoNewTopicpage();
		enterSubjectnMessage(subject, message,category);
		Thread.sleep(3000);
		newTopic.postNewTopicbutton.click();
		
		Thread.sleep(3000);
		
		VerifyPostedMessage(message);
		
		Frontendlogin.logoutFromApp();

	}

	//@Test(priority=1)
	public void postPriviewofNewTopic() throws InterruptedException, IOException {

		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		username=username("Topic", 2, 1);
		password=password("Topic", 2, 2);
		subject = readExcel("Topic").getRow(2).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(2).getCell(4).getStringCellValue();
		category = readExcel("Topic").getRow(2).getCell(5).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);

		gotoNewTopicpage();
		enterSubjectnMessage(subject, message, category);
		Thread.sleep(5000);
		
		EnableorDisable_Checkbox(newTopic.followTopicCheckbox, false);

		newTopic.PostPriviewnbutton.click();

		Assert.assertTrue(newTopic.Priviewmessage.getText().contentEquals(
				message));

		Thread.sleep(5000);
		newTopic.Cancelbutton.click();

		Frontendlogin.logoutFromApp();

	}
	
	

	//@Test(priority=2)
	public void addNewTopicwithAttachment() throws InterruptedException,
			AWTException, IOException {
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		rowNum = 3;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		subject = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		category = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		filePath = readExcel("Topic").getRow(rowNum).getCell(6).getStringCellValue();
		picturePath = readExcel("Topic").getRow(rowNum).getCell(7).getStringCellValue();

		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		gotoNewTopicpage();
		enterSubjectnMessage(subject, message, category);
		Thread.sleep(3000);
		EnableorDisable_Checkbox(newTopic.followTopicCheckbox, false);

		// Insert Photo while creating new post
		attachfile(newTopic.AttachFilesbutton, filePath);
		Thread.sleep(5000);
		
		attachPicture(newTopic.InsertPhotoIcon, newTopic.InsertPhotoPopup, newTopic.Browserbutton,newTopic.InsertImagebutton, picturePath);
		Thread.sleep(5000);

		newTopic.postNewTopicbutton.click();
		
		VerifyPostedMessage(message);

		Frontendlogin.logoutFromApp();
	}
	
	@Test(priority=3)
	public void addNewTopicBySelectingCategory() throws InterruptedException, AWTException, IOException {
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();

		rowNum = 4;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		subject = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		category = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();

		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		gotoNewTopicpage();

		enterSubjectnMessage(subject, message, category);
		newTopic.postNewTopicbutton.click();
		
		VerifyPostedMessage(message);
		
		Frontendlogin.logoutFromApp();

	}
	
	@Test(priority=4)
	public void VerifyPostPriviewOfGraphicsImages() throws InterruptedException, IOException, AWTException {

		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		rowNum = 5;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		subject = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		category = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		filePath = readExcel("Topic").getRow(rowNum).getCell(6).getStringCellValue();
		String filename = readExcel("Topic").getRow(rowNum).getCell(8).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);

		gotoNewTopicpage();
		enterSubjectnMessage(subject, message, category);
		Thread.sleep(3000);
		attachfile(newTopic.AttachFilesbutton, filePath);		
		Thread.sleep(2000);
		newTopic.PostPriviewnbutton.click();
		Thread.sleep(3000);
		System.out.println(newTopic.Priviewmessage.getText());
		
		Assert.assertTrue(newTopic.Priviewmessage.getText().contentEquals(message));
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[contains(@title,'"+filename+"')]")));

		Thread.sleep(5000);
		newTopic.Cancelbutton.click();

		Frontendlogin.logoutFromApp();

	}
	
	@Test(priority=5)
	public void VerifyPostPriviewOfNongraphicsFile() throws InterruptedException, IOException, AWTException {

		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		rowNum = 6;
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		subject = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		category = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		filePath = readExcel("Topic").getRow(rowNum).getCell(6).getStringCellValue();
		String filename = readExcel("Topic").getRow(rowNum).getCell(8).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);

		gotoNewTopicpage();
		enterSubjectnMessage(subject, message, category);
		Thread.sleep(3000);
		attachfile(newTopic.AttachFilesbutton, filePath);		
		Thread.sleep(2000);
		newTopic.PostPriviewnbutton.click();
		Thread.sleep(3000);
		
		Assert.assertTrue(newTopic.Priviewmessage.getText().contains(message));
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[text()='"+filename+"']")));

		Thread.sleep(5000);
		newTopic.Cancelbutton.click();

		Frontendlogin.logoutFromApp();

	}
	
	public static void selectCategory(String categoryName) throws InterruptedException{
		
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		newTopic.forumMenu.click();
		Thread.sleep(3000);
		newTopic.SideMenu_category.click();
		driver.findElement(By.xpath("//span[text()='"+categoryName+"']")).click();

	}
	
	
	//Go to Post new Topic page just after login
	public static void gotoNewTopicpage() throws InterruptedException{
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();

		newTopic.forumMenu.click();
		Thread.sleep(3000);
		newTopic.Topic.click();
		newTopic.StartnewTopicbutton.click();
	}
	
	//method to verify recently posted message just after creating new post
	public static void VerifyPostedMessage(String message) throws InterruptedException{
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		Assert.assertTrue(newTopic.VerifyPostedTopic.getText().contains(message));
		Thread.sleep(3000);
		newTopic.backArrowOnPost.click();
		Thread.sleep(3000);
	}

	
	public static void enterSubjectnMessage(String subject, String message, String category)
			throws InterruptedException {
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();

		newTopic.subject.sendKeys(subject);

		driver.switchTo().frame(newTopic.messageBody);
		newTopic.messagetextfield.sendKeys(message);
		driver.switchTo().defaultContent();
		
		try{	
			selectElementfromDropdown(newTopic.categorydropdown, category );
			driver.findElement(By.xpath("//div[@class='panel-body table-responsive']")).click();
		}catch(Exception e){
			e.getMessage();
		}
	}  
	
	@AfterMethod
	// perform action to reach on Home page after failure any test script
	public static void afterMethod(ITestResult testResult) throws Exception {

		if (testResult.getStatus() == ITestResult.FAILURE) {
			driver.navigate().refresh();
			try{driver.findElement(By.id("private_message_notification")).isDisplayed();
			Frontendlogin.logoutFromApp();
			driver.navigate().to((String) Credential.get("FrontendURL"));
			}catch(Exception e){
				e.getMessage();
			}
			try{driver.findElement(By.id("td_tab_login")).isDisplayed();
			driver.navigate().to((String) Credential.get("FrontendURL"));
			}catch(Exception e){
				e.getMessage();
			}
		}
	}
	
	
	


}
