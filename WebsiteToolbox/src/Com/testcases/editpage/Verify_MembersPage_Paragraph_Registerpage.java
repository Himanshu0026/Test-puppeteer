package Com.testcases.editpage;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Backendusersdropdownobjects;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class Verify_MembersPage_Paragraph_Registerpage extends baseClass {

	String username, password;

	public  Verify_MembersPage_Paragraph_Registerpage() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	
	@Test(priority = 1)
	public void VerifyBackendPermessionsShortAnswer() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects MembersParagraph = new Backendusersdropdownobjects();
		Backendlogin.LoginToAPP(username,password);
		
		VerifybackendPermessionsRequired("Short answer");
		Thread.sleep(5000);
		MembersParagraph.NewFieldTitleText.sendKeys("Short answer");
		EnableorDisable_Checkbox(MembersParagraph.NewFieldshow_members_listCheckBox, true);
		EnableorDisable_Checkbox(MembersParagraph.NewFieldEditable_userCheckBox, true);
		Thread.sleep(5000);
		MembersParagraph.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
	  driver.navigate().refresh();
	  Frontendlogin.loginToApp("pavani999", "pavani999");
		AccountSettingsPageObjects EditpageParagraph=new AccountSettingsPageObjects();
		
		EditpageParagraph.Signoutbuttondropdown.click();
		EditpageParagraph.EditProfile.click();
		Thread.sleep(5000);
		
	     driver.findElement(By.xpath("//span[text()='Short answer']/following::div/input")).sendKeys("Selenium");
	    Thread.sleep(5000);
	    EditpageParagraph.SavechangesButton.click();
	    Thread.sleep(5000);
	    
	    frontpagelogin memeberspage=new frontpagelogin();
	    memeberspage.FroumMainMenu.click();
	    Thread.sleep(5000);
	    memeberspage.Members_ForumMenu.click();
	    Thread.sleep(5000);
	    Assert.assertTrue(verifyPresenceOfElement(memeberspage.MembersShortanswer_xpath));
	     Thread.sleep(6000);
	    Frontendlogin.logoutFromApp();
	    Thread.sleep(6000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
	
	}
	
   @Test(priority = 2)
	public void VerifyBackendPermessionsParagraph() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects MembersParagraph = new Backendusersdropdownobjects();
		
		VerifybackendPermessionsRequired("Paragraph");
		Thread.sleep(5000);
		MembersParagraph.NewFieldTitleText.sendKeys("Paragraph");
		EnableorDisable_Checkbox(MembersParagraph.NewFieldshow_members_listCheckBox, true);
		EnableorDisable_Checkbox(MembersParagraph.NewFieldEditable_userCheckBox, true);
		Thread.sleep(5000);
		MembersParagraph.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
	  driver.navigate().refresh();
	  Thread.sleep(5000);
	  Frontendlogin.loginToApp("pavani999", "pavani999");
	  Thread.sleep(5000);
		AccountSettingsPageObjects EditpageParagraph=new AccountSettingsPageObjects();
		
		EditpageParagraph.Signoutbuttondropdown.click();
		EditpageParagraph.EditProfile.click();
		Thread.sleep(5000);
		
		EditpageParagraph.ParaGrapth.sendKeys("automationteam");
	    Thread.sleep(5000);
	    EditpageParagraph.SavechangesButton.click();
	    Thread.sleep(5000);
	    
	    frontpagelogin memeberspage=new frontpagelogin();
	    memeberspage.FroumMainMenu.click();
	    Thread.sleep(5000);
	    memeberspage.Members_ForumMenu.click();
	    Thread.sleep(5000);
	    Assert.assertTrue(verifyPresenceOfElement(memeberspage.Membersparagraph_xpath));
	
	    Thread.sleep(6000);
	    Frontendlogin.logoutFromApp();
	    Thread.sleep(6000);
		
	
	
	   }
	public static void GotoAddNewField() throws InterruptedException {
		Backendusersdropdownobjects memberslist = new Backendusersdropdownobjects();
		
		memberslist.Users.click();
		
		memberslist.Fields.click();
		
		memberslist.AddNewFieldButton.click();

	}
	
	public static void VerifybackendPermessionsRequired(String TypeDropDown)
			throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		GotoAddNewField();
		
		register.NewFiledTypeDropdownList.click();
		Select Dropdown = new Select(register.NewFiledTypeDropdownList);
	
		Dropdown.selectByVisibleText(TypeDropDown);
		//register.NewFiledTypeDropdownList.click();
		Thread.sleep(3000);
	
}}
