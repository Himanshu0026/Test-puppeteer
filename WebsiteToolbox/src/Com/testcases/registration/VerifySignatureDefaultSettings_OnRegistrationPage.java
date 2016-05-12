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

public class VerifySignatureDefaultSettings_OnRegistrationPage extends baseClass {
	String username, password, Email, Fullnametext, signature, filepath,
			Picturepath, InstantmessageSreenNameText, Birthdaypicker;
	
	@Test
	public void VerifyFullNameOnRegistration_FrontendandBackend() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	//Back end Default Settings Registration Page Only Visible Dafault Value No front End Registration page Leave blank Signature verify Sucessfull message	 
	
	 
  // @Test(priority =1 )
	public void DeafultVlaueYES_VisibilityRegistrationPageOnly_LeaveBlankSignature()
			throws InterruptedException, IOException, AWTException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username,password);
	    VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("Yes","Registration page only");
	    Thread.sleep(5000);
		switchtoFrontendURL();
		Thread.sleep(5000);
		frontendregisterpage frontpage = new frontendregisterpage();
		driver.navigate().refresh();
		Thread.sleep(5000);
	
		try {
			username = readExcel("Registrationpage").getRow(56).getCell(1)
					.getStringCellValue();
			
			password = readExcel("Registrationpage").getRow(56).getCell(2)
					.getStringCellValue();
			Email = readExcel("Registrationpage").getRow(56).getCell(3)
					.getStringCellValue();
			Fullnametext = readExcel("Registrationpage").getRow(56).getCell(4)
					.getStringCellValue();
			
			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(56).getCell(16)
					.getStringCellValue();


			 //String errorMsg=readExcel("Registrationpage").getRow(56).getCell(17).getStringCellValue();
			try {
				signature = readExcel("Registrationpage").getRow(56).getCell(6)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				signature = "";
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
			Thread.sleep(8000);
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
			Thread.sleep(5000);
	      //frontpage.signature.click();
			frontpage.signature.sendKeys(signature);
     		Thread.sleep(5000);
     		EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
			frontpage.createaccountbutton.click();
			Thread.sleep(10000);
			driver.switchTo().alert().accept();
			Thread.sleep(5000);
			// Assert.assertTrue(frontpage.errorMsgforBlankpassword.getAttribute("data-original-title").contains(errorMsg));
			driver.navigate().back();
			writedatainExcel("Registrationpage", 57, 14, "Pass");

		} catch (Exception e) {
			e.getMessage();
			writedatainExcel("Registrationpage", 57, 14, "Fail");
			throw e;

		}
	}
