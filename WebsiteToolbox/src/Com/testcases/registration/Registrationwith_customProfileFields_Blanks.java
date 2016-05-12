package Com.testcases.registration;


import java.io.IOException;

import org.openqa.selenium.Keys;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Backendusersdropdownobjects;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class Registrationwith_customProfileFields_Blanks extends baseClass {

	String username, password, Email, Fullnametext, signature, filepath,
			shortanswer,Paragraph, Picturepath, InstantmessageSreenNameText,
			Birthdaypicker;

    @Test
	public void VerifyFullNameOnRegistration_FrontendandBackend() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
 @Test(priority = 1)
	public void VerifyBackendPermessionsShortAnswerLeaveBlank()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		Backendlogin.LoginToAPP(username, password);
		Verify_RegistrationPage_Paragraph_Multiple_Single_Multiple_FrontendandBackendPermessions
				.VerifybackendPermessionsRequired("Short answer");
		Thread.sleep(5000);
		register.NewFieldTitleText.sendKeys("Short answer");
		EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox,true);
		EnableorDisable_Checkbox(register.NewFieldRequiredCheckBox, false);
		Thread.sleep(5000);
		register.SaveButtonClick.click();

		Thread.sleep(5000);
       switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
try{
			username = readExcel("Registrationpage").getRow(20).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(20).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(20).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(20).getCell(4)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(20).getCell(6)
					.getStringCellValue();
			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(20).getCell(16)
					.getStringCellValue();
			
			// String
			// errorMsg=readExcel("Registrationpage").getRow(20).getCell(17).getStringCellValue();
			try {
				shortanswer = readExcel("Registrationpage").getRow(19)
						.getCell(9).getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				shortanswer = "";
			}
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);
			frontpage.Fullnametext.sendKeys(Fullnametext);
			Thread.sleep(5000);
			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
		   
			Thread.sleep(5000);
			
			frontpage.Birthdaypicker.sendKeys("06/06/2015"+Keys.TAB);
			Thread.sleep(5000);
			frontpage.ShotAnswers.sendKeys(shortanswer);
			Thread.sleep(5000);
			frontpage.signature.sendKeys(signature);
			Thread.sleep(5000);
		
			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
		 	Thread.sleep(5000);
		 	Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 21, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 21, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
		 


@Test(priority = 2)
	public void VerifyBackendPermessionsParagraphLeaveBlank()
			throws InterruptedException, IOException {
	switchtoBackendendURL();

	Backendusersdropdownobjects register = new Backendusersdropdownobjects();
	
	
	Verify_RegistrationPage_Paragraph_Multiple_Single_Multiple_FrontendandBackendPermessions.VerifybackendPermessionsRequired("Paragraph");
	Thread.sleep(5000);
	register.NewFieldTitleText.sendKeys("Paragraph");
	EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox, true);
	EnableorDisable_Checkbox(register.NewFieldRequiredCheckBox, false);
	Thread.sleep(5000);
	register.SaveButtonClick.click();
	
	Thread.sleep(5000);
	switchtoFrontendURL();
	
	driver.navigate().refresh();
	frontendregisterpage frontpage = new frontendregisterpage();
try{

			username = readExcel("Registrationpage").getRow(21).getCell(1)
					.getStringCellValue();
			password = readExcel("Registrationpage").getRow(21).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(21).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(21).getCell(4)
					.getStringCellValue();
			signature = readExcel("Registrationpage").getRow(21).getCell(6)
					.getStringCellValue();
			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(21).getCell(16)
					.getStringCellValue();
			
			shortanswer = readExcel("Registrationpage").getRow(21).getCell(9)
					.getStringCellValue();
			
			
			// String
			// errorMsg=readExcel("Registrationpage").getRow(21).getCell(17).getStringCellValue();
			try {
				Paragraph = readExcel("Registrationpage").getRow(21)
						.getCell(10).getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				Paragraph = "";
			}
			frontpage.clickregister.click();
			Thread.sleep(6000);
			frontpage.Username.sendKeys(username);
			frontpage.password.sendKeys(password);
			frontpage.Email.sendKeys(Email);
			frontpage.Fullnametext.sendKeys(Fullnametext);
			Thread.sleep(5000);
			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
		   
			Thread.sleep(5000);

		frontpage.Birthdaypicker.sendKeys("06/06/2015"+Keys.TAB);
		  Thread.sleep(5000);
		  frontpage.ShotAnswers.sendKeys(shortanswer);
		  frontpage.ParaGrapth.sendKeys(Paragraph);
		  Thread.sleep(5000);
			frontpage.signature.sendKeys(signature);
			Thread.sleep(5000);
		
		    
		    EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
		 	Thread.sleep(5000);
		 	Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 22, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 22, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
		 
@Test(priority = 3)
public void VerifyCustomFieldsShortAnswerLeaveBlankReqiredCase()
		throws InterruptedException, IOException {
	switchtoBackendendURL();
	Backendusersdropdownobjects register = new Backendusersdropdownobjects();
	
	Verify_RegistrationPage_Paragraph_Multiple_Single_Multiple_FrontendandBackendPermessions
			.VerifybackendPermessionsRequired("Short answer");
	Thread.sleep(5000);
	register.NewFieldTitleText.sendKeys("Short answer");
	EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox,true);
	EnableorDisable_Checkbox(register.NewFieldRequiredCheckBox, true);
	Thread.sleep(5000);
	register.SaveButtonClick.click();

	Thread.sleep(5000);
   switchtoFrontendURL();
	frontendregisterpage frontpage = new frontendregisterpage();
try{
		username = readExcel("Registrationpage").getRow(24).getCell(1)
				.getStringCellValue();
		password = readExcel("Registrationpage").getRow(24).getCell(2)
				.getStringCellValue();
		Email = readExcel("Registrationpage").getRow(24).getCell(3)
				.getStringCellValue();
		Fullnametext = readExcel("Registrationpage").getRow(24).getCell(4)
				.getStringCellValue();
		signature = readExcel("Registrationpage").getRow(24).getCell(6)
				.getStringCellValue();
		InstantmessageSreenNameText = readExcel("Registrationpage").getRow(24).getCell(16)
				.getStringCellValue();
		
		// String
		// errorMsg=readExcel("Registrationpage").getRow(20).getCell(17).getStringCellValue();
		try {
			shortanswer = readExcel("Registrationpage").getRow(24)
					.getCell(9).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			shortanswer = "";
		}
		frontpage.clickregister.click();
		Thread.sleep(6000);
		frontpage.Username.sendKeys(username);
		frontpage.password.sendKeys(password);
		frontpage.Email.sendKeys(Email);
		frontpage.Fullnametext.sendKeys(Fullnametext);
		Thread.sleep(5000);
		selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
		frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
	   
		Thread.sleep(5000);
		
		frontpage.Birthdaypicker.sendKeys("06/06/2015"+Keys.TAB);
		Thread.sleep(5000);
		frontpage.ShotAnswers.sendKeys(shortanswer);
		Thread.sleep(5000);
		frontpage.signature.sendKeys(signature);
		Thread.sleep(5000);
	
		EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
		Thread.sleep(5000);
		frontpage.createaccountbutton.click();
		Thread.sleep(5000);
		// System.out.println(frontpage.errorMsgforBlankusername.getAttribute("data-original-title"));
		// Assert.assertTrue(frontpage.errorMsgforBlankusername.getAttribute("data-original-title").contains(errorMsg));

		driver.navigate().back();
		writedatainExcel("Registrationpage", 25, 14, "Pass");

	} catch (Exception e) {
		e.getMessage();
		writedatainExcel("Registrationpage", 25, 14, "Fail");
		throw e;

	}
	driver.navigate().to((String) Credential.get("FrontendURL"));
}



