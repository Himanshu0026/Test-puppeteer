package Com.testcases.registration;

import java.io.IOException;

import org.openqa.selenium.Keys;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class VerifyFullNameDefaultSettings_OnRegistrationPage extends baseClass {
	String username, password, Email, Fullnametext, signature, filepath,
			Picturepath, InstantmessageSreenNameText, Birthdaypicker;
	
	@Test
	public void VerifyFullNameOnRegistration_FrontendandBackend() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	//Back end Default Settings Visibility Register Page only Dafault Value YES front End Registration page Leave blank Full Name verify error message 

	 @Test(priority=1)
	public void  DeafultVlaueYES_VisibilityRegistrationPageOnly_LeaveBlankFullname()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username,password);
		VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("Yes","Registration page only");
	
		Thread.sleep(5000);
		
		switchtoFrontendURL();

		frontendregisterpage frontpage = new frontendregisterpage();
		try {
			username = readExcel("Registrationpage").getRow(33).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(33).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(33).getCell(3)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(33).getCell(6)
					.getStringCellValue();
			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(33).getCell(16)
					.getStringCellValue();

			// String
			// errorMsg=readExcel("Registrationpage").getRow(11).getCell(11).getStringCellValue();
			try {
				Fullnametext = readExcel("Registrationpage").getRow(33)
						.getCell(4).getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				Fullnametext = "";
			}
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);
			frontpage.Fullnametext.sendKeys(Fullnametext);
			frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
			Thread.sleep(5000);
			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
		   
			Thread.sleep(5000);
			frontpage.signature.sendKeys(signature);
			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
			Thread.sleep(5000);
			// System.out.println(frontpage.errorMsgforBlankusername.getAttribute("data-original-title"));
			// Assert.assertTrue(frontpage.errorMsgforBlankusername.getAttribute("data-original-title").contains(errorMsg));

			driver.navigate().back();
			writedatainExcel("Registrationpage", 34, 14, "Pass");

		} catch (Exception e) {
			e.getMessage();
			writedatainExcel("Registrationpage", 34, 14, "Fail");
			throw e;

		}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	 
	//Back end Default Settings Visibility Register Page only Dafault Value No front End Registration page Leave blank Full Name verify Sucessful message 
	 @Test(priority=2)
	 public void DeafultVlaueNo_VisibilityRegistrationPageOnly_LeaveBlankFullname()
	 	throws InterruptedException, IOException {
	 switchtoBackendendURL();
	
	 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("No","Registration page only");

	 Thread.sleep(5000);

	 switchtoFrontendURL();

	 frontendregisterpage frontpage = new frontendregisterpage();
	 try {
	 	username = readExcel("Registrationpage").getRow(34).getCell(1)
	 			.getStringCellValue();
	 	password = readExcel("Registrationpage").getRow(34).getCell(2)
	 			.getStringCellValue();
	 	Email = readExcel("Registrationpage").getRow(34).getCell(3)
	 			.getStringCellValue();
	 	signature = readExcel("Registrationpage").getRow(34).getCell(6)
	 			.getStringCellValue();
	 	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(34).getCell(16)
	 			.getStringCellValue();
	 	try {
			Fullnametext = readExcel("Registrationpage").getRow(33)
					.getCell(4).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			Fullnametext = "";
		}
	 	
	 	frontpage.clickregister.click();
	 	Thread.sleep(6000);
	 	frontpage.Username.sendKeys(username);
	 	frontpage.password.sendKeys(password);
	 	frontpage.Email.sendKeys(Email);
	 	frontpage.Fullnametext.sendKeys("");
	 	frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
	 	Thread.sleep(5000);
	 	selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
	 	frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
	    
	 	Thread.sleep(5000);
	 	frontpage.signature.sendKeys(signature);
		Thread.sleep(5000);
		EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	 	frontpage.createaccountbutton.click();
	 	Thread.sleep(5000);
	 	Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
        frontpage.BacktoCategory.click();
	 	writedatainExcel("Registrationpage", 35, 14, "Pass");

	 } catch (Exception e) {
	 	e.getMessage();
	 	writedatainExcel("Registrationpage", 35, 14, "Fail");
	 	throw e;

	 }
	 Frontendlogin.logoutFromApp();
		Thread.sleep(5000);
	 driver.navigate().to((String) Credential.get("FrontendURL"));
	 }
	 
	//Back end Default Settings Visibility Hidden Dafault Value YES front End Registration page Full Name Disable verify Sucessful message 
	 @Test(priority=3)
	 public void DeafultVlaueYES_VisibilityHidden_LeaveBlankFullname()
	 	throws InterruptedException, IOException {
	 switchtoBackendendURL();
	
	 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("Yes", "Hidden");

	 Thread.sleep(5000);

	 switchtoFrontendURL();

	 frontendregisterpage frontpage = new frontendregisterpage();
	 try {
	 	username = readExcel("Registrationpage").getRow(35).getCell(1)
	 			.getStringCellValue();
	 	password = readExcel("Registrationpage").getRow(35).getCell(2)
	 			.getStringCellValue();
	 	Email = readExcel("Registrationpage").getRow(35).getCell(3)
	 			.getStringCellValue();
	 	signature = readExcel("Registrationpage").getRow(35).getCell(6)
	 			.getStringCellValue();
	 	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(35).getCell(16)
	 			.getStringCellValue();

	 	// String
	 	// errorMsg=readExcel("Registrationpage").getRow(11).getCell(11).getStringCellValue();
	 
	 	frontpage.clickregister.click();
	 	Thread.sleep(6000);
	 	frontpage.Username.sendKeys(username);
	 	frontpage.password.sendKeys(password);
	 	frontpage.Email.sendKeys(Email);
	 
	 	frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
	 	Thread.sleep(5000);
	 	selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
	 	frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
	    
	 	Thread.sleep(5000);
	 	frontpage.signature.sendKeys(signature);
	 	Thread.sleep(5000);
		EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	 	frontpage.createaccountbutton.click();
	 	Thread.sleep(5000);

	 	Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
        frontpage.BacktoCategory.click();
	 	writedatainExcel("Registrationpage", 36, 14, "Pass");

	 } catch (Exception e) {
	 	e.getMessage();
	 	writedatainExcel("Registrationpage", 36, 14, "Fail");
	 	throw e;

	 }
	 Frontendlogin.logoutFromApp();
		Thread.sleep(5000);
	 driver.navigate().to((String) Credential.get("FrontendURL"));
	 }
	 
	//Back end Default Settings Visibility Hidden Dafault Value No front End Registration page Full Name Disable verify Sucessful message 
	 @Test(priority=4)
	 public void DeafultVlaueNO_VisibilityHidden_LeaveBlankFullname()
	 	throws InterruptedException, IOException {
	 switchtoBackendendURL();

	 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("No","Hidden");

	 Thread.sleep(5000);

	 switchtoFrontendURL();

	 frontendregisterpage frontpage = new frontendregisterpage();
	 try {
	 	username = readExcel("Registrationpage").getRow(36).getCell(1)
	 			.getStringCellValue();
	 	password = readExcel("Registrationpage").getRow(36).getCell(2)
	 			.getStringCellValue();
	 	Email = readExcel("Registrationpage").getRow(36).getCell(3)
	 			.getStringCellValue();
	 	signature = readExcel("Registrationpage").getRow(36).getCell(6)
	 			.getStringCellValue();
	 	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(36).getCell(16)
	 			.getStringCellValue();

	 	// String errorMsg=readExcel("Registrationpage").getRow(36).getCell(11).getStringCellValue();
	 	
	 
	 	frontpage.clickregister.click();
	 	Thread.sleep(6000);
	 	frontpage.Username.sendKeys(username);
	 	frontpage.password.sendKeys(password);
	 	frontpage.Email.sendKeys(Email);
	 	
	 	frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
	 	Thread.sleep(5000);
	 	selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
	 	frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
	    
	 	Thread.sleep(5000);
	 	frontpage.signature.sendKeys(signature);
	 	Thread.sleep(5000);
		EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	 	frontpage.createaccountbutton.click();
	 	Thread.sleep(5000);
	 	

	 	Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
        frontpage.BacktoCategory.click();
	 	writedatainExcel("Registrationpage", 37, 14, "Pass");

	 } catch (Exception e) {
	 	e.getMessage();
	 	writedatainExcel("Registrationpage", 37, 14, "Fail");
	 	throw e;

	 }
	 Frontendlogin.logoutFromApp();
		Thread.sleep(5000);
	 driver.navigate().to((String) Credential.get("FrontendURL"));
	 }
	 
	//Back end Default Settings Visibility Visible Dafault Value YES front End Registration page Leave blank Full Name verify error message 
	 
	 @Test(priority=5)
	 public void  DeafultVlaueYES_VisibilityVisible_LeaveBlankFullname()
	 	throws InterruptedException, IOException {
	 switchtoBackendendURL();
	
	 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("Yes","Visible");

	 Thread.sleep(5000);

	 switchtoFrontendURL();

	 frontendregisterpage frontpage = new frontendregisterpage();
	 try {
	 	username = readExcel("Registrationpage").getRow(37).getCell(1)
	 			.getStringCellValue();
	 	password = readExcel("Registrationpage").getRow(37).getCell(2)
	 			.getStringCellValue();
	 	Email = readExcel("Registrationpage").getRow(37).getCell(3)
	 			.getStringCellValue();
	 	signature = readExcel("Registrationpage").getRow(37).getCell(6)
	 			.getStringCellValue();
	 	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(37).getCell(16)
	 			.getStringCellValue();

	 	// String
	 	// errorMsg=readExcel("Registrationpage").getRow(11).getCell(11).getStringCellValue();
	 	try {
	 		Fullnametext = readExcel("Registrationpage").getRow(37)
	 				.getCell(4).getStringCellValue();
	 	} catch (Exception e) {
	 		e.getMessage();
	 		Fullnametext = "";
	 	}
	 	frontpage.clickregister.click();
	 	Thread.sleep(6000);
	 	frontpage.Username.sendKeys(username);
	 	frontpage.password.sendKeys(password);
	 	frontpage.Email.sendKeys(Email);
	
	 	frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
	 	Thread.sleep(5000);
	 	selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
	 	frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
	    
	 	Thread.sleep(5000);
	 	frontpage.signature.sendKeys(signature);
	 	Thread.sleep(5000);
		EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	 	frontpage.createaccountbutton.click();
	 	Thread.sleep(5000);
	 	driver.navigate().back();
	 	writedatainExcel("Registrationpage", 37, 14, "Pass");

	 } catch (Exception e) {
	 	e.getMessage();
	 	writedatainExcel("Registrationpage", 37, 14, "Fail");
	 	throw e;
 }


	 driver.navigate().to((String) Credential.get("FrontendURL"));
	 }
	 
	//Back end Default Settings Visibility Visible Dafault Value No front End Registration page Leave blank Full Name verify Successful Message
	 
	 @Test(priority=6)
	 public void DeafultVlaueNO_VisibilityVisible_LeaveBlankFullname()
	 	throws InterruptedException, IOException {
	 switchtoBackendendURL();
	
	 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("No","Visible");

	 Thread.sleep(5000);

	 switchtoFrontendURL();

	 frontendregisterpage frontpage = new frontendregisterpage();
	 try {
	 	username = readExcel("Registrationpage").getRow(38).getCell(1)
	 			.getStringCellValue();
	 	password = readExcel("Registrationpage").getRow(38).getCell(2)
	 			.getStringCellValue();
	 	Email = readExcel("Registrationpage").getRow(38).getCell(3)
	 			.getStringCellValue();
	 	signature = readExcel("Registrationpage").getRow(38).getCell(6)
	 			.getStringCellValue();
	 	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(38).getCell(16)
	 			.getStringCellValue();
	 	try {
			Fullnametext = readExcel("Registrationpage").getRow(33)
					.getCell(4).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			Fullnametext = "";
		}
	 	// String
	 	// errorMsg=readExcel("Registrationpage").getRow(11).getCell(11).getStringCellValue();
	 	
	 	frontpage.clickregister.click();
	 	Thread.sleep(6000);
	 	frontpage.Username.sendKeys(username);
	 	frontpage.password.sendKeys(password);
	 	frontpage.Email.sendKeys(Email);
	 	frontpage.Fullnametext.sendKeys(Fullnametext);
	 	frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
	 	Thread.sleep(5000);
	 	selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
	 	frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
	    
	 	Thread.sleep(5000);
	 	frontpage.signature.sendKeys(signature);
	 	Thread.sleep(5000);
		EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	 	frontpage.createaccountbutton.click();
	 	Thread.sleep(5000);
	 	Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
        frontpage.BacktoCategory.click();
	 	writedatainExcel("Registrationpage", 38, 14, "Pass");

	 } catch (Exception e) {
	 	e.getMessage();
	 	writedatainExcel("Registrationpage", 38, 14, "Fail");
	 	throw e;

	 }
	 Frontendlogin.logoutFromApp();
		Thread.sleep(5000);
	 driver.navigate().to((String) Credential.get("FrontendURL"));
	 }}
	 
	 
	