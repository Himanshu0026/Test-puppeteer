package Com.testcases.registration;

import java.awt.AWTException;
import java.io.IOException;

import org.openqa.selenium.Keys;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.frontendregisterpage;

public class Registrationvalid_invalid_inputs extends baseClass {
	 
  String username, password, Email, Fullnametext, signature, filepath,
	Picturepath, InstantmessageSreenNameText, Birthdaypicker;

@Test(priority = 1)
public void RegistrationwithUserNameblankdata()
	throws InterruptedException, IOException, AWTException {
switchtoFrontendURL();
frontendregisterpage frontpage = new frontendregisterpage();
try {

	password = readExcel("Registrationpage").getRow(3).getCell(2)
			.getStringCellValue();
	Email = readExcel("Registrationpage").getRow(3).getCell(3)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(3).getCell(4)
			.getStringCellValue();
	signature = readExcel("Registrationpage").getRow(3).getCell(6)
			.getStringCellValue();
	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(3).getCell(12)
			.getStringCellValue();
	String errorMsg = readExcel("Registrationpage").getRow(3)
			.getCell(11).getStringCellValue();
	try {
		username = readExcel("Registrationpage").getRow(3).getCell(1)
				.getStringCellValue();
	} catch (Exception e) {
		e.getMessage();
		username = "";
	}
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
	frontpage.Birthdaypicker.sendKeys("06/06/2012"+Keys.TAB);
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	Thread.sleep(5000);
	frontpage.createaccountbutton.click();
	Thread.sleep(5000);
	System.out.println(frontpage.errorMsgforBlankusername
			.getAttribute("data-original-title"));
	Assert.assertTrue(frontpage.errorMsgforBlankusername.getAttribute(
			"data-original-title").contains(errorMsg));

	driver.navigate().back();
	writedatainExcel("Registrationpage", 4, 14, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 4, 14, "Fail");
	throw e;

}
}

@Test(priority = 2)
public  void RegistrationwithEmailblankdata() throws InterruptedException,
	IOException, AWTException {
switchtoFrontendURL();
frontendregisterpage frontpage = new frontendregisterpage();
try {
	username = readExcel("Registrationpage").getRow(4).getCell(1)
			.getStringCellValue();
	password = readExcel("Registrationpage").getRow(4).getCell(2)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(4).getCell(4)
			.getStringCellValue();
	signature = readExcel("Registrationpage").getRow(4).getCell(6)
			.getStringCellValue();
	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(4).getCell(12)
			.getStringCellValue();
	String errorMsg = readExcel("Registrationpage").getRow(4)
			.getCell(11).getStringCellValue();
	try {
		Email = readExcel("Registrationpage").getRow(4).getCell(3)
				.getStringCellValue();
	} catch (Exception e) {
		e.getMessage();
		Email = "";
	}
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
	frontpage.Birthdaypicker.sendKeys("06/06/2012"+Keys.TAB);
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	Thread.sleep(5000);
	
	frontpage.createaccountbutton.click();
	Thread.sleep(5000);
	Assert.assertTrue(frontpage.errorMsgforBlankEmail.getAttribute(
			"data-original-title").contains(errorMsg));
	driver.navigate().back();

	writedatainExcel("Registrationpage", 5, 14, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 5, 14, "Fail");
	throw e;

}
}

@Test(priority = 3)
public  void RegistrationwithPassWordblankdata()
	throws InterruptedException, IOException, AWTException {
switchtoFrontendURL();
frontendregisterpage frontpage = new frontendregisterpage();
try {
	username = readExcel("Registrationpage").getRow(5).getCell(1)
			.getStringCellValue();
	Email = readExcel("Registrationpage").getRow(5).getCell(3)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(5).getCell(4)
			.getStringCellValue();
	
	signature = readExcel("Registrationpage").getRow(5).getCell(6)
			.getStringCellValue();
	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(5).getCell(12)
			.getStringCellValue();
	String errorMsg = readExcel("Registrationpage").getRow(5)
			.getCell(11).getStringCellValue();
	try {
		password = readExcel("Registrationpage").getRow(5).getCell(2)
				.getStringCellValue();
	} catch (Exception e) {
		e.getMessage();
		password = "";
	}
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
	frontpage.Birthdaypicker.sendKeys("06/06/2012"+Keys.TAB);
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	Thread.sleep(5000);
	frontpage.createaccountbutton.click();
	Thread.sleep(5000);
	Assert.assertTrue(frontpage.errorMsgforBlankpassword.getAttribute(
			"data-original-title").contains(errorMsg));
	driver.navigate().back();
	writedatainExcel("Registrationpage", 6, 14, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 6, 14, "Fail");
	throw e;

}
}

@Test(priority=4)
public  void RegistrationwithRegistreduserName()
	throws InterruptedException, IOException, AWTException {
switchtoFrontendURL();
frontendregisterpage frontpage = new frontendregisterpage();
try {
	username = readExcel("Registrationpage").getRow(6).getCell(1)
			.getStringCellValue();
	password = readExcel("Registrationpage").getRow(6).getCell(2)
			.getStringCellValue();
	Email = readExcel("Registrationpage").getRow(6).getCell(3)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(6).getCell(4)
			.getStringCellValue();
	
	signature = readExcel("Registrationpage").getRow(6).getCell(6)
			.getStringCellValue();
	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(6).getCell(12)
			.getStringCellValue();
	String errorMsg = readExcel("Registrationpage").getRow(6)
			.getCell(11).getStringCellValue();

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
	frontpage.Birthdaypicker.sendKeys("06/06/2012"+Keys.TAB);
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	Thread.sleep(5000);
	
	
	frontpage.createaccountbutton.click();
	Thread.sleep(5000);
	Assert.assertTrue(frontpage.errorMsgforinvalidregistredusername
			.getText().contains(errorMsg));
	driver.navigate().back();
	writedatainExcel("Registrationpage", 7, 14, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 7, 14, "Fail");
	throw e;

}
}

@Test(priority=5)
public  void RegistrationwithRegistredEmailAdress()
	throws InterruptedException, IOException, AWTException {
switchtoFrontendURL();
frontendregisterpage frontpage = new frontendregisterpage();
try {
	username = readExcel("Registrationpage").getRow(7).getCell(1)
			.getStringCellValue();
	password = readExcel("Registrationpage").getRow(7).getCell(2)
			.getStringCellValue();
	Email = readExcel("Registrationpage").getRow(7).getCell(3)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(7).getCell(4)
			.getStringCellValue();
signature = readExcel("Registrationpage").getRow(7).getCell(6)
			.getStringCellValue();
	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(7).getCell(12)
			.getStringCellValue();
	String errorMsg = readExcel("Registrationpage").getRow(7)
			.getCell(11).getStringCellValue();

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
	frontpage.Birthdaypicker.sendKeys("06/06/2012"+Keys.TAB);
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	Thread.sleep(5000);
	
	frontpage.createaccountbutton.click();
	Thread.sleep(5000);
	Assert.assertTrue(frontpage.errorMsgforinvalidregistredEmailId
			.getText().contains(errorMsg));
	driver.navigate().back();
	writedatainExcel("Registrationpage", 8, 14, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 8, 14, "Fail");
	throw e;

}
}

@Test(priority=6)
public  void Registrationwithinstantmessagescreenblank()
	throws InterruptedException, IOException, AWTException {
switchtoFrontendURL();
frontendregisterpage frontpage = new frontendregisterpage();
try {
	username = readExcel("Registrationpage").getRow(8).getCell(1)
			.getStringCellValue();
	password = readExcel("Registrationpage").getRow(8).getCell(2)
			.getStringCellValue();
	Email = readExcel("Registrationpage").getRow(8).getCell(3)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(8).getCell(4)
			.getStringCellValue();
	
	signature = readExcel("Registrationpage").getRow(8).getCell(6)
			.getStringCellValue();
	
	
	// String
	// errorMsg=readExcel("Registrationpage").getRow(3).getCell(11).getStringCellValue();
	try {
		InstantmessageSreenNameText = readExcel("Registrationpage")
				.getRow(8).getCell(12).getStringCellValue();
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
	selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
	
	Thread.sleep(5000);
	frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
	Thread.sleep(5000);
	frontpage.Birthdaypicker.sendKeys("06/06/2012"+Keys.TAB);
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	Thread.sleep(5000);
	
	frontpage.createaccountbutton.click();
	Thread.sleep(5000);
	// Assert.assertTrue(frontpage.errorMsgforInstantMessagescreenBlank.getAttribute("data-original-title").contains(errorMsg));
	driver.navigate().back();
	writedatainExcel("Registrationpage", 9, 12, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 9, 12, "Fail");
	throw e;

}
}

@Test(priority=7)
public  void RegistrationwithInvaliddateofBirth()
	throws InterruptedException, IOException, AWTException {
switchtoFrontendURL();
frontendregisterpage frontpage = new frontendregisterpage();
try {
	username = readExcel("Registrationpage").getRow(9).getCell(1)
			.getStringCellValue();
	password = readExcel("Registrationpage").getRow(9).getCell(2)
			.getStringCellValue();
	Email = readExcel("Registrationpage").getRow(9).getCell(3)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(9).getCell(4)
			.getStringCellValue();
	signature = readExcel("Registrationpage").getRow(9).getCell(6)
			.getStringCellValue();
	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(9).getCell(12)
			.getStringCellValue();
	
	
	String errorMsg = readExcel("Registrationpage").getRow(9)
			.getCell(11).getStringCellValue();
	try {
		frontpage.Birthdaypicker.sendKeys("06/06/2016"+Keys.TAB);
	} catch (Exception e) {
		e.getMessage();
		Birthdaypicker = "";
	}

	Thread.sleep(6000);
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
	frontpage.Birthdaypicker.sendKeys("06/06/2016");
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	
	EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	Thread.sleep(5000);

	frontpage.createaccountbutton.click();
	Assert.assertTrue(frontpage.errorMsgforinvalidBirthday.getText()
			.contains(errorMsg));
	Thread.sleep(5000);
	driver.navigate().back();
	writedatainExcel("Registrationpage", 10, 14, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 10, 14, "Fail");
	throw e;

}
}

@Test(priority=8)
public  void RegistrationwithInvalidEmailAddress()
	throws InterruptedException, IOException, AWTException {
switchtoFrontendURL();
frontendregisterpage frontpage = new frontendregisterpage();
try {
	username = readExcel("Registrationpage").getRow(10).getCell(1)
			.getStringCellValue();
	password = readExcel("Registrationpage").getRow(10).getCell(2)
			.getStringCellValue();
	Email = readExcel("Registrationpage").getRow(10).getCell(3)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(10).getCell(4)
			.getStringCellValue();
	
	signature = readExcel("Registrationpage").getRow(10).getCell(6)
			.getStringCellValue();
	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(10).getCell(12)
			.getStringCellValue();
	
	
	String errorMsg = readExcel("Registrationpage").getRow(10)
			.getCell(11).getStringCellValue();

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
	frontpage.Birthdaypicker.sendKeys("06/06/2012"+Keys.TAB);
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	Thread.sleep(5000);
	
	frontpage.createaccountbutton.click();
	Assert.assertTrue(frontpage.errorMsgforinvalidemailid.getAttribute(
			"data-original-title").contains(errorMsg));
	Thread.sleep(5000);
	driver.navigate().back();

	Thread.sleep(5000);
	driver.navigate().back();
	writedatainExcel("Registrationpage", 11, 14, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 11, 14, "Fail");
	throw e;

}}}