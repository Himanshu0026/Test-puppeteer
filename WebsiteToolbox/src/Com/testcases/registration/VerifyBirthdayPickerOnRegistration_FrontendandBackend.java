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
public class VerifyBirthdayPickerOnRegistration_FrontendandBackend extends baseClass {

	String username, password;

	public  VerifyBirthdayPickerOnRegistration_FrontendandBackend() throws InterruptedException, IOException
	{
        
		username = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
		password = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
		
	}

	@Test(priority = 1)
	public void VerifyVisiblityOnBirthdayPickerOnRegistration_DisabledOnbackendRegisterpageonly() throws InterruptedException {
		switchtab();
		Backendlogin.LoginToAPP(username,password);
		
		VerifybackendregistrationBirthDatePicker("No", "Hidden");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean BirthdayPickerLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'birthDatepicker')]")).isDisplayed();

		try{if (BirthdayPickerLabelVisible) {
			NoSuchElementException e= new NoSuchElementException();
			throw e;
			}
			else{
				System.out.println("birthDatepicker should not visible");
			}}catch(ElementNotFoundException e){
				System.out.println("Exception:"+ e.getMessage());
			}

	}
	
	@Test(priority = 2)
	public void VerifyVisiblityOfBirthDatePickerOnRegistration_EnableOnbackend()
			throws InterruptedException {
		
		VerifybackendregistrationBirthDatePicker("No","Visible");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean BirthDatePickerLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'birthDatepicker')]")).isDisplayed();

		if (BirthDatePickerLabelVisible) {
			frontpage.Birthdaypicker.sendKeys("12/12/1988");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

	}
	

	@Test(priority = 3)
	public void VerifyVisiblityOfBirthDatePickerOnRegistration_EnableOnbackend1()
			throws InterruptedException {
		
		VerifybackendregistrationBirthDatePicker("No","Registration page only");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean BirthDatePickerLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'birthDatepicker')]")).isDisplayed();

		if (BirthDatePickerLabelVisible) {
				frontpage.Birthdaypicker.sendKeys("12/12/1988");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

	}

	@Test(priority = 4)
	public void VerifyVisiblityOnBirthDatePickerOnRegistration_BackendenableEditPageOnly() throws InterruptedException {
		switchtab();
		
		VerifybackendregistrationBirthDatePicker("No", "Edit profile page only");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean BirthDatePickerLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'birthDatepicker')]")).isDisplayed();

		try{if (BirthDatePickerLabelVisible) {
			NoSuchElementException e= new NoSuchElementException();
			throw e;
			}
			else{
				System.out.println("birthDatepicker should not visible");
			}}catch(ElementNotFoundException e){
				System.out.println("Exception:"+ e.getMessage());
			}

	}
	
	@Test(priority = 5)
	public void VerifyVisiblityOnBirthDatePickerOnRegistration_DisabledOnbackend() throws InterruptedException {
		switchtab();
		
		VerifybackendregistrationBirthDatePicker("Yes", "Hidden");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean BirthDatePickerLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'birthDatepicker')]")).isDisplayed();

		try{if (BirthDatePickerLabelVisible) {
			NoSuchElementException e= new NoSuchElementException();
			throw e;
			}
			else{
				System.out.println("birthDatepicker should not visible");
			}}catch(ElementNotFoundException e){
				System.out.println("Exception:"+ e.getMessage());
			}

	}
	

	@Test(priority = 6)
	public void VerifyVisiblityOfBirthDatePickerOnRegistration_EnableOnbackend111()
			throws InterruptedException {
		
		VerifybackendregistrationBirthDatePicker("Yes","Visible");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean BirthDatePickerLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'birthDatepicker')]")).isDisplayed();

		if (BirthDatePickerLabelVisible) {
				frontpage.Birthdaypicker.sendKeys("12/12/1988");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

	}

	

	@Test(priority = 7)
	public void VerifyVisiblityOfBirthDatePickerOnRegistration_EnableOnbackend11()
			throws InterruptedException {
		
		VerifybackendregistrationBirthDatePicker("Yes","Registration page only");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean BirthDatePickerLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'birthDatepicker')]")).isDisplayed();

		if (BirthDatePickerLabelVisible) {
				frontpage.Birthdaypicker.sendKeys("12/12/1988");
			}
			else{
				NoSuchElementException e= new NoSuchElementException();
				throw e;
			}

	}

	@Test(priority = 8)
	public void VerifyVisiblityOnBirthDatePickerOnRegistration_EditPageOnly1() throws InterruptedException {
		switchtab();
		
		VerifybackendregistrationBirthDatePicker("Yes", "Edit profile page only");

		switchtab();
		frontendregisterpage frontpage = new frontendregisterpage();
		frontpage.clickregister.click();
		Boolean BirthDatePickerLabelVisible = driver.findElement(By
				.xpath("//label[contains(text(),'birthDatepicker')]")).isDisplayed();

		try{if (BirthDatePickerLabelVisible) {
			NoSuchElementException e= new NoSuchElementException();
			throw e;
			}
			else{
				System.out.println("birthDatepicker should not visible");
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
	
  public static void VerifybackendregistrationBirthDatePicker(String Require, String Visiblity)
			throws InterruptedException {
		Backendusersdropdownobjects register = new Backendusersdropdownobjects();
		
		gotoDefaultRegistrationTab();
		
		register.Birthdayequired.click();
		Select Required = new Select(register.Birthdayequired);
		Required.selectByVisibleText(Require);
		Thread.sleep(3000);
		register.BirthdayVisibilitySelectlis.click();
		Select Visibility = new Select(register.BirthdayVisibilitySelectlis);
		Visibility.selectByVisibleText(Visiblity);
		Thread.sleep(3000);
		// driver.findElement(By.xpath(".//*[@id='content_wrapper']/div[6]/form/div/button")).click();
		
		register.SaveButtonClick.click();
		Thread.sleep(5000);
		//WebElement updationMsg=driver.findElement(By.xpath("//p/font[@class='heading']"));
		//Assert.assertTrue(updationMsg.getText().contains("profile fields have been updated"));
	}
	
	
	
}