//   @Test(priority =2 )
  	public void RegistrationwithSignatureblankdataRegisterPageRequiredNO()
  			throws InterruptedException, IOException, AWTException {
  		switchtoBackendendURL();
  		
  	VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("No","Registration page only");

  	Thread.sleep(5000);
  		switchtoFrontendURL();
  		Thread.sleep(5000);
  		frontendregisterpage frontpage = new frontendregisterpage();
  		driver.navigate().refresh();
  		Thread.sleep(5000);
  	
  		try {
  			username = readExcel("Registrationpage").getRow(57).getCell(1)
  					.getStringCellValue();
  			password = readExcel("Registrationpage").getRow(57).getCell(2)
					.getStringCellValue();
  			Email = readExcel("Registrationpage").getRow(57).getCell(3)
  					.getStringCellValue();
  			Fullnametext = readExcel("Registrationpage").getRow(57).getCell(4)
  					.getStringCellValue();
  			
  			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(57).getCell(16)
  					.getStringCellValue();


  			 //String errorMsg=readExcel("Registrationpage").getRow(57).getCell(17).getStringCellValue();
  			try {
  				signature = readExcel("Registrationpage").getRow(57).getCell(6)
  						.getStringCellValue();
  			} catch (Exception e) {
  				e.getMessage();
  				signature = "";
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
  			Thread.sleep(8000);
  			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
  			Thread.sleep(5000);
          	frontpage.signature.click();
  			//frontpage.signature.sendKeys(signature);
 			Thread.sleep(5000);
 			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
  			frontpage.createaccountbutton.click();
  		
  			Thread.sleep(5000);
  			Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 58, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 58, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
   
  // @Test(priority =3 )
  	public void RegistrationwithSignatureblankdataHiddenYes()
  			throws InterruptedException, IOException, AWTException {
  		switchtoBackendendURL();
  		
  	VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("Yes","Hidden");
  	Thread.sleep(5000);
  		switchtoFrontendURL();
  		Thread.sleep(5000);
  		frontendregisterpage frontpage = new frontendregisterpage();
  		driver.navigate().refresh();
  		Thread.sleep(5000);
  	
  		try {
  			username = readExcel("Registrationpage").getRow(58).getCell(1)
  					.getStringCellValue();
  			password = readExcel("Registrationpage").getRow(58).getCell(2)
					.getStringCellValue();
  			Email = readExcel("Registrationpage").getRow(58).getCell(3)
  					.getStringCellValue();
  			Fullnametext = readExcel("Registrationpage").getRow(58).getCell(4)
  					.getStringCellValue();
  			
  			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(58).getCell(16)
  					.getStringCellValue();


  			 //String errorMsg=readExcel("Registrationpage").getRow(58).getCell(17).getStringCellValue();
  			
  			frontpage.clickregister.click();
  			Thread.sleep(6000);
  			frontpage.Username.sendKeys(username);
  			frontpage.password.sendKeys(password);
  			frontpage.Email.sendKeys(Email);

  			frontpage.Fullnametext.sendKeys(Fullnametext);
  			frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
  			Thread.sleep(8000);
  				
  			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
  			Thread.sleep(8000);
  			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
  			Thread.sleep(5000);
  			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
  			frontpage.createaccountbutton.click();
  			Thread.sleep(5000);
  			
  			Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 59, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 59, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
   
  // @Test(priority =4 )
 	public void RegistrationwithSignatureblankdataHiddenNo()
 			throws InterruptedException, IOException, AWTException {
 		switchtoBackendendURL();
 		
 	VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("No", "Hidden");
 	Thread.sleep(5000);
 		switchtoFrontendURL();
 		Thread.sleep(5000);
 		frontendregisterpage frontpage = new frontendregisterpage();
 		driver.navigate().refresh();
 		Thread.sleep(5000);
 	
 		try {
 			username = readExcel("Registrationpage").getRow(59).getCell(1)
 					.getStringCellValue();
 			
 			password = readExcel("Registrationpage").getRow(59).getCell(2)
					.getStringCellValue();
 			Email = readExcel("Registrationpage").getRow(59).getCell(3)
 					.getStringCellValue();
 			Fullnametext = readExcel("Registrationpage").getRow(59).getCell(4)
 					.getStringCellValue();
 			
 			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(59).getCell(16)
 					.getStringCellValue();


 			 //String errorMsg=readExcel("Registrationpage").getRow(60).getCell(17).getStringCellValue();
 			
 			frontpage.clickregister.click();
 			Thread.sleep(6000);
 			frontpage.Username.sendKeys(username);
 			frontpage.password.sendKeys(password);
 			frontpage.Email.sendKeys(Email);

 			frontpage.Fullnametext.sendKeys(Fullnametext);
 			frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
 			Thread.sleep(8000);
 				
 			selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
 			Thread.sleep(8000);
 			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
 			Thread.sleep(5000);
 		
 			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
  			frontpage.createaccountbutton.click();
  			Thread.sleep(5000);		
  			Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 60, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 60, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
  
  // @Test(priority =5 )
 	public void RegistrationwithSignatureblankdataVisibleYes()
 			throws InterruptedException, IOException, AWTException {
 		switchtoBackendendURL();
 		
 	VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("Yes","Visible");
 	Thread.sleep(5000);
 		switchtoFrontendURL();
 		Thread.sleep(5000);
 		frontendregisterpage frontpage = new frontendregisterpage();
 		driver.navigate().refresh();
 		Thread.sleep(5000);
 	
 		try {
 			username = readExcel("Registrationpage").getRow(60).getCell(1)
 					.getStringCellValue();
 			password = readExcel("Registrationpage").getRow(60).getCell(2)
					.getStringCellValue();
 			Email = readExcel("Registrationpage").getRow(60).getCell(3)
 					.getStringCellValue();
 			Fullnametext = readExcel("Registrationpage").getRow(60).getCell(4)
 					.getStringCellValue();
 			
 			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(60).getCell(16)
 					.getStringCellValue();


 			 //String errorMsg=readExcel("Registrationpage").getRow(61).getCell(17).getStringCellValue();
 			try {
 				signature = readExcel("Registrationpage").getRow(60).getCell(6)
 						.getStringCellValue();
 			} catch (Exception e) {
 				e.getMessage();
 				signature = "";
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
 			Thread.sleep(8000);
 			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
 			Thread.sleep(5000);
 			frontpage.signature.click();
//		frontpage.signature.sendKeys(signature);
// 			Thread.sleep(5000);
 			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
 			frontpage.createaccountbutton.click();
 			Thread.sleep(10000);
 			driver.switchTo().alert().accept();
 			Thread.sleep(5000);
 			// Assert.assertTrue(frontpage.errorMsgforBlankpassword.getAttribute("data-original-title").contains(errorMsg));
 			driver.navigate().back();
 			writedatainExcel("Registrationpage", 61, 14, "Pass");

 		} catch (Exception e) {
 			e.getMessage();
 			writedatainExcel("Registrationpage", 61, 14, "Fail");
 			throw e;

 		}
 	}
  
   @Test(priority =6 )
	public void RegistrationwithSignatureblankdataVisibleNo()
			throws InterruptedException, IOException, AWTException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username,password);
	VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("No","Visible");
	Thread.sleep(5000);
		switchtoFrontendURL();
		Thread.sleep(5000);
		frontendregisterpage frontpage = new frontendregisterpage();
		driver.navigate().refresh();
		Thread.sleep(5000);
	
		try {
 			username = readExcel("Registrationpage").getRow(61).getCell(1)
 					.getStringCellValue();
 			password = readExcel("Registrationpage").getRow(61).getCell(2)
					.getStringCellValue();
 			Email = readExcel("Registrationpage").getRow(61).getCell(3)
 					.getStringCellValue();
 			Fullnametext = readExcel("Registrationpage").getRow(61).getCell(4)
 					.getStringCellValue();
 			
 			InstantmessageSreenNameText = readExcel("Registrationpage").getRow(61).getCell(16)
 					.getStringCellValue();


			 //String errorMsg=readExcel("Registrationpage").getRow(62).getCell(17).getStringCellValue();
			try {
				signature = readExcel("Registrationpage").getRow(61).getCell(6)
						.getStringCellValue();
			} catch (Exception e) {
				e.getMessage();
				signature = "";
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
			Thread.sleep(8000);
			frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
			Thread.sleep(5000);
			frontpage.signature.click();
			Thread.sleep(5000);
			EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
			Thread.sleep(5000);
  			frontpage.createaccountbutton.click();
  			Thread.sleep(5000);		
  			Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	        frontpage.BacktoCategory.click();
		 	writedatainExcel("Registrationpage", 62, 14, "Pass");

		 } catch (Exception e) {
		 	e.getMessage();
		 	writedatainExcel("Registrationpage", 62, 14, "Fail");
		 	throw e;

		 }
		 Frontendlogin.logoutFromApp();
			Thread.sleep(5000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
 
   
}

