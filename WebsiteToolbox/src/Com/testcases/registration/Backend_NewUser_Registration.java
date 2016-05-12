package Com.testcases.registration;

import java.io.IOException;

import org.testng.annotations.Test;

import Com.Utilities.baseClass;

import Com.backendpages.Backendusersdropdownobjects;
import Com.testcases.Login.Backendlogin;

public class Backend_NewUser_Registration extends baseClass
{
	String username, password, Emailtext, Personalnote ;
	//login backend
	@Test
	public Backend_NewUser_Registration() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
 
   // Backend New User Registration 
	     @Test(priority=1)
	 	public  void BackendNewUserRegistration() throws InterruptedException, IOException
		{
	    	 switchtoBackendendURL();
				 Backendusersdropdownobjects newregistration=new Backendusersdropdownobjects();
				Backendlogin.LoginToAPP(username,password);
		
		       
			username = readExcel("BackendRegistration").getRow(1).getCell(1)
					.getStringCellValue();
			password = readExcel("BackendRegistration").getRow(1).getCell(2)
					.getStringCellValue();
			Emailtext = readExcel("BackendRegistration").getRow(1).getCell(3)
					.getStringCellValue();
			Personalnote = readExcel("BackendRegistration").getRow(1).getCell(4)
					.getStringCellValue();
		
			newregistration.Users.click();
			Thread.sleep(3000);
			newregistration.Newuser.click();
			Thread.sleep(3000);
			newregistration.Username.sendKeys(username);
			Thread.sleep(5000);
			newregistration.Password.sendKeys(password);
			Thread.sleep(3000);
			newregistration.Emailtext.sendKeys(Emailtext);
			Thread.sleep(3000);
			selectElementfromDropdown(newregistration.GroupDropDown, "Registered Users");
			Thread.sleep(3000);
			newregistration.PersonalNote.sendKeys(Personalnote);
			Thread.sleep(3000);
			newregistration.RegisterNewUserButton.click();
			Thread.sleep(3000);
			Backendlogin.logoutFromApp();
			Thread.sleep(5000);
			
			
}}
