package Com.testcases.editpage;

import java.io.IOException;

import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Frontendlogin;

public class FrontPage_Settings_EditDetails extends baseClass
{
public String username, password,Editusername,Editpassword,EditEmail;

          
@Test(priority=0)

public  void loginfrontpage() throws InterruptedException, IOException{
			
		 username = readExcel("Editpage").getRow(20).getCell(1)
					.getStringCellValue();
	      password = readExcel("Editpage").getRow(20).getCell(2)
					.getStringCellValue();
	    
	      Frontendlogin.loginToApp(username, password);
			}
 	
		//@Test(priority=1)
		public  void SettingsPageEditRegistrationDetails() throws InterruptedException, IOException 
		{
			@SuppressWarnings("unused")
			AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
			Editusername = readExcel("Editpage").getRow(20).getCell(3)
						.getStringCellValue();
			Editpassword = readExcel("Editpage").getRow(20).getCell(4)
						.getStringCellValue();
			EditEmail = readExcel("Editpage").getRow(20).getCell(5)
						.getStringCellValue();
			Thread.sleep(5000);
			Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			AccountSettingspage(Editusername, Editpassword, EditEmail);
		}
			public static void AccountSettingspage(String Editusername , String Editpassword,String EditEmail) throws InterruptedException
			{
			AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
		    mousehover(SettingsEdit.Editusername, SettingsEdit.UserNamemousehoverEditButton);
		    SettingsEdit.UserNameEditText.clear();
		    Thread.sleep(5000);
		    SettingsEdit.UserNameEditText.sendKeys(Editusername);
		    Thread.sleep(5000);
		    SettingsEdit.UserNameEditCancelbutton.click();
		    Thread.sleep(5000);
		    mousehover(SettingsEdit.EditPassword, SettingsEdit.PasswordEditButton);
		    Thread.sleep(5000);
		    SettingsEdit.PasswordEditText.sendKeys(Editpassword);
		    Thread.sleep(5000);
		    SettingsEdit.PasswordEditCancelButton.click();
		    Thread.sleep(5000);
		    mousehover(SettingsEdit.EmailEdit, SettingsEdit.EmailEditButton);   
		    SettingsEdit.EmailEditText.clear();
		    SettingsEdit.EmailEditText.sendKeys(EditEmail);
		    Thread.sleep(5000);
		    SettingsEdit.EmailEditCancelButton.click();
		    Thread.sleep(5000);
		    SettingsEdit.UpdateButton.click();
		   Thread.sleep(5000);
		   driver.navigate().to((String) Credential.get("FrontendURL"));
		     }
			
			@Test(priority=2)
			public void SettingsPageEditSettingsCancle() throws InterruptedException, IOException 
			{
				AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
				Thread.sleep(5000);
				Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
			    mousehover(SettingsEdit.Editusername, SettingsEdit.UserNamemousehoverEditButton);
			    Thread.sleep(5000);
			    SettingsEdit.UserNameEditCancelbutton.click();
			    Thread.sleep(5000);
			    mousehover(SettingsEdit.EditPassword, SettingsEdit.PasswordEditButton);
			    Thread.sleep(5000);
			    SettingsEdit.PasswordEditCancelButton.click();
			    Thread.sleep(5000);
			    mousehover(SettingsEdit.EmailEdit, SettingsEdit.EmailEditButton);   
			    Thread.sleep(5000);
			    SettingsEdit.EmailEditCancelButton.click();
			    Thread.sleep(5000);
			    SettingsEdit.UpdateButton.click();
			   Thread.sleep(5000);
			  Frontendlogin.logoutFromApp();
			  driver.navigate().to((String) Credential.get("FrontendURL"));
			     }
			
			 //Delete Account Yes Condition 
			//@Test(priority=3)
			public static void VerifyAccountDeletNo() throws InterruptedException
			{
				AccountSettingsPageObjects DeletAccount=new AccountSettingsPageObjects();
				DeletAccount.DeleteAccountButton.click();
				DeletAccount.DeleteAccountNobutton.click();
				Thread.sleep(6000);
			       Frontendlogin.logoutFromApp();
			}
			
		 //Delete Account NO Condition
		 //@Test(priority=4)
		public static void VerifyAccountDeletYes() throws InterruptedException
		{
			AccountSettingsPageObjects DeletAccount=new AccountSettingsPageObjects();
			
			DeletAccount.DeleteAccountButton.click();
			Thread.sleep(5000);
			DeletAccount.DeleteAccountYesbutton.click();
			Thread.sleep(6000);
			 clickElement(DeletAccount.PasswordPopupwindow);
		        Thread.sleep(5000);
		        
			
		}
		
		
		
		
		  }
		    
		    
	
			
		
	


