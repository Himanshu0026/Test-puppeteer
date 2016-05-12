package Com.testcases.editpage;


import java.io.IOException;


import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Frontendlogin;


public class VerifyEditpageForAdmin  extends baseClass
{
	public String username, password;
	              
	  @Test (priority=1)            
	 public void loginfrontpage () throws InterruptedException, IOException 
	{
		
			 username = readExcel("Editpage").getRow(2).getCell(1)
						.getStringCellValue();
		      password = readExcel("Editpage").getRow(2).getCell(2)
						.getStringCellValue();
		     
		      Frontendlogin.loginToApp(username, password);
		
	}
	
	 
	 @Test(priority=2)
		public void  VerifyEditprofilepage() throws InterruptedException
	{
		 AccountSettingsPageObjects editprofilepage=new AccountSettingsPageObjects();
		Thread.sleep(5000);
		editprofilepage.Signoutbuttondropdown.click();
	Thread.sleep(5000);
	editprofilepage.EditProfile.click();
	Thread.sleep(5000);
	selectElementfromDropdown(editprofilepage.PrimaryusergroupDropdown, "RegisteredUsers");
	
	Thread.sleep(5000); 
	editprofilepage.SavechangesButton.click();
	driver.navigate().back();

	}
	 
	 @Test(priority=3)
		public void  VerifyEditprofilepage2() throws InterruptedException
	{
		 AccountSettingsPageObjects editprofilepage1=new AccountSettingsPageObjects();
		Thread.sleep(5000);
		editprofilepage1.Signoutbuttondropdown.click();
	Thread.sleep(5000);
	editprofilepage1.EditProfile.click();
	Thread.sleep(5000);
	selectElementfromDropdown(editprofilepage1.PrimaryusergroupDropdown, "Pending Email Verification");
	Thread.sleep(5000); 
	editprofilepage1.InstantMessagingnewTextfield.sendKeys("");
	editprofilepage1.SavechangesButton.click();
	driver.navigate().back();
	}
	 
	 @Test(priority=4)
		public void  VerifyEditprofilepage3() throws InterruptedException
	{
	AccountSettingsPageObjects editprofilepage2=new AccountSettingsPageObjects();
   Thread.sleep(5000);
	editprofilepage2.Signoutbuttondropdown.click();
	Thread.sleep(5000);
	editprofilepage2.EditProfile.click();
	Thread.sleep(5000);
	selectElementfromDropdown(editprofilepage2.PrimaryusergroupDropdown, "Administrators");
	Thread.sleep(5000); 
	editprofilepage2.SavechangesButton.click();
	driver.navigate().back();
	}
	 
	 @Test(priority=5)
		public void  VerifyEditprofilepage4() throws InterruptedException
	{
	AccountSettingsPageObjects editprofilepage3=new AccountSettingsPageObjects();
Thread.sleep(5000);
	editprofilepage3.Signoutbuttondropdown.click();
	Thread.sleep(5000);
	editprofilepage3.EditProfile.click();
	Thread.sleep(5000);
	selectElementfromDropdown(editprofilepage3.PrimaryusergroupDropdown, "Moderators");
	Thread.sleep(5000); 
	editprofilepage3.SavechangesButton.click();
	
	
	
        

}}
