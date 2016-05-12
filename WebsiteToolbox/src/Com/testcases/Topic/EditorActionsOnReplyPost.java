package Com.testcases.Topic;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.IOException;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.testng.Assert;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.EditorPageObjects;
import Com.testcases.Login.Frontendlogin;

public class EditorActionsOnReplyPost extends baseClass {
	String username, password, topicName, category, message, link;
	int rowNum;
	
	public EditorActionsOnReplyPost() throws IOException{
		
		username = readExcel("ReplyTopic").getRow(2).getCell(1).getStringCellValue();
		password = readExcel("ReplyTopic").getRow(2).getCell(2).getStringCellValue();
		
	}
	
	//@Test
	public void replyPostwithInsertLink() throws InterruptedException, IOException{
		AddNewTopicandReplyTopic replyTopic=new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		
		rowNum=2;
		topicName = readExcel("ReplyTopic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("ReplyTopic").getRow(rowNum).getCell(4).getStringCellValue();
		category = readExcel("ReplyTopic").getRow(rowNum).getCell(5).getStringCellValue();
		link = readExcel("ReplyTopic").getRow(rowNum).getCell(7).getStringCellValue();
		String pageTile = readExcel("ReplyTopic").getRow(rowNum).getCell(8)
				.getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		PerformActionagainstTopic.enterMessage(category, topicName, message);
		editor.insertLink_Editor.click();
		Alert alert=driver.switchTo().alert();
		alert.sendKeys(link);
		alert.accept();
		Thread.sleep(3000);
		
		replyTopic.Replied_Postbutton.click();
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[text()='"+link+"']")));
		Thread.sleep(3000);
		
		String parentWindow=driver.getWindowHandle();
		driver.findElement(By.xpath("//*[text()='"+link+"']")).click();
		//driver.findElement(By.xpath("//*[@href='"+link+"']")).click();
		for(String childWindow : driver.getWindowHandles()){
			driver.switchTo().window(childWindow);
		}
		Assert.assertTrue(driver.getTitle().contains(pageTile));
		driver.findElement(By.cssSelector("body")).sendKeys(Keys.CONTROL,"w");
		driver.switchTo().window(parentWindow);
		
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	
	//@Test
	public void replyPostwithInsertVideolink() throws IOException, InterruptedException, AWTException{
		
		AddNewTopicandReplyTopic replyTopic=new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		
		rowNum=3;
		topicName = readExcel("ReplyTopic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("ReplyTopic").getRow(rowNum).getCell(4).getStringCellValue();
		category = readExcel("ReplyTopic").getRow(rowNum).getCell(5).getStringCellValue();
		link = readExcel("ReplyTopic").getRow(rowNum).getCell(7).getStringCellValue();
		String siteURL =readExcel("ReplyTopic").getRow(rowNum).getCell(8).getStringCellValue();
		
		// put path to your image in a clipboard
		StringSelection fil = new StringSelection(link);
		Toolkit.getDefaultToolkit().getSystemClipboard().setContents(fil, null);
		
		Frontendlogin.loginToApp(username, password);
		PerformActionagainstTopic.enterMessage(category, topicName, message);
		Robot robot=new Robot();
		editor.insertVideo_Editor.click();
		editor.insertVideo_popUp.click();
		Thread.sleep(3000);
		editor.insertVideo_textfield.clear();
		
		robot.keyPress(KeyEvent.VK_CONTROL);
		robot.keyPress(KeyEvent.VK_V);
		robot.keyRelease(KeyEvent.VK_V);
		robot.keyRelease(KeyEvent.VK_CONTROL);
		Thread.sleep(2000);
		editor.insertURL_button.click();
		Thread.sleep(3000);
		
		replyTopic.Replied_Postbutton.click();
		Thread.sleep(3000);
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//iframe[contains(@src,'"+siteURL+"') and contains(@src,'video')]")));
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	


}
