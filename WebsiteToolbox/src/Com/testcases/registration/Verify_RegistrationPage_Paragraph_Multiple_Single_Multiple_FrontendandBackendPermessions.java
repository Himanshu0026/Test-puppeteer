package Com.testcases.registration;
import java.io.IOException;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Backendusersdropdownobjects;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;

public class Verify_RegistrationPage_Paragraph_Multiple_Single_Multiple_FrontendandBackendPermessions extends baseClass {

	String username, password;

	public Verify_RegistrationPage_Paragraph_Multiple_Single_Multiple_FrontendandBackendPermessions() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}

	@Test(priority = 1)
	public void VerifyBackendPermessionsShortAnswer() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		Backendlogin.LoginToAPP(username,password);
		
		VerifybackendPermessionsRequired("Short answer");
		Thread.sleep(5000);
		register.NewFieldTitleText.sendKeys("Short answer");
		EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox, true);
		Thread.sleep(5000);
		register.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
		
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ShortanswerTextFieldVisible = driver.findElement(By
				.xpath(".//*[@id='registerEditProfile']/div/form/div[8]/div/input")).isDisplayed();

		if (ShortanswerTextFieldVisible) {
			frontpage.ShotAnswers.sendKeys("ayyappa");

			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	
	@Test(priority = 2)
	public void VerifyBackendPermessionsParagraph() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		VerifybackendPermessionsRequired("Paragraph");
		Thread.sleep(5000);
		register.NewFieldTitleText.sendKeys("Paragraph");
		EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox, true);
		Thread.sleep(5000);
		register.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
		
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ParagraphTextFieldVisible = driver.findElement(By
				.xpath(".//*[@id='registerEditProfile']/div/form/div[9]/div/textarea")).isDisplayed();

		if (ParagraphTextFieldVisible) {
			frontpage.ShotAnswers.sendKeys("automation Team");

			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	
	@Test(priority = 3)
	public void VerifyBackendPermessionsMultipleChoice() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		VerifybackendPermessionsRequired("Multiple choice");
		Thread.sleep(5000);
		register.NewFieldTitleText.sendKeys("Multiple choice");
		EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox, true);
		register.MultipleChoice.sendKeys("1");
		Thread.sleep(5000);
		register.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
		
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean MultipleChoiceDropDownVisible = driver.findElement(By
				.xpath(".//*[@id='registerEditProfile']/div/form/div[10]/div/div/label")).isDisplayed();

		if (MultipleChoiceDropDownVisible) {
			frontpage.MultipleChoice.click();

			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	@Test(priority = 4)
	public void VerifyBackendPermessionsCheckBoxes() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		VerifybackendPermessionsRequired("Checkboxes");
		Thread.sleep(5000);
		register.Checkboxes.sendKeys("Checkboxes");
		EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox, true);
		register.Checkboxes.sendKeys("1");
		Thread.sleep(5000);
		register.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
		
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean CheckBoxesDropDownVisible = driver.findElement(By
				.xpath(".//*[@id='registerEditProfile']/div/form/div[11]/div/div/label")).isDisplayed();

		if (CheckBoxesDropDownVisible) {
			frontpage.CheckBoxes.click();

			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	@Test(priority = 5)
	public void VerifyBackendPermessionsDropDown() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		VerifybackendPermessionsRequired("Dropdown");
		Thread.sleep(5000);
		register.DropDown.sendKeys("Dropdown");
		EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox, true);
		register.DropDown.sendKeys("A");
		Thread.sleep(5000);
		register.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
		
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean DropDownCheckBoxVisible = driver.findElement(By
				.xpath("")).isDisplayed();

		if (DropDownCheckBoxVisible) {
			frontpage.DropDown.click();

			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	@Test(priority = 6)
	public void VerifyBackendPermessionsMultipleCheckBoxList() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		VerifybackendPermessionsRequired("Multiple selection list");
		Thread.sleep(5000);
		register.NewFieldTitleText.sendKeys("Multipleselectionlist");
		EnableorDisable_Checkbox(register.NewFieldDisplay_registerCheckBox, true);
		register.MultipleCheckBoxListOptions.sendKeys("a");
		Thread.sleep(5000);
		register.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
		
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean MultipleCheckListLabelVisible = driver.findElement(By
				.xpath(".//*[@id='registerEditProfile']/div/form/div[13]/div/div/button")).isDisplayed();

		if (MultipleCheckListLabelVisible) {
			frontpage.MultipleSelectionList.click();

			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	
	public static void GotoAddNewField() throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		register.Users.click();
		
		register.Fields.click();
		
	    register.AddNewFieldButton.click();

	}
	
	public static void VerifybackendPermessionsRequired(String TypeDropDown)
			throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		GotoAddNewField();
		
		register.NewFiledTypeDropdownList.click();
		Select Dropdown = new Select(register.NewFiledTypeDropdownList);
	
		Dropdown.selectByVisibleText(TypeDropDown);
		register.NewFiledTypeDropdownList.click();
		Thread.sleep(3000);
	
}}
