package Com.testcases.editpage;

import java.awt.AWTException;






import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Frontendlogin;

public class Send_message_Email_FrontEnd extends baseClass {

	@Test           
		 public  void loginfrontpage () throws InterruptedException 
		{
			
		 Frontendlogin.loginToApp("pavani999", "pavani999");
		}
	  
	  
	 @Test (priority=1)
	 public void Emailsendmessage() throws InterruptedException
	 {
	 AccountSettingsPageObjects sendmessage=new AccountSettingsPageObjects();
	 
	
		sendmessage.Signoutbuttondropdown.click();
		sendmessage.Profile.click();
	 Thread.sleep(5000);
	 sendmessage.Email.click();
	 Thread.sleep(5000);
	 sendmessage.EmailSubjectText.sendKeys("hi");
	 Thread.sleep(5000);
	 sendmessage.EmailMessageText.sendKeys("parasuram");
	 sendmessage.EmailSendButton.click();
	 
	 {
	
	 }}
	@Test(priority=2)
	public void Send_mesaage(String filepath, String Picturepath) throws InterruptedException, AWTException{
		AccountSettingsPageObjects sendmessage=new AccountSettingsPageObjects();
		AddNewTopicandReplyTopic newTopic = new AddNewTopicandReplyTopic();
		Thread.sleep(5000);
	
		sendmessage.Messagebutton.click();
		Thread.sleep(5000);
		 for(String winHandle : driver.getWindowHandles())
	      {
	          driver.switchTo().window(winHandle);
		Thread.sleep(5000);
		sendmessage.MsgSubjecttext.sendKeys("Hi");
		Thread.sleep(5000);
	
		driver.switchTo().frame(sendmessage.messageBody);
		sendmessage.messagetextfield.sendKeys("India");
		driver.switchTo().defaultContent();
		
		// Insert Photo while creating new post
				attachfile(newTopic.AttachFilesbutton, filepath);
				Thread.sleep(5000);
				
				attachPicture(newTopic.InsertPhotoIcon, newTopic.InsertPhotoPopup, newTopic.Browserbutton,newTopic.InsertImagebutton, Picturepath);
				Thread.sleep(5000);
		
	     sendmessage.MsgSendButton.click();
	     Thread.sleep(5000);
	     
	     Frontendlogin.logoutFromApp();
	      }
	}}
	
	
	
		

		 
		
      


	
		
	
	
