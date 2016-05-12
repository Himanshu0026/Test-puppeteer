package Com.testcases.Topic;

import java.awt.AWTException;
import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.testcases.Login.Frontendlogin;

public class AddMultipleTopics extends baseClass {
	
	String username, password;
	String subject, message, category, filePath;
	int rowNum;
	
	//@Test
	public void createNewTopic() throws InterruptedException, IOException{

		username=username("MultipleTopic", 1, 1);
		password=password("MultipleTopic", 1, 2);
		rowNum = readExcel("MultipleTopic").getLastRowNum();

		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		for(int i = 1; i <= rowNum; i++){
			
		subject = readExcel("MultipleTopic").getRow(i).getCell(3).getStringCellValue()+i;
		message = readExcel("MultipleTopic").getRow(i).getCell(4).getStringCellValue()+i;
		category = readExcel("MultipleTopic").getRow(i).getCell(5).getStringCellValue();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		
		 addNewTopic( subject, message, category);
	
		}
		
		Frontendlogin.logoutFromApp();
		
	}
	
	@Test
	public void addTopicwithMultipleFiles() throws InterruptedException, IOException, AWTException{
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		username=username("MultipleTopic", 1, 1);
		password=password("MultipleTopic", 1, 2);
		subject = readExcel("MultipleTopic").getRow(1).getCell(3).getStringCellValue();
		message = readExcel("MultipleTopic").getRow(1).getCell(4).getStringCellValue();
		category = readExcel("MultipleTopic").getRow(1).getCell(5).getStringCellValue();
		rowNum=readExcel("MultipleTopic").getLastRowNum();
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		FrontendaddNewTopic.gotoNewTopicpage();
		
		FrontendaddNewTopic.enterSubjectnMessage(subject+" with multiple Files", message, category);
		for(int i=1;i<=rowNum;i++){
			try{filePath = readExcel("MultipleTopic").getRow(i).getCell(6).getStringCellValue();
			attachfile(newTopic.AttachFilesbutton, filePath);
			Thread.sleep(2000);
			}catch(Exception e){
				e.getMessage();
			}
		}
		
		newTopic.postNewTopicbutton.click();
		Thread.sleep(5000);
		
		Frontendlogin.logoutFromApp();
	}
	
	//method to create new topic by after entering subject, message and category and verify message after creating new topic
	public void addNewTopic(String subject, String message, String category) throws InterruptedException{
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		
		newTopic.subject.sendKeys(subject);

		driver.switchTo().frame(newTopic.messageBody);
		newTopic.messagetextfield.sendKeys(message);
		driver.switchTo().defaultContent();
		
		selectElementfromDropdown(newTopic.categorydropdown, category );
		driver.findElement(By.xpath("//div[@class='panel-body table-responsive']")).click();
		
		newTopic.postNewTopicbutton.click();
		
		Thread.sleep(3000);
		
		FrontendaddNewTopic.VerifyPostedMessage(message);
		
	}

}
