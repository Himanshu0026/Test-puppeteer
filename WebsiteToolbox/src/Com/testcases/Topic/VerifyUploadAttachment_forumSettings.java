package Com.testcases.Topic;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.IOException;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
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

public class VerifyUploadAttachment_forumSettings extends baseClass {

	String username, password;
	String subject, message, category, filetype, filePath, filename, webUrl;
	int rowNum;

	@BeforeClass
	public void loginToApp() throws InterruptedException, IOException{
		BackendSettingspageObjects backend = new BackendSettingspageObjects();
		String portalUser = username("BackendLogin", 1, 1);
		String portalPwd = password("BackendLogin", 1, 2);
		username=username("UploadFile&Editor", 1, 1);
		password=password("UploadFile&Editor", 1, 2);
		
		Frontendlogin.loginToApp(username, password);
		switchtab();
		Backendlogin.LoginToAPP(portalUser, portalPwd);
		backend.settings.click();
		Thread.sleep(2000);
		backend.fileUploadingSubmenu.click();
		switchtab();
	}
	
	@Test(priority = 0)
	// method to disable Attachment checkbox present under Upload Attachment submenu section in backend
	public static void DisableAttachmentCheckboxfromBackend()
			throws InterruptedException, IOException {
		
		BackendSettingspageObjects backend = new BackendSettingspageObjects();
		switchtab();
		EnableorDisable_Checkbox(backend.Attachments_checkbox, false);
		Thread.sleep(3000);
		backend.SaveButton.click();

		Thread.sleep(3000);
		switchtab();

	}

	@Test(priority = 1)
	// method to verify presence of attach file icon and Insert image icon on Add new post page after disabling attachment checkbox
	public void VerifyuploadAttachmentOptiononAddNewTapicpage()
			throws InterruptedException {
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		FrontendaddNewTopic.gotoNewTopicpage();

		Assert.assertFalse(verifyPresenceOfElement(topic.Attachfilebutton_xpath));
		Assert.assertFalse(verifyPresenceOfElement(topic.InsertPhotoIcon_id));

		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	@Test(priority = 2)
	// method to verify presence of attach file icon and Insert image icon while  replying any post after disabling Attachment checkbox
	public void VerifyuploadAttachmentOptiononPostpage()
			throws InterruptedException {
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		driver.navigate().refresh();

		topic.firstTopicInList.click();
		Actions action = new Actions(driver);
		action.moveToElement(topic.RepliedTextarea).build();
		topic.RepliedTextarea.click();
		action.build().perform();
		Thread.sleep(3000);

		Assert.assertFalse(verifyPresenceOfElement(topic.Attachfilebutton_xpath));
		Assert.assertFalse(verifyPresenceOfElement(topic.InsertPhotoIcon_id));

		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	// method to check upload attachment of any documents file after adding any documents file type in backend
	@Test(priority = 3)
	public void uploadandverifyDocumentfile() throws InterruptedException,
			AWTException, IOException {
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		rowNum = 1;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum).getCell(8)
				.getStringCellValue();

		selectFileType(filetype);
		driver.navigate().refresh();
		addNewTopicwithAttachment(subject, message, category, filePath);

		Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedNongraphicsfile(filename)));
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	// method to check upload attachment of Multimedia file after adding any Multimedia file type in backend
	@Test(priority = 4)
	public void uploadandverifyMultimediafile() throws InterruptedException,
			AWTException, IOException {
		rowNum = 2;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum).getCell(8)
				.getStringCellValue();

