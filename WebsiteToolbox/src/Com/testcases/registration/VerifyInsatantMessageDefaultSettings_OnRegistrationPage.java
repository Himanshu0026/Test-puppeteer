package Com.testcases.registration;

import java.awt.AWTException;
import java.io.IOException;

import org.openqa.selenium.Keys;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class VerifyInsatantMessageDefaultSettings_OnRegistrationPage extends baseClass {
	String username, password, Email, Fullnametext, signature, filepath,
			Picturepath, InstantmessageSreenNameText, Birthdaypicker;
	
	@Test
	public void VerifyFullNameOnRegistration_FrontendandBackend() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	//Back end Default Settings Visibility Register Page only Dafault Value YES front End Registration page Leave blank Full Name verify error message 
	
   @Test(priority = 1)
	public void RegistrationwithInstantMessageblankdata()
			throws InterruptedException, IOException, AWTException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username,password);
	VerifyInstantMessagingOnRegistration_FrontendandBackend.VerifybackendregistrationInstantMessaging("Yes","Registration page only");
	Thread.sleep(5000);
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
		driver.navigate().refresh();
		try {
			username = readExcel("Registrationpage").getRow(67).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(67).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(67).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(67).getCell(4)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(67).getCell(6)
					.getStringCellValue();

			 //String errorMsg=readExcel("Registrationpage").getRow(13).getCell(11).getStringCellValue();
			try {
				InstantmessageSreenNameText = readExcel("Registrationpage").getRow(67).getCell(16)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				InstantmessageSreenNameText = "";
			}
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);

			frontpage.Fullnametext.sendKeys(Fullnametext);
			frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			
	
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);
			//frontpage.signature.click();
		   frontpage.signature.sendKeys(signature);
			Thread.sleep(5000);
			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
			Thread.sleep(10000);

		
			// Assert.assertTrue(frontpage.errorMsgforBlankpassword.getAttribute("data-original-title").contains(errorMsg));
			driver.navigate().back();
			writedatainExcel("Registrationpage", 68, 14, "Pass");

		} catch (Exception e) {
			e.getMessage();
			writedatainExcel("Registrationpage", 68, 14, "Fail");
			throw e;

		}
	}
	
	@Test(priority = 2)
	public void RegistrationwithInstantMessageblankdataRegistrationpageRequiredYES()
			throws InterruptedException, IOException, AWTException {
		switchtoBackendendURL();
	
	VerifyInstantMessagingOnRegistration_FrontendandBackend.VerifybackendregistrationInstantMessaging("No","Registration page only");

	Thread.sleep(5000);
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
		driver.navigate().refresh();
		try {
			username = readExcel("Registrationpage").getRow(68).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(68).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(68).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(68).getCell(4)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(68).getCell(6)
					.getStringCellValue();

			 //String errorMsg=readExcel("Registrationpage").getRow(68).getCell(17).getStringCellValue();
			try {
				InstantmessageSreenNameText = readExcel("Registrationpage").getRow(68).getCell(16)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				InstantmessageSreenNameText = "";
			}
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);

			frontpage.Fullnametext.sendKeys(Fullnametext);
			frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			
	
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);
			//frontpage.signature.click();
		   frontpage.signature.sendKeys(signature);
			Thread.sleep(5000);
			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
			Thread.sleep(5000);
			Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 69, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 69, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
	
	@Test(priority = 3)
	public void RegistrationwithInstantMessageblankdataVisibleYes()
			throws InterruptedException, IOException, AWTException {
		switchtoBackendendURL();
	
	VerifyInstantMessagingOnRegistration_FrontendandBackend.VerifybackendregistrationInstantMessaging("Yes","Hidden");
	Thread.sleep(5000);
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
		driver.navigate().refresh();
		try {
			username = readExcel("Registrationpage").getRow(69).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(69).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(69).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(69).getCell(4)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(69).getCell(6)
					.getStringCellValue();

			 //String errorMsg=readExcel("Registrationpage").getRow(69).getCell(17).getStringCellValue();
		
			
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);

			frontpage.Fullnametext.sendKeys(Fullnametext);
			frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
		
			Thread.sleep(5000);
			//frontpage.signature.click();
		   frontpage.signature.sendKeys(signature);
			Thread.sleep(5000);
			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
			Thread.sleep(5000);
			Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 70, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 70, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
	
	@Test(priority = 4)
	public void RegistrationwithInstantMessageblankdataVisibleNo()
			throws InterruptedException, IOException, AWTException {
		switchtoBackendendURL();
	
	VerifyInstantMessagingOnRegistration_FrontendandBackend.VerifybackendregistrationInstantMessaging("No","Hidden");
	Thread.sleep(5000);
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
		driver.navigate().refresh();
		try {
			username = readExcel("Registrationpage").getRow(70).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(70).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(70).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(70).getCell(4)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(70).getCell(6)
					.getStringCellValue();

			 //String errorMsg=readExcel("Registrationpage").getRow(70).getCell(17).getStringCellValue();
			
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);

			frontpage.Fullnametext.sendKeys(Fullnametext);
			frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
			Thread.sleep(8000);
		
			//frontpage.signature.click();
		   frontpage.signature.sendKeys(signature);
			Thread.sleep(5000);
			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
			Thread.sleep(5000);
			Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 71, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 71, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
	@Test(priority = 5)
	public void RegistrationwithInstantMessageblankdataHiddenNo()
			throws InterruptedException, IOException, AWTException {
		switchtoBackendendURL();
	
	VerifyInstantMessagingOnRegistration_FrontendandBackend.VerifybackendregistrationInstantMessaging("Yes", "Visible");
	Thread.sleep(5000);
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
		driver.navigate().refresh();
		try {
			username = readExcel("Registrationpage").getRow(71).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(71).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(71).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(71).getCell(4)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(71).getCell(6)
					.getStringCellValue();

			 //String errorMsg=readExcel("Registrationpage").getRow(71).getCell(17).getStringCellValue();
			try {
				InstantmessageSreenNameText = readExcel("Registrationpage").getRow(71).getCell(16)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				InstantmessageSreenNameText = "";
			}
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);

			frontpage.Fullnametext.sendKeys(Fullnametext);
			frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			
	
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);
			//frontpage.signature.click();
		   frontpage.signature.sendKeys(signature);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
			Thread.sleep(10000);

		
			// Assert.assertTrue(frontpage.errorMsgforBlankpassword.getAttribute("data-original-title").contains(errorMsg));
			driver.navigate().back();
			writedatainExcel("Registrationpage", 72, 14, "Pass");

		} catch (Exception e) {
			e.getMessage();
			writedatainExcel("Registrationpage", 72, 14, "Fail");
			throw e;

		}
	}
	@Test(priority = 6)
	public void RegistrationwithInstantMessageblankdataHiddenYes()
			throws InterruptedException, IOException, AWTException {
		switchtoBackendendURL();
	
	VerifyInstantMessagingOnRegistration_FrontendandBackend.VerifybackendregistrationInstantMessaging("No","Visible");
	Thread.sleep(5000);
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
		driver.navigate().refresh();
		try {
			username = readExcel("Registrationpage").getRow(72).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(72).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(72).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(72).getCell(4)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(72).getCell(6)
					.getStringCellValue();

			 //String errorMsg=readExcel("Registrationpage").getRow(72).getCell(17).getStringCellValue();
			try {
				InstantmessageSreenNameText = readExcel("Registrationpage").getRow(72).getCell(16)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				InstantmessageSreenNameText = "";
			}
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);

			frontpage.Fullnametext.sendKeys(Fullnametext);
			frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			
	
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);
			//frontpage.signature.click();
		   frontpage.signature.sendKeys(signature);
			Thread.sleep(5000);
			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
			Thread.sleep(5000);
			Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 73, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 73, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }}
