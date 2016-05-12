package Com.testcases.editpage;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Frontendlogin;

public class Valid_Invalid_Inputsfor_Editpage extends baseClass {

	public String username, password,Editusername,Editpassword,EditEmail;
	
	//login application
	 @Test
	 
  public  void loginfrontpage() throws InterruptedException, IOException{
			
		 username = readExcel("Editpage").getRow(1).getCell(1)
					.getStringCellValue();
	      password = readExcel("Editpage").getRow(1).getCell(2)
					.getStringCellValue();
	     
	      Frontendlogin.loginToApp(username, password);
			}
// Edit username enter already registred user name 
		//@Test(priority=1)
		public   void SettingsPageRegistredusername() throws InterruptedException, IOException 
		{
			AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
			Editusername = readExcel("Editpage").getRow(6).getCell(3)
						.getStringCellValue();
			Editpassword = readExcel("Editpage").getRow(6).getCell(4)
						.getStringCellValue();
			EditEmail = readExcel("Editpage").getRow(6).getCell(5)
						.getStringCellValue();
		
			Editpagesettings();
			mousehover(SettingsEdit.Editusername, SettingsEdit.UserNamemousehoverEditButton);
		    SettingsEdit.UserNameEditText.clear();
		    Thread.sleep(5000);
		    SettingsEdit.UserNameEditText.sendKeys(Editusername);
		    Thread.sleep(5000);
		    SettingsEdit.UserNameEditOkButton.click();
		    driver.switchTo().alert().accept();
		    Thread.sleep(5000);
		    driver.navigate().back();
		}
// Edit Email enter already registred Email
		//@Test(priority=2)
		public   void SettingsPageRegistredemailid() throws InterruptedException, IOException 
		{
			AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
			Editusername = readExcel("Editpage").getRow(7).getCell(3)
						.getStringCellValue();
			Editpassword = readExcel("Editpage").getRow(7).getCell(4)
						.getStringCellValue();
			EditEmail = readExcel("Editpage").getRow(7).getCell(5)
						.getStringCellValue();
		
			   Editpagesettings();
			    mousehover(SettingsEdit.EmailEdit, SettingsEdit.EmailEditButton);   
			    SettingsEdit.EmailEditText.clear();
			    SettingsEdit.EmailEditText.sendKeys(EditEmail);
			    Thread.sleep(5000);
			    SettingsEdit.EmailEditOkButton.click();
			    Thread.sleep(5000);
			    driver.switchTo().alert().accept();
			    Thread.sleep(5000);
		    driver.navigate().back();
		}
		// edit email enter invalid email 
		//@Test(priority=3)
		public   void SettingsPageInvalidemailid() throws InterruptedException, IOException 
		{
			AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
			try {
			Editusername = readExcel("Editpage").getRow(8).getCell(3)
						.getStringCellValue();
			Editpassword = readExcel("Editpage").getRow(8).getCell(4)
						.getStringCellValue();
			
			String errorMsg = readExcel("Editpage").getRow(8)
					.getCell(6).getStringCellValue();
			try {
				EditEmail = readExcel("Editpage").getRow(8).getCell(5)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				EditEmail = "";
			}
		
			   Editpagesettings();
			    mousehover(SettingsEdit.EmailEdit, SettingsEdit.EmailEditButton);   
			    SettingsEdit.EmailEditText.clear();
			    SettingsEdit.EmailEditText.sendKeys(EditEmail);
			    Thread.sleep(5000);
			    SettingsEdit.EmailEditOkButton.click();
			    Thread.sleep(5000);
			  
				Assert.assertTrue(SettingsEdit.errormessageemail.getText().contains(errorMsg));
					

			    Thread.sleep(5000);
		        driver.navigate().back();
		        writedatainExcel("Editpage", 9, 9, "Pass");

			} catch (Exception e) {
				e.getMessage();
				writedatainExcel("Editpage", 9, 9, "Fail");
				throw e;

			}
		}
		//Edit user name  leave blank username
		//@Test(priority=4)
		public   void SettingsPageleaveblankusername() throws InterruptedException, IOException 
		{
			AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
			try {
			
			Editpassword = readExcel("Editpage").getRow(9).getCell(4)
						.getStringCellValue();
			EditEmail = readExcel("Editpage").getRow(9).getCell(5)
						.getStringCellValue();
			String errorMsg = readExcel("Editpage").getRow(9)
					.getCell(6).getStringCellValue();
			try {
				Editusername = readExcel("Editpage").getRow(9).getCell(3)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				Editusername = "";
			}
		
			   Editpagesettings();
			   mousehover(SettingsEdit.Editusername, SettingsEdit.UserNamemousehoverEditButton);
			    SettingsEdit.UserNameEditText.clear();
			    Thread.sleep(5000);
			    SettingsEdit.UserNameEditText.sendKeys(Editusername);
			    Thread.sleep(5000);
			    SettingsEdit.UserNameEditOkButton.click();
			    Thread.sleep(5000);
			  
				Assert.assertTrue(SettingsEdit.errormessageemail.getText().contains(errorMsg));
					

			    Thread.sleep(5000);
		        driver.navigate().back();
		        writedatainExcel("Editpage", 10, 9, "Pass");

			} catch (Exception e) {
				e.getMessage();
				writedatainExcel("Editpage", 10, 9, "Fail");
				throw e;

			}}
		
