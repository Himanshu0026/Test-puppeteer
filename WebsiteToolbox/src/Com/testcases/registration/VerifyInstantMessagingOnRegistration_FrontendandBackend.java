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



@SuppressWarnings("deprecation")
public class VerifyInstantMessagingOnRegistration_FrontendandBackend extends baseClass {

	String username, password;

	public  VerifyInstantMessagingOnRegistration_FrontendandBackend() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}
	


	@Test(priority = 1)
	public void VerifyVisiblityOnInstantMessagingOnRegistration_DisabledOnbackendRegisterpageonly() throws InterruptedException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username,password);
		VerifybackendregistrationInstantMessaging("No", "Hidden");
		Thread.sleep(5000);
		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		
		System.out.println("called before try");
		try{
			if (driver.findElement(By
				.id("imType")).isDisplayed()) {
				System.out.println("called from try");
				ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
				throw e;
			}
			else{
				System.out.println("Instantmessage should not visible");
			}
		
		}
		catch(Exception e){
			
			System.out.println("called from catch");
			e.printStackTrace();
			System.out.println("Exception:"+ e.getMessage());
		
		}
		driver.navigate().to((String) Credential.get("FrontendURL"));
		      }
			
		
	@Test(priority = 2)
	public void VerifyVisiblityOfInstantMessagingOnRegistration_EnableOnbackend()
			throws InterruptedException {
		switchtoBackendendURL();
		
		VerifybackendregistrationInstantMessaging("No","Visible");
           Thread.sleep(5000);
		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean InstantMessagingLabelVisible = driver.findElement(By
				.id("imType")).isDisplayed();

		if (InstantMessagingLabelVisible) {
				frontpage.Instantmesseagingdropdown.click();
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	

	@Test(priority = 3)
	public void VerifyVisiblityOfInstantMessagingOnRegistration_EnableOnbackend1()
			throws InterruptedException {
		switchtoBackendendURL();
		VerifybackendregistrationInstantMessaging("No","Registration page only");
       Thread.sleep(5000);
		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean InstantMessagingLabelVisible = driver.findElement(By
				.id("imType")).isDisplayed();

		if (InstantMessagingLabelVisible) {
				frontpage.Instantmesseagingdropdown.click();
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	

	@Test(priority = 4)
	public void VerifyVisiblityOnInstantMessagingOnRegistration_BackendenableEditPageOnly() throws InterruptedException {
		switchtoBackendendURL();
		
		VerifybackendregistrationInstantMessaging("No", "Edit profile page only");
		Thread.sleep(5000);
		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		System.out.println("called before try");
		try{
			if (driver.findElement(By
				.id("imType")).isDisplayed()) {
				System.out.println("called from try");
				ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
				throw e;
			}
			else{
				System.out.println("Instantmessage should not visible");
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
	public void VerifyVisiblityOnInstantMessagingnRegistration_DisabledOnbackend() throws InterruptedException {
		switchtoBackendendURL();
		
		VerifybackendregistrationInstantMessaging("Yes", "Hidden");
		Thread.sleep(5000);

		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		System.out.println("called before try");
		try{
			if (driver.findElement(By
				.id("imType")).isDisplayed()) {
				System.out.println("called from try");
				ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
				throw e;
			}
			else{
				System.out.println("Instantmessage should not visible");
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
	public void VerifyVisiblityOfInstantMessagingOnRegistration_EnableOnbackend111()
			throws InterruptedException {
		switchtoBackendendURL();
		VerifybackendregistrationInstantMessaging("Yes","Visible");
		 Thread.sleep(5000);
		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean InstantMessagingLabelVisible = driver.findElement(By
				.id("imType")).isDisplayed();

		if (InstantMessagingLabelVisible) {
				frontpage.Instantmesseagingdropdown.click();
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	

	@Test(priority = 7)
	public void VerifyVisiblityOfInstantMessagingOnRegistration_EnableOnbackend11()
			throws InterruptedException {
		switchtoBackendendURL();
		VerifybackendregistrationInstantMessaging("Yes","Registration page only");
		 Thread.sleep(5000);
		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean InstantMessagingLabelVisible = driver.findElement(By
				.id("imType")).isDisplayed();

		if (InstantMessagingLabelVisible) {
				frontpage.Instantmesseagingdropdown.click();
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	@Test(priority = 8)
	public void VerifyVisiblityOnInstantMessagingOnRegistration_EditPageOnly1() throws InterruptedException {
		switchtoBackendendURL();
		
		VerifybackendregistrationInstantMessaging("Yes", "Edit profile page only");
      Thread.sleep(5000);
		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		System.out.println("called before try");
		try{
			if (driver.findElement(By
				.id("imType")).isDisplayed()) {
				System.out.println("called from try");
				ElementNotVisibleException e= new ElementNotVisibleException("elementnotvivible");
				throw e;
			}
			else{
				System.out.println("Instantmessage should not visible");
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
	
	
	
	public static void VerifybackendregistrationInstantMessaging(String Require, String Visiblity)
			throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		gotoDefaultRegistrationTab();
		
		register.Instantmessegerequired.click();
		Select Required = new Select(register.Instantmessegerequired);
		Required.selectByVisibleText(Require);
		//"No", "Hidden"
		Thread.sleep(3000);
		register.InstantmessegeVisibilitySelectlist.click();
		Select Visibility = new Select(register.InstantmessegeVisibilitySelectlist);
		Visibility.selectByVisibleText(Visiblity);
		register.InstantmessegeVisibilitySelectlist.click();
		Thread.sleep(3000);
		// driver.findElement(By.xpath(".//*[@id='content_wrapper']/div[6]/form/div/button")).click();
		
		register.SaveButtonClick.click();
		Thread.sleep(5000);
		WebElement updationMsg=driver.findElement(By.xpath("//p/font[@class='heading']"));
		Assert.assertTrue(updationMsg.getText().contains("profile fields have been updated"));
	}


	}
	
	
	
