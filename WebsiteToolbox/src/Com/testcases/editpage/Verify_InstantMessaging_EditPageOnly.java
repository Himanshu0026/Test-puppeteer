package Com.testcases.editpage;

import java.io.IOException;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotVisibleException;
import org.testng.annotations.Test;








import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.registration.VerifyInstantMessagingOnRegistration_FrontendandBackend;


public class Verify_InstantMessaging_EditPageOnly extends baseClass  {


	String username, password;

	public  Verify_InstantMessaging_EditPageOnly() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
			@Test(priority = 1)
			public void VerifyVisiblityOfInstantMessagingOnEditpage_EnableOnbackend1()
					throws InterruptedException {
				Backendlogin.LoginToAPP(username,password);
				
	       VerifyInstantMessagingOnRegistration_FrontendandBackend.VerifybackendregistrationInstantMessaging("Yes", "Edit profile page only");
				switchtoFrontendURL();
				 Frontendlogin.loginToApp("pavani999", "pavani999");
				AccountSettingsPageObjects EditpageInstantMessaging=new AccountSettingsPageObjects();
				
				EditpageInstantMessaging.Signoutbuttondropdown.click();
				EditpageInstantMessaging.EditProfile.click();
				Thread.sleep(5000);
				Boolean InstantMessagingLabelVisible = driver.findElement(By
						.xpath(".//*[@id='imType']")).isDisplayed();

				if (InstantMessagingLabelVisible) {
					
				driver.findElement(By.xpath(".//*[@id='imType']")).click();
					}
					else{
						NoSuchElementException e= new NoSuchElementException();
						throw e;
					}
				Frontendlogin.logoutFromApp();
			}
			
				@Test(priority = 2)
				public void VerifyVisiblityOfInstantMessagingOnEditPage_DisableOnbackend1()
						throws InterruptedException {
					  switchtoBackendendURL();
						
					VerifyInstantMessagingOnRegistration_FrontendandBackend.VerifybackendregistrationInstantMessaging("No", "Hidden");
					Thread.sleep(5000);
					switchtab();
					driver.navigate().refresh();
					Thread.sleep(5000);
				    Frontendlogin.loginToApp("pavani999", "pavani999");
					AccountSettingsPageObjects 
					EditpageInstantMessaging=new AccountSettingsPageObjects();

					EditpageInstantMessaging.Signoutbuttondropdown.click();

					EditpageInstantMessaging.EditProfile.click();
					//frontendregisterpage fullname=new frontendregisterpage();
					Thread.sleep(5000);

					System.out.println("called before try");
					try{
						if (driver.findElement(By
							.xpath(".//*[@id='imType']")).isDisplayed()) {
							System.out.println("called from try");
							ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
							throw e;
						}
						else{
							System.out.println("birthDatepicker should not visible");
						}
					
					}
					catch(Exception e){
						
						System.out.println("called from catch");
						e.printStackTrace();
						System.out.println("Exception:"+ e.getMessage());
					}
					         Frontendlogin.logoutFromApp();
				}

				
				}


	
	
	
	
	

