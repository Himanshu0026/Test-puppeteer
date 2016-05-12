package Com.testcases.editpage;

import java.io.IOException;

import junit.framework.Assert;

import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Backendusersdropdownobjects;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;


@SuppressWarnings("deprecation")
public class Verify_Editpage_Paragraph_Multiple_Single_Multiple_FrontendandBackendPermessions extends baseClass {

	String username, password;

	public  Verify_Editpage_Paragraph_Multiple_Single_Multiple_FrontendandBackendPermessions() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}

	@Test(priority = 1)
	public void VerifyEditPageBackendPermessionsShortAnswer() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects EditPage = new Backendusersdropdownobjects();
		Backendlogin.LoginToAPP(username,password);
	VerifybackendPermessionsRequired("Short answer");
		Thread.sleep(5000);
		EditPage.NewFieldTitleText.sendKeys("Short answer");
		EnableorDisable_Checkbox(EditPage.NewFieldEditable_userCheckBox, true);
		Thread.sleep(5000);
		EditPage.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
		
		driver.navigate().refresh();
		Frontendlogin.loginToApp("pavani999", "pavani999");
		AccountSettingsPageObjects EditpageShortAnswer=new AccountSettingsPageObjects();
		
		EditpageShortAnswer.Signoutbuttondropdown.click();
		EditpageShortAnswer.EditProfile.click();
		Thread.sleep(5000);
	     Assert.assertTrue(verifyPresenceOfElement(EditpageShortAnswer.ShotAnswers_xpath));
	      Thread.sleep(6000);
		    Frontendlogin.logoutFromApp();
		    Thread.sleep(6000);
		}
	
	@Test(priority = 2)
	public void VerifyEditPageBackendPermessionsParagraph() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects EditPage = new Backendusersdropdownobjects();
	VerifybackendPermessionsRequired("Paragraph");
		Thread.sleep(5000);
		EditPage.NewFieldTitleText.sendKeys("Paragraph");
		EnableorDisable_Checkbox(EditPage.NewFieldEditable_userCheckBox, true);
		Thread.sleep(5000);
		EditPage.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
		
		driver.navigate().refresh();
		Frontendlogin.loginToApp("pavani999", "pavani999");
		AccountSettingsPageObjects EditpageParagraph=new AccountSettingsPageObjects();
		
		EditpageParagraph.Signoutbuttondropdown.click();
		EditpageParagraph.EditProfile.click();
		Thread.sleep(5000);
	      Assert.assertTrue(verifyPresenceOfElement(EditpageParagraph.ParaGrapth_xpath));
	      Thread.sleep(6000);
		    Frontendlogin.logoutFromApp();
		    Thread.sleep(6000);
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
