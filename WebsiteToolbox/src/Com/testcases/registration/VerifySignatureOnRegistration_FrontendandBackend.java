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
public class VerifySignatureOnRegistration_FrontendandBackend extends baseClass {
	String username, password;

	public  VerifySignatureOnRegistration_FrontendandBackend () throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}

	@Test(priority = 1)
	public void VerifyVisiblityOnSignatureOnRegistration_DisabledOnbackendRegisterpageonly() throws InterruptedException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username,password);
		Thread.sleep(5000);
		VerifybackendregistrationSignature("No", "Hidden");
		Thread.sleep(5000);
		switchtoFrontendURL();
		 driver.navigate().refresh();

		frontendregisterpage frontpage = new frontendregisterpage();
		
		frontpage.clickregister.click();
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
		driver.navigate().to((String) Credential.get("FrontendURL"));
		      }
			
	
	@Test(priority = 2)
	public void VerifyVisiblityOfSignatureOnRegistration_EnableOnbackend()
			throws InterruptedException {
		switchtoBackendendURL();
	
		Thread.sleep(5000);
		VerifybackendregistrationSignature("No","Visible");
		Thread.sleep(5000);
		Thread.sleep(5000);
		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean SignatureLabelVisible = driver.findElement(By
				.xpath(".//*[@id='signature']")).isDisplayed();

		if (SignatureLabelVisible) {
				frontpage.signature.sendKeys("Ayyappa");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	@Test(priority = 3)
	public void VerifyVisiblityOfSignatureOnRegistration_EnableOnbackend1()
			throws InterruptedException {
		switchtoBackendendURL();
		
		Thread.sleep(5000);
		VerifybackendregistrationSignature("No","Registration page only");

        Thread.sleep(5000);
		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean SignatureLabelVisible = driver.findElement(By
				.xpath(".//*[@id='signature']")).isDisplayed();

		if (SignatureLabelVisible) {
				frontpage.signature.sendKeys("Ayyappa");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

    @Test(priority = 4)
	public void VerifyVisiblityOnSignatureOnRegistration_BackendenableEditPageOnly() throws InterruptedException {
		switchtoBackendendURL();
		
		VerifybackendregistrationSignature("No", "Edit profile page only");
		Thread.sleep(5000);

		switchtoFrontendURL();
		driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		System.out.println("called before try");
		try{
			if (driver.findElement(By
				.xpath(".//*[@id='signature']")).isDisplayed()) {
				System.out.println("called from try");
				ElementNotVisibleException e= new ElementNotVisibleException("elementnotvisible");
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
		driver.navigate().to((String) Credential.get("FrontendURL"));
		      }
				
	@Test(priority = 5)
	public void VerifyVisiblityOnSignatureOnRegistration_DisabledOnbackend() throws InterruptedException {
		switchtoBackendendURL();
		
		VerifybackendregistrationSignature("Yes", "Hidden");
		Thread.sleep(5000);
		switchtoFrontendURL();
		 driver.navigate().refresh();

		frontendregisterpage frontpage = new frontendregisterpage();
		
		frontpage.clickregister.click();
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
		driver.navigate().to((String) Credential.get("FrontendURL"));
		      }
			
	@Test(priority = 6)
	public void VerifyVisiblityOfSignatureOnRegistration_EnableOnbackend111()
			throws InterruptedException {
		switchtoBackendendURL();
		VerifybackendregistrationSignature("Yes","Visible");
		  Thread.sleep(5000);
	switchtoFrontendURL();
       driver.navigate().refresh();
      
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean SignatureLabelVisible = driver.findElement(By
				.xpath(".//*[@id='signature']")).isDisplayed();

		if (SignatureLabelVisible) {
				frontpage.signature.sendKeys("Ayyappa 123");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	

	@Test(priority = 7)
	public void VerifyVisiblityOfSignatureOnRegistration_EnableOnbackend11()
			throws InterruptedException {
		switchtoBackendendURL();

		VerifybackendregistrationSignature("Yes","Registration page only");
		Thread.sleep(5000);
		switchtoFrontendURL();
		
		 driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean SignatureLabelVisible = driver.findElement(By
				.xpath(".//*[@id='signature']")).isDisplayed();

		if (SignatureLabelVisible) {
				frontpage.signature.sendKeys("Ayyappa 123");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}
		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	@Test(priority = 8)
	public void VerifyVisiblityOnSignatureOnRegistration_EditPageOnly1() throws InterruptedException {
		switchtab();
		
		VerifybackendregistrationSignature("Yes", "Edit profile page only");
		Thread.sleep(5000);

		switchtoFrontendURL();
		 driver.navigate().refresh();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
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
		driver.navigate().to((String) Credential.get("FrontendURL"));
		      }
			
	
	public static void gotoDefaultRegistrationTab() throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		register.Users.click();
		
		register.Fields.click();

		register.DefaultRegisrationOptions.click();

	}
	
	
	public static void VerifybackendregistrationSignature(String Require, String Visiblity)
			throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		gotoDefaultRegistrationTab();
		
		register.SignatureRequired.click();
		Select Required = new Select(register.SignatureRequired);
	
		Required.selectByVisibleText(Require);
		//"No", "Hidden"
		
		register.SignarureVisibilitySelectlis.click();
		Select Visibility = new Select(register.SignarureVisibilitySelectlis);
          Visibility.selectByVisibleText(Visiblity);
          register.SignarureVisibilitySelectlis.click();
          
		Thread.sleep(3000);
		// driver.findElement(By.xpath(".//*[@id='content_wrapper']/div[6]/form/div/button")).click();
		
		register.SaveButtonClick.click();
	
		WebElement updationMsg=driver.findElement(By.xpath("//p/font[@class='heading']"));
		Assert.assertTrue(updationMsg.getText().contains("profile fields have been updated"));
	}}
	
	
	

