package Com.testcases.registration;

import java.awt.AWTException;
import java.io.IOException;
import java.util.Date;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Frontendlogin;



public class Frontregister extends baseClass
{
	public static String username, password, Email, Fullnametext,signature,filepath,Picturepath,InstantmessageSreenNameText;



	public static String  facebookusername,facebookpassword ;

	 @Test(priority=1)
	public static  void  NormalRegistration()  throws InterruptedException,IOException, AWTException
	{
		switchtoFrontendURL();
	frontendregisterpage frontpage=new frontendregisterpage();
	
	username = readExcel("Registrationpage").getRow(1).getCell(1).getStringCellValue();
	password = readExcel("Registrationpage").getRow(1).getCell(2).getStringCellValue();
    Email = readExcel("Registrationpage").getRow(1).getCell(3).getStringCellValue();
	Fullnametext = readExcel("Registrationpage").getRow(1).getCell(4).getStringCellValue();
    //Birthdaypicker= readExcel("Registrationpage").getRow(1).getCell(5).getStringCellValue();
	InstantmessageSreenNameText= readExcel("Registrationpage").getRow(1).getCell(12).getStringCellValue();
	signature= readExcel("Registrationpage").getRow(1).getCell(6).getStringCellValue();
	filepath= readExcel("Registrationpage").getRow(1).getCell(9).getStringCellValue();
	Picturepath = readExcel("Registrationpage").getRow(1).getCell(10).getStringCellValue();
   frontpage.clickregister.click();
    Thread.sleep(6000);
    frontpage.Username.sendKeys(username);
	frontpage.password.sendKeys(password);
	frontpage.Email.sendKeys(Email);
	frontpage.Fullnametext.sendKeys(Fullnametext);
	Thread.sleep(6000);
	selectElementfromDropdown(frontpage.Instantmesseagingdropdown, "AIM");
	Thread.sleep(5000);
	frontpage.InstantmessageSreenNameText.sendKeys(InstantmessageSreenNameText);
	Thread.sleep(5000);
	frontpage.Birthdaypicker.sendKeys("06/06/2012"+Keys.TAB);
	Thread.sleep(5000);
	frontpage.signature.sendKeys(signature);
	
    Thread.sleep(5000);
    EnableorDisable_Checkbox(frontpage.TermsConditionsButton, true);

	//attachfile(frontpage.UploadPicture, "C:\\Users\\ayyappa\\Downloads\\download-images-of-flowers-1 (1).jpg");
		
	//attachfile(frontpage.UploadPicture, filepath);

		//driver.findElement(By.xpath("//div/button[@name='submit']")).click();
		
        frontpage.createaccountbutton.click();
        Thread.sleep(3000);
        Assert.assertTrue(frontpage.ExpectedMsgforinvalidCredential.getText().contains("Thank you for registering! Please check your email for instructions on how to begin using your account."));
        frontpage.BacktoCategory.click();
       Frontendlogin.logoutFromApp();
        
     }
	//@Test(priority=2)
	public static void facebookRegistration() throws InterruptedException, IOException
	{

         	username= readExcel("Registrationpage").getRow(2).getCell(1).getStringCellValue();
    		password = readExcel("Registrationpage").getRow(2).getCell(2).getStringCellValue();
    	
    		frontendregisterpage facebooklogin1=new frontendregisterpage();
    		//click on login tap on present Home page
    		 facebooklogin1.clickregister.click();
    		String loginpage=driver.getWindowHandle();
    		
    		//click on Login with Facebook button present on Login pop up
    		facebooklogin1.FacebookClickButtton.click();
    
          for(String FacebookPage : driver.getWindowHandles()){
    			driver.switchTo().window(FacebookPage);
    		}
    		driver.manage().window().maximize();
    		facebooklogin1.facebookEmail.sendKeys(username);
    		facebooklogin1.facebookPassword.sendKeys(password);
    		facebooklogin1.facebookLogin.click();
    		Frontendlogin.loginToFacebook(username, password);	
    		Thread.sleep(5000);
    		
    		driver.switchTo().window(loginpage);
    		Thread.sleep(5000);
    	// Frontendlogin.logoutFromApp();
    		
    		
    
 }}
