package Com.testcases.registration;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.frontendpages.frontendregisterpage;
import Com.frontendpages.frontpagelogin;
import Com.testcases.FrontendaddNewTopic;
import Com.testcases.Login.Frontendlogin;

public class incontextNewRegistration extends baseClass {
	 String username, password, Email,createaccountbutton;
	 String topicName, categoryName;

	 	public  void  incontextRegistration(String username, String password, String Email) throws InterruptedException, IOException
		{
			
			frontendregisterpage frontpage = new frontendregisterpage();
			Thread.sleep(5000);
		    frontpage.incontextusername.sendKeys(username);
		    
		    Thread.sleep(5000);
			frontpage.incontextpassword.sendKeys(password);
		    Thread.sleep(5000);
			frontpage.incontextEmail.sendKeys(Email);
			frontpage.incontextcreateaccountbutton.click();
		
		}
			//@Test(priority=0)
			public void inContextLoginfromAddNewPost() throws InterruptedException, IOException{
				
				AddNewTopicandReplyTopic newTopic=new AddNewTopicandReplyTopic();
				
				newTopic.StartnewTopicbutton.click();
				
				incontextRegistration(username, password, Email);
				
				Assert.assertTrue(driver.getTitle().contains("New Topic"));
				Thread.sleep(3000);
				Frontendlogin.logoutFromApp();
				Thread.sleep(3000);
				
				driver.navigate().to((String) Credential.get("FrontendURL"));
				
			}
			// New registration with like post icon
			
		@Test(priority=1)
			public void incontextRegistrationLikeThisTopicIcon() throws InterruptedException, IOException{
				AddNewTopicandReplyTopic inContext=new AddNewTopicandReplyTopic();
				frontendregisterpage frontpage = new frontendregisterpage();

				username = readExcel("Registrationpage").getRow(85).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(85).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(85).getCell(3)
						.getStringCellValue();
				//Click on Like This Post icon present under topic list
				inContext.LikethisTopic_icon.click();
				
				incontextRegistration(username, password, Email);
				Thread.sleep(3000);
				
				Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
				  Thread.sleep(5000);
				 frontpage.BacktoCategory.click();
				 Thread.sleep(3000);
				Frontendlogin.logoutFromApp();
				Thread.sleep(3000);
				
				driver.navigate().to((String) Credential.get("FrontendURL"));
			}
			
		//New registration with fromLikethisPost
		
		//@Test(priority=2)
			public void incontextRegistrationfromLikethisPost() throws InterruptedException, IOException{
				AddNewTopicandReplyTopic inContext=new AddNewTopicandReplyTopic();
				frontendregisterpage frontpage = new frontendregisterpage();
			
				username = readExcel("Registrationpage").getRow(86).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(86).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(86).getCell(3)
						.getStringCellValue();
				//Click on Like This Post icon present under topic list
				
				inContext.firstTopicInList.click();
				inContext.LikethisPost_icon.click();
				incontextRegistration(username, password, Email);
				Thread.sleep(3000);
				
				
				    Thread.sleep(5000);
				 Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
				  Thread.sleep(5000);
				 frontpage.BacktoCategory.click();
				 Thread.sleep(3000);
				Frontendlogin.logoutFromApp();
				Thread.sleep(3000);
				
				driver.navigate().to((String) Credential.get("FrontendURL"));
			}
			
			//New registration with from  DisLikethisPost
			
			//@Test(priority=3)
			public void incontextRegistrationfromDislikethisPost() throws InterruptedException, IOException{
				AddNewTopicandReplyTopic inContext=new AddNewTopicandReplyTopic();
				frontendregisterpage frontpage = new frontendregisterpage();
				username = readExcel("Registrationpage").getRow(87).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(87).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(87).getCell(3)
						.getStringCellValue();
				
				//Click on Like This Post icon present under topic list
				
				inContext.firstTopicInList.click();
				inContext.DislikethisPost_icon.click();
				
				incontextRegistration(username, password, Email);
				Thread.sleep(3000);

		
				 Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
				  Thread.sleep(5000);
				 frontpage.BacktoCategory.click();
				 Thread.sleep(3000);
				Frontendlogin.logoutFromApp();
				Thread.sleep(3000);
				
				driver.navigate().to((String) Credential.get("FrontendURL"));
			}
		
			//New registration with Email User Profile
			
