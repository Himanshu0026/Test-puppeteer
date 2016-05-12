package Com.testcases.editpage;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.registration.VerifySignatureOnRegistration_FrontendandBackend;
  // login backend application 
public class VerifyDefaultSettings_Signature_EditPageOnly extends
		baseClass {

	String username, password, InstantmessageSreenNameText, Fullnametext,
			signature;

	public VerifyDefaultSettings_Signature_EditPageOnly()
			throws InterruptedException, IOException {

		username = readExcel("BackendLogin").getRow(1).getCell(1)
				.getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2)
				.getStringCellValue();

	}
	//Visibility_Editpage_Default YES Signature Leave Blank

	@Test(priority = 1)
	public void VerifyDefaultSettings_Signature_EditPageOnlyYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username, password);

		 VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("Yes","Edit profile page only");
		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(102).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(102).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Signature = new AccountSettingsPageObjects();
		Thread.sleep(3000);
	
		Fullnametext = readExcel("Editpage").getRow(102).getCell(3)
				.getStringCellValue();
		InstantmessageSreenNameText = readExcel("Editpage").getRow(102)
				.getCell(5).getStringCellValue();

		try {
			signature = readExcel("Editpage").getRow(102)
					.getCell(6).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			signature = "";
		}
		   Signature.Fullname.sendKeys(Fullnametext);
		   Signature.Birthday.clear();
		   Signature.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					Signature.InstantaniousMessageDropDown, "AIM");
			Signature.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);
			Signature.SignaturemousehoverEditButton.click();
			Thread.sleep(5000);
			//driver.switchTo().frame(driver.findElement(By.xpath("//div[@class='sign-container']")));
			Signature.EditSignatureText.clear();
			Thread.sleep(5000);
			Signature.SavechangesButton.click();
			Thread.sleep(5000);
			

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
   //Visibility_Editpage_Default NO Signature LeaveBlank
	//@Test(priority = 2)
	public void EditProfilewithSignatureblankdataVisibleNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		
		 VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("No", "Edit profile page only");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(102).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(102).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Signature = new AccountSettingsPageObjects();
		Fullnametext = readExcel("Editpage").getRow(102).getCell(3)
				.getStringCellValue();
		InstantmessageSreenNameText = readExcel("Editpage").getRow(102)
				.getCell(5).getStringCellValue();

		try {
			signature = readExcel("Editpage").getRow(102).getCell(6)
					.getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			signature = "";
		}
           
		Signature.Fullname.sendKeys(Fullnametext);
		Signature.Birthday.clear();
		Signature.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
			Signature.InstantaniousMessageDropDown, "AIM");
			Signature.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);
			Signature.SignaturemousehoverEditButton.click();
			Thread.sleep(5000);
			Signature.Signature.sendKeys(signature);
			Thread.sleep(5000);
			Signature.SavechangesButton.click();
			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
   //Visibility_Visible_Default YES Signature LeaveBlank

	//@Test(priority = 3)
	public void EditPagewithSignatureblankdataVisibleYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		

		 VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("Yes", "Visible");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(102).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(102).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Signature = new AccountSettingsPageObjects();
		Fullnametext = readExcel("Editpage").getRow(102).getCell(3)
				.getStringCellValue();
		
		InstantmessageSreenNameText = readExcel("Editpage").getRow(102)
				.getCell(5).getStringCellValue();

		try {
			signature = readExcel("Editpage").getRow(102).getCell(6)
					.getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			signature = "";
		}
		Signature.Fullname.clear();
		Signature.Fullname.sendKeys(Fullnametext);
		Signature.Birthday.clear();
		Signature.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					Signature.InstantaniousMessageDropDown, "AIM");
			Signature.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);
			Signature.SignaturemousehoverEditButton.click();
			Thread.sleep(5000);
			Signature.Signature.sendKeys(signature);

			Thread.sleep(5000);
			Signature.SavechangesButton.click();
			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
    // //Visibility_Visible_Default No Signature LeaveBlank
//	@Test(priority = 4)
	public void EditPagewithSignatureblankdataVisibleNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		

		 VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("No", "Visible");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(102).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(102).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Signature = new AccountSettingsPageObjects();
		Fullnametext = readExcel("Editpage").getRow(102).getCell(3)
				.getStringCellValue();
		
		InstantmessageSreenNameText = readExcel("Editpage").getRow(102)
				.getCell(5).getStringCellValue();

		try {
			signature = readExcel("Editpage").getRow(102).getCell(6)
					.getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			signature = "";
		}
		Signature.Fullname.clear();
		Signature.Fullname.sendKeys(Fullnametext);
		Signature.Birthday.clear();
		Signature.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					Signature.InstantaniousMessageDropDown, "AIM");
			Signature.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);
			Signature.SignaturemousehoverEditButton.click();
			Thread.sleep(5000);
			Signature.Signature.sendKeys(signature);
			Thread.sleep(5000);
			Signature.SavechangesButton.click();
			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	 //Visibility_Hidden_Default YES Signature LeaveBlank

	//@Test(priority = 5)
	public void EditPagewithSignatureblankdataHiddenYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		
		

		 VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("Yes", "Hidden");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(102).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(102).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Signature = new AccountSettingsPageObjects();
		
		Fullnametext = readExcel("Editpage").getRow(102).getCell(3)
				.getStringCellValue();
		InstantmessageSreenNameText = readExcel("Editpage").getRow(102)
				.getCell(5).getStringCellValue();
		Signature.Fullname.sendKeys(Fullnametext);
		
		Signature.Birthday.clear();
		Signature.Birthday.sendKeys("06/06/1999" + Keys.TAB);
		Thread.sleep(8000);

		selectElementfromDropdown(
				Signature.InstantaniousMessageDropDown, "AIM");
		Signature.InstantaniousMessageText
				.sendKeys(InstantmessageSreenNameText);

		Thread.sleep(5000);


		Signature.SavechangesButton.click();
		Thread.sleep(5000);

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	 //Visibility_Hidden_Default No Signature LeaveBlank
	//@Test(priority = 6)
	public void EditPagewithSignatureblankdataHiddenNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
	
		 VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("Yes", "Hidden");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(102).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(102).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Signature = new AccountSettingsPageObjects();
		
		Fullnametext = readExcel("Editpage").getRow(102).getCell(3)
				.getStringCellValue();
		InstantmessageSreenNameText = readExcel("Editpage").getRow(102)
				.getCell(5).getStringCellValue();
		
		Signature.Fullname.sendKeys(Fullnametext);
		Signature.Birthday.clear();
		Signature.Birthday.sendKeys("06/06/1999" + Keys.TAB);
		Thread.sleep(8000);

		selectElementfromDropdown(
				Signature.InstantaniousMessageDropDown, "AIM");
		Signature.InstantaniousMessageText
				.sendKeys(InstantmessageSreenNameText);

		Thread.sleep(5000);


		Signature.SavechangesButton.click();
		Thread.sleep(5000);

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}}
