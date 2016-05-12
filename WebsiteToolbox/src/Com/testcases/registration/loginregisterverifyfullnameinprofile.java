package Com.testcases.registration;



import java.io.IOException;

import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.frontendregisterpage;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Frontendlogin;



public class loginregisterverifyfullnameinprofile extends baseClass
{

	
   @Test(priority=1)
	 
 public static void loginfrontpage() throws InterruptedException, IOException{
			

   frontpagelogin login= new frontpagelogin();
//click on login tap on present Home page
		String username=readExcel("Registrationpage").getRow(93).getCell(1).getStringCellValue();
		String password=readExcel("Registrationpage").getRow(93).getCell(2).getStringCellValue();
		Thread.sleep(5000);
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		}
	
	 @Test(priority=2)
		public void  Frontendprofile() throws InterruptedException, IOException
	{
		frontendregisterpage frontpage=new frontendregisterpage();
		Thread.sleep(5000);
		
     	frontpage.Signoutbuttondropdown.click();
	   Thread.sleep(5000);
	    frontpage.Profileclick.click();
		Thread.sleep(5000);
		 if (!frontpage.fullnamedisplayed.isDisplayed())
		 {
	}
		
    String expectedTitle = "swamy";
   String actualTitle = driver.getTitle();
    if (expectedTitle.equals(actualTitle))

        {

      System.out.println("Verification Successful - The correct title is displayed on the web page.");

       }

       else

       {
         System.out.println("Verification Failed - An incorrect title is displayed on the web page.");
     }
	
	}}
	


