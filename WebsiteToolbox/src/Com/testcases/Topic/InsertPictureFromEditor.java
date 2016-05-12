package Com.testcases.Topic;

import java.awt.AWTException;
import java.io.IOException;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.EditorPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class InsertPictureFromEditor extends baseClass{
	
	String username, password;
	static String portalUser, portalPwd;
	String subject, message, category, filetype, filePath, filename, webUrl, link;
	int rowNum=15;

	@BeforeClass
	public void loginToApp() throws IOException, InterruptedException {
		BackendSettingspageObjects backend = new BackendSettingspageObjects();
		username=username("EditorActions", rowNum, 1);
		password=password("EditorActions", rowNum, 2);
		portalUser=username("BackendLogin", 1, 1);
		portalPwd=password("BackendLogin", 1, 2);
		Frontendlogin.loginToApp(username, password);
		switchtab();
		Backendlogin.LoginToAPP(portalUser, portalPwd);
		backend.settings.click();
		Thread.sleep(2000);
		backend.fileUploadingSubmenu.click();
		switchtab();
		

	}
	@Test
	//test case to insert picture in the middle of text while adding new topic and verify inserted picture and message on post page
	public void insertPicturefromDesktop_middleofText() throws IOException, InterruptedException, AWTException{
		EditorPageObjects editor = new EditorPageObjects();
		AddNewTopicandReplyTopic picture = new AddNewTopicandReplyTopic();
		
		subject = readExcel("EditorActions").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("EditorActions").getRow(rowNum).getCell(8).getStringCellValue();
		filePath = readExcel("EditorActions").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filename = readExcel("EditorActions").getRow(rowNum).getCell(7)
				.getStringCellValue();
		String message1 = readExcel("EditorActions").getRow(rowNum).getCell(9)
				.getStringCellValue();
		VerifyUploadAttachment_forumSettings.selectFileType(filetype);
		
		FrontendaddNewTopic.gotoNewTopicpage();
		
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);

		JavascriptExecutor executor = (JavascriptExecutor)driver;
		executor.executeScript("window.scrollTo(250, 0)");
		attachPicture(editor.insertPhotoIcon_Editor, picture.InsertPhotoPopup, picture.Browserbutton, picture.InsertImagebutton, filePath);
		Thread.sleep(3000);
		driver.switchTo().frame(picture.messageBody);
		picture.messagetextfield.sendKeys(message1);
		driver.switchTo().defaultContent();	
		Thread.sleep(3000);
		picture.postNewTopicbutton.click();		
		Thread.sleep(5000);

		Assert.assertTrue(picture.VerifyPostedTopic.getText().contains(message));
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//img[@alt='"+filename+"']")));
		Assert.assertTrue(picture.VerifyPostedTopic.getText().contains(message1));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
	
	//@Test
	public void insertPicturewithVideolink() throws IOException, InterruptedException, AWTException{
		EditorPageObjects editor = new EditorPageObjects();
		AddNewTopicandReplyTopic picture = new AddNewTopicandReplyTopic();
		
		subject = readExcel("EditorActions").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("EditorActions").getRow(rowNum).getCell(6).getStringCellValue();
		filePath = readExcel("EditorActions").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filename = readExcel("EditorActions").getRow(rowNum).getCell(7)
				.getStringCellValue();
		String videoLink = readExcel("EditorActions").getRow(rowNum).getCell(9)
				.getStringCellValue();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);

		JavascriptExecutor executor = (JavascriptExecutor)driver;
		executor.executeScript("window.scrollTo(250, 0)");
		attachPicture(editor.insertPhotoIcon_Editor, picture.InsertPhotoPopup, picture.Browserbutton, picture.InsertImagebutton, filePath);
		Thread.sleep(3000);
		
		picture.postNewTopicbutton.click();		
		Thread.sleep(5000);

		Assert.assertTrue(picture.VerifyPostedTopic.getText().contains(message));
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//img[@alt='"+filename+"']")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
	
	
	
	
	@AfterClass
	public void logoutFromApp(){
		Frontendlogin.logoutFromApp();
	}

}
