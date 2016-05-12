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
import Com.testcases.registration.VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable;




public class VerifyFullName_EditProfilePage extends baseClass
{
	
	String username, password;

	public  VerifyFullName_EditProfilePage() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
			
			@Test(priority = 1)
			public void VerifyVisiblityOfFullNameOnEditpage_EnableOnbackend1()
					throws InterruptedException {
				Backendlogin.LoginToAPP(username,password);
			
				VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("Yes", "Edit profile page only");
				Thread.sleep(5000);
				switchtoFrontendURL();
				Thread.sleep(5000);
				 Frontendlogin.loginToApp("pavani999", "pavani999");
				AccountSettingsPageObjects Editpagefullname=new AccountSettingsPageObjects();
				Editpagefullname.Signoutbuttondropdown.click();
				Editpagefullname.EditProfile.click();
				Thread.sleep(5000);
				Boolean fullnameLabelVisible = driver.findElement(By
						.xpath("//label[contains(text(),'Full Name')]")).isDisplayed();

				if (fullnameLabelVisible) {
						driver.findElement(By.xpath(".//*[@id='inputname']")).sendKeys("ayyappa123");
					}
					else{
						NoSuchElementException e= new NoSuchElementException();
						throw e;
						 }
				Thread.sleep(5000);
				Frontendlogin.logoutFromApp();
				driver.navigate().to((String) Credential.get("FrontendURL"));
				}
			
				@Test(priority = 2)
				public void VerifyVisiblityOfFullNameOnEditPage_DisableOnbackend1()
						throws InterruptedException {
					  switchtoBackendendURL();
						Thread.sleep(5000);
						VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable.VerifybackendregistrationFullname("No", "Hidden");
					Thread.sleep(5000);
					switchtab();
					driver.navigate().refresh();
					Thread.sleep(5000);
				 Frontendlogin.loginToApp("pavani999", "pavani999");
					AccountSettingsPageObjects Editpagefullname=new AccountSettingsPageObjects();
					Editpagefullname.Signoutbuttondropdown.click();
					Editpagefullname.EditProfile.click();
					//frontendregisterpage fullname=new frontendregisterpage();
					Thread.sleep(5000);
					//Boolean fullnameLabelVisible = driver.findEleme.xpath("//label[contains(text(),'Full Name')]")).isDisplayed();
					//Thread.sleep(5000);
					System.out.println("called before try");
					try{
						if (driver.findElement(By
							.xpath(".//*[@id='inputname']")).isDisplayed()) {
							System.out.println("called from try");
							ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
							throw e;
						}
						else{
							System.out.println("Full Name should not visible");
						}
					
					}
					catch(Exception e){
						
						System.out.println("called from catch");
						e.printStackTrace();
						System.out.println("Exception:"+ e.getMessage());
					}
					Thread.sleep(5000);
					         Frontendlogin.logoutFromApp();
				}

				
				}
			
				

				
		
			
		
		
			
			
				

			
		

	
	
			


