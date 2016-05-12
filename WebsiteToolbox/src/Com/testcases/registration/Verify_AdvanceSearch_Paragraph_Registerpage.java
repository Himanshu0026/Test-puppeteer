package Com.testcases.registration;


import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Backendusersdropdownobjects;
import Com.frontendpages.AdvanceSearchPageObjects;
import Com.testcases.Login.Backendlogin;

public class Verify_AdvanceSearch_Paragraph_Registerpage extends baseClass {

	@Test(priority = 0)
	
           
		 public void backendhomepagelogin () throws InterruptedException 
		{
			
		switchtoBackendendURL();
		Backendlogin.LoginToAPP("beta12", "test");
				Thread.sleep(5000);
			}
	
	@Test(priority = 1)
	public void VerifyBackendPermessionsShortAnswer() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects MembersParagraph = new Backendusersdropdownobjects();
		
		VerifybackendPermessionsRequired("Short answer");
		Thread.sleep(5000);
		MembersParagraph.NewFieldTitleText.sendKeys("Short answer");
		EnableorDisable_Checkbox(MembersParagraph.NewFieldSearchableCheckBox, true);
	    Thread.sleep(5000);
		MembersParagraph.SaveButtonClick.click();
		Thread.sleep(5000);
		switchtoFrontendURL();
	     driver.navigate().refresh();
        Thread.sleep(5000);
	   AdvanceSearchPageObjects AdvanceSearch=new AdvanceSearchPageObjects();
        AdvanceSearch.CategoriesDropDownButton.click();
	    Thread.sleep(5000);
	    AdvanceSearch.AdvancedSearchButton.click();
	    Thread.sleep(5000);
	    AdvanceSearch.MemberButton.click();
	    Assert.assertTrue(verifyPresenceOfElement(AdvanceSearch.ShotAnswers_xpath));
	    Thread.sleep(5000);
	  
	
	    
		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	
   @Test(priority = 2)
	public void VerifyBackendPermessionsParagraph() throws InterruptedException {
		switchtoBackendendURL();
		Backendusersdropdownobjects MembersParagraph = new Backendusersdropdownobjects();
		
		VerifybackendPermessionsRequired("Paragraph");
		Thread.sleep(5000);
		MembersParagraph.NewFieldTitleText.sendKeys("Paragraph");
		EnableorDisable_Checkbox(MembersParagraph.NewFieldSearchableCheckBox, true);
		Thread.sleep(5000);
		MembersParagraph.SaveButtonClick.click();
		//driver.findElement(By.xpath(".//*[@id='frmField']/table/tbody/tr[15]/td/button")).click();
		
		Thread.sleep(5000);
		switchtoFrontendURL();
	  driver.navigate().refresh();
        Thread.sleep(5000);
	   
        AdvanceSearchPageObjects AdvanceSearch=new  AdvanceSearchPageObjects();
        AdvanceSearch.CategoriesDropDownButton.click();
	    Thread.sleep(5000);
	    AdvanceSearch.AdvancedSearchButton.click();
	    Thread.sleep(5000);
	    AdvanceSearch.MemberButton.click();
	    Thread.sleep(5000);
	    Assert.assertTrue(verifyPresenceOfElement(AdvanceSearch.Paragraph_xpath));
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
