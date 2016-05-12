package Com.testcases.Topic;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.CategoryTopicandPostPageObject;
import Com.testcases.Login.Frontendlogin;

public class FollowunFollowTopic extends baseClass {
	
	String username, password;
	String subject, message, categoryName;
	String AdminUser, AdminPwd;
	int rowNum=39;

	@Test(priority=0)
	//method to add new topic by enabling Follow check box and verify Follow option on Post page
	public void addTopicwithFollowup() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		CategoryTopicandPostPageObject verifyTopic = new CategoryTopicandPostPageObject();
		
		username=username("Topic", rowNum, 1);
		password=password("Topic", rowNum, 2);
		subject = readExcel("Topic").getRow(rowNum).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum).getCell(4).getStringCellValue();
		categoryName = readExcel("Topic").getRow(rowNum).getCell(5).getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, categoryName);
		
		EnableorDisable_Checkbox(topic.followTopicCheckbox, true);
		Thread.sleep(2000);
		
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		
		Assert.assertTrue(topic.VerifyPostedTopic.getText().contains(message));
		Assert.assertTrue(verifyPresenceOfElement(verifyTopic.unFollowTopic_postpage_id));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
		
	}
	
	@Test(priority=1)
	//method to add new topic by disabling Follow check box and verify un-follow option on Post page
	public void addTopicwithUnFollowup() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		CategoryTopicandPostPageObject verifyTopic = new CategoryTopicandPostPageObject();
		
		int rowNum1 = rowNum+1;
		subject = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();
		message = readExcel("Topic").getRow(rowNum1).getCell(4).getStringCellValue();
		categoryName = readExcel("Topic").getRow(rowNum1).getCell(5).getStringCellValue();
		
		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, categoryName);
		
		EnableorDisable_Checkbox(topic.followTopicCheckbox, false);
		Thread.sleep(2000);
		
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		
		Assert.assertTrue(topic.VerifyPostedTopic.getText().contains(message));
		Assert.assertTrue(verifyPresenceOfElement(verifyTopic.followTopic_postPage_id));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
		
	}
	@Test(priority=2)
	//method to follow any un-followed topic and verify this followed topic in followed content page
	public void FollowTopicandVerifyOnFollowedContent() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		CategoryTopicandPostPageObject verifyTopic = new CategoryTopicandPostPageObject();
		AccountSettingsPageObjects follow = new AccountSettingsPageObjects();
		
		int rowNum1 = rowNum+2;
		subject = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();
		categoryName = readExcel("Topic").getRow(rowNum1).getCell(5).getStringCellValue();

		FrontendaddNewTopic.selectCategory(categoryName);
		topic.TopicInList(subject).click();
		verifyTopic.followTopic_postPage.click();
		Thread.sleep(3000);
		
		follow.userAccountPanel.click();
		follow.followedContent.click();
		
		Assert.assertTrue(verifyPresenceOfElement(topic.TopicInListBy(subject)));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);

	}
	
	@Test(priority=3)
	//method to un-follow any followed topic from post page and verify the visibility of un followed topic followed content page
	public void UnfollowTopicandVerifyOnFollowedContent() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		CategoryTopicandPostPageObject verifyTopic = new CategoryTopicandPostPageObject();
		AccountSettingsPageObjects follow = new AccountSettingsPageObjects();
		
		int rowNum1 = rowNum+3;
		subject = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();
		categoryName = readExcel("Topic").getRow(rowNum1).getCell(5).getStringCellValue();
		
		FrontendaddNewTopic.selectCategory(categoryName);
		topic.TopicInList(subject).click();
		verifyTopic.unFollowTopic_postpage.click();
		Thread.sleep(3000);
		
		follow.userAccountPanel.click();
		follow.followedContent.click();
		
		Assert.assertFalse(verifyPresenceOfElement(topic.TopicInListBy(subject)));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);

	}
	
	
	@Test(priority=4)
	//method to un-follow any followed topic from followed content page and verify the visibility of that topic followed content page
	public void UnfollowTopicFromFollowedContentlist() throws IOException, InterruptedException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		AccountSettingsPageObjects follow = new AccountSettingsPageObjects();
		
		int rowNum1 = rowNum+4;
		subject = readExcel("Topic").getRow(rowNum1).getCell(3).getStringCellValue();
		Thread.sleep(5000);
		follow.userAccountPanel.click();
		follow.followedContent.click();
		Thread.sleep(3000);
		
		WebElement topic_href = driver.findElement(By.xpath("//*[text()='"+subject+"']/parent::a"));
		checkCheckboxagainstTopic_inTopiclist(topic_href);
		
		follow.unFollow.click();
		Thread.sleep(3000);
		
		Assert.assertFalse(verifyPresenceOfElement(topic.TopicInListBy(subject)));

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);		

	}
	
		@Test(priority=5)
		//test case to follow any category and verify the visibility of that category followed content page
		public void FollowCategoryandVerifyOnFollowedContentpage() throws IOException, InterruptedException{
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			AccountSettingsPageObjects follow = new AccountSettingsPageObjects();
			CategoryTopicandPostPageObject category = new CategoryTopicandPostPageObject();
			
			int rowNum1 = rowNum+6;
			categoryName = readExcel("Topic").getRow(rowNum1).getCell(5).getStringCellValue();
			
			
			FrontendaddNewTopic.selectCategory(categoryName);
			category.FollowCategory.click();
			Thread.sleep(2000);
			follow.userAccountPanel.click();
			follow.followedContent.click();
			Thread.sleep(3000);
			
			follow.CategoryTab.click();
			Assert.assertTrue(verifyPresenceOfElement(topic.TopicInListBy(categoryName)));

			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);		

		}
	
		@Test(priority=6)
		//test case to un-follow any followed category from followed content page and verify the visibility of that category on followed content page
		public void UnfollowCategoryFromFollowedContentlist() throws IOException, InterruptedException{
			AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
			AccountSettingsPageObjects follow = new AccountSettingsPageObjects();
			
			int rowNum1 = rowNum+6;
			categoryName = readExcel("Topic").getRow(rowNum1).getCell(5).getStringCellValue();
			String message = readExcel("Topic").getRow(rowNum1).getCell(6).getStringCellValue();
			
			follow.userAccountPanel.click();
			follow.followedContent.click();
			Thread.sleep(3000);
			follow.CategoryTab.click();
			
			String category_href=driver.findElement(By.xpath("//*[text()='"+categoryName+"']/parent::a")).getAttribute("href");
			String category_id[]=category_href.split("=");
			String categoryId=category_id[category_id.length-1];
			driver.findElement(By.xpath("//*[@value='"+categoryId+"']")).click();
			follow.unFollow_category.click();
			Thread.sleep(2000);
			driver.switchTo().alert().accept();
			Thread.sleep(3000);
			
			if(verifyPresenceOfElement(By.xpath("//li[contains(@id,'forum_')]"))){
				Assert.assertFalse(verifyPresenceOfElement(topic.TopicInListBy(categoryName)));
			}else{	
				Assert.assertTrue(follow.NoContentMsg.getText().contains(message));
			}
			Assert.assertFalse(verifyPresenceOfElement(topic.TopicInListBy(categoryName)));
			
			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);		
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		
		@Test(priority=7)
		//test case to verify message in case of no content on Followed content page
		public void VerifyMessageOnFollowedContentpage_blankdtata() throws IOException, InterruptedException{
			AccountSettingsPageObjects follow = new AccountSettingsPageObjects();
			int rowNum1 = rowNum+5;
			AdminUser=username("Topic", rowNum1, 1);
			AdminPwd=password("Topic", rowNum1, 2);
			String message = readExcel("Topic").getRow(rowNum1).getCell(6).getStringCellValue();
			
			Frontendlogin.loginToApp(AdminUser, AdminPwd);
			
			follow.userAccountPanel.click();
			follow.followedContent.click();
			Thread.sleep(3000);
			if(verifyPresenceOfElement(By.xpath("//*[@class='topic-content']"))){
			follow.MainCheckbox.click();
			Thread.sleep(3000);
			follow.unFollow.click();
			}		
			Assert.assertTrue(follow.NoContentMsg.getText().contains(message));
			
			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);		
			driver.navigate().to((String) Credential.get("FrontendURL"));

		}
		
		
	

}
