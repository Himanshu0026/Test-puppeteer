package Com.testcases.editpage;

import java.io.IOException;

import org.openqa.selenium.Keys;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.registration.VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable;

// login backend application 
public class VerifyDefaultSettings_Fullname_EditPageOnly extends
		baseClass {

	String username, password, InstantmessageSreenNameText, Fullnametext,
			signature;

	public VerifyDefaultSettings_Fullname_EditPageOnly()
			throws InterruptedException, IOException {

		username = readExcel("BackendLogin").getRow(1).getCell(1)
				.getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2)
				.getStringCellValue();

	}
	//Visibility_Editpage_Default YES FullName Leave Blank

	@Test(priority = 1)
	public void VerifyDefaultSettings_Fullname_EditPageOnlyYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username, password);

		 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("Yes","Edit profile page only");
		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(90).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(90).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects FullName = new AccountSettingsPageObjects();
		Thread.sleep(3000);
	
		
		InstantmessageSreenNameText = readExcel("Editpage").getRow(90)
				.getCell(5).getStringCellValue();

		try {
			Fullnametext = readExcel("Editpage").getRow(90)
					.getCell(3).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			Fullnametext = "";
		}
		    
		    FullName.Birthday.clear();
		    FullName.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					FullName.InstantaniousMessageDropDown, "AIM");
			FullName.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);


			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
   //Visibility_Editpage_Default NO FullName LeaveBlank
	//@Test(priority = 2)
	public void EditProfilewithFullNameblankdataVisibleNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		
	VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("No", "Edit profile page only");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(91).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(91).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects FullName = new AccountSettingsPageObjects();
		
		InstantmessageSreenNameText = readExcel("Editpage").getRow(91)
				.getCell(5).getStringCellValue();

		try {
			Fullnametext = readExcel("Editpage").getRow(91).getCell(3)
					.getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			Fullnametext = "";
		}

		       FullName.Fullname.sendKeys(Fullnametext);
		       FullName.Birthday.clear();
		       FullName.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					FullName.InstantaniousMessageDropDown, "AIM");
			    FullName.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			FullName.SavechangesButton.click();
			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
   //Visibility_Visible_Default YES FullName LeaveBlank

	//@Test(priority = 3)
	public void EditPagewithFullNameblankdataVisibleYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		

		 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("Yes", "Visible");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(92).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(92).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects FullName = new AccountSettingsPageObjects();
		
		
		InstantmessageSreenNameText = readExcel("Editpage").getRow(92)
				.getCell(5).getStringCellValue();

		try {
			Fullnametext = readExcel("Editpage").getRow(92).getCell(3)
					.getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			Fullnametext = "";
		}
		   FullName.Fullname.clear();
		   FullName.Fullname.sendKeys(Fullnametext);
		   FullName.Birthday.clear();
		   FullName.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					FullName.InstantaniousMessageDropDown, "AIM");
			FullName.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			FullName.SavechangesButton.click();
			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
    // //Visibility_Visible_Default No FullName LeaveBlank
//	@Test(priority = 4)
	public void EditPagewithFullNameblankdataVisibleNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		

		 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("No", "Visible");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(93).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(93).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects FullName = new AccountSettingsPageObjects();
		
		InstantmessageSreenNameText = readExcel("Editpage").getRow(93)
				.getCell(5).getStringCellValue();

		try {
			Fullnametext = readExcel("Editpage").getRow(93).getCell(3)
					.getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			Fullnametext = "";
		}
		   FullName.Fullname.clear();
		    FullName.Fullname.sendKeys(Fullnametext);
		    FullName.Birthday.clear();
		    FullName.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					FullName.InstantaniousMessageDropDown, "AIM");
			FullName.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			FullName.SavechangesButton.click();
			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	 //Visibility_Hidden_Default YES FullName LeaveBlank

	//@Test(priority = 5)
	public void EditPagewithFullNameblankdataHiddenYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		
		

		 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("Yes", "Hidden");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(94).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(94).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects FullName = new AccountSettingsPageObjects();
		InstantmessageSreenNameText = readExcel("Editpage").getRow(94)
				.getCell(5).getStringCellValue();
		
		
		FullName.Birthday.clear();
		FullName.Birthday.sendKeys("06/06/1999" + Keys.TAB);
		Thread.sleep(8000);

		selectElementfromDropdown(
				FullName.InstantaniousMessageDropDown, "AIM");
		  FullName.InstantaniousMessageText
				.sendKeys(InstantmessageSreenNameText);

		Thread.sleep(5000);


		FullName.SavechangesButton.click();
		Thread.sleep(5000);

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	 //Visibility_Hidden_Default No FullName LeaveBlank
	//@Test(priority = 6)
	public void EditPagewithFullNameblankdataHiddenNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
	
	 VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("Yes", "Hidden");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(94).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(94).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects FullName = new AccountSettingsPageObjects();
		InstantmessageSreenNameText = readExcel("Editpage").getRow(94)
				.getCell(5).getStringCellValue();
		
		
		FullName.Birthday.clear();
		FullName.Birthday.sendKeys("06/06/1999" + Keys.TAB);
		Thread.sleep(8000);

		selectElementfromDropdown(
				FullName.InstantaniousMessageDropDown, "AIM");
		  FullName.InstantaniousMessageText
				.sendKeys(InstantmessageSreenNameText);

		Thread.sleep(5000);


		FullName.SavechangesButton.click();
		Thread.sleep(5000);

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}}
