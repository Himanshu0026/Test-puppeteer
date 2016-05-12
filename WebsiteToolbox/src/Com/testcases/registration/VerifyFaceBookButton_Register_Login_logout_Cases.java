package Com.testcases.registration;


import java.io.IOException;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotVisibleException;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.frontendregisterpage;
import Com.frontendpages.frontpagelogin;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;

public class VerifyFaceBookButton_Register_Login_logout_Cases  extends baseClass
	{
	String username, password;
   @Test
	public  VerifyFaceBookButton_Register_Login_logout_Cases() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
     
	    @Test(priority = 1)
	   			public void VerifyFacebookRegisterpage_EnableOnbackend1()
	   					throws InterruptedException, IOException {
	   				switchtoBackendendURL();
	   				 BackendSettingspageObjects facebookButton=new BackendSettingspageObjects();
	   				Backendlogin.LoginToAPP(username,password);
	   				facebookButton.setings.click();
	   				facebookButton.SingleSignOnButton.click();
	   				Thread.sleep(5000);
	   	EnableorDisable_Checkbox(facebookButton.facebookEnableDisablebutton, true);

	   		 	     Thread.sleep(5000);
	   		         facebookButton.SaveButton.click();
	   		  	    Thread.sleep(5000);
	   				switchtab();
              
	   				frontendregisterpage frontpage=new frontendregisterpage();
	   		     driver.navigate().refresh();
	   		     Thread.sleep(5000);
	   		  username = readExcel("Registrationpage").getRow(76).getCell(1)
						.getStringCellValue();
				password = readExcel("Registrationpage").getRow(76).getCell(2)
						.getStringCellValue();
	   				frontpage.clickregister.click();
                   String loginPage=driver.getWindowHandle();
	   				
	   				//click on Login with Facebook button present on Login pop up
	   				frontpage.FacebookClickButtton.click();            
	   				Thread.sleep(5000);
	   				Boolean FacebookButtonVisible = driver.findElement(By
	   						.xpath(".//*[@id='fblogin']")).isDisplayed();
	   				
	   				
	   				for(String FacebookPage : driver.getWindowHandles()){
	   					driver.switchTo().window(FacebookPage);
	   				}
	   				driver.manage().window().maximize();
	   				
	   				Frontendlogin.loginToFacebook(username, password);	

	   				Thread.sleep(6000);
	   			    driver.findElement(By.xpath(".//*[@id='platformDialogForm']/div[3]/div/table/tbody/tr/td[2]/button[1]")).click();
	   			    Thread.sleep(6000);
	   			    
	   			    driver.switchTo().window(loginPage);
	   						
	   				driver.navigate().back();	

	   				if (FacebookButtonVisible) {
	   					
	   					Thread.sleep(5000);

	   				}
	   					else{
	   						NoSuchElementException e= new NoSuchElementException();
	   						throw e;
	   					}
	   				driver.navigate().to((String) Credential.get("FrontendURL"));
	   			}
	   			
	  		@Test(priority = 2)
   			public void VerifyFacebookRegisterpage_DisableOnbackend1()
   					throws InterruptedException {
   				switchtoBackendendURL();
   				 BackendSettingspageObjects facebookButton=new BackendSettingspageObjects();
   			     facebookButton.setings.click();
   			  Thread.sleep(5000);
   				 facebookButton.SingleSignOnButton.click();
   				Thread.sleep(5000);
   			   	EnableorDisable_Checkbox(facebookButton.facebookEnableDisablebutton, false);
   				 facebookButton.SaveButton.click();
   				 driver.navigate().refresh();
   				switchtab();
   				frontendregisterpage frontpage=new frontendregisterpage();
   				frontpage.clickregister.click();
   				Thread.sleep(5000);

	   				System.out.println("called before try");
	   				try{
	   					if (driver.findElement(By
	   						.xpath(".//*[@id='fblogin']")).isDisplayed()) {
	   						System.out.println("called from try");
	   						ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
	   						throw e;
	   					}
	   					else{
	   						System.out.println(" should not visible");
	   					}
	   				
	   				}
	   				catch(Exception e){
	   					
	   					System.out.println("called from catch");
	   					e.printStackTrace();
	   					System.out.println("Exception:"+ e.getMessage());
	   				}
	   				driver.navigate().to((String) Credential.get("FrontendURL"));   
	   	}
	   
	  		 @Test(priority = 3)
	   			public void VerifyFacebookLoginPage_EnableOnbackend1()
	   					throws InterruptedException, IOException {
	   				switchtoBackendendURL();
	   				 BackendSettingspageObjects facebookButton=new BackendSettingspageObjects();
	   				facebookButton.setings.click();
	   				facebookButton.SingleSignOnButton.click();
	   				Thread.sleep(5000);
	   	
	   			   	EnableorDisable_Checkbox(facebookButton.facebookEnableDisablebutton, true);
	   		         facebookButton.SaveButton.click();
	   				switchtab();
	   		      
	   		       Thread.sleep(5000);
	   				frontpagelogin login= new frontpagelogin();
	   			     driver.navigate().refresh();
	   			     Thread.sleep(5000);
	   			  username = readExcel("Registrationpage").getRow(77).getCell(1)
							.getStringCellValue();
					password = readExcel("Registrationpage").getRow(77).getCell(2)
							.getStringCellValue();
	   				//click on login tap on present Home page
	   				login.loginbuttonOnHome.click();
	   				Thread.sleep(5000);
	   				Boolean FacebookButtonVisible = driver.findElement(By
	   						.xpath(".//*[@id='fblogin']")).isDisplayed();
	   				String loginPage=driver.getWindowHandle();
	   				
	   				//click on Login with Facebook button present on Login pop up
	   				login.LoginwithFacebook.click();
	   				
	   				for(String FacebookPage : driver.getWindowHandles()){
	   					driver.switchTo().window(FacebookPage);
	   				}
	   				driver.manage().window().maximize();
	   				Frontendlogin.loginToFacebook(username, password);	

	   				Thread.sleep(6000);
	   			    driver.findElement(By.xpath(".//*[@id='platformDialogForm']/div[3]/div/table/tbody/tr/td[2]/button[1]")).click();
	   			    Thread.sleep(6000);
	   			   driver.switchTo().window(loginPage);
	   			
	   			   driver.navigate().back();	
	   				if (FacebookButtonVisible) {
	   					
	   					Thread.sleep(5000);

	   				}
	   					else{
	   						NoSuchElementException e= new NoSuchElementException();
	   						throw e;
	   					}
	   				driver.navigate().to((String) Credential.get("FrontendURL")); 
	}
	  		 
	  		@Test(priority = 4)
   			public void VerifyFacebookLoginpagepage_DisableOnbackend1()
   					throws InterruptedException {
   				switchtoBackendendURL();
   				 BackendSettingspageObjects facebookButton=new BackendSettingspageObjects();
   			     facebookButton.setings.click();
   			  Thread.sleep(5000);
   				 facebookButton.SingleSignOnButton.click();
   				Thread.sleep(5000);
   			   	EnableorDisable_Checkbox(facebookButton.facebookEnableDisablebutton, false);
   				 facebookButton.SaveButton.click();
   				 driver.navigate().refresh();
   				switchtab();
   			 driver.navigate().refresh();
 		       Thread.sleep(5000);
 				frontpagelogin login= new frontpagelogin();
 				//click on login tap on present Home page
 				login.loginbuttonOnHome.click();
 				Thread.sleep(5000);
	   				System.out.println("called before try");
	   				try{
	   					if (driver.findElement(By
	   						.xpath(".//*[@id='fblogin']")).isDisplayed()) {
	   						System.out.println("called from try");
	   						ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
	   						throw e;
	   					}
	   					else{
	   						System.out.println(" should not visible");
	   					}
	   				
	   				}
	   				catch(Exception e){
	   					
	   					System.out.println("called from catch");
	   					e.printStackTrace();
	   					System.out.println("Exception:"+ e.getMessage());
	   				}
	   				driver.navigate().to((String) Credential.get("FrontendURL"));   
	   	}}
	   
    	 
    	 
    	 
