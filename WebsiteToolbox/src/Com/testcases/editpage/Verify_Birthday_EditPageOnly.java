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
import Com.testcases.registration.VerifyBirthdayPickerOnRegistration_FrontendandBackend;

public class Verify_Birthday_EditPageOnly extends baseClass  {
	String username, password;

	public  Verify_Birthday_EditPageOnly() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	
			@Test(priority = 1)
			public void VerifyVisiblityOfBirthDatePickerOnEditpage_EnableOnbackend1()
					throws InterruptedException {
				Backendlogin.LoginToAPP(username,password);
				
	VerifyBirthdayPickerOnRegistration_FrontendandBackend.VerifybackendregistrationBirthDatePicker("Yes", "Edit profile page only");
				switchtoFrontendURL();
				 Frontendlogin.loginToApp("pavani999", "pavani999");
				AccountSettingsPageObjects EditpageBirthDatePicker=new AccountSettingsPageObjects();
				
				EditpageBirthDatePicker.Signoutbuttondropdown.click();
				EditpageBirthDatePicker.EditProfile.click();
				Thread.sleep(5000);
				Boolean BirthDatePickerLabelVisible = driver.findElement(By
						.xpath(".//*[@id='birthDatepicker']")).isDisplayed();

				if (BirthDatePickerLabelVisible) {
					
				driver.findElement(By.xpath(".//*[@id='birthDatepicker']")).sendKeys("10/10/2015");
					}
					else{
						NoSuchElementException e= new NoSuchElementException();
						throw e;
					}
				Frontendlogin.logoutFromApp();
			}
			
				@Test(priority = 2)
				public void VerifyVisiblityOfBirthDatePickerOnEditPage_DisableOnbackend1()
						throws InterruptedException {
					  switchtoBackendendURL();
						VerifyBirthdayPickerOnRegistration_FrontendandBackend.VerifybackendregistrationBirthDatePicker("No", "Hidden");
					Thread.sleep(5000);
					switchtab();
					driver.navigate().refresh();
					Thread.sleep(5000);
				    Frontendlogin.loginToApp("pavani999", "pavani999");
					AccountSettingsPageObjects 
					EditpageBirthDatePicker=new AccountSettingsPageObjects();

					EditpageBirthDatePicker.Signoutbuttondropdown.click();

					EditpageBirthDatePicker.EditProfile.click();
					//frontendregisterpage fullname=new frontendregisterpage();
					Thread.sleep(5000);

					System.out.println("called before try");
					try{
						if (driver.findElement(By
							.xpath(".//*[@id='birthDatepicker']")).isDisplayed()) {
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


	
	
	
	
	

