package Com.testcases.editpage;

import java.io.IOException;

import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.registration.VerifyBirthdayPickerOnRegistration_FrontendandBackend;

public class VerifyDefaultSettings_Birthday_EditPageOnly extends baseClass {

	String username, password, InstantmessageSreenNameText, Fullnametext,
			Birthdaypicker, signature;

	public VerifyDefaultSettings_Birthday_EditPageOnly()
			throws InterruptedException, IOException {

		username = readExcel("BackendLogin").getRow(1).getCell(1)
				.getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2)
				.getStringCellValue();

	}

	@Test(priority = 1)
	public void VVerifyDefaultSettings_Birthday_EditPageOnlyYes()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username, password);

		VerifyBirthdayPickerOnRegistration_FrontendandBackend
				.VerifybackendregistrationBirthDatePicker("Yes",
						"Edit profile page only");
		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(70).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(70).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

		AccountSettingsPageObjects Birthday = new AccountSettingsPageObjects();
		Birthday.Signoutbuttondropdown.click();
		Thread.sleep(5000);

		Birthday.EditProfile.click();
		Fullnametext = readExcel("Editpage").getRow(70).getCell(3)
				.getStringCellValue();
		InstantmessageSreenNameText = readExcel("Editpage").getRow(70)
				.getCell(5).getStringCellValue();

		try {
			Birthdaypicker = readExcel("Editpage").getRow(70).getCell(4)
					.getStringCellValue();
			
			Thread.sleep(3000);
		} catch (Exception e) {
			e.getMessage();
			Birthdaypicker = "";
		}

			
			Birthday.Fullname.sendKeys(Fullnametext);
		
			Birthday.Birthday.sendKeys(Birthdaypicker);
			Thread.sleep(8000);
			selectElementfromDropdown(Birthday.InstantaniousMessageDropDown,
					"AIM");
			Birthday.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	

	 @Test(priority = 2)
	public void EditProfilewithBirthdayblankdataVisibleNo()
			throws InterruptedException, IOException {
		switchtoBackendendURL();
	

		VerifyBirthdayPickerOnRegistration_FrontendandBackend
				.VerifybackendregistrationBirthDatePicker("No",
						"Edit profile page only");

		switchtoFrontendURL();
		username = readExcel("Editpage").getRow(71).getCell(1)
				.getStringCellValue();
		password = readExcel("Editpage").getRow(71).getCell(2)
				.getStringCellValue();
		Frontendlogin.loginToApp(username, password);

	
		AccountSettingsPageObjects Birthday = new AccountSettingsPageObjects();
		Birthday.Signoutbuttondropdown.click();
		Thread.sleep(5000);

		Birthday.EditProfile.click();
		Fullnametext = readExcel("Editpage").getRow(71).getCell(3)
				.getStringCellValue();
		InstantmessageSreenNameText = readExcel("Editpage").getRow(71)
				.getCell(5).getStringCellValue();

		try {
			Birthdaypicker = readExcel("Editpage").getRow(71).getCell(4)
					.getStringCellValue();
			
			Thread.sleep(3000);
		} catch (Exception e) {
			e.getMessage();
			Birthdaypicker = "";
		}

			
			Birthday.Fullname.sendKeys(Fullnametext);
	
			Birthday.Birthday.sendKeys(Birthdaypicker);
			Thread.sleep(8000);
			selectElementfromDropdown(Birthday.InstantaniousMessageDropDown,
					"AIM");
			Birthday.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
	
	 @Test(priority = 3)
	  public void  EditPagewithBirthdayblankdataVisibleYes() throws
	  InterruptedException, IOException 
	  { 
		  switchtoBackendendURL();
 

	   VerifyBirthdayPickerOnRegistration_FrontendandBackend. VerifybackendregistrationBirthDatePicker("Yes", "Visible");
	  
	  switchtoFrontendURL(); 
	  username = readExcel("Editpage").getRow(72).getCell(1) .getStringCellValue();
	  password = readExcel("Editpage").getRow(72).getCell(2).getStringCellValue(); 
	  
	  Frontendlogin.loginToApp(username, password);
	
	  AccountSettingsPageObjects Birthday = new AccountSettingsPageObjects();
	  Birthday.Signoutbuttondropdown.click();
		Thread.sleep(5000);

		Birthday.EditProfile.click();
	  Fullnametext =readExcel("Editpage").getRow(72).getCell(3) .getStringCellValue();
	  InstantmessageSreenNameText = readExcel("Editpage").getRow(72).getCell(5).getStringCellValue();
	 
	  try {
			Birthdaypicker = readExcel("Editpage").getRow(72).getCell(4)
					.getStringCellValue();
			
			Thread.sleep(3000);
		} catch (Exception e) {
			e.getMessage();
			Birthdaypicker = "";
		}

			Birthday.Fullname.sendKeys(Fullnametext);
		
			Birthday.Birthday.sendKeys(Birthdaypicker);
			Thread.sleep(8000);
			selectElementfromDropdown(Birthday.InstantaniousMessageDropDown,
					"AIM");
			Birthday.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
	  @Test(priority = 4) 
	  public void EditPagewithInstantMessageblankdataVisibleNo() throws
	 InterruptedException, IOException 
	  { 
		  switchtoBackendendURL();
	
	 VerifyBirthdayPickerOnRegistration_FrontendandBackend.
	 VerifybackendregistrationBirthDatePicker("No", "Visible");
	 
	 switchtoFrontendURL(); 
	 Backendlogin.LoginToAPP(username, password);
	  username = readExcel("Editpage").getRow(73).getCell(1) .getStringCellValue();
	  password = readExcel("Editpage").getRow(73).getCell(2).getStringCellValue(); 
	  
	  Frontendlogin.loginToApp(username, password);
	
	  AccountSettingsPageObjects Birthday = new AccountSettingsPageObjects();
	  Birthday.Signoutbuttondropdown.click();
		Thread.sleep(5000);

		Birthday.EditProfile.click();
	  Fullnametext =readExcel("Editpage").getRow(73).getCell(3) .getStringCellValue();
	  InstantmessageSreenNameText = readExcel("Editpage").getRow(73).getCell(5).getStringCellValue();
	 
	  try {
			Birthdaypicker = readExcel("Editpage").getRow(73).getCell(4)
					.getStringCellValue();
			
			Thread.sleep(3000);
		} catch (Exception e) {
			e.getMessage();
			Birthdaypicker = "";
		}

	
			Birthday.Fullname.sendKeys(Fullnametext);
			
			Birthday.Birthday.sendKeys(Birthdaypicker);
			Thread.sleep(8000);
			selectElementfromDropdown(Birthday.InstantaniousMessageDropDown,
					"AIM");
			Birthday.InstantaniousMessageText
					.sendKeys(InstantmessageSreenNameText);

			Thread.sleep(5000);

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
	
	  @Test(priority = 5) 
	  
	  public void	EditPagewithInstantMessageblankdataHiddenYes() throws
	 InterruptedException, IOException
	  { 
		  switchtoBackendendURL();
	 
	 VerifyBirthdayPickerOnRegistration_FrontendandBackend.
	  VerifybackendregistrationBirthDatePicker("Yes", "Hidden");
	
	  switchtoFrontendURL();
	  username = readExcel("Editpage").getRow(74).getCell(1) .getStringCellValue();
	  password = readExcel("Editpage").getRow(74).getCell(2).getStringCellValue();
	  
	  Frontendlogin.loginToApp(username, password);
	 
	
	 AccountSettingsPageObjects Birthday = new AccountSettingsPageObjects(); 
	 Birthday.Signoutbuttondropdown.click();
		Thread.sleep(5000);

		Birthday.EditProfile.click();
	 Fullnametext =	 readExcel("Editpage").getRow(74).getCell(3) .getStringCellValue();
	 InstantmessageSreenNameText = readExcel("Editpage").getRow(74)	.getCell(5).getStringCellValue();
	  
	 
	  Birthday.Fullname.sendKeys(Fullnametext);
	 
	  Thread.sleep(8000); 
	  selectElementfromDropdown( Birthday.InstantaniousMessageDropDown, "AIM");
	  Birthday.InstantaniousMessageText .sendKeys(InstantmessageSreenNameText);
	  
	  Thread.sleep(5000);
	 
	  Frontendlogin.logoutFromApp(); Thread.sleep(3000);
	 
	 driver.navigate().to((String) Credential.get("FrontendURL")); 
	 }
	 
	  @Test(priority = 6) 
	  public void EditPagewithInstantMessageblankdataHiddenNo() throws
	  InterruptedException, IOException
	  { 
		  switchtoBackendendURL();
		  Backendlogin.LoginToAPP(username, password);
	 
	  VerifyBirthdayPickerOnRegistration_FrontendandBackend.
	  VerifybackendregistrationBirthDatePicker("No", "Hidden");
	  
	  switchtoFrontendURL();
	  username = readExcel("Editpage").getRow(75).getCell(1) .getStringCellValue();
	  password = readExcel("Editpage").getRow(75).getCell(2).getStringCellValue();
	  
	  Frontendlogin.loginToApp(username, password);
	 
	
	 AccountSettingsPageObjects Birthday = new AccountSettingsPageObjects(); 
	 Birthday.Signoutbuttondropdown.click();
		Thread.sleep(5000);

		Birthday.EditProfile.click();
	 Fullnametext =	 readExcel("Editpage").getRow(75).getCell(3) .getStringCellValue();
	 InstantmessageSreenNameText = readExcel("Editpage").getRow(75)	.getCell(5).getStringCellValue();
	  
	 
	  Birthday.Fullname.sendKeys(Fullnametext);
	 
	  Thread.sleep(8000); 
	  selectElementfromDropdown( Birthday.InstantaniousMessageDropDown, "AIM");
	  Birthday.InstantaniousMessageText .sendKeys(InstantmessageSreenNameText);
	  
	  Thread.sleep(5000);
	 
	  Frontendlogin.logoutFromApp(); Thread.sleep(3000);
	 
	 driver.navigate().to((String) Credential.get("FrontendURL")); 
	 }
	 

}