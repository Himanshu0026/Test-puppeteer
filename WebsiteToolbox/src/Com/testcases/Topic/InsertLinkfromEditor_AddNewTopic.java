package Com.testcases.Topic;

import java.io.IOException;

import org.openqa.selenium.Alert;
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

public class InsertLinkfromEditor_AddNewTopic extends baseClass{
	
	String username, password;
	static String portalUser, portalPwd;
	String subject, message, category, filetype, filePath, filename, webUrl, link;
	int rowNum=16;

	@BeforeClass
	public void loginToApp() throws IOException, InterruptedException {
		username=username("UploadFile&Editor", rowNum, 1);
		password=password("UploadFile&Editor", rowNum, 2);
		
		Frontendlogin.loginToApp(username, password);

	}


	@Test(priority=0)
	public void verifyPageafterAddingLinkfromEditor() throws InterruptedException, IOException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		
		int rowNum1 = rowNum;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		link = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		String pageTile = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(8)
				.getStringCellValue();
		FrontendaddNewTopic.gotoNewTopicpage();
		
		editor.insertLink_Editor.click();
		Alert alert=driver.switchTo().alert();
		alert.sendKeys(link);
		alert.accept();
		Thread.sleep(3000);
		
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		
		topic.postNewTopicbutton.click();
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[@href='"+link+"']")));
		
		String parentWindow=driver.getWindowHandle();
		driver.findElement(By.xpath("//*[@href='"+link+"']")).click();
		for(String childWindow : driver.getWindowHandles()){
			driver.switchTo().window(childWindow);
		}
		Assert.assertTrue(driver.getTitle().contains(pageTile));
		driver.findElement(By.cssSelector("body")).sendKeys(Keys.CONTROL,"w");
		driver.switchTo().window(parentWindow);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	@Test(priority=1)
	public void verifyPageafterAddingLinkOnMessagetext() throws InterruptedException, IOException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		
		int rowNum1 = rowNum+1;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		link = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		String pageTile = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(8)
				.getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		JavascriptExecutor executor=(JavascriptExecutor)driver;
		executor.executeScript("window.scrollTo(250, 0)");

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL,"a");
		driver.switchTo().defaultContent();
		editor.insertLink_Editor.click();
		Alert alert=driver.switchTo().alert();
		alert.sendKeys(link);
		alert.accept();
		Thread.sleep(3000);
		
		topic.postNewTopicbutton.click();
		
		String parentWindow=driver.getWindowHandle();
		driver.findElement(By.xpath("//*[text()='"+message+"']")).click();
		for(String childWindow : driver.getWindowHandles()){
			driver.switchTo().window(childWindow);
		}
		Assert.assertTrue(driver.getTitle().contains(pageTile));
		driver.findElement(By.cssSelector("body")).sendKeys(Keys.CONTROL,"w");
		driver.switchTo().window(parentWindow);
		Thread.sleep(2000);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
	
	@AfterClass
	public void logoutFromApp(){
		Frontendlogin.logoutFromApp();
	}
	
	
}
