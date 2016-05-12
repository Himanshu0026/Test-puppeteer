package Com.testcases.Topic;

import java.awt.AWTException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class VerifyInlineAttachment extends baseClass {
	String username, password;
	String portalUser, portalPwd;
	String subject, message, category, filetype, filePath, filename;
	int rowNum=49;
	
	@BeforeClass
	public void loginToApp() throws InterruptedException, IOException{
		username=username("UploadFile&Editor", rowNum, 1);
		password=password("UploadFile&Editor", rowNum, 2);
		portalUser = username("BackendLogin", 1, 1);
		portalPwd = password("BackendLogin", 1, 2);
		BackendSettingspageObjects backend = new BackendSettingspageObjects();
		Frontendlogin.loginToApp(username, password);
		switchtab();
		Backendlogin.LoginToAPP(portalUser, portalPwd);
		backend.settings.click();
		Thread.sleep(2000);
		backend.fileUploadingSubmenu.click();
		switchtab();
	}
	
	@Test(priority=0)
	public void verifyInlineAttachment_graphicsFile() throws IOException, InterruptedException, AWTException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum).getCell(8)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum).getCell(6)
				.getStringCellValue();

		VerifyUploadAttachment_forumSettings.selectFileType(filetype);
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);
		attachfile(topic.AttachFilesbutton, filePath);
		Thread.sleep(3000);
		topic.insertInline.click();
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(topic.inlinedGraphicsfile(filename)));
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test( priority=1)
	public void verifyInlineAttachment_documentsFile() throws IOException, InterruptedException, AWTException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		int rowNum1 = rowNum+1;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(8)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		
		VerifyUploadAttachment_forumSettings.selectFileType(filetype);
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);
		attachfile(topic.AttachFilesbutton, filePath);
		Thread.sleep(3000);
		topic.insertInline.click();
		Thread.sleep(2000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);

		Assert.assertTrue(verifyPresenceOfElement(topic.inlinedOtherfile(filename)));
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}

	
	@Test(priority=2)
	public void verifyInlineAttachment_multimediaFile() throws IOException, InterruptedException, AWTException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		int rowNum1 = rowNum+2;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(8)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		
		VerifyUploadAttachment_forumSettings.selectFileType(filetype);
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);
		attachfile(topic.AttachFilesbutton, filePath);
		Thread.sleep(3000);
		topic.insertInline.click();
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);

		Assert.assertTrue(verifyPresenceOfElement(topic.inlinedOtherfile(filename)));
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test(priority=3)
	public void verifyInlineAttachment_archivesFile() throws IOException, InterruptedException, AWTException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		int rowNum1 = rowNum+3;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(8)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		
		VerifyUploadAttachment_forumSettings.selectFileType(filetype);
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);
		attachfile(topic.AttachFilesbutton, filePath);
		Thread.sleep(3000);
		topic.insertInline.click();
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);

		Assert.assertTrue(verifyPresenceOfElement(topic.inlinedOtherfile(filename)));
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test(priority=4)
	public void verifyInlineAttachment_multipleFile() throws IOException, InterruptedException, AWTException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		BackendSettingspageObjects backend = new BackendSettingspageObjects();

		int rowNum1 = rowNum+4;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(8)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		String filePath1 = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(10)
				.getStringCellValue();
		String filename1 = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(11)
				.getStringCellValue();
		String filetype1 = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(9)
				.getStringCellValue();
		
		VerifyUploadAttachment_forumSettings.selectFileType(filetype);
		VerifyUploadAttachment_forumSettings.selectFileType(filetype1);
		
		switchtab();
		ArrayList<String> Graphicsfiletype = new ArrayList<String>();
		backend.BrowseFileTypeLink.click();
		List<WebElement> graphics=driver.findElements(By.xpath("//*[text()='Graphics']/parent::td/ul/li"));
		for(WebElement element : graphics){
			Graphicsfiletype.add(element.getText());
		}
		switchtab();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);
		attachfile(topic.AttachFilesbutton, filePath);
		Thread.sleep(3000);
		topic.insertInline.click();
		Thread.sleep(2000);
		attachfile(topic.AttachFilesbutton, filePath1);
		Thread.sleep(3000);
		driver.findElement(By.xpath("//*[text()='"+filename1+"']/parent::span/parent::li/span[3]/small[2]/a")).click();
		Thread.sleep(2000);

		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		if(Graphicsfiletype.contains(filetype.toUpperCase())){
			Assert.assertTrue(verifyPresenceOfElement(topic.inlinedGraphicsfile(filename)));
		}else{
			Assert.assertTrue(verifyPresenceOfElement(topic.inlinedOtherfile(filename)));
		}if(Graphicsfiletype.contains(filetype1.toUpperCase())){
			Assert.assertTrue(verifyPresenceOfElement(topic.inlinedGraphicsfile(filename1)));
			}else{
				Assert.assertTrue(verifyPresenceOfElement(topic.inlinedOtherfile(filename1)));
			}
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test(priority=5)
	public void verifyDeletedAttachment() throws IOException, InterruptedException, AWTException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		BackendSettingspageObjects backend = new BackendSettingspageObjects();

		int rowNum1 = rowNum+5;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3).getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4).getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5).getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7).getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(8).getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6).getStringCellValue();
		
		switchtab();
		ArrayList<String> Graphicsfiletype = new ArrayList<String>();
		backend.BrowseFileTypeLink.click();
		List<WebElement> graphics=driver.findElements(By.xpath("//*[text()='Graphics']/parent::td/ul/li"));
		for(WebElement element : graphics){
			Graphicsfiletype.add(element.getText());
		}
		switchtab();
		
		VerifyUploadAttachment_forumSettings.addNewTopicwithAttachment(subject, message+Keys.ENTER, category, filePath);
		
		if(Graphicsfiletype.contains(filetype.toUpperCase())){
			Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedGraphicsfile(filename)));
		}else{
			Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedNongraphicsfile(filename)));
		}
		
		//Edit any topic to delete attach file
		Actions action=new Actions(driver);
		action.moveToElement(topic.VerifyPostedTopic).build().perform();
		topic.dropdownOnfirstPost.click();
		topic.EditOnfirstPost.click();
		Thread.sleep(3000);
		
		topic.DeleteAttachment.click();
		Thread.sleep(2000);
		topic.Modified_Savebutton.click();
		if(Graphicsfiletype.contains(filetype.toUpperCase())){
			Assert.assertFalse(verifyPresenceOfElement(topic.postAttachedGraphicsfile(filename)));
		}else{
			Assert.assertFalse(verifyPresenceOfElement(topic.postAttachedNongraphicsfile(filename)));
		}

		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test(priority=6)
	public void attachMultipleFileandVerifyit() throws IOException, InterruptedException, AWTException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		BackendSettingspageObjects backend = new BackendSettingspageObjects();

		int rowNum1 = rowNum+9;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3).getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4).getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5).getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7).getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(8).getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6).getStringCellValue();
		String filePath1 = readExcel("UploadFile&Editor").getRow(rowNum1+1).getCell(7).getStringCellValue();
		String filename1 = readExcel("UploadFile&Editor").getRow(rowNum1+1).getCell(8).getStringCellValue();
		String filetype1 = readExcel("UploadFile&Editor").getRow(rowNum1+1).getCell(6).getStringCellValue();
		String filePath2 = readExcel("UploadFile&Editor").getRow(rowNum1+2).getCell(7).getStringCellValue();
		String filename2 = readExcel("UploadFile&Editor").getRow(rowNum1+2).getCell(8).getStringCellValue();
		String filetype2 = readExcel("UploadFile&Editor").getRow(rowNum1+2).getCell(6).getStringCellValue();
		
		VerifyUploadAttachment_forumSettings.selectFileType(filetype);
		VerifyUploadAttachment_forumSettings.selectFileType(filetype1);
		VerifyUploadAttachment_forumSettings.selectFileType(filetype2);
		
		switchtab();
		ArrayList<String> Graphicsfiletype = new ArrayList<String>();
		backend.BrowseFileTypeLink.click();
		List<WebElement> graphics=driver.findElements(By.xpath("//*[text()='Graphics']/parent::td/ul/li"));
		for(WebElement element : graphics){
			Graphicsfiletype.add(element.getText());
		}
		switchtab();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);
		attachfile(topic.AttachFilesbutton, filePath);
		Thread.sleep(2000);
		attachfile(topic.AttachFilesbutton, filePath1);
		Thread.sleep(2000);
		attachfile(topic.AttachFilesbutton, filePath2);
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		
		if(Graphicsfiletype.contains(filetype.toUpperCase())){
			Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedGraphicsfile(filename)));
		}else{
			Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedNongraphicsfile(filename)));
		}System.out.println("pass1");
		if(Graphicsfiletype.contains(filetype1.toUpperCase())){
			Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedGraphicsfile(filename1)));
		}else{
			Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedNongraphicsfile(filename1)));
		}System.out.println("pass2");
		if(Graphicsfiletype.contains(filetype2.toUpperCase())){
			Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedGraphicsfile(filename2)));
		}else{
			Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedNongraphicsfile(filename2)));
		}System.out.println("pass3");

		driver.navigate().to((String) Credential.get("FrontendURL"));
		
		
	}
	
	@AfterClass
	public void logoutFromApp() throws InterruptedException{
		Frontendlogin.logoutFromApp();
		switchtab();
		Backendlogin.logoutFromApp();
		switchtab();
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