		//Edit password leave blank password 
			//@Test(priority=5)
			public   void SettingsPageleaveBlankPassword() throws InterruptedException, IOException 
			{
				AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
				try {
				Editusername = readExcel("Editpage").getRow(10).getCell(3)
							.getStringCellValue();
			
				EditEmail = readExcel("Editpage").getRow(10).getCell(5)
							.getStringCellValue();
				String errorMsg = readExcel("Editpage").getRow(10)
						.getCell(6).getStringCellValue();
				try {
					Editpassword = readExcel("Editpage").getRow(10).getCell(4)
							.getStringCellValue();
				} catch (Exception e) {
					e.getMessage();
					Editpassword = "";
				}
			
				   Editpagesettings();
				   mousehover(SettingsEdit.EditPassword, SettingsEdit.PasswordEditButton);
				    Thread.sleep(5000);
				    SettingsEdit.PasswordEditText.sendKeys(Editpassword);
				    Thread.sleep(5000);
				    SettingsEdit.PasswordEditOkButton.click();
				    Thread.sleep(5000);
					Assert.assertTrue(SettingsEdit.errormessageemail.getText().contains(errorMsg));
						

				    Thread.sleep(5000);
			        driver.navigate().back();
			        writedatainExcel("Editpage", 11, 9, "Pass");

				} catch (Exception e) {
					e.getMessage();
					writedatainExcel("Editpage", 11, 9, "Fail");
					throw e;

				}}
			// edit email leave blank email 
			@Test(priority=6)
			public   void SettingsPageleaveBlankEmail() throws InterruptedException, IOException 
			{
				AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
				try {
				Editusername = readExcel("Editpage").getRow(11).getCell(3)
							.getStringCellValue();
				Editpassword = readExcel("Editpage").getRow(11).getCell(4)
							.getStringCellValue();
				
				String errorMsg = readExcel("Editpage").getRow(11)
						.getCell(6).getStringCellValue();
				try {
					EditEmail= readExcel("Editpage").getRow(11).getCell(5)
							.getStringCellValue();
				} catch (Exception e) {
					e.getMessage();
					EditEmail = "";
				}
			
				   Editpagesettings();
				    mousehover(SettingsEdit.EmailEdit, SettingsEdit.EmailEditButton);   
				    SettingsEdit.EmailEditText.clear();
				    SettingsEdit.EmailEditText.sendKeys(EditEmail);
				    Thread.sleep(5000);
				    SettingsEdit.EmailEditOkButton.click();
				    Thread.sleep(5000);
				  
					Assert.assertTrue(SettingsEdit.errormessageemail.getText().contains(errorMsg));
						

				    Thread.sleep(5000);
			        driver.navigate().back();
			        writedatainExcel("Editpage", 9, 9, "Pass");

				} catch (Exception e) {
					e.getMessage();
					writedatainExcel("Editpage", 9, 9, "Fail");
					throw e;

				}
			Thread.sleep(5000);
				Frontendlogin.logoutFromApp();
				
			}


	public static  void Editpagesettings() throws InterruptedException
	{
		AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
		SettingsEdit.Signoutbuttondropdown.click();
	    Thread.sleep(5000);
	    SettingsEdit.Settings.click();
	    
	}
	
	
}
