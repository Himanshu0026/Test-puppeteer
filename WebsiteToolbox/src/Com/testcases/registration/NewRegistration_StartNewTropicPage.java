package Com.testcases.registration;


import java.io.IOException;
import java.util.Set;

import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.frontendregisterpage;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Frontendlogin;

public  class NewRegistration_StartNewTropicPage  extends baseClass{
	
	 public String username, password, Email;
	// strat new tropic page with create new registration

	public static void Registration(String username, String password, String Email) throws InterruptedException, IOException
	{
		
		frontendregisterpage frontpage = new frontendregisterpage();
	
		frontpage.Username.sendKeys(username);
		frontpage.password.sendKeys(password);
		frontpage.Email.sendKeys(Email);
		
		
	}
       // new registration with start new tropic page
	//@ Test(priority=1)
	public void startnewpostpagecreateaccount() throws InterruptedException, IOException
	{
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
	
		username = readExcel("Registrationpage").getRow(78).getCell(1)
				.getStringCellValue();
		password = readExcel("Registrationpage").getRow(78).getCell(2)
				.getStringCellValue();
		Email = readExcel("Registrationpage").getRow(78).getCell(3)
				.getStringCellValue();
		
		frontpage.StartnewTopicbutton.click();
		Thread.sleep(5000);
		frontpage.startnewtopicCreatanaccountbutton.click();
		Registration(username, password,  Email);
		Thread.sleep(3000);
		
		    EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
		    Thread.sleep(5000);
		frontpage.createaccountbutton.click();
        Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
        frontpage.BacktoCategory.click();
       Frontendlogin.logoutFromApp();
	}
	
	// new Registarion with start new tropic window click on new account
       //@Test (priority=2)
	public void startnewpostpageRegistration() throws InterruptedException, IOException
	{
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
	
		username = readExcel("Registrationpage").getRow(79).getCell(1)
				.getStringCellValue();
		password = readExcel("Registrationpage").getRow(79).getCell(2)
				.getStringCellValue();
		Email = readExcel("Registrationpage").getRow(79).getCell(3)
				.getStringCellValue();
		
		frontpage.StartnewTopicbutton.click();
		frontpage.createaccountbutton.click();
		Registration(username, password,  Email);
		Thread.sleep(3000);
	    EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	    Thread.sleep(5000);
		frontpage.createaccountbutton.click();
		Thread.sleep(3000);
        Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
        frontpage.BacktoCategory.click();
       Frontendlogin.logoutFromApp();
	}
	
	//new aacount registration with chatsidemenu
	@Test(priority=3)
	public void ChatsidemenuwithNewRegigistration() throws InterruptedException, IOException
	{
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpagelogin frontpage1=new frontpagelogin();
		AddNewTopicandReplyTopic newTopic=new AddNewTopicandReplyTopic();
	
		username = readExcel("Registrationpage").getRow(81).getCell(1)
				.getStringCellValue();
		password = readExcel("Registrationpage").getRow(81).getCell(2)
				.getStringCellValue();
		Email = readExcel("Registrationpage").getRow(81).getCell(3)
				.getStringCellValue();
      	newTopic.forumMenu.click();
		Thread.sleep(5000);
		frontpage1.Chat_Sidemenu.click();
		Thread.sleep(6000);
		String parentWindow = driver.getWindowHandle();
		Set<String> handles =  driver.getWindowHandles();
		for(String windowHandle  : handles)
		{
		    if(!windowHandle.equals(parentWindow))
		   {
		     driver.switchTo().window(windowHandle);
	
		frontpage.startnewtopicCreatanaccountbutton.click();
	   Thread.sleep(3000);
		Registration(username, password,  Email);
		Thread.sleep(3000);
	    EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	    Thread.sleep(5000);
		frontpage.createaccountbutton.click();
		Thread.sleep(3000);
        Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
        frontpage.BacktoCategory.click();
       Frontendlogin.logoutFromApp();
	}}}
	// New registration with login popupwindow
	//@Test (priority=4)
	public void LoginpagewindowpageRegistration() throws InterruptedException, IOException
	{
		switchtoFrontendURL();
		frontendregisterpage frontpage = new frontendregisterpage();
	
		username = readExcel("Registrationpage").getRow(80).getCell(1)
				.getStringCellValue();
		password = readExcel("Registrationpage").getRow(80).getCell(2)
				.getStringCellValue();
		Email = readExcel("Registrationpage").getRow(80).getCell(3)
				.getStringCellValue();
		
	       frontpage.loginbuttonOnHome.click();
	     
	     
	       // frontpage.modelfoter.click();
	       String loginPage=driver.getWindowHandle();
	
		frontpage.startnewtopicCreatanaccountbutton.click();
		Thread.sleep(5000);
		Registration(username, password,  Email);
		Thread.sleep(3000);
	    EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);
	    Thread.sleep(5000);
		frontpage.createaccountbutton.click();
		Thread.sleep(3000);
        Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
        frontpage.BacktoCategory.click();
       Frontendlogin.logoutFromApp();
}}