		//@Test(priority=4)
			public void inContextLoginfromEmailonUsersProfile() throws InterruptedException, IOException
			{
				
				AddNewTopicandReplyTopic incontext = new AddNewTopicandReplyTopic();
				AccountSettingsPageObjects email=new AccountSettingsPageObjects();
				frontendregisterpage frontpage = new frontendregisterpage();
				username = readExcel("Registrationpage").getRow(88).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(88).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(88).getCell(3)
						.getStringCellValue();
				
				incontext.firstUsernameinTopicList.click();
				email.EmailbuttonOnViewProfilepage.click();
				
				incontextRegistration(username, password, Email);
				
				
				Thread.sleep(5000);
				 Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
				  Thread.sleep(5000);
				 frontpage.BacktoCategory.click();
				 Thread.sleep(3000);
				Frontendlogin.logoutFromApp();
				Thread.sleep(3000);
				
				driver.navigate().to((String) Credential.get("FrontendURL"));
			}
			
			//New registration with from Quote against Topic
			
			//@Test(priority=5)
			public void inContextRegistrationfromQuoteagaistTopic() throws InterruptedException, IOException{
				
				AddNewTopicandReplyTopic incontext = new AddNewTopicandReplyTopic();
				frontendregisterpage frontpage = new frontendregisterpage();

				username = readExcel("Registrationpage").getRow(89).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(89).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(89).getCell(3)
						.getStringCellValue();
				
				incontext.firstTopicInList.click();
				incontext.firstQuoteinList.click();
				
				incontextRegistration(username, password, Email);
				
				
				Thread.sleep(5000);
				 Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
				  Thread.sleep(5000);
				 frontpage.BacktoCategory.click();
				 Thread.sleep(3000);
				Frontendlogin.logoutFromApp();
				Thread.sleep(3000);
				
				driver.navigate().to((String) Credential.get("FrontendURL"));
			}
			
			//New registration with from from Vote any Post
			
				//@Test(priority=6)
				public void inContextRegistrationfromVoteanyPost() throws InterruptedException, IOException
				{
					
					frontpagelogin incontext1 = new frontpagelogin();
					frontendregisterpage frontpage = new frontendregisterpage();

					username = readExcel("Registrationpage").getRow(90).getCell(1)
							.getStringCellValue();
					password = readExcel("Registrationpage").getRow(90).getCell(2)
							.getStringCellValue();
					Email = readExcel("Registrationpage").getRow(90).getCell(3)
							.getStringCellValue();
					topicName = readExcel("Registrationpage").getRow(90).getCell(5).getStringCellValue();
					categoryName = readExcel("Registrationpage").getRow(90).getCell(4).getStringCellValue();
					
					
					FrontendaddNewTopic.selectCategory(categoryName);
					driver.findElement(By.xpath("//a/span[contains(text(),'" + topicName + "')]")).click();
					Thread.sleep(3000);
					
					incontext1.LoginonGuestUserVote.click();
					
					incontextRegistration(username, password, Email);
					
					Thread.sleep(5000);
					 Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
					  Thread.sleep(5000);
					 frontpage.BacktoCategory.click();
					 Thread.sleep(3000);
					Frontendlogin.logoutFromApp();
					Thread.sleep(3000);
					
					driver.navigate().to((String) Credential.get("FrontendURL"));
				}
				
				//New registration with  From Guest UserMessage_inTopic list
				@Test(priority=7)
				public void inContextRegistrationFromGuestUserMessage_inTopiclist() throws InterruptedException, IOException
				{
					AddNewTopicandReplyTopic incontext = new AddNewTopicandReplyTopic();
					AccountSettingsPageObjects message=new AccountSettingsPageObjects();
					frontendregisterpage frontpage = new frontendregisterpage();
				
					username = readExcel("Registrationpage").getRow(91).getCell(1)
							.getStringCellValue();
					password = readExcel("Registrationpage").getRow(91).getCell(2)
							.getStringCellValue();
					Email = readExcel("Registrationpage").getRow(91).getCell(3)
							.getStringCellValue();
			
					  Actions action=new Actions(driver);
					  action.moveToElement(incontext.firstUsernameinTopicList).build().perform();
					  Thread.sleep(2000);
					  action.click( frontpage.LoginonGuestUserMessage).build().perform();
					  Thread.sleep(5000);
					
					
					incontextRegistration(username, password, Email);
					
				
					Thread.sleep(5000);
					 Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
					  Thread.sleep(5000);
					 frontpage.BacktoCategory.click();
					 Thread.sleep(3000);
					Frontendlogin.logoutFromApp();
					Thread.sleep(3000);
					
					driver.navigate().to((String) Credential.get("FrontendURL"));
				}
				
			
			
				
		}

