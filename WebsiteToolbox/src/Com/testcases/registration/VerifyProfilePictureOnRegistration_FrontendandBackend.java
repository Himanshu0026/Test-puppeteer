package Com.testcases.registration;

import java.io.IOException;
import java.util.NoSuchElementException;

import junit.framework.Assert;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Backendusersdropdownobjects;
import Com.frontendpages.frontendregisterpage;
import Com.testcases.Login.Backendlogin;

import com.gargoylesoftware.htmlunit.ElementNotFoundException;

@SuppressWarnings("deprecation")
public class VerifyProfilePictureOnRegistration_FrontendandBackend extends baseClass {

	String username, password;

	public  VerifyProfilePictureOnRegistration_FrontendandBackend () throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}

	@Test(priority = 1)
	public void VerifyVisiblityOnProfilePictureOnRegistration_DisabledOnbackendRegisterpageonly() throws InterruptedException {
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(username,password);
		VerifybackendregistrationProfilePicture("No", "Hidden");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ProfilePictureLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'attachProfile')]")).isDisplayed();

		try{if (ProfilePictureLabelVisible) {
			NoSuchElementException e= new NoSuchElementException();
			throw e;
			}
			else{
				System.out.println("attachProfile should not visible");
			}}catch(ElementNotFoundException e){
				System.out.println("Exception:"+ e.getMessage());
			}

	}
	
	@Test(priority = 2)
	public void VerifyVisiblityOfProfilePictureOnRegistration_EnableOnbackend()
			throws InterruptedException {
		
		VerifybackendregistrationProfilePicture("No","Visible");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ProfilePictureLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'attachProfile')]")).isDisplayed();

		if (ProfilePictureLabelVisible) {
			frontpage.Profileclick.click();
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

	}
	

	@Test(priority = 3)
	public void VerifyVisiblityOfProfilePictureOnRegistration_EnableOnbackend1()
			throws InterruptedException {
		
		VerifybackendregistrationProfilePicture("No","Registration page only");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ProfilePictureLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'attachProfile')]")).isDisplayed();

		if (ProfilePictureLabelVisible) {
				frontpage.Profileclick.click();
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

	}

	@Test(priority = 4)
	public void VerifyVisiblityOnProfilePictureOnRegistration_BackendenableEditPageOnly() throws InterruptedException {
		switchtab();
		
		VerifybackendregistrationProfilePicture("No", "Edit profile page only");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ProfilePictureLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'attachProfile')]")).isDisplayed();

		try{if (ProfilePictureLabelVisible) {
			NoSuchElementException e= new NoSuchElementException();
			throw e;
			}
			else{
				System.out.println("attachProfile should not visible");
			}}catch(ElementNotFoundException e){
				System.out.println("Exception:"+ e.getMessage());
			}

	}
	
	@Test(priority = 5)
	public void VerifyVisiblityOnProfilePictureOnRegistration_DisabledOnbackend() throws InterruptedException {
		switchtab();
		
		VerifybackendregistrationProfilePicture("Yes", "Hidden");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ProfilePictureLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'attachProfile')]")).isDisplayed();

		try{if (ProfilePictureLabelVisible) {
			NoSuchElementException e= new NoSuchElementException();
			throw e;
			}
			else{
				System.out.println("attachProfile should not visible");
			}}catch(ElementNotFoundException e){
				System.out.println("Exception:"+ e.getMessage());
			}

	}
	

	@Test(priority = 6)
	public void VerifyVisiblityOfProfilePictureOnRegistration_EnableOnbackend111()
			throws InterruptedException {
		
		VerifybackendregistrationProfilePicture("Yes","Visible");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ProfilePictureLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'attachProfile')]")).isDisplayed();

		if (ProfilePictureLabelVisible) {
				frontpage.Profileclick.click();
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

	}

	

	@Test(priority = 7)
	public void VerifyVisiblityOfProfilePictureOnRegistration_EnableOnbackend11()
			throws InterruptedException {
		
		VerifybackendregistrationProfilePicture("Yes","Registration page only");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ProfilePictureLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'attachProfile')]")).isDisplayed();

		if (ProfilePictureLabelVisible) {
				frontpage.Profileclick.click();
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

	}

	@Test(priority = 8)
	public void VerifyVisiblityOnProfilePictureOnRegistration_EditPageOnly1() throws InterruptedException {
		switchtab();
		
		VerifybackendregistrationProfilePicture("Yes", "Edit profile page only");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean ProfilePictureLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'attachProfile')]")).isDisplayed();

		try{if (ProfilePictureLabelVisible) {
			NoSuchElementException e= new NoSuchElementException();
			throw e;
			}
			else{
				System.out.println("attachProfile should not visible");
			}}catch(ElementNotFoundException e){
				System.out.println("Exception:"+ e.getMessage());
			}

	}
	
	public  static void gotoDefaultRegistrationTab() throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		register.Users.click();
		
		register.Fields.click();

		register.DefaultRegisrationOptions.click();

	}
	
	

	public static void VerifybackendregistrationProfilePicture(String Require, String Visiblity)
			throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		gotoDefaultRegistrationTab();
		
		register.ProfilePictureRequired.click();
		Select Required = new Select(register.ProfilePictureRequired);
		Required.selectByVisibleText(Require);
		//"No", "Hidden"
		Thread.sleep(3000);
		register.ProfilePictureVisibilitySelectlis.click();
		Select Visibility = new Select(register.ProfilePictureVisibilitySelectlis);
		Visibility.selectByVisibleText(Visiblity);
		Thread.sleep(3000);
		// driver.findElement(By.xpath(".//*[@id='content_wrapper']/div[6]/form/div/button")).click();
		
		register.SaveButtonClick.click();
		Thread.sleep(5000);
		WebElement updationMsg=driver.findElement(By.xpath("//p/font[@class='heading']"));
		Assert.assertTrue(updationMsg.getText().contains("profile fields have been updated"));
	}
	
	
	
}
