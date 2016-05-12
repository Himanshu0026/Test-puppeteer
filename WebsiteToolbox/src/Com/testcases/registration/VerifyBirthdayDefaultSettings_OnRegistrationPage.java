package Com.testcases.registration;

import java.awt.AWTException;
import java.io.IOException;


import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class VerifyBirthdayDefaultSettings_OnRegistrationPage extends baseClass {
	String username, password, Email, Fullnametext, signature, filepath,
			Picturepath, InstantmessageSreenNameText, Birthdaypicker;
	
	@Test
	public void VerifyFullNameOnRegistration_FrontendandBackend() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	//Back end Default Settings Visibility Register Page only Dafault Value YES front End Registration page Leave blank Birthday verify error message 

// @Test(priority=1)
	public void  DeafultVlaueYES_VisibilityRegistrationPageOnly_LeaveBlankBirthday()
			throws InterruptedException, IOException, AWTException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username,password);
		VerifyBirthdayPickerOnRegistration_FrontendandBackend.VerifybackendregistrationBirthDatePicker("Yes","Registration page only");
					switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
		driver.navigate().refresh();
		Thread.sleep(5000);
		try {
			username = readExcel("Registrationpage").getRow(45).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(45).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(45).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(45).getCell(4)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(45).getCell(6)
					.getStringCellValue();
			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(45).getCell(16)
					.getStringCellValue();

			// String errorMsg=readExcel("Registrationpage").getRow(45).getCell(17).getStringCellValue();
			try {
				Birthdaypicker = readExcel("Registrationpage").getRow(45)
						.getCell(5).getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				Birthdaypicker = "";
			}
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);
			frontpage.Fullnametext.sendKeys(Fullnametext);
			frontpage.Birthdaypicker.sendKeys(Birthdaypicker);
			
			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
		
			Thread.sleep(5000);
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
			Thread.sleep(5000);
			frontpage.signature.sendKeys(signature);
			Thread.sleep(5000);
			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
			Thread.sleep(5000);
			// Assert.assertTrue(frontpage.errorMsgforBlankEmail.getAttribute("data-original-title").contains(errorMsg));
			driver.navigate().back();

			writedatainExcel("Registrationpage", 46, 14, "Pass");

		} catch (Exception e) {
			e.getMessage();
			writedatainExcel("Registrationpage", 46, 14, "Fail");
			throw e;

		}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
