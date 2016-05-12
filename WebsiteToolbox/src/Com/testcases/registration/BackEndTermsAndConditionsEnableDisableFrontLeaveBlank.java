package Com.testcases.registration;

import java.io.IOException;

import org.openqa.selenium.Keys;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class BackEndTermsAndConditionsEnableDisableFrontLeaveBlank extends baseClass {
	
	String username, password, Email, Fullnametext, signature, filepath,
	Picturepath, InstantmessageSreenNameText, Birthdaypicker,TermsandRulesTextField,TermsConditionsButton;

	@Test
	public void VerifyFullNameOnRegistration_FrontendandBackend() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		TermsandRulesTextField = readExcel("BackendLogin").getRow(1).getCell(4).getStringCellValue();
	}


@Test(priority=1)
public void RegistrationwithTermsAndConditionsDisable()
	throws InterruptedException, IOException {
switchtoBackendendURL();
Backendlogin.LoginToAPP(username,password);
BackendSettingspageObjects TermsAndConditions=new BackendSettingspageObjects();
TermsAndConditions.setings.click();
Thread.sleep(5000);
TermsAndConditions.General.click();
Thread.sleep(5000);
TermsAndConditions.TermsandRulesEditButton.click();
Thread.sleep(5000);


TermsAndConditions.TermsandRulesTextField.sendKeys(TermsandRulesTextField);
Thread.sleep(5000);
TermsAndConditions.SaveButton.click();
	    Thread.sleep(5000);
	    switchtoFrontendURL(); 
   driver.navigate().refresh();
	frontendregisterpage  frontpage=new frontendregisterpage();
try{
	username = readExcel("Registrationpage").getRow(22).getCell(1)
			.getStringCellValue();
	password = readExcel("Registrationpage").getRow(22).getCell(2)
			.getStringCellValue();
	Email = readExcel("Registrationpage").getRow(22).getCell(3)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(22).getCell(4)
			.getStringCellValue();
	signature = readExcel("Registrationpage").getRow(22).getCell(6)
			.getStringCellValue();
	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(22).getCell(16)
			.getStringCellValue();

	// String
	// errorMsg=readExcel("Registrationpage").getRow(11).getCell(11).getStringCellValue();

	frontpage.clickregister.click();
	Thread.sleep(6000);
	frontpage.Username.sendKeys(username);
	frontpage.password.sendKeys(password);
	frontpage.Email.sendKeys(Email);
	frontpage.Fullnametext.sendKeys(Fullnametext);
	Thread.sleep(5000);
	frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
	Thread.sleep(5000);
	selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
	frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
   
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	//EnableorDisable_Checkbox(frontpage.TermsConditionsButton, false);
	//Thread.sleep(8000);
	frontpage.createaccountbutton.click();
	Thread.sleep(8000);
	// System.out.println(frontpage.errorMsgforBlankusername.getAttribute("data-original-title"));
	// Assert.assertTrue(frontpage.errorMsgforBlankusername.getAttribute("data-original-title").contains(errorMsg));

	driver.navigate().back();
	writedatainExcel("Registrationpage", 23, 14, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 23, 14, "Fail");
	throw e;

}
driver.navigate().to((String) Credential.get("FrontendURL"));
}
	
@Test(priority=2)
public void RegistrationwithTermsAndConditionsEnable()
	throws InterruptedException, IOException {
switchtoBackendendURL();

BackendSettingspageObjects TermsAndConditions=new BackendSettingspageObjects();
TermsAndConditions.setings.click();
Thread.sleep(5000);
TermsAndConditions.General.click();
Thread.sleep(5000);
TermsAndConditions.TermsandRulesEditButton.click();
Thread.sleep(5000);

TermsAndConditions.TermsandRulesTextField.sendKeys(TermsandRulesTextField);
Thread.sleep(5000);
TermsAndConditions.SaveButton.click();
	    Thread.sleep(5000);
	    switchtoFrontendURL(); 
   driver.navigate().refresh();
	frontendregisterpage  frontpage=new frontendregisterpage();
try{
	username = readExcel("Registrationpage").getRow(23).getCell(1)
			.getStringCellValue();
	password = readExcel("Registrationpage").getRow(23).getCell(2)
			.getStringCellValue();
	Email = readExcel("Registrationpage").getRow(23).getCell(3)
			.getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(23).getCell(4)
			.getStringCellValue();
	signature = readExcel("Registrationpage").getRow(23).getCell(6)
			.getStringCellValue();
	InstantmessageSreenNameText = readExcel("Registrationpage").getRow(23).getCell(16)
			.getStringCellValue();

	// String
	// errorMsg=readExcel("Registrationpage").getRow(23).getCell(17).getStringCellValue();

	frontpage.clickregister.click();
	Thread.sleep(6000);
	frontpage.Username.sendKeys(username);
	frontpage.password.sendKeys(password);
	frontpage.Email.sendKeys(Email);
	Thread.sleep(5000);
	frontpage.Fullnametext.sendKeys(Fullnametext);
	frontpage.Birthdaypicker.sendKeys("06/06/1999"+Keys.TAB);
	Thread.sleep(5000);
	selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
	frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
   
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	Thread.sleep(5000);
	EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	Thread.sleep(8000);
	frontpage.createaccountbutton.click();
	Thread.sleep(8000);
	Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
	frontpage.BacktoCategory.click();
	Thread.sleep(5000);
	Frontendlogin.logoutFromApp();
	Thread.sleep(5000);
	writedatainExcel("Registrationpage", 24, 14, "Pass");

} catch (Exception e) {
	e.getMessage();
	writedatainExcel("Registrationpage", 24, 14, "Fail");
	throw e;

}



}
}
