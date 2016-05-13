package Com.testcases.editpage;

import java.awt.AWTException;
import java.io.IOException;

import org.testng.annotations.Test;

import Com.Utilities.baseClass;

import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Frontendlogin;

  // verify send email and message with upload file & Image on Account Profile Page
public class Verify_SendMEssage_Email_Album_InsertPhotoOnProfilePage extends baseClass {

public String username, password,EmailMessageText,EmailSubjectText,MsgSubjecttext,messagetextfield,filepath,Picturepath;
	
	//login application
	 
  @Test
	 
  public  void loginfrontpage() throws InterruptedException, IOException{
			
		 username = readExcel("Editpage").getRow(111).getCell(1)
					.getStringCellValue();
	      password = readExcel("Editpage").getRow(111).getCell(2)
					.getStringCellValue();
	     
	      Frontendlogin.loginToApp(username, password);
			}
	  
	  // Verify Send Email On Profile Page 
	// @Test (priority=1)
	 public void Emailsendmessage() throws InterruptedException, IOException
	 {
	 AccountSettingsPageObjects sendmessage=new AccountSettingsPageObjects();
	 EmailSubjectText = readExcel("Editpage").getRow(111).getCell(3)
				.getStringCellValue();
	 EmailMessageText = readExcel("Editpage").getRow(111).getCell(4)
				.getStringCellValue();
	
	  sendmessage.Signoutbuttondropdown.click();
	  sendmessage.Profile.click();
	 Thread.sleep(5000);
	 sendmessage.EmailButton.click();
	 Thread.sleep(5000);
	 sendmessage.EmailSubjectText.sendKeys(EmailSubjectText);
	 Thread.sleep(5000);
	 sendmessage.EmailMessageText.sendKeys(EmailMessageText);
	 sendmessage.EmailSendButton.click();
	 
	 
	 }
	 //Verify Send Message with upload file and Image on Account Profile Page  
	 
	//@Test(priority=2)
	public void VerifySend_mesaageWithUploadPhoto_File() throws InterruptedException, AWTException, IOException{
		AccountSettingsPageObjects sendmessage=new AccountSettingsPageObjects();
	
		Thread.sleep(5000);

		  sendmessage.Signoutbuttondropdown.click();
		  sendmessage.Profile.click();
		   Thread.sleep(5000);
		 MsgSubjecttext = readExcel("Editpage").getRow(111).getCell(5)
					.getStringCellValue();
		 messagetextfield = readExcel("Editpage").getRow(111).getCell(6)
					.getStringCellValue();
		 filepath = readExcel("Editpage").getRow(111).getCell(8)
					.getStringCellValue();
		 Picturepath = readExcel("Editpage").getRow(111).getCell(8)
					.getStringCellValue();
		
	
		sendmessage.Messagebutton.click();
		Thread.sleep(5000);
		 for(String winHandle : driver.getWindowHandles())
	      {
	          driver.switchTo().window(winHandle);
		Thread.sleep(5000);
		sendmessage.MsgSubjecttext.sendKeys(MsgSubjecttext);
		Thread.sleep(5000);
	
		driver.switchTo().frame(sendmessage.messageBody);
		sendmessage.messagetextfield.sendKeys(messagetextfield);
		driver.switchTo().defaultContent();
		
		// Insert Photo while creating new Message 
			attachfile(sendmessage.AttachFilesbutton, filepath);
				Thread.sleep(5000);
attachPicture(sendmessage.AttachImageButton,sendmessage.Browsebutton,sendmessage.Insertbutton, sendmessage.Insertbutton, Picturepath);
				Thread.sleep(5000);
		
	     sendmessage.MsgSendButton.click();
	     Thread.sleep(5000);
	     
	   driver.navigate().back();
	      }
	}
	
	//Verify Add Photos On Profile Page
		 //@Test(priority=3)
			public void VerifyAddPhotosOnProfilePage() throws InterruptedException, AWTException, IOException{
				AccountSettingsPageObjects sendmessage=new AccountSettingsPageObjects();
			
				filepath = readExcel("Editpage").getRow(111).getCell(7)
						.getStringCellValue();
				Thread.sleep(5000);
				  sendmessage.Signoutbuttondropdown.click();
				  sendmessage.Profile.click();
				 Thread.sleep(5000);
			
				attachfile(sendmessage.AddPhotosButton, filepath);
				Thread.sleep(5000);
				
				sendmessage.PostPhotosButton.click();
				Thread.sleep(5000);
				driver.navigate().back();
				
	    }
		//insert picture in album and verify album from profile page  
		 //@Test(priority=4)
			public void VerifyAddAlbumPhotosOnProfilePage() throws InterruptedException, AWTException, IOException{
				AccountSettingsPageObjects sendmessage=new AccountSettingsPageObjects();
			
				filepath = readExcel("Editpage").getRow(111).getCell(7)
						.getStringCellValue();
				Thread.sleep(5000);
				  sendmessage.Signoutbuttondropdown.click();
				  sendmessage.Profile.click();
				 Thread.sleep(5000);
				 
                sendmessage.AddAlbumsButton.click();

			Thread.sleep(5000);
			attachfile(sendmessage.AddPhotosButton, filepath);
         	Thread.sleep(5000);
         sendmessage.PostPhotosButton.click();
			
				Thread.sleep(5000);
				
		 
		 
		 }
		 
		//insert At a time More pictures in United album and verify album from profile page  
		 @Test(priority=5)
			public void VerifyAddMoreUnitedAlbumPhotosOnProfilePage() throws InterruptedException, AWTException, IOException{
				AccountSettingsPageObjects sendmessage=new AccountSettingsPageObjects();
			
				filepath = readExcel("Editpage").getRow(111).getCell(7)
						.getStringCellValue();
				Thread.sleep(5000);
				  sendmessage.Signoutbuttondropdown.click();
				  sendmessage.Profile.click();
				 Thread.sleep(5000);
				 
                sendmessage.AddAlbumsButton.click();
            // Insert Photos in United album
			Thread.sleep(5000);
			attachfile(sendmessage.AddPhotosButton, filepath);
         	Thread.sleep(5000);
         	attachfile(sendmessage.AddmorePhotos, filepath);
         	Thread.sleep(5000);
         	sendmessage.PostPhotosButton.click();
			
				Thread.sleep(5000);
				driver.navigate().back();
				Frontendlogin.logoutFromApp(); 
		 
		 
		 }	 
       }
	
	
	
		

		 
		
      


	
		
	
	