//Back end Default Settings Visibility Register Page only Dafault Value No front End Registration page Leave blank Birthday verify Sucessfull Message

	// @Test(priority=2)
		public void DeafultVlaueNo_VisibilityRegistrationPageOnly_LeaveBlankBirthday()
				throws InterruptedException, IOException, AWTException {
			switchtoBackendendURL();

			VerifyBirthdayPickerOnRegistration_FrontendandBackend.VerifybackendregistrationBirthDatePicker("No","Registration page only");

						switchtoFrontendURL();
			frontendregisterpage frontpage = new frontendregisterpage();
			driver.navigate().refresh();
			Thread.sleep(5000);
			try {
				username = readExcel("Registrationpage").getRow(46).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(46).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(46).getCell(3)
						.getStringCellValue();
				Fullnametext = readExcel("Registrationpage").getRow(46).getCell(4)
						.getStringCellValue();
				signature = readExcel("Registrationpage").getRow(46).getCell(6)
						.getStringCellValue();
				InstantmessageSreenNameText = readExcel("Registrationpage").getRow(46).getCell(16)
						.getStringCellValue();

				 //String errorMsg=readExcel("Registrationpage").getRow(46).getCell(17).getStringCellValue();
				try {
					Birthdaypicker = readExcel("Registrationpage").getRow(46)
							.getCell(5).getStringCellValue();
				} catch (Exception e) {
					e.getMessage();
					Birthdaypicker = "";
				}
				frontpage.clickregister.click();
				Thread.sleep(6000);
				frontpage.Username.sendKeys(username);
				frontpage.password.sendKeys(password);
				frontpage.Email.sendKeys(Email);
				frontpage.Fullnametext.sendKeys(Fullnametext);
				frontpage.Birthdaypicker.sendKeys(Birthdaypicker);
				
				selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			
				Thread.sleep(5000);
				frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
				Thread.sleep(5000);
				frontpage.signature.sendKeys(signature);
				Thread.sleep(5000);
				
				EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
				Thread.sleep(5000);
				frontpage.createaccountbutton.click();
				Thread.sleep(5000);
				Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
		        frontpage.BacktoCategory.click();
			 	writedatainExcel("Registrationpage", 47, 14, "Pass");

			 } catch (Exception e) {
			 	e.getMessage();
			 	writedatainExcel("Registrationpage", 47, 14, "Fail");
			 	throw e;

			 }
			 Frontendlogin.logoutFromApp();
				Thread.sleep(5000);
			 driver.navigate().to((String) Credential.get("FrontendURL"));
			 }
	 
	//Back end Default Settings Visibility Hidden Dafault Value YES front End Registration page Leave blank Birthday verify Sucessfull message	 
	 
	// @Test(priority=3)
		public void DeafultVlaueYES_VisibilityHidden_LeaveBlankBirthday()
				throws InterruptedException, IOException, AWTException {
			switchtoBackendendURL();

			VerifyBirthdayPickerOnRegistration_FrontendandBackend.VerifybackendregistrationBirthDatePicker("Yes","Hidden");
						switchtoFrontendURL();
			frontendregisterpage frontpage = new frontendregisterpage();
			driver.navigate().refresh();
			Thread.sleep(5000);
			try {
				username = readExcel("Registrationpage").getRow(47).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(47).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(47).getCell(3)
						.getStringCellValue();
				Fullnametext = readExcel("Registrationpage").getRow(47).getCell(4)
						.getStringCellValue();
				signature = readExcel("Registrationpage").getRow(47).getCell(6)
						.getStringCellValue();
				InstantmessageSreenNameText = readExcel("Registrationpage").getRow(47).getCell(16)
						.getStringCellValue();

				// String
				// errorMsg=readExcel("Registrationpage").getRow(12).getCell(11).getStringCellValue();
				
				frontpage.clickregister.click();
				Thread.sleep(6000);
				frontpage.Username.sendKeys(username);
				frontpage.password.sendKeys(password);
				frontpage.Email.sendKeys(Email);
				frontpage.Fullnametext.sendKeys(Fullnametext);
			
				
				selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			
				Thread.sleep(5000);
				frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
				Thread.sleep(5000);
				frontpage.signature.sendKeys(signature);
				Thread.sleep(5000);
			
				EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
				Thread.sleep(5000);
				frontpage.createaccountbutton.click();
				Thread.sleep(5000);
				Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
		        frontpage.BacktoCategory.click();
			 	writedatainExcel("Registrationpage", 48, 14, "Pass");

			 } catch (Exception e) {
			 	e.getMessage();
			 	writedatainExcel("Registrationpage", 48, 14, "Fail");
			 	throw e;

			 }
			 Frontendlogin.logoutFromApp();
				Thread.sleep(5000);
			 driver.navigate().to((String) Credential.get("FrontendURL"));
			 }
	//Back end Default Settings Visibility Hidden Dafault Value No front End Registration page Leave blank Birthday verify Sucessfull message
	 
	// @Test(priority=4)
		public void DeafultVlaueNO_VisibilityHidden_LeaveBlankBirthday()
				throws InterruptedException, IOException, AWTException {
			switchtoBackendendURL();

			VerifyBirthdayPickerOnRegistration_FrontendandBackend.VerifybackendregistrationBirthDatePicker("No", "Hidden");
						switchtoFrontendURL();
			frontendregisterpage frontpage = new frontendregisterpage();
			driver.navigate().refresh();
			Thread.sleep(5000);
			try {
				username = readExcel("Registrationpage").getRow(48).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(48).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(48).getCell(3)
						.getStringCellValue();
				Fullnametext = readExcel("Registrationpage").getRow(48).getCell(4)
						.getStringCellValue();
				signature = readExcel("Registrationpage").getRow(48).getCell(6)
						.getStringCellValue();
				InstantmessageSreenNameText = readExcel("Registrationpage").getRow(48).getCell(16)
						.getStringCellValue();

				// String errorMsg=readExcel("Registrationpage").getRow(48).getCell(17).getStringCellValue();
			
				frontpage.clickregister.click();
				Thread.sleep(6000);
				frontpage.Username.sendKeys(username);
				frontpage.password.sendKeys(password);
				frontpage.Email.sendKeys(Email);
				frontpage.Fullnametext.sendKeys(Fullnametext);
		
				
				selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			
				Thread.sleep(5000);
				frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
				Thread.sleep(5000);
				frontpage.signature.sendKeys(signature);
				Thread.sleep(5000);
				EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
				Thread.sleep(5000);
				frontpage.createaccountbutton.click();
				Thread.sleep(5000);
				Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
		        frontpage.BacktoCategory.click();
			 	writedatainExcel("Registrationpage", 49, 14, "Pass");

			 } catch (Exception e) {
			 	e.getMessage();
			 	writedatainExcel("Registrationpage", 49, 14, "Fail");
			 	throw e;

			 }
			 Frontendlogin.logoutFromApp();
				Thread.sleep(5000);
			 driver.navigate().to((String) Credential.get("FrontendURL"));
			 }
	//Back end Default Settings Visibility Visible Dafault Value YES front End Registration page Leave blank Birthday verify Error message
	 
	 @Test(priority=5)
		public void DeafultVlaueYES_VisibilityVisible_LeaveBlankBirthday()
				throws InterruptedException, IOException, AWTException {
			switchtoBackendendURL();
			Backendlogin.LoginToAPP(username,password);
			VerifyBirthdayPickerOnRegistration_FrontendandBackend.VerifybackendregistrationBirthDatePicker("Yes","Visible");
						switchtoFrontendURL();
			frontendregisterpage frontpage = new frontendregisterpage();
			driver.navigate().refresh();
			Thread.sleep(5000);
			try {
				username = readExcel("Registrationpage").getRow(49).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(49).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(49).getCell(3)
						.getStringCellValue();
				Fullnametext = readExcel("Registrationpage").getRow(49).getCell(4)
						.getStringCellValue();
				signature = readExcel("Registrationpage").getRow(49).getCell(6)
						.getStringCellValue();
				InstantmessageSreenNameText = readExcel("Registrationpage").getRow(49).getCell(16)
						.getStringCellValue();

				// String errorMsg=readExcel("Registrationpage").getRow(49).getCell(17).getStringCellValue();
				try {
					Birthdaypicker = readExcel("Registrationpage").getRow(49)
							.getCell(5).getStringCellValue();
				} catch (Exception e) {
					e.getMessage();
					Birthdaypicker = "";
				}
				frontpage.clickregister.click();
				Thread.sleep(6000);
				frontpage.Username.sendKeys(username);
				frontpage.password.sendKeys(password);
				frontpage.Email.sendKeys(Email);
				frontpage.Fullnametext.sendKeys(Fullnametext);
				frontpage.Birthdaypicker.sendKeys(Birthdaypicker);
				
				selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			
				Thread.sleep(5000);
				frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
				Thread.sleep(5000);
				frontpage.signature.sendKeys(signature);
				Thread.sleep(5000);
				EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
				Thread.sleep(5000);
				frontpage.createaccountbutton.click();
				Thread.sleep(5000);
				// Assert.assertTrue(frontpage.errorMsgforBlankEmail.getAttribute("data-original-title").contains(errorMsg));
				driver.navigate().back();

				writedatainExcel("Registrationpage", 50, 14, "Pass");

			} catch (Exception e) {
				e.getMessage();
				writedatainExcel("Registrationpage", 50, 14, "Fail");
				throw e;

			}
			driver.navigate().to((String) Credential.get("FrontendURL"));
		}

	 
	//Back end Default Settings Visibility Visible Dafault Value No front End Registration page Leave blank Birthday verify Sucessfull message	 
	 @Test(priority=6)
		public void DeafultVlaueNO_VisibilityVisible_LeaveBlankBirthday()
				throws InterruptedException, IOException, AWTException {
			switchtoBackendendURL();

			VerifyBirthdayPickerOnRegistration_FrontendandBackend.VerifybackendregistrationBirthDatePicker("No","Visible");
						switchtoFrontendURL();
			frontendregisterpage frontpage = new frontendregisterpage();
			driver.navigate().refresh();
			Thread.sleep(5000);
			try {
				username = readExcel("Registrationpage").getRow(50).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(50).getCell(2)
						.getStringCellValue();
				Email = readExcel("Registrationpage").getRow(50).getCell(3)
						.getStringCellValue();
				Fullnametext = readExcel("Registrationpage").getRow(50).getCell(4)
						.getStringCellValue();
				signature = readExcel("Registrationpage").getRow(50).getCell(6)
						.getStringCellValue();
				InstantmessageSreenNameText = readExcel("Registrationpage").getRow(50).getCell(16)
						.getStringCellValue();

				// String errorMsg=readExcel("Registrationpage").getRow(50).getCell(17).getStringCellValue();
				try {
					Birthdaypicker = readExcel("Registrationpage").getRow(50)
							.getCell(5).getStringCellValue();
				} catch (Exception e) {
					e.getMessage();
					Birthdaypicker = "";
				}
				frontpage.clickregister.click();
				Thread.sleep(6000);
				frontpage.Username.sendKeys(username);
				frontpage.password.sendKeys(password);
				frontpage.Email.sendKeys(Email);
				frontpage.Fullnametext.sendKeys(Fullnametext);
				frontpage.Birthdaypicker.sendKeys(Birthdaypicker);
				
				selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			
				Thread.sleep(5000);
				frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
				Thread.sleep(5000);
				frontpage.signature.sendKeys(signature);
				Thread.sleep(5000);
				EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
				Thread.sleep(5000);
				frontpage.createaccountbutton.click();
				Thread.sleep(5000);
				Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
		        frontpage.BacktoCategory.click();
			 	writedatainExcel("Registrationpage", 51, 14, "Pass");

			 } catch (Exception e) {
			 	e.getMessage();
			 	writedatainExcel("Registrationpage", 51, 14, "Fail");
			 	throw e;

			 }
			 Frontendlogin.logoutFromApp();
				Thread.sleep(5000);
			 driver.navigate().to((String) Credential.get("FrontendURL"));
			 }}