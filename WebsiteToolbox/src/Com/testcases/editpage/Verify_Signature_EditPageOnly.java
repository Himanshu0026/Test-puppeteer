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
import Com.testcases.registration.VerifySignatureOnRegistration_FrontendandBackend;


public class Verify_Signature_EditPageOnly extends baseClass  {


	String username, password;

	public  Verify_Signature_EditPageOnly() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
			@Test(priority = 1)
			public void VerifyVisiblityOfSignatureOnEditpage_EnableOnbackend1()
					throws InterruptedException {
				Backendlogin.LoginToAPP(username,password);
	VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("Yes", "Edit profile page only");
				switchtoFrontendURL();
				 Frontendlogin.loginToApp("pavani999", "pavani999");
				AccountSettingsPageObjects EditpageSignature=new AccountSettingsPageObjects();
				
				EditpageSignature.Signoutbuttondropdown.click();
				EditpageSignature.EditProfile.click();
				Thread.sleep(5000);
				Boolean fullnameLabelVisible = driver.findElement(By
						.xpath(".//*[@id='signature']")).isDisplayed();

				if (fullnameLabelVisible) {
					
				driver.findElement(By.xpath(".//*[@id='signature']")).sendKeys("Ayyappa");
					}
					else{
						NoSuchElementException e= new NoSuchElementException();
						throw e;
					}
				Frontendlogin.logoutFromApp();
			}
			
				@Test(priority = 2)
				public void VerifyVisiblityOfSignatureOnEditPage_DisableOnbackend1()
						throws InterruptedException {
					  switchtoBackendendURL();
					  VerifySignatureOnRegistration_FrontendandBackend.VerifybackendregistrationSignature("No", "Hidden");
					Thread.sleep(5000);
					switchtab();
					driver.navigate().refresh();
					Thread.sleep(5000);
				    Frontendlogin.loginToApp("pavani999", "pavani999");
					AccountSettingsPageObjects EditpageSignature=new AccountSettingsPageObjects();
					EditpageSignature.Signoutbuttondropdown.click();
					EditpageSignature.EditProfile.click();
					//frontendregisterpage fullname=new frontendregisterpage();
					Thread.sleep(5000);

					System.out.println("called before try");
					try{
						if (driver.findElement(By
							.xpath(".//*[@id='signature']")).isDisplayed()) {
							System.out.println("called from try");
							ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
							throw e;
						}
						else{
							System.out.println("signature should not visible");
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


	
	
	
	
	

