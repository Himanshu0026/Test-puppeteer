package Com.testcases.editpage;

import java.io.IOException;

import junit.framework.Assert;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

     @SuppressWarnings("deprecation")
     public class verifyPrivateMessagesEnable_Disable extends baseClass {
	String username, password;

   @Test(priority = 1)
			public void VerifyprivatemessagesForntEnd_EnableOnbackend()
			throws InterruptedException, IOException {
				BackendSettingspageObjects PrivateMsg=new BackendSettingspageObjects();
				settingsSequrity(PrivateMsg.PrivateMessaging, true);
			   
		 	  switchtoFrontendURL(); 
		 	 username = readExcel("Editpage").getRow(54).getCell(1).getStringCellValue();
			password = readExcel("Editpage").getRow(54).getCell(2).getStringCellValue();
		 	 Frontendlogin.loginToApp(username, password);

	           Thread.sleep(3000);
				
				Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
				Thread.sleep(5000);
				
			 Assert.assertTrue(verifyPresenceOfElement(By.id("epm")));	
				Thread.sleep(5000);
			
			 Frontendlogin.logoutFromApp();
				Thread.sleep(3000);
				
				driver.navigate().to((String) Credential.get("FrontendURL"));
			}
  
 
     @Test(priority =2)
	public void VerifyPrivateMsgForntEnd_DisableOnbackend()
	throws InterruptedException, IOException {
    	 BackendSettingspageObjects PrivateMsg=new BackendSettingspageObjects();
			settingsSequrity(PrivateMsg.PrivateMessaging, false);
	  switchtoFrontendURL(); 
	  username = readExcel("Editpage").getRow(54).getCell(1).getStringCellValue();
		password = readExcel("Editpage").getRow(54).getCell(2).getStringCellValue();
   Frontendlogin.loginToApp(username, password);

   Thread.sleep(3000);
	
	Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
	Thread.sleep(5000);
	
     Assert.assertFalse(verifyPresenceOfElement(By.id("epm")));	
	Thread.sleep(5000);

     Frontendlogin.logoutFromApp();
	Thread.sleep(3000);
	
	driver.navigate().to((String) Credential.get("FrontendURL"));
    }
     
     public static void settingsSequrity(WebElement checkbox,Boolean status) throws InterruptedException, IOException
     
     {
    		String portalUser = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
    		String portalPwd = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
    		String portalUpdationMessage = readExcel("BackendLogin").getRow(1).getCell(3).getStringCellValue();
			BackendSettingspageObjects Privatemsg=new BackendSettingspageObjects();
			switchtab();
			Backendlogin.LoginToAPP(portalUser, portalPwd);
			
			Privatemsg.settings.click();
			Privatemsg.General.click();
			
			EnableorDisable_Checkbox(checkbox, status);
			  Thread.sleep(5000);
			    Privatemsg.SaveButton.click();
     }
	
}