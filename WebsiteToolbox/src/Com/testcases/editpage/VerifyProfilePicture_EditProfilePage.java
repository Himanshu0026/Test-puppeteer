package Com.testcases.editpage;

import java.awt.AWTException;
import java.io.IOException;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotVisibleException;
import org.testng.annotations.Test;









import Com.Utilities.baseClass;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.registration.VerifyProfilePictureOnRegistration_FrontendandBackend;



public class VerifyProfilePicture_EditProfilePage extends baseClass
{	
	
		String username, password;

		public  VerifyProfilePicture_EditProfilePage() throws InterruptedException, IOException
		{
            
			username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
			password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
			
		}
			@Test(priority = 1)
			public void VerifyVisiblityOfProfilePictureOnEditpage_EnableOnbackend1()
					throws InterruptedException, AWTException {
				switchtoBackendendURL();
				Backendlogin.LoginToAPP(username,password);
				//switchtoBackendendURL();
				 VerifyProfilePictureOnRegistration_FrontendandBackend.VerifybackendregistrationProfilePicture("Yes", "Edit profile page only");
				switchtoFrontendURL();
				 Frontendlogin.loginToApp("pavani999", "pavani999");
				AccountSettingsPageObjects EditpageSignature=new AccountSettingsPageObjects();
				
				EditpageSignature.Signoutbuttondropdown.click();
				EditpageSignature.EditProfile.click();
				Thread.sleep(5000);
				Boolean fullnameLabelVisible = driver.findElement(By
						.xpath(".//*[@id='attachProfile']")).isDisplayed();

				if (fullnameLabelVisible) {
					
					Thread.sleep(5000);

					attachfile(driver.findElement(By.xpath(".//*[@id='attachProfile']")), "C:\\Users\\ayyappa\\Downloads\\download-images-of-flowers-1 (1).jpg");
					}
					else{
						NoSuchElementException e= new NoSuchElementException();
						throw e;
					}
				Frontendlogin.logoutFromApp();
			}
			
	@Test(priority = 2)
			public void VerifyVisiblityOfProfilePictureOnEditPage_DisableOnbackend1()
					throws InterruptedException {
				  switchtoBackendendURL();
				  VerifyProfilePictureOnRegistration_FrontendandBackend.VerifybackendregistrationProfilePicture("No", "Hidden");
				Thread.sleep(5000);
				switchtab();
				driver.navigate().refresh();
				Thread.sleep(5000);
			 Frontendlogin.loginToApp("pavani999", "pavani999");
				AccountSettingsPageObjects 		EditpageProfilePicture=new AccountSettingsPageObjects();
				EditpageProfilePicture.Signoutbuttondropdown.click();
				EditpageProfilePicture.EditProfile.click();
				//frontendregisterpage fullname=new frontendregisterpage();
				Thread.sleep(5000);

				System.out.println("called before try");
				try{
					if (driver.findElement(By
						.xpath(".//*[@id='attachProfile']")).isDisplayed()) {
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
				         Frontendlogin.logoutFromApp();
			}

			
			}


				

				
		
			
		
		
			
			
				

			
		

	
	
			


