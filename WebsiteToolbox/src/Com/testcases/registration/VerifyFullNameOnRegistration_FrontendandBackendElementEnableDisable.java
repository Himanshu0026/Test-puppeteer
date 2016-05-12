package Com.testcases.registration;


import java.io.IOException;
import java.util.NoSuchElementException;

import junit.framework.Assert;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotVisibleException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;

import Com.backendpages.Backendusersdropdownobjects;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;


public class VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable extends baseClass {
	String username, password;
	
           @Test
	public VerifyFullNameOnRegistration_FrontendandBackendElementEnableDisable() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
 
	@Test(priority = 1)
	public void VerifyVisiblityOnFullNameOnRegistration_DisabledOnbackendRegisterpageonly() throws InterruptedException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username,password);
	VerifybackendregistrationFullname("No", "Hidden");
	
		Thread.sleep(5000);

		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		System.out.println("called before try");
		try{
			if (driver.findElement(By
				.id("inputname")).isDisplayed()) {
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
		      }
	

	@Test(priority = 2)
	public void VerifyVisiblityOfFullNameOnRegistration_EnableOnbackend()
			throws InterruptedException {
		switchtoBackendendURL();
		VerifybackendregistrationFullname("No","Visible");

		switchtoFrontendURL();
	Thread.sleep(5000);
	driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();

		
		Boolean fullnameLabelVisible = driver.findElement(By
				.id("inputname")).isDisplayed();

		if (fullnameLabelVisible) {
				frontpage.Fullnametext.sendKeys("Ayyappa 123");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			
			}
		
		driver.navigate().to((String) Credential.get("FrontendURL"));

	}
	

	@Test(priority = 3)
	public void VerifyVisiblityOfFullNameOnRegistration_EnableOnbackend1()
			throws InterruptedException {
		switchtoBackendendURL();
		VerifybackendregistrationFullname("No","Registration page only");

		switchtoFrontendURL();
		driver.navigate().refresh();
		Thread.sleep(5000);
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean fullnameLabelVisible = driver.findElement(By
				.id("inputname")).isDisplayed();

		if (fullnameLabelVisible) {
				frontpage.Fullnametext.sendKeys("Ayyappa 123");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
	
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	

	@Test(priority = 4)
	public void VerifyVisiblityOnFullNameOnRegistration_BackendenableEditPageOnly() throws InterruptedException {
		switchtoBackendendURL();
		
		VerifybackendregistrationFullname("No", "Edit profile page only");

		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		System.out.println("called before try");
		try{
			if (driver.findElement(By
				.id("inputname")).isDisplayed()) {
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

		driver.navigate().to((String) Credential.get("FrontendURL"));   
	
	}
	
	@Test(priority = 5)
	public void VerifyVisiblityOnFullNameOnRegistration_DisabledOnbackend() throws InterruptedException {
		switchtoBackendendURL();
		
		VerifybackendregistrationFullname("Yes", "Hidden");

		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		System.out.println("called before try");
		try{
			if (driver.findElement(By
				.id("inputname")).isDisplayed()) {
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

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	

	@Test(priority = 6)
	public void VerifyVisiblityOfFullNameOnRegistration_EnableOnbackend111()
			throws InterruptedException {
		switchtoBackendendURL();
		VerifybackendregistrationFullname("Yes","Visible");

		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean fullnameLabelVisible = driver.findElement(By
				.id("inputname")).isDisplayed();

		if (fullnameLabelVisible) {
				frontpage.Fullnametext.sendKeys("Ayyappa 123");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	

	@Test(priority = 7)
	public void VerifyVisiblityOfFullNameOnRegistration_EnableOnbackend11()
			throws InterruptedException {
		switchtoBackendendURL();
		VerifybackendregistrationFullname("Yes","Registration page only");

		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean fullnameLabelVisible = driver.findElement(By
				.id("inputname")).isDisplayed();

		if (fullnameLabelVisible) {
				frontpage.Fullnametext.sendKeys("Ayyappa 123");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	@Test(priority = 8)
	public  void VerifyVisiblityOnFullNameOnRegistration_EditPageOnly1() throws InterruptedException {
		switchtoBackendendURL();
		
		VerifybackendregistrationFullname("Yes", "Edit profile page only");

		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		System.out.println("called before try");
		try{
			if (driver.findElement(By
				.id("inputname")).isDisplayed()) {
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
     
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	public static void gotoDefaultRegistrationTab() throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		register.Users.click();
		
		register.Fields.click();

		register.DefaultRegisrationOptions.click();

	}
	
	
	@SuppressWarnings("deprecation")
	public  static void VerifybackendregistrationFullname(String Require, String Visiblity)
			throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		gotoDefaultRegistrationTab();
		
		register.FullnameRequired.click();
		Select Required = new Select(register.FullnameRequired);
		Required.selectByVisibleText(Require);
		//"No", "Hidden"
		Thread.sleep(3000);
		register.FullnameVisibility.click();
		Select Visibility = new Select(register.FullnameVisibility);
		Visibility.selectByVisibleText(Visiblity);
		register.FullnameVisibility.click();
		Thread.sleep(6000);
		// driver.findElement(By.xpath(".//*[@id='content_wrapper']/div[6]/form/div/button")).click();
		
		register.SaveButtonClick.click();
		Thread.sleep(5000);
		WebElement updationMsg=driver.findElement(By.xpath("//p/font[@class='heading']"));
		Assert.assertTrue(updationMsg.getText().contains("profile fields have been updated"));
	}
	
	
	
}