package Com.testcases;

import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.CategoryTopicandPostPageObject;
import Com.testcases.Login.Frontendlogin;

public class Hide_unHidenVerifyCategoryinList extends baseClass{
	
	String username , password, categoryName1, categoryName2;
	public Hide_unHidenVerifyCategoryinList() throws IOException{
		
		username=readExcel("Topic").getRow(1).getCell(1).getStringCellValue();
		password=readExcel("Topic").getRow(1).getCell(2).getStringCellValue();
		categoryName1=readExcel("Topic").getRow(1).getCell(5).getStringCellValue();
		categoryName2=readExcel("Topic").getRow(1).getCell(8).getStringCellValue();
	}
	
	@Test(priority=0)
	//Hide category from category list and verify that category gets hidded
	public void hidecategoryfromlist_Frontend() throws InterruptedException{
		
		AddNewTopicandReplyTopic category=new AddNewTopicandReplyTopic();
		
		Frontendlogin.loginToApp(username, password);
		
		category.category_tab.click();
		
		driver.findElement(By.xpath("//span[text()='"+categoryName1+"']/following::span/span/a[3]/i")).click();
		Thread.sleep(3000);
		
		Assert.assertFalse(driver.findElement(By.xpath("//span[text()='"+categoryName1+"']")).isDisplayed());
		
		Frontendlogin.logoutFromApp();
		
	}
	
	@Test(priority=1)
	public void ModifyFilterToStopHidingCategory() throws InterruptedException{
		
		AddNewTopicandReplyTopic category=new AddNewTopicandReplyTopic();
		CategoryTopicandPostPageObject categorylist=new CategoryTopicandPostPageObject();
		
		Frontendlogin.loginToApp(username, password);
		
		category.category_tab.click();
		categorylist.modifyFilterlink_category.click();
		categorylist.categoryFilterpopUp.click();
		
		driver.findElement(By.xpath("//li[text()='"+categoryName1+"']")).click();
		
		categorylist.ApplyFilterbutton.click();
		Thread.sleep(3000);
		
		Assert.assertTrue(driver.findElement(By.xpath("//span[text()='"+categoryName1+"']")).isDisplayed());
		
		Frontendlogin.logoutFromApp();
	
		
	}
	
	@Test(priority=2)
	public void CheckClearFilterFunctionality() throws InterruptedException{
		
		
		AddNewTopicandReplyTopic category=new AddNewTopicandReplyTopic();
		CategoryTopicandPostPageObject categorylist=new CategoryTopicandPostPageObject();
		
		Frontendlogin.loginToApp(username, password);
		
		category.category_tab.click();
		
		driver.findElement(By.xpath("//span[text()='"+categoryName1+"']/following::span/span/a[3]/i")).click();
		Thread.sleep(3000);
		driver.findElement(By.xpath("//span[text()='"+categoryName2+"']/following::span/span/a[3]/i")).click();
		Thread.sleep(3000);
		
		categorylist.modifyFilterlink_category.click();
		categorylist.categoryFilterpopUp.click();
		Thread.sleep(5000);
		
		categorylist.ClearFilterbutton.click();
		Thread.sleep(2000);
		
		categorylist.ApplyFilterbutton.click();
		Thread.sleep(3000);
		
		Assert.assertTrue(driver.findElement(By.xpath("//span[text()='"+categoryName1+"']")).isDisplayed());
		Assert.assertTrue(driver.findElement(By.xpath("//span[text()='"+categoryName2+"']")).isDisplayed());
		
		Frontendlogin.logoutFromApp();
		
	}

	
	
	
	

}
