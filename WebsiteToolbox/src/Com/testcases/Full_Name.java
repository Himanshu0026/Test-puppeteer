package Com.testcases;

import java.util.NoSuchElementException;

import junit.framework.Assert;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;

import Com.backendpages.Backendusersdropdownobjects;

import Com.frontendpages.frontendregisterpage;

import com.gargoylesoftware.htmlunit.ElementNotFoundException;

@SuppressWarnings("deprecation")
public class Full_Name extends baseClass {

	@Test(priority = 0)
	public void backendhomepagelogin() throws InterruptedException {

		switchtoBackendendURL();
		  Loginbetap.loginbackendregister();
				Thread.sleep(5000);
				}
	@Test(priority = 1)
	public void VerifyVisiblityOfFullNameOnRegistration_EnableOnbackend()
			throws InterruptedException {
		
		VerifybackendregistrationFullname("Yes", "Registration page only");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean fullnameLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'Full Name')]")).isDisplayed();

		if (fullnameLabelVisible) {
				frontpage.Fullnametext.sendKeys("Ayyappa 123");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

	}
	

	@Test(priority = 2)
	public void VerifyVisiblityOnFullNameOnRegistration_DisabledOnbackend() throws InterruptedException {
		switchtab();
		
		VerifybackendregistrationFullname("No", "Hidden");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean fullnameLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'Full Name')]")).isDisplayed();

		try{if (fullnameLabelVisible) {
			NoSuchElementException e= new NoSuchElementException();
			throw e;
			}
			else{
				System.out.println("Full Name should not visible");
			}}catch(ElementNotFoundException e){
				System.out.println("Exception:"+ e.getMessage());
			}

	}

	public static void gotoDefaultRegistrationTab() throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		register.Users.click();
		
		register.Fields.click();

		register.DefaultRegisrationOptions.click();

	}
	
	
	@SuppressWarnings("deprecation")
	public static  void VerifybackendregistrationFullname(String Require, String Visiblity)
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
		Thread.sleep(3000);
		// driver.findElement(By.xpath(".//*[@id='content_wrapper']/div[6]/form/div/button")).click();
		
		register.SaveButtonClick.click();
		Thread.sleep(5000);
		WebElement updationMsg=driver.findElement(By.xpath("//p/font[@class='heading']"));
	   Assert.assertTrue(updationMsg.getText().contains("profile fields have been updated"));
	}
	
	
	
}

