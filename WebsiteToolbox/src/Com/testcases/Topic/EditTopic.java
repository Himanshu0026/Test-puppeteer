package Com.testcases.Topic;

import java.io.IOException;

import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.testcases.Login.Frontendlogin;

public class EditTopic extends baseClass {
	
	String username, password, topicName, categoryName, message;
	int rowNum;
	
	@Test
	//Edit topic and verify message on post page
	public void editTopicandverifyit() throws IOException, InterruptedException{
		rowNum=15;
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		topicName = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		String modifiedmessage = readExcel("Topic").getRow(rowNum).getCell(6).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		FrontendaddNewTopic.selectCategory(categoryName);
		topic.TopicInList(topicName);
		
		Actions action=new Actions(driver);
		action.moveToElement(topic.VerifyPostedTopic).build().perform();
		topic.dropdownOnfirstPost.click();
		topic.EditOnfirstPost.click();
		Thread.sleep(3000);
	
		driver.switchTo().frame(topic.EditpostMessageBody);
		topic.messagetextfield.sendKeys(modifiedmessage);
		driver.switchTo().defaultContent();
		
		Thread.sleep(2000);
		topic.Modified_Savebutton.click();
		
		Assert.assertTrue(topic.VerifyPostedTopic.getText().contains(modifiedmessage));

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	

}
