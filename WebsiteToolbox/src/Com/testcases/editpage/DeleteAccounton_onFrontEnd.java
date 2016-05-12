package Com.testcases.editpage;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.AdvanceSearchPageObjects;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.FrontendaddNewTopic;
import Com.testcases.Login.Frontendlogin;

public class DeleteAccounton_onFrontEnd extends baseClass
{
	String username,username1,  password,topicName,categoryName;

	//Verify  Admin  delete other users account through check box   on members list
  @Test(priority=1)
	public void  DeleteAccounton_Memberspagewithcheckbox() throws InterruptedException, IOException
	{
		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(77).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(77).getCell(2)
				.getStringCellValue();
		username1 = readExcel("Editpage").getRow(77).getCell(3)
				.getStringCellValue();
		
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(5000);
	
	AdvanceSearchPageObjects members=new AdvanceSearchPageObjects();
	members.forumMenu.click();
	Thread.sleep(5000);
    members.Member.click();
    Thread.sleep(5000);
    driver.findElement(By.xpath("//strong[text()='"+username1+"']/ancestor::li/span/input[@name='delete_member']")).click();
    Thread.sleep(3000);
    
     members.MemberDeleteButton.click();
    Thread.sleep(3000);
    driver.switchTo().alert().accept();
    Thread.sleep(3000);
    Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username1+"']")));
	 Thread.sleep(5000);
	 
    Frontendlogin.logoutFromApp();
    Thread.sleep(3000);
	driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	//Verify admin Dlelte on Other users account on members list 
     @Test(priority=2)
		public void  DeleteAccounton_Memberslist() throws InterruptedException, IOException
		{
			switchtoFrontendURL();
			username = readExcel("Editpage").getRow(78).getCell(1)
					.getStringCellValue();
			password = readExcel("Editpage").getRow(78).getCell(2)
					.getStringCellValue();
			username1 = readExcel("Editpage").getRow(78).getCell(3)
					.getStringCellValue();
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(5000);
		
		AdvanceSearchPageObjects members=new AdvanceSearchPageObjects();
		AccountSettingsPageObjects DeletAccount=new AccountSettingsPageObjects();
		members.forumMenu.click();
		Thread.sleep(5000);
	    members.Member.click();
	    Thread.sleep(5000);
	   
	    driver.findElement(By.xpath("//strong[text()='"+username1+"']")).click();
	    Thread.sleep(3000);
	   DeletAccount.DeleteAccountButton.click();
		Thread.sleep(5000);
		DeletAccount.DeleteAccount.click();
		
	    Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username1+"']")));
		 Thread.sleep(5000);
		 
	    Frontendlogin.logoutFromApp();
	    Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	 //Verify  Admin  delete account through Mouse hover window  on members list
	 @Test(priority=3)
		public void  DeleteAccounton_MemberslistWithmouseHoverWindow() throws InterruptedException, IOException
		{
			switchtoFrontendURL();
			username = readExcel("Editpage").getRow(79).getCell(1)
					.getStringCellValue();
			password = readExcel("Editpage").getRow(79).getCell(2)
					.getStringCellValue();
			username1 = readExcel("Editpage").getRow(79).getCell(3)
					.getStringCellValue();
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(5000);
		
		AdvanceSearchPageObjects members=new AdvanceSearchPageObjects();
		AddNewTopicandReplyTopic incontext = new AddNewTopicandReplyTopic();
		AccountSettingsPageObjects DeletAccount=new AccountSettingsPageObjects();
	
		members.forumMenu.click();
		Thread.sleep(5000);
	    members.Member.click();
	    Thread.sleep(5000);

	       
	    Actions action=new Actions(driver);
		 
	  action.moveToElement(driver.findElement(By.xpath("//strong[text()='"+username1+"']"))).build().perform();
		  Thread.sleep(2000);
		  action.click(driver.findElement(By.xpath("//strong[text()='"+username1+"']"))).build().perform();
		
		   Thread.sleep(3000);
		
			   DeletAccount.DeleteAccountButton.click();
				Thread.sleep(5000);
				DeletAccount.DeleteAccount.click();
				Thread.sleep(5000);
				Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username1+"']")));
		    Thread.sleep(3000);
			driver.navigate().to((String) Credential.get("FrontendURL"));
			}
		//Admin Delete aacount on  Other USer profile page 
	
	//BUG NOT CLEAR 
	  // @Test(priority=4)
		public void AdminDeleteOtherAccounton_Usersprofilepage() throws InterruptedException, IOException
		{
		   switchtoFrontendURL();
			username = readExcel("Editpage").getRow(80).getCell(1)
					.getStringCellValue();
			password = readExcel("Editpage").getRow(80).getCell(2)
					.getStringCellValue();
			username1 = readExcel("Editpage").getRow(80).getCell(3)
					.getStringCellValue();
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(5000);
		
		AdvanceSearchPageObjects members=new AdvanceSearchPageObjects();
		AccountSettingsPageObjects DeletAccount=new AccountSettingsPageObjects();
		members.forumMenu.click();
		Thread.sleep(5000);
	    members.Member.click();
	    Thread.sleep(5000);
	   
	    driver.findElement(By.xpath("//strong[text()='"+username1+"']")).click();
	    Thread.sleep(3000);
	    DeletAccount.ProfileEditButton.click();
	    Thread.sleep(5000);
	    DeletAccount.AccountSettingsTab.click();
	    Thread.sleep(5000);
	     DeletAccount.DeleteAccountButton.click();
		Thread.sleep(5000);
		DeletAccount.DeleteAccount.click();
		Thread.sleep(5000);
		
	    Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username1+"']")));
		 Thread.sleep(5000);
		 
	    Frontendlogin.logoutFromApp();
	    Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		}
		// verify Admin Delete Account On  members seareach page other account 
	  
	    @Test(priority=5)
		public void  DeleteAccounton_MemberSearchpage() throws InterruptedException, IOException
		{
			switchtoFrontendURL();
			username = readExcel("Editpage").getRow(81).getCell(1)
					.getStringCellValue();
			password = readExcel("Editpage").getRow(81).getCell(2)
					.getStringCellValue();
			username1 = readExcel("Editpage").getRow(81).getCell(3)
					.getStringCellValue();
			
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(5000);
		
		AdvanceSearchPageObjects members=new AdvanceSearchPageObjects();
		AccountSettingsPageObjects Searchmember=new AccountSettingsPageObjects();
		members.forumMenu.click();
		Thread.sleep(5000);
	    members.Member.click();
	    Thread.sleep(5000);
	    Searchmember.MembersSearchText.sendKeys(username1);
	    Thread.sleep(5000);
	    driver.findElement(By.xpath("//strong[text()='"+username1+"']")).click();
	    Thread.sleep(3000);
	    Searchmember.DeleteAccountButton.click();
		Thread.sleep(5000);
		Searchmember.DeleteAccount.click();
		
	    Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username1+"']")));
		 Thread.sleep(5000);
		 
	    Frontendlogin.logoutFromApp();
	    Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		}
		// Verify  Delete Account on topics list page  
		
		 @Test(priority=6)
		public void  DeleteAccounton_Topiclist() throws InterruptedException, IOException
				{
					switchtoFrontendURL();
					username = readExcel("Editpage").getRow(82).getCell(1)
							.getStringCellValue();
					password = readExcel("Editpage").getRow(82).getCell(2)
							.getStringCellValue();
					username1 = readExcel("Editpage").getRow(82).getCell(3)
							.getStringCellValue();
					
				Frontendlogin.loginToApp(username, password);
				Thread.sleep(5000);
				
				AdvanceSearchPageObjects members=new AdvanceSearchPageObjects();
				AccountSettingsPageObjects Searchmember=new AccountSettingsPageObjects();
				AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
				frontendregisterpage frontpage = new frontendregisterpage();
				members.forumMenu.click();
				Thread.sleep(5000);
			    topic.Topic.click();
			    Thread.sleep(5000);
			  Actions action=new Actions(driver);
				action.moveToElement(topic.firstUsernameinTopicList).build().perform();
				  Thread.sleep(2000);
					 
			 action.click(driver.findElement(By.xpath("//h4/a[text()='"+username1+"']"))).build().perform();
					
					   Thread.sleep(3000);
					
			    Thread.sleep(3000);
			   Searchmember.DeleteAccountButton.click();
				Thread.sleep(5000);
				Searchmember.DeleteAccount.click();
				
			    Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username1+"']")));
				 Thread.sleep(5000);
				 
			    Frontendlogin.logoutFromApp();
			    Thread.sleep(3000);
				driver.navigate().to((String) Credential.get("FrontendURL"));
				}
				
		// Verify  Delete account on post topic list 
		 @Test(priority=7)
		public void  DeleteAccounton_PostTopicLIst() throws InterruptedException, IOException
			{
					switchtoFrontendURL();
					username = readExcel("Editpage").getRow(83).getCell(1)
							.getStringCellValue();
					password = readExcel("Editpage").getRow(83).getCell(2)
							.getStringCellValue();
					username1 = readExcel("Editpage").getRow(83).getCell(3)
							.getStringCellValue();
					
					
					Frontendlogin.loginToApp(username, password);
					Thread.sleep(5000);
				
				AdvanceSearchPageObjects members=new AdvanceSearchPageObjects();
				AccountSettingsPageObjects Searchmember=new AccountSettingsPageObjects();
				AddNewTopicandReplyTopic topic=new AddNewTopicandReplyTopic();
				members.forumMenu.click();
				topic.Topic.click();
			    Thread.sleep(5000);
			    Actions action=new Actions(driver);
				 
	   action.moveToElement(driver.findElement(By.xpath("//*[text()='"+username1+"']"))).build().perform();
		 Thread.sleep(2000);
			action.click(driver.findElement(By.xpath("//h4/a[text()='"+username1+"']"))).build().perform();
						
					
			Thread.sleep(3000);
					
		  Searchmember.DeleteAccountButton.click();
		   Thread.sleep(5000);
			Searchmember.DeleteAccount.click();
			Thread.sleep(5000);
			Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username1+"']")));
				Thread.sleep(3000);
				driver.navigate().to((String) Credential.get("FrontendURL"));
						}
		 //login admin user delete account on members profile page 
		 //0005899: Admin unable to delete self account from members list.
		 @Test(priority=8)
			public void  AdminDelete_OwnAccountonMembersSearchpage() throws InterruptedException, IOException
			{
				switchtoFrontendURL();
				username = readExcel("Editpage").getRow(84).getCell(1)
						.getStringCellValue();
				password = readExcel("Editpage").getRow(84).getCell(2)
						.getStringCellValue();
				username1 = readExcel("Editpage").getRow(84).getCell(3)
						.getStringCellValue();
				
				Frontendlogin.loginToApp(username, password);
				Thread.sleep(5000);
			
			AdvanceSearchPageObjects members=new AdvanceSearchPageObjects();
			members.forumMenu.click();
			Thread.sleep(5000);
		    members.Member.click();
		    Thread.sleep(5000);
		    driver.findElement(By.xpath("//strong[text()='"+username1+"']/ancestor::li/span/input[@name='delete_member']")).click();
		    Thread.sleep(3000);
		    
		     members.MemberDeleteButton.click();
		    Thread.sleep(3000);
		    driver.switchTo().alert().accept();
		    Thread.sleep(3000);
		    Assert.assertFalse(verifyPresenceOfElement(By.xpath("//strong[text()='"+username1+"']")));
			 Thread.sleep(5000);
			 
		    Frontendlogin.logoutFromApp();
		    Thread.sleep(3000);
			driver.navigate().to((String) Credential.get("FrontendURL"));
			}			
		
}
