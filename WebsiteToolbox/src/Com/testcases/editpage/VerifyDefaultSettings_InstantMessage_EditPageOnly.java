package Com.testcases.editpage;

import java.io.IOException;

import org.openqa.selenium.Keys;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.registration.VerifyInstantMessagingOnRegistration_FrontendandBackend;

public class VerifyDefaultSettings_InstantMessage_EditPageOnly extends
		baseClass {

	String username, password, InstantmessageSreenNameText, Fullnametext,
			signature;

	public VerifyDefaultSettings_InstantMessage_EditPageOnly()
			throws InterruptedException, IOException {

		username = readExcel("BackendLogin").getRow(1).getCell(1)
				.getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2)
				.getStringCellValue();

	}

	@Test(priority = 1)
	public void VVerifyDefaultSettings_InstantMessaging_EditPageOnlyYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username, password);

		VerifyInstantMessagingOnRegistration_FrontendandBackend
				.VerifybackendregistrationInstantMessaging("Yes",
						"Edit profile page only");
		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(59).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(59).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Instantmessage = new AccountSettingsPageObjects();
		Thread.sleep(3000);
		VerifyDeleteOwnprofile_ProfilePage_PendingEmailPermessions
				.profilepage();
		Fullnametext = readExcel("Editpage").getRow(59).getCell(3)
				.getStringCellValue();

		try {
			InstantmessageSreenNameText = readExcel("Editpage").getRow(59)
					.getCell(5).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			InstantmessageSreenNameText = "";
		}
			Instantmessage.Fullname.sendKeys(Fullnametext);
			Instantmessage.Birthday.clear();
			Instantmessage.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					Instantmessage.InstantaniousMessageDropDown, "AIM");
			Instantmessage.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	

	@Test(priority = 2)
	public void EditProfilewithInstantMessageblankdataVisibleNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
	

		VerifyInstantMessagingOnRegistration_FrontendandBackend.VerifybackendregistrationInstantMessaging("No",	"Edit profile page only");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(60).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(60).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Instantmessage = new AccountSettingsPageObjects();
		Fullnametext = readExcel("Editpage").getRow(60).getCell(3)
				.getStringCellValue();

		try {
			InstantmessageSreenNameText = readExcel("Editpage").getRow(60)
					.getCell(5).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			InstantmessageSreenNameText = "";
		}

			Instantmessage.Fullname.sendKeys(Fullnametext);
			Instantmessage.Birthday.clear();
			Instantmessage.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					Instantmessage.InstantaniousMessageDropDown, "AIM");
			Instantmessage.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			Instantmessage.SavechangesButton.click();
			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}


	@Test(priority = 3)
	public void EditPagewithInstantMessageblankdataVisibleYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		

		VerifyInstantMessagingOnRegistration_FrontendandBackend
				.VerifybackendregistrationInstantMessaging("Yes", "Visible");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(61).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(61).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Instantmessage = new AccountSettingsPageObjects();
		Fullnametext = readExcel("Editpage").getRow(61).getCell(3)
				.getStringCellValue();

		try {
			InstantmessageSreenNameText = readExcel("Editpage").getRow(60)
					.getCell(5).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			InstantmessageSreenNameText = "";
		}
			Instantmessage.Fullname.clear();
			Instantmessage.Fullname.sendKeys(Fullnametext);
			Instantmessage.Birthday.clear();
			Instantmessage.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					Instantmessage.InstantaniousMessageDropDown, "AIM");
			Instantmessage.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			Instantmessage.SavechangesButton.click();
			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	

	@Test(priority = 4)
	public void EditPagewithInstantMessageblankdataVisibleNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		

		VerifyInstantMessagingOnRegistration_FrontendandBackend
				.VerifybackendregistrationInstantMessaging("No", "Visible");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(62).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(62).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Instantmessage = new AccountSettingsPageObjects();
		Fullnametext = readExcel("Editpage").getRow(62).getCell(3)
				.getStringCellValue();

		try {
			InstantmessageSreenNameText = readExcel("Editpage").getRow(60)
					.getCell(5).getStringCellValue();
		} catch (Exception e) {
			e.getMessage();
			InstantmessageSreenNameText = "";
		}
            Instantmessage.Fullname.clear();
			Instantmessage.Fullname.sendKeys(Fullnametext);
			Instantmessage.Birthday.clear();
			Instantmessage.Birthday.sendKeys("06/06/1999" + Keys.TAB);
			Thread.sleep(8000);
			selectElementfromDropdown(
					Instantmessage.InstantaniousMessageDropDown, "AIM");
			Instantmessage.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			Instantmessage.SavechangesButton.click();
			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	

	@Test(priority = 5)
	public void EditPagewithInstantMessageblankdataHiddenYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		

		VerifyInstantMessagingOnRegistration_FrontendandBackend
				.VerifybackendregistrationInstantMessaging("Yes", "Hidden");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(63).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(63).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Instantmessage = new AccountSettingsPageObjects();
		Fullnametext = readExcel("Editpage").getRow(63).getCell(3)
				.getStringCellValue();
		Instantmessage.Fullname.clear();
		Instantmessage.Fullname.sendKeys(Fullnametext);
		Instantmessage.Birthday.clear();
		Instantmessage.Birthday.sendKeys("06/06/1999" + Keys.TAB);
		Thread.sleep(8000);
		

		Instantmessage.SavechangesButton.click();
		Thread.sleep(5000);

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	@Test(priority = 6)
	public void EditPagewithInstantMessageblankdataHiddenNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		
		VerifyInstantMessagingOnRegistration_FrontendandBackend
				.VerifybackendregistrationInstantMessaging("No", "Hidden");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(64).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(64).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		Thread.sleep(3000);
		 VerifySignatureEdit_Profile_AccountPermessionsBackend.Editprofilepage();
		AccountSettingsPageObjects Instantmessage = new AccountSettingsPageObjects();
		Fullnametext = readExcel("Editpage").getRow(64).getCell(3)
				.getStringCellValue();
		Instantmessage.Fullname.clear();
		Instantmessage.Fullname.sendKeys(Fullnametext);
		Instantmessage.Birthday.clear();
		Instantmessage.Birthday.sendKeys("06/06/1999" + Keys.TAB);
		Thread.sleep(8000);
		

		Instantmessage.SavechangesButton.click();
		Thread.sleep(5000);

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
}