@Test(priority = 4)
public void VerifyCustomFieldsParagraphLeaveBlankReqiredCase()
		throws InterruptedException, IOException {
switchtoBackendendURL();

Backendusersdropdownobjects register = new Backendusersdropdownobjects();


Verify_RegistrationPage_Paragraph_Multiple_Single_Multiple_FrontendandBackendPermessions.VerifybackendPermessionsRequired("Paragraph");
Thread.sleep(5000);
register.NewFieldTitleText.sendKeys("Paragraph");
EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox, true);
EnableorDisable_Checkbox(register.NewFieldRequiredCheckBox, true);
Thread.sleep(5000);
register.SaveButtonClick.click();

Thread.sleep(5000);
switchtoFrontendURL();

driver.navigate().refresh();
frontendregisterpage frontpage = new frontendregisterpage();
try{

		username = readExcel("Registrationpage").getRow(25).getCell(1)
				.getStringCellValue();
		password = readExcel("Registrationpage").getRow(25).getCell(2)
				.getStringCellValue();
		Email = readExcel("Registrationpage").getRow(25).getCell(3)
				.getStringCellValue();
		Fullnametext = readExcel("Registrationpage").getRow(25).getCell(4)
				.getStringCellValue();
		signature = readExcel("Registrationpage").getRow(25).getCell(6)
				.getStringCellValue();
		InstantmessageSreenNameText = readExcel("Registrationpage").getRow(25).getCell(16)
				.getStringCellValue();
		
		shortanswer = readExcel("Registrationpage").getRow(25).getCell(9)
				.getStringCellValue();
		
		
		// String
		// errorMsg=readExcel("Registrationpage").getRow(21).getCell(17).getStringCellValue();
		try {
			Paragraph = readExcel("Registrationpage").getRow(25)
					.getCell(10).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			Paragraph = "";
		}
		frontpage.clickregister.click();
		Thread.sleep(6000);
		frontpage.Username.sendKeys(username);
		frontpage.password.sendKeys(password);
		frontpage.Email.sendKeys(Email);
		frontpage.Fullnametext.sendKeys(Fullnametext);
		Thread.sleep(5000);
		selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
		frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
	   
		Thread.sleep(5000);

	frontpage.Birthdaypicker.sendKeys("06/06/2015"+Keys.TAB);
	  Thread.sleep(5000);
	  frontpage.ShotAnswers.sendKeys(shortanswer);
	  frontpage.ParaGrapth.sendKeys(Paragraph);
	  Thread.sleep(5000);
		frontpage.signature.sendKeys(signature);
		Thread.sleep(5000);
	
	    
	    EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
		Thread.sleep(5000);
		frontpage.createaccountbutton.click();
		Thread.sleep(5000);
		// System.out.println(frontpage.errorMsgforBlankusername.getAttribute("data-original-title"));
		// Assert.assertTrue(frontpage.errorMsgforBlankusername.getAttribute("data-original-title").contains(errorMsg));

		driver.navigate().back();
		writedatainExcel("Registrationpage",26, 14, "Pass");

	} catch (Exception e) {
		e.getMessage();
		writedatainExcel("Registrationpage", 26, 14, "Fail");
		throw e;

	}
	driver.navigate().to((String) Credential.get("FrontendURL"));
}}











