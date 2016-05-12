package Com.testcases.registration;


import java.io.IOException;

import junit.framework.Assert;

import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;

public class VerifyNewRegistrationEnableDiasable_BackEnd_FrontEnd extends baseClass
{
	String username, password;

	public   VerifyNewRegistrationEnableDiasable_BackEnd_FrontEnd() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	

	@Test(priority=1)
		public void VerifyNewRegistrationRegisterpage_EnableOnbackend1()
		throws InterruptedException {
			switchtoBackendendURL();
			Backendlogin.LoginToAPP(username,password);
	 BackendSettingspageObjects NewRegistration=new BackendSettingspageObjects();
	 Thread.sleep(5000);
		NewRegistration.setings.click();
		NewRegistration.SecuritySubMenu.click();
	     Thread.sleep(5000);
      	EnableorDisable_Checkbox(NewRegistration.NewRegistrations, true);
		  Thread.sleep(5000);
	 	    NewRegistration.SaveButton.click();
	  	    Thread.sleep(5000);
	 	    switchtoFrontendURL(); 
           driver.navigate().refresh();
			frontendregisterpage  Registerpage=new frontendregisterpage();
			Thread.sleep(5000);
		
	     Assert.assertTrue(verifyPresenceOfElement(Registerpage.RegisterButton_xpath));
				driver.navigate().to((String) Credential.get("FrontendURL"));
			}

	@Test(priority=2)
	public void VerifyNewRegistrationRegisterpage_DisableOnbackend1()
	throws InterruptedException {
		switchtoBackendendURL();
    BackendSettingspageObjects NewRegistration=new BackendSettingspageObjects();
   NewRegistration.setings.click();
	NewRegistration.SecuritySubMenu.click();
     Thread.sleep(5000);
  	 EnableorDisable_Checkbox(NewRegistration.NewRegistrations, false);
   Thread.sleep(5000);
 	    NewRegistration.SaveButton.click();
  	    Thread.sleep(5000);
 	    switchtoFrontendURL(); 
     driver.navigate().refresh();
		
		Thread.sleep(5000);
		frontendregisterpage  Registerpage=new frontendregisterpage();
	
	 Assert.assertFalse(verifyPresenceOfElement(Registerpage.RegisterButton_xpath));
				
			

	
	
}}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


