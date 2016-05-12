package Com.testcases.registration;

import java.io.IOException;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Backendusersdropdownobjects;
import Com.testcases.Login.Backendlogin;

    public class Backend_NewUser_RegistrationWith_InvalidInputs extends baseClass
   {
	String username, password, Emailtext, Personalnote ;
 
     // Backend username leave blank with  New User Registration 
	  
	@Test(priority=1)
	 	public  void BackendNewUserRegistration() throws InterruptedException, IOException
		{
	    	NewAccountRegistration();
	    Backendusersdropdownobjects newregistration=new Backendusersdropdownobjects();   
	
			password = readExcel("BackendRegistration").getRow(6).getCell(2)
					.getStringCellValue();
			Emailtext = readExcel("BackendRegistration").getRow(6).getCell(3)
					.getStringCellValue();
			Personalnote = readExcel("BackendRegistration").getRow(6).getCell(4)
					.getStringCellValue();
			String errorMsg = readExcel("BackendRegistration").getRow(6)
					.getCell(5).getStringCellValue();
			try {
				username = readExcel("BackendRegistration").getRow(6).getCell(1)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				username = "";
			}
			newregistration.Username.sendKeys(username);
			Thread.sleep(5000);
			newregistration.Password.sendKeys(password);
			Thread.sleep(3000);
			newregistration.Emailtext.sendKeys(Emailtext);
			Thread.sleep(3000);
			selectElementfromDropdown(newregistration.GroupDropDown, "Registered Users");
			Thread.sleep(3000);
			newregistration.PersonalNote.sendKeys(Personalnote);
			Thread.sleep(3000);
			newregistration.RegisterNewUserButton.click();
			Thread.sleep(3000);
			
			verifyPresenceOfElement(By.xpath("//*[@class='tooltip']/p[text()='Please enter a username.']"));

			Assert.assertFalse(newregistration.errormsgforblankUsername.getText().contains(errorMsg));

			driver.navigate().refresh();
		
		  }
	     
	     // Verify Already Registred username with new registration 
	    @Test(priority=2)
	 	public  void AlreadyRegistredusernamewithNewUserRegistration() throws InterruptedException, IOException
		{
	    	//NewAccountRegistration();
	    Backendusersdropdownobjects newregistration=new Backendusersdropdownobjects();   
		
			password = readExcel("BackendRegistration").getRow(7).getCell(2)
					.getStringCellValue();
			Emailtext = readExcel("BackendRegistration").getRow(7).getCell(3)
					.getStringCellValue();
			Personalnote = readExcel("BackendRegistration").getRow(7).getCell(4)
					.getStringCellValue();
			String errorMsg = readExcel("BackendRegistration").getRow(7)
					.getCell(5).getStringCellValue();
			try {
				username = readExcel("BackendRegistration").getRow(7).getCell(1)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				username = "";
			}
			newregistration.Username.sendKeys(username);
			Thread.sleep(5000);
			newregistration.Password.sendKeys(password);
			Thread.sleep(3000);
			newregistration.Emailtext.sendKeys(Emailtext);
			Thread.sleep(3000);
			selectElementfromDropdown(newregistration.GroupDropDown, "Registered Users");
			Thread.sleep(3000);
			newregistration.PersonalNote.sendKeys(Personalnote);
			Thread.sleep(3000);
			newregistration.RegisterNewUserButton.click();
			Thread.sleep(3000);
		
			Assert.assertTrue(newregistration.errorMsgforAlreadyRegistredusername.getText().contains(errorMsg));
			
		

			driver.navigate().refresh();
		  }
	     // password leaveBlank with new registration 
	     @Test(priority=3)
		 	public  void BackendNewUserpasswordleaveBlank() throws InterruptedException, IOException
			{
		    	//NewAccountRegistration();
		    Backendusersdropdownobjects newregistration=new Backendusersdropdownobjects();   
				username = readExcel("BackendRegistration").getRow(8).getCell(1)
						.getStringCellValue();
				
				Emailtext = readExcel("BackendRegistration").getRow(8).getCell(3)
						.getStringCellValue();
				Personalnote = readExcel("BackendRegistration").getRow(8).getCell(4)
						.getStringCellValue();
				//String errorMsg = readExcel("BackendRegistration").getRow(8)
						//.getCell(5).getStringCellValue();
				try {
					password = readExcel("BackendRegistration").getRow(8).getCell(2)
							.getStringCellValue();
				} catch (Exception e) {
					e.getMessage();
					password = "";
				}
				newregistration.Username.sendKeys(username);
				Thread.sleep(5000);
				newregistration.Password.sendKeys(password);
				Thread.sleep(3000);
				newregistration.Emailtext.sendKeys(Emailtext);
				Thread.sleep(3000);
				selectElementfromDropdown(newregistration.GroupDropDown, "Registered Users");
				Thread.sleep(3000);
				newregistration.PersonalNote.sendKeys(Personalnote);
				Thread.sleep(3000);
				newregistration.RegisterNewUserButton.click();
		//Assert.assertFalse(newregistration.errorMsgforAlreadyRegistredusername.getText().contains(errorMsg));

				driver.navigate().refresh();
			  }
			  
	     // verify Email leave  Blank with new registration 
	     @Test(priority=4)
		 	public  void BackendNewUserEmailleaveBlank() throws InterruptedException, IOException
			{
		     //NewAccountRegistration();
		    Backendusersdropdownobjects newregistration=new Backendusersdropdownobjects();   
				username = readExcel("BackendRegistration").getRow(9).getCell(1)
						.getStringCellValue();
				password = readExcel("BackendRegistration").getRow(9).getCell(2)
						.getStringCellValue();
				
				Personalnote = readExcel("BackendRegistration").getRow(9).getCell(4)
						.getStringCellValue();
				String errorMsg = readExcel("BackendRegistration").getRow(9)
						.getCell(5).getStringCellValue();
				try {
					Emailtext = readExcel("BackendRegistration").getRow(9).getCell(3)
							.getStringCellValue();
				} catch (Exception e) {
					e.getMessage();
					Emailtext = "";
				}
				newregistration.Username.sendKeys(username);
				Thread.sleep(5000);
				newregistration.Password.sendKeys(password);
				Thread.sleep(3000);
				newregistration.Emailtext.sendKeys(Emailtext);
				Thread.sleep(3000);
				selectElementfromDropdown(newregistration.GroupDropDown, "Registered Users");
				Thread.sleep(3000);
				newregistration.PersonalNote.sendKeys(Personalnote);
				Thread.sleep(3000);
				newregistration.RegisterNewUserButton.click();
				Thread.sleep(3000);
				newregistration.RegisterNewUserButton.click();
				Thread.sleep(3000);
			verifyPresenceOfElement(By.xpath("//*[@class='tooltip']/p[text()='Please enter an email address.']"));
				Assert.assertFalse(newregistration.errormsgforblankEmail.getText().contains(errorMsg));
				Thread.sleep(3000);
				driver.navigate().refresh();
			  }
			  
	     
	     // verify invalid email with new registration 
	     @Test(priority=5)
		 	public  void BackendNewUserInvalidEmail() throws InterruptedException, IOException
			{
		    	//NewAccountRegistration();
		    Backendusersdropdownobjects newregistration=new Backendusersdropdownobjects();   
				username = readExcel("BackendRegistration").getRow(10).getCell(1)
						.getStringCellValue();
				password = readExcel("BackendRegistration").getRow(10).getCell(2)
						.getStringCellValue();
				
				Personalnote = readExcel("BackendRegistration").getRow(10).getCell(4)
						.getStringCellValue();
				String errorMsg = readExcel("BackendRegistration").getRow(10)
						.getCell(5).getStringCellValue();
				try {
					Emailtext = readExcel("BackendRegistration").getRow(10).getCell(3)
							.getStringCellValue();
				} catch (Exception e) {
					e.getMessage();
					Emailtext = "";
				}
				newregistration.Username.sendKeys(username);
				Thread.sleep(5000);
				newregistration.Password.sendKeys(password);
				Thread.sleep(3000);
				newregistration.Emailtext.sendKeys(Emailtext);
				Thread.sleep(3000);
				selectElementfromDropdown(newregistration.GroupDropDown, "Registered Users");
				Thread.sleep(3000);
				newregistration.PersonalNote.sendKeys(Personalnote);
				Thread.sleep(3000);
				newregistration.RegisterNewUserButton.click();
				Thread.sleep(3000);
				verifyPresenceOfElement(By.xpath("//*[@class='tooltip']/p[text()='You entered an invalid email address.']"));
				Assert.assertTrue(newregistration.errorMsgforInvalidEmail.getText().contains(errorMsg));

				driver.navigate().refresh();
			  }
	  // verify Already Registred  email with new registration
	     
	     @Test(priority=6)
		 	public  void BackendNewUserAlreadyExistingEmail() throws InterruptedException, IOException
			{
		    	//NewAccountRegistration();
		    Backendusersdropdownobjects newregistration=new Backendusersdropdownobjects();   
				username = readExcel("BackendRegistration").getRow(11).getCell(1)
						.getStringCellValue();
				password = readExcel("BackendRegistration").getRow(11).getCell(2)
						.getStringCellValue();
				
				Personalnote = readExcel("BackendRegistration").getRow(11).getCell(4)
						.getStringCellValue();
				///String errorMsg = readExcel("BackendRegistration").getRow(11)
						//.getCell(5).getStringCellValue();
				try {
					Emailtext = readExcel("BackendRegistration").getRow(11).getCell(3)
							.getStringCellValue();
				} catch (Exception e) {
					e.getMessage();
					Emailtext = "";
				}
				newregistration.Username.sendKeys(username);
				Thread.sleep(5000);
				newregistration.Password.sendKeys(password);
				Thread.sleep(3000);
				newregistration.Emailtext.sendKeys(Emailtext);
				Thread.sleep(3000);
				selectElementfromDropdown(newregistration.GroupDropDown, "Registered Users");
				Thread.sleep(3000);
				newregistration.PersonalNote.sendKeys(Personalnote);
				Thread.sleep(3000);
				newregistration.RegisterNewUserButton.click();
				Thread.sleep(3000);
				
				//Assert.assertFalse(newregistration.errorMsgforAlreadyRegistredEmail.getText().contains(errorMsg));

				driver.navigate().refresh();
			  }
			  
	  
	     @SuppressWarnings("unused")
	 	public static void NewAccountRegistration() throws InterruptedException, IOException {

	 	String portalUser = readExcel("BackendLogin").getRow(1).getCell(1)
	 				.getStringCellValue();
	 		String portalPwd = readExcel("BackendLogin").getRow(1).getCell(2)
	 				.getStringCellValue();

	 		String portalUpdationMessage = readExcel("BackendLogin").getRow(1)
	 				.getCell(3).getStringCellValue();
	 		
			 Backendusersdropdownobjects newregistration=new Backendusersdropdownobjects();
			 switchtoBackendendURL();
		   Backendlogin.LoginToAPP(portalUser, portalPwd);
			Thread.sleep(3000);
	 		newregistration.Users.click();
	 		Thread.sleep(3000);
			newregistration.Newuser.click();
			Thread.sleep(3000);
	     }}
