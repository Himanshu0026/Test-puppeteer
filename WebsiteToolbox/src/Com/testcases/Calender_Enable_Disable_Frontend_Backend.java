package Com.testcases;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Backendlogin;


public class Calender_Enable_Disable_Frontend_Backend extends baseClass
{
	String username, password;

	public Calender_Enable_Disable_Frontend_Backend() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
 
@Test(priority = 1)
			public void VerifyCalenderForntEnd_EnableOnbackend()
			throws InterruptedException {
				switchtoBackendendURL();
				BackendSettingspageObjects Calender=new BackendSettingspageObjects();
				Backendlogin.LoginToAPP(username,password);
				 Calender.settings.click();
				 Calender.General.click();
				Thread.sleep(5000);
          	EnableorDisable_Checkbox(Calender.CalenderClick, true);
			    Thread.sleep(5000);
			    Calender.SaveButton.click();
		  	    Thread.sleep(5000);
		 	  switchtoFrontendURL(); 
            driver.navigate().refresh();
            frontpagelogin calender=new frontpagelogin();
            calender.FroumMainMenu.click();
      	    Thread.sleep(5000);
            
         Assert.assertTrue(verifyPresenceOfElement(calender.CalenderButton_xpath));
            
  }
   @Test(priority =2)
	public void VerifyCalenderForntEnd_DisableOnbackend()
	throws InterruptedException {
		switchtoBackendendURL();
		BackendSettingspageObjects Calender=new BackendSettingspageObjects();
		 Calender.settings.click();
		 Calender.General.click();
		Thread.sleep(5000);
 	EnableorDisable_Checkbox(Calender.CalenderClick, false);
	    Thread.sleep(5000);
	    Calender.SaveButton.click();
 	    Thread.sleep(5000);
	  switchtoFrontendURL(); 
   driver.navigate().refresh();
   frontpagelogin calender=new frontpagelogin();
   calender.FroumMainMenu.click();
  
   Assert.assertFalse(verifyPresenceOfElement(calender.CalenderButton_xpath));
   
          
}}
  



         