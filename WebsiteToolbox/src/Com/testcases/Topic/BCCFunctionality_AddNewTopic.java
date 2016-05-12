package Com.testcases.Topic;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.testcases.Login.Frontendlogin;

public class BCCFunctionality_AddNewTopic extends baseClass{
	
	String username, password;
	String subject, message, category,verifyMessage;
	int rowNum=30;

	@BeforeClass
	public void loginToApp() throws IOException, InterruptedException {
		username=username("EditorActions", rowNum, 1);
		password=password("EditorActions", rowNum, 2);
		
		Frontendlogin.loginToApp(username, password);

	}
	
	@Test
	public void addNewTopicwithBold() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		int rowNum1=rowNum;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		verifyMessage = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//span/b[text()='"+ verifyMessage + "']")));
		Thread.sleep(2000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@Test
	public void addNewTopicwithItalic() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		int rowNum1=rowNum+1;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		verifyMessage = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//span/i[text()='"+ verifyMessage + "']")));
		Thread.sleep(2000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@Test
	public void addNewTopicwithUnderline() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		int rowNum1=rowNum+2;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		verifyMessage = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//span/u[text()='"+ verifyMessage + "']")));
		Thread.sleep(2000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@Test
	public void addNewTopicwithStrikethrough() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		int rowNum1=rowNum+3;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		verifyMessage = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(driver.findElement(By.xpath("//*[@style='text-decoration:line-through;']")).getText().contains(verifyMessage));
		Thread.sleep(2000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@Test
	public void addNewTopicwithSize() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		int rowNum1=rowNum+4;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		verifyMessage = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//span/b[text()='"+ verifyMessage + "']")));
		Thread.sleep(2000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@Test
	public void addNewTopicwithLink() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
		int rowNum1=rowNum+5;
		subject = readExcel("EditorActions").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("EditorActions").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("EditorActions").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		verifyMessage = readExcel("EditorActions").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//span/a[text()='"+ verifyMessage + "']")));
		Thread.sleep(2000);
		String parentWindow = driver.getWindowHandle();
		driver.findElement(By.xpath("//span/a[text()='"+ verifyMessage + "']")).click();
		for(String childWindow : driver.getWindowHandles()){
			driver.switchTo().window(childWindow);
		}
		Assert.assertTrue(driver.getTitle().contains(verifyMessage));
		driver.findElement(By.cssSelector("Body")).sendKeys(Keys.CONTROL+"W");
		driver.switchTo().window(parentWindow);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);
		
	}
	
	@AfterClass
	public void logoutFromApp() throws InterruptedException{
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
