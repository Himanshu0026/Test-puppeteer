package Com.testcases.Topic;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.EditorPageObjects;
import Com.testcases.Login.Frontendlogin;

public class InsertCodeQuoteandEmotionsfromEditor extends baseClass {
	String username, password;
	String subject, message, category, code;
	int rowNum=23;
	
	@BeforeClass
	public void loginToApp() throws IOException, InterruptedException{
		username=username("UploadFile&Editor", rowNum, 1);
		password=password("UploadFile&Editor", rowNum, 2);
		
		Frontendlogin.loginToApp(username, password);
	}

	@Test(priority=0)
	//Insert code by clicking on Code icon from editor and verify code after adding new topic
		public void insertCodeandVerifyCode() throws InterruptedException, IOException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();
			
			subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3).getStringCellValue();
			message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4).getStringCellValue();
			category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5).getStringCellValue();
			code = readExcel("UploadFile&Editor").getRow(rowNum).getCell(7).getStringCellValue();

			FrontendaddNewTopic.gotoNewTopicpage();
			Thread.sleep(3000);
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			JavascriptExecutor executor=(JavascriptExecutor)driver;
			executor.executeScript("window.scrollTo(250, 0)");
			editor.insertCode_icon.click();
			editor.insertCode_popUp.click();
			editor.insertCode_textfield.sendKeys(code);
			editor.insertCode_OKbutton.click();
			Thread.sleep(2000);
			topic.postNewTopicbutton.click();
			Thread.sleep(5000);
			
			Assert.assertTrue(editor.CodeRectangularbox.getText().contains(code));
			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);

	}
	
		@Test(priority=1)
		//Wrap code against selected text by clicking on Code icon from editor and verify code after adding new topic
		public void wrapCodagainstMessageandVerify() throws IOException, InterruptedException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();
			int rowNum1=rowNum+1;
			subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3).getStringCellValue();
			message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4).getStringCellValue();
			category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5).getStringCellValue();

			FrontendaddNewTopic.gotoNewTopicpage();
			Thread.sleep(3000);
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			JavascriptExecutor executor=(JavascriptExecutor)driver;
			executor.executeScript("window.scrollTo(250, 0)");
			
			driver.switchTo().frame(topic.messageBody);
			topic.messagetextfield.sendKeys(Keys.CONTROL,"a");
			driver.switchTo().defaultContent();
			
			editor.insertCode_icon.click();
			Thread.sleep(3000);
			topic.postNewTopicbutton.click();
			Thread.sleep(3000);
			System.out.println(editor.CodeRectangularbox.getText());
			Assert.assertTrue(editor.CodeRectangularbox.getText().contains(message));
			
			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);
		}
		
	@Test(priority=2)
	//Wrap Quote against selected text by clicking on Quote icon from editor and verify Quoted text after adding new topic
	public void quoteMessageandVeifyQuote() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		int rowNum1=rowNum+2;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3).getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4).getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5).getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		JavascriptExecutor executor=(JavascriptExecutor)driver;
		executor.executeScript("window.scrollTo(250, 0)");
		
		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL,"a");
		driver.switchTo().defaultContent();
		
		editor.wrapQuotetag_icon.click();
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		
		System.out.println(editor.QuotedMessage.getText());
		Assert.assertTrue(editor.QuotedMessage.getText().contains(message));

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	}
	
	
	@Test(priority=3)
		//Insert emotion from editor and verify inserted emotion in message field and also verify emotions after adding new topic
		public void insertEmotionsandVerifyaddedEmotions() throws IOException, InterruptedException{
			AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
			EditorPageObjects editor =  new EditorPageObjects();
			int rowNum1=rowNum+3;
			subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3).getStringCellValue();
			message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4).getStringCellValue();
			category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5).getStringCellValue();
			String emotion1 =readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6).getStringCellValue();
			String emotion2 = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7).getStringCellValue();
			
			FrontendaddNewTopic.gotoNewTopicpage();
			Thread.sleep(3000);
			FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
			JavascriptExecutor executor=(JavascriptExecutor)driver;
			executor.executeScript("window.scrollTo(250, 0)");

			editor.insertEmotionsIcon.click();
			editor.EmotionPopUp.click();
			Thread.sleep(3000);
			driver.findElement(By.xpath("//*[text()='"+emotion1+"']")).click();
			Thread.sleep(3000);
			driver.findElement(By.xpath("//*[text()='"+emotion2+"']")).click();
			
			editor.closeEmotionPopUp.click();
			Thread.sleep(3000);
			driver.switchTo().frame(topic.messageBody);
			Assert.assertTrue(editor.emotion1.getAttribute("title").contains(emotion1));
			Assert.assertTrue(editor.emotion2.getAttribute("title").contains(emotion2));
			driver.switchTo().defaultContent();

			topic.postNewTopicbutton.click();
			Thread.sleep(3000);
			Assert.assertTrue(editor.postedEmotion1.getAttribute("title").contains(emotion1));
			Assert.assertTrue(editor.postedEmotion2.getAttribute("title").contains(emotion2));

			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);
		}
	
	@AfterClass
	public void logoutFromApp(){
		Frontendlogin.logoutFromApp();
	}
		
	
	
	
}