		selectFileType(filetype);
		driver.navigate().refresh();
		addNewTopicwithAttachment(subject, message, category, filePath);

		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[text()='"
				+ filename + "']")));
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	// method to check upload attachment of Archives file after adding any Archives file type in backend
	@Test(priority = 5)
	public void uploadandverifyArchivesfile() throws InterruptedException,
			AWTException, IOException {
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		rowNum = 3;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum).getCell(8)
				.getStringCellValue();

		selectFileType(filetype);
		driver.navigate().refresh();
		addNewTopicwithAttachment(subject, message, category, filePath);

		Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedNongraphicsfile(filename)));
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	// method to check upload attachment of graphics file after adding any graphics file type in backend
	@Test(priority = 6)
	public void uploadandverifyGraphicsfile() throws InterruptedException,
			AWTException, IOException {
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		int rowNum = 4;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum).getCell(8)
				.getStringCellValue();

		selectFileType(filetype);
		driver.navigate().refresh();
		addNewTopicwithAttachment(subject, message, category, filePath);

		Assert.assertTrue(verifyPresenceOfElement(topic.postAttachedGraphicsfile(filename)));
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}  

	// method to verify Alert while uploading invalid files on add new Topic page
	@Test(priority = 7)
	public void VerifyErrormessagewhileUploadinginvalidFile()
			throws InterruptedException, AWTException, IOException {
		rowNum = 5;
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum).getCell(8)
				.getStringCellValue();
		String errorMessage1 = readExcel("UploadFile&Editor").getRow(rowNum).getCell(9)
				.getStringCellValue();
		String errorMessage2 = readExcel("UploadFile&Editor").getRow(rowNum).getCell(10)
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
		fileType = backend.fileTypetextfield.getText().toLowerCase();
		String fileType_modified = fileType.replace(" ", ",");
		System.out.println(fileType_modified);
		
		backend.SaveButton.click();
		Thread.sleep(3000);
		switchtab();

		driver.navigate().refresh();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		FrontendaddNewTopic.gotoNewTopicpage();
		attachfile(topic.AttachFilesbutton, filePath);
		Thread.sleep(5000);
		Alert alert = driver.switchTo().alert();
		String errorMsg=errorMessage1+filename+" "+errorMessage2+" "+fileType_modified;
		String alertMessage = alert.getText();
		alert.accept();
		Assert.assertTrue(alertMessage.contains(errorMsg));
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	// method to check attachment of any picture after adding any graphics file type in backend
	@Test(priority = 8)
	public void insertandverifyInsertedGraphicsFile()
			throws InterruptedException, AWTException, IOException {
		rowNum = 10;
		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum).getCell(8)
				.getStringCellValue();

		selectFileType(filetype);
		driver.navigate().refresh();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		FrontendaddNewTopic.selectCategory(category);
		topic.StartnewTopicbutton.click();

		attachPicture(topic.InsertPhotoIcon, topic.InsertPhotoPopup,
				topic.Browserbutton, topic.InsertImagebutton, filePath);
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);

		Assert.assertTrue(verifyPresenceOfElement(By.id("attachment_list")));
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);

		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[(@alt='"
				+ filename + "') and (@class='bbc_img')]")));
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	// method to verify Alert while inserting invalid files on add new Topic page
	@Test(priority = 9)
	public void VerifyErrormessagewhileInsertinginvalidFile()
			throws InterruptedException, AWTException, IOException {
		rowNum = 12;
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum).getCell(8)
				.getStringCellValue();
		selectFileType(filetype);
		driver.navigate().refresh();
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		FrontendaddNewTopic.gotoNewTopicpage();
		attachPicture(topic.InsertPhotoIcon, topic.InsertPhotoPopup,
				topic.Browserbutton, topic.InsertImagebutton, filePath);
		topic.InsertPhotoPopup.click();
		Assert.assertTrue(driver.findElement(By.id("imagesError"))
				.isDisplayed());
		driver.findElement(By.id("bootstrap_close_insert_image_dialog"))
				.click();

		driver.navigate().to((String) Credential.get("FrontendURL"));

	}

	// method to verify Alert while uploading invalid graphics file type on add new Topic page
	@Test(priority = 10)
	public void VerifyErrormessageWhileInsertinginvalidGraphicsFile()
			throws InterruptedException, AWTException, IOException {
		rowNum = 11;
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();
		filetype = readExcel("UploadFile&Editor").getRow(rowNum).getCell(6)
				.getStringCellValue();
		filePath = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7)
				.getStringCellValue();
		filename = readExcel("UploadFile&Editor").getRow(rowNum).getCell(8)
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
		Assert.assertTrue(driver.findElement(By.id("imagesError"))
				.isDisplayed());
		Thread.sleep(3000);
		driver.findElement(By.id("bootstrap_close_insert_image_dialog"))
				.click();

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);

	}
	
	
	// method to verify Alert while uploading invalid graphics file type on add new Topic page
		@Test(priority = 11)
		public void InsertImagethroughWebURLandVerifyImage()
				throws InterruptedException, AWTException, IOException {
			rowNum = 13;
			subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
					.getStringCellValue();
			message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
					.getStringCellValue();
			category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
					.getStringCellValue();
			webUrl=readExcel("UploadFile&Editor").getRow(rowNum).getCell(7).getStringCellValue();

			// put path to your image in a clipboard
			StringSelection fil = new StringSelection(webUrl);
			Toolkit.getDefaultToolkit().getSystemClipboard().setContents(fil, null);
			
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

			FrontendaddNewTopic.gotoNewTopicpage();
			
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			Robot robot=new Robot();
			topic.InsertPhotoIcon.click();
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
			
			topic.postNewTopicbutton.click();
			Thread.sleep(3000);
			Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[@href='"+webUrl+"']")));

			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);


		}
	
	

	// method to add desired file type in File TYpe textfield after enabling Attachment checkbox
	public static void selectFileType(String filetype) throws InterruptedException {
		BackendSettingspageObjects backend = new BackendSettingspageObjects();
		switchtab();

		EnableorDisable_Checkbox(backend.Attachments_checkbox, true);
		String fileType = backend.fileTypetextfield.getText().toLowerCase();

		if (!(fileType.contains(filetype))) {
			backend.BrowseFileTypeLink.click();
			Thread.sleep(2000);
			try {
				driver.switchTo().alert().accept();
				Thread.sleep(3000);
			} catch (Exception e) {
				e.getMessage();
			}
			clickElement(driver.findElement(By.xpath("//*[text()='"
					+ filetype.toUpperCase() + "']")));
		}

		Thread.sleep(3000);
		backend.SaveButton.click();
		Thread.sleep(3000);
		switchtab();
	}

	public static void addNewTopicwithAttachment(String subject, String message,
			String category, String filePath) throws InterruptedException,
			AWTException {

		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		FrontendaddNewTopic.gotoNewTopicpage();

		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		attachfile(topic.AttachFilesbutton, filePath);
		Thread.sleep(3000);

		Assert.assertTrue(verifyPresenceOfElement(By.id("attachment_list")));
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);

	}
	
	@AfterClass
	public void LogoutFromApp() throws InterruptedException{
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
