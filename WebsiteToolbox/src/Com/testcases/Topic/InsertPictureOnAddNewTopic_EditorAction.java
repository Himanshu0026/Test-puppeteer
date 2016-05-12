package Com.testcases.Topic;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.IOException;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.EditorPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class InsertPictureOnAddNewTopic_EditorAction extends baseClass{
	
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
	
	 @Test(priority=0)
	 //test case to check Upload option on insert picture pop up window after disabling Attachment check box from file Uploading settings in backend 
		public void verifyInsertPictureoptionOnPopupfromEditor_afterdisabelingAttachment() throws InterruptedException, AWTException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();
			
			VerifyUploadAttachment_forumSettings.DisableAttachmentCheckboxfromBackend();

			FrontendaddNewTopic.gotoNewTopicpage();
			
			editor.insertPhotoIcon_Editor.click();
			topic.InsertPhotoPopup.click();
			
			Assert.assertFalse(verifyPresenceOfElement(editor.UploadTab_InsertPhotoPopup));		
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
			
		
		}
	 
		@Test(priority=1)
		//test case to insert picture of file type JPG and verify picture on post page after adding new topic
		public void verifyInsertPicture_FiletypeJPG() throws InterruptedException, AWTException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();

			subject = readExcel("EditorActions").getRow(rowNum).getCell(3)
					.getStringCellValue();
			message = readExcel("EditorActions").getRow(rowNum).getCell(4)
					.getStringCellValue();
			category = readExcel("EditorActions").getRow(rowNum).getCell(5)
					.getStringCellValue();
			filePath = readExcel("EditorActions").getRow(rowNum).getCell(6)
					.getStringCellValue();
			filename = readExcel("EditorActions").getRow(rowNum).getCell(7)
					.getStringCellValue();
			
			VerifyUploadAttachment_forumSettings.selectFileType("jpg");

			FrontendaddNewTopic.gotoNewTopicpage();
			
			attachPicture(editor.insertPhotoIcon_Editor, topic.InsertPhotoPopup, topic.Browserbutton, topic.InsertImagebutton, filePath);
			
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			
			topic.postNewTopicbutton.click();		
			Thread.sleep(3000);
			Assert.assertTrue(verifyPresenceOfElement(By
					.xpath("//*[@alt='"+filename+"']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		
		@Test(priority=2)
		//test case to insert picture of file type PNG and verify picture on post page after adding new topic
		public void verifyInsertPicture_FiletypePNG() throws InterruptedException, AWTException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();
			int rowNum1 = rowNum+1;
			subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
					.getStringCellValue();
			message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
					.getStringCellValue();
			category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
					.getStringCellValue();
			filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
					.getStringCellValue();
			filename = readExcel("EditorActions").getRow(rowNum1).getCell(7)
					.getStringCellValue();

			VerifyUploadAttachment_forumSettings.selectFileType("png");

			FrontendaddNewTopic.gotoNewTopicpage();
			
			attachPicture(editor.insertPhotoIcon_Editor, topic.InsertPhotoPopup, topic.Browserbutton, topic.InsertImagebutton, filePath);
			
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			
			topic.postNewTopicbutton.click();		
			Thread.sleep(3000);
			Assert.assertTrue(verifyPresenceOfElement(By
					.xpath("//*[@alt='"+filename+"']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		
		@Test(priority=3)
		//test case to insert picture of file type BMP and verify picture on post page after adding new topic
		public void verifyInsertPicture_FiletypeBMP() throws InterruptedException, AWTException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();

			int rowNum1 = rowNum+2;
			subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
					.getStringCellValue();
			message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
					.getStringCellValue();
			category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
					.getStringCellValue();
			filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
					.getStringCellValue();
			filename = readExcel("EditorActions").getRow(rowNum1).getCell(7)
					.getStringCellValue();

			VerifyUploadAttachment_forumSettings.selectFileType("bmp");

			FrontendaddNewTopic.gotoNewTopicpage();
			
			attachPicture(editor.insertPhotoIcon_Editor, topic.InsertPhotoPopup, topic.Browserbutton, topic.InsertImagebutton, filePath);
			
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			
			topic.postNewTopicbutton.click();		
			Thread.sleep(3000);
			Assert.assertTrue(verifyPresenceOfElement(By
					.xpath("//*[@alt='"+filename+"']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		
		@Test(priority=4)
		//test case to insert picture of file type PSD and verify picture on post page after adding new topic
		public void verifyInsertPicture_FiletypePSD() throws InterruptedException, AWTException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();

			int rowNum1 = rowNum+3;
			subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
					.getStringCellValue();
			message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
					.getStringCellValue();
			category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
					.getStringCellValue();
			filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
					.getStringCellValue();
			filename = readExcel("EditorActions").getRow(rowNum1).getCell(7)
					.getStringCellValue();

			VerifyUploadAttachment_forumSettings.selectFileType("psd");

			FrontendaddNewTopic.gotoNewTopicpage();
			
			attachPicture(editor.insertPhotoIcon_Editor, topic.InsertPhotoPopup, topic.Browserbutton, topic.InsertImagebutton, filePath);
			
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			
			topic.postNewTopicbutton.click();		
			Thread.sleep(3000);
			Assert.assertTrue(verifyPresenceOfElement(By
					.xpath("//*[@alt='"+filename+"']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		
		@Test(priority=5)
		//test case to insert picture of file type GIF and verify picture on post page after adding new topic
		public void verifyInsertPicture_FiletypeGIF() throws InterruptedException, AWTException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();

			int rowNum1 = rowNum+4;
			subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
					.getStringCellValue();
			message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
					.getStringCellValue();
			category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
					.getStringCellValue();
			filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
					.getStringCellValue();
			filename = readExcel("EditorActions").getRow(rowNum1).getCell(7)
					.getStringCellValue();

			VerifyUploadAttachment_forumSettings.selectFileType("gif");

			FrontendaddNewTopic.gotoNewTopicpage();
			
			attachPicture(editor.insertPhotoIcon_Editor, topic.InsertPhotoPopup, topic.Browserbutton, topic.InsertImagebutton, filePath);
			
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			
			topic.postNewTopicbutton.click();		
			Thread.sleep(3000);
			Assert.assertTrue(verifyPresenceOfElement(By
					.xpath("//*[@alt='"+filename+"']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		
		@Test(priority=6)
		//test case to insert picture of file type JPE and verify picture on post page after adding new topic
		public void verifyInsertPicture_FiletypeJPE() throws InterruptedException, AWTException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();

			int rowNum1 = rowNum+5;
			subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
					.getStringCellValue();
			message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
					.getStringCellValue();
			category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
					.getStringCellValue();
			filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
					.getStringCellValue();
			filename = readExcel("EditorActions").getRow(rowNum1).getCell(7)
					.getStringCellValue();

			VerifyUploadAttachment_forumSettings.selectFileType("jpe");

			FrontendaddNewTopic.gotoNewTopicpage();
			
			attachPicture(editor.insertPhotoIcon_Editor, topic.InsertPhotoPopup, topic.Browserbutton, topic.InsertImagebutton, filePath);
			
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			
			topic.postNewTopicbutton.click();		
			Thread.sleep(3000);
			Assert.assertTrue(verifyPresenceOfElement(By
					.xpath("//*[@alt='"+filename+"']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		
		@Test(priority=7)
		//test case to insert picture of file type JPEG and verify picture on post page after adding new topic
		public void verifyInsertPicture_FiletypeJPEG() throws InterruptedException, AWTException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();

			int rowNum1 = rowNum+6;
			subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
					.getStringCellValue();
			message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
					.getStringCellValue();
			category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
					.getStringCellValue();
			filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
					.getStringCellValue();
			filename = readExcel("EditorActions").getRow(rowNum1).getCell(7)
					.getStringCellValue();

			VerifyUploadAttachment_forumSettings.selectFileType("jpeg");

			FrontendaddNewTopic.gotoNewTopicpage();
			
			attachPicture(editor.insertPhotoIcon_Editor, topic.InsertPhotoPopup, topic.Browserbutton, topic.InsertImagebutton, filePath);
			
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			
			topic.postNewTopicbutton.click();		
			Thread.sleep(3000);
			Assert.assertTrue(verifyPresenceOfElement(By
					.xpath("//*[@alt='"+filename+"']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}	
		
		
		@Test(priority=8)
		public void InsertPicturewithwebAddressfromEditor() throws InterruptedException, AWTException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();
			int rowNum1 = rowNum+7;
			subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
					.getStringCellValue();
			message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
					.getStringCellValue();
			category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
					.getStringCellValue();
			webUrl=readExcel("EditorActions").getRow(rowNum1).getCell(6).getStringCellValue();

			// put path to your image in a clipboard
			StringSelection fil = new StringSelection(webUrl);
			Toolkit.getDefaultToolkit().getSystemClipboard().setContents(fil, null);
			Robot robot=new Robot();
			
			FrontendaddNewTopic.gotoNewTopicpage();
			
			editor.insertPhotoIcon_Editor.click();
			topic.InsertPhotoPopup.click();
			driver.findElement(By.id("web")).click();
			Thread.sleep(3000);
			driver.findElement(By.id("web_image_url")).click();
			robot.keyPress(KeyEvent.VK_CONTROL);
			robot.keyPress(KeyEvent.VK_V);
			robot.keyRelease(KeyEvent.VK_V);
			robot.keyRelease(KeyEvent.VK_CONTROL);
			Thread.sleep(7000);
			clickElement(topic.InsertImagebutton);
			
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			
			topic.postNewTopicbutton.click();
			Thread.sleep(3000);
			Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[@src='"+webUrl+"']")));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
		
		}

	
	
	@Test(priority=9)
	//test case to insert picture in the middle of text while adding new topic and verify inserted picture and message on post page
	public void insertPicturefromDesktop_middleofText() throws IOException, InterruptedException, AWTException{
		EditorPageObjects editor = new EditorPageObjects();
		AddNewTopicandReplyTopic picture = new AddNewTopicandReplyTopic();
		int rowNum1 = rowNum+8;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		filetype = readExcel("EditorActions").getRow(rowNum1).getCell(8).getStringCellValue();
		filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		filename = readExcel("EditorActions").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		String message1 = readExcel("EditorActions").getRow(rowNum1).getCell(9)
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
	
	@Test(priority=10)
	public void insertPicturewithVideolink() throws IOException, InterruptedException, AWTException{
		EditorPageObjects editor = new EditorPageObjects();
		AddNewTopicandReplyTopic picture = new AddNewTopicandReplyTopic();
		int rowNum1=rowNum+9;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		filetype = readExcel("EditorActions").getRow(rowNum1).getCell(8).getStringCellValue();
		filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		filename = readExcel("EditorActions").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		String videoLink = readExcel("EditorActions").getRow(rowNum1).getCell(9)
				.getStringCellValue();
		String siteURL = readExcel("EditorActions").getRow(rowNum1).getCell(10)
				.getStringCellValue();
		
		VerifyUploadAttachment_forumSettings.selectFileType(filetype);
		
		FrontendaddNewTopic.gotoNewTopicpage();
		
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);

		JavascriptExecutor executor = (JavascriptExecutor)driver;
		executor.executeScript("window.scrollTo(250, 0)");
		attachPicture(editor.insertPhotoIcon_Editor, picture.InsertPhotoPopup, picture.Browserbutton, picture.InsertImagebutton, filePath);
		Thread.sleep(3000);
		editor.insertVideo_Editor.click();
		editor.insertVideo_popUp.click();
		editor.insertVideo_textfield.clear();
		editor.insertVideo_textfield.sendKeys(videoLink);
		editor.insertURL_button.click();
		
		Thread.sleep(3000);
		picture.postNewTopicbutton.click();		
		Thread.sleep(5000);
		System.out.println(picture.VerifyPostedTopic.getText());
		Assert.assertTrue(picture.VerifyPostedTopic.getText().contains(message));
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//img[@alt='"+filename+"']")));
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//iframe[contains(@src,'"+siteURL+"') and contains(@src,'video')]")));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
	
	
	@Test(priority = 11)
	// method to verify Alert while uploading invalid graphics file type on add new Topic page
		public void VerifyErrormessageWhileInsertinginvalidGraphicsFile()
				throws InterruptedException, AWTException, IOException {
			int rowNum1=rowNum+10;
			filetype = readExcel("EditorActions").getRow(rowNum1).getCell(8)
					.getStringCellValue();
			filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
					.getStringCellValue();
			String errorMessage = readExcel("EditorActions").getRow(rowNum1).getCell(9)
					.getStringCellValue();

			switchtab();
			BackendSettingspageObjects backend = new BackendSettingspageObjects();
			EnableorDisable_Checkbox(backend.Attachments_checkbox, true);
			String fileType = backend.fileTypetextfield.getText().toLowerCase();
			if (fileType.contains(filetype)) {
				fileType = fileType.replace(filetype.toLowerCase(), "");
				backend.fileTypetextfield.clear();
				backend.fileTypetextfield.sendKeys(fileType);
			}
			backend.SaveButton.click();
			Thread.sleep(3000);
			switchtab();

			driver.navigate().refresh();
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			FrontendaddNewTopic.gotoNewTopicpage();
			attachPicture(topic.InsertPhotoIcon, topic.InsertPhotoPopup,
					topic.Browserbutton, topic.InsertImagebutton, filePath);
			topic.InsertPhotoPopup.click();
			Assert.assertTrue(topic.errorMessage_insertPicture.getText().contains(errorMessage));
			driver.findElement(By.id("bootstrap_close_insert_image_dialog"))
					.click();

			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);

		}
	
	@Test(priority = 12)
	// method to verify Alert while inserting invalid files on add new Topic page
		public void VerifyErrormessageWhileInsertingNonGraphicsFile()
				throws InterruptedException, AWTException, IOException {
		int rowNum1=rowNum+11;
			filetype = readExcel("EditorActions").getRow(rowNum1).getCell(8)
					.getStringCellValue();
			filePath = readExcel("EditorActions").getRow(rowNum1).getCell(6)
					.getStringCellValue();
			String errorMessage = readExcel("EditorActions").getRow(rowNum1).getCell(9)
					.getStringCellValue();
	
			VerifyUploadAttachment_forumSettings.selectFileType(filetype);
			driver.navigate().refresh();
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			FrontendaddNewTopic.gotoNewTopicpage();
			attachPicture(topic.InsertPhotoIcon, topic.InsertPhotoPopup,
					topic.Browserbutton, topic.InsertImagebutton, filePath);
			topic.InsertPhotoPopup.click();

			Assert.assertTrue(topic.errorMessage_insertPicture.getText().contains(errorMessage));
			driver.findElement(By.id("bootstrap_close_insert_image_dialog"))
					.click();

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
