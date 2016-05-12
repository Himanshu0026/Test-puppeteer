package Com.testcases.Login;

import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.frontpagelogin;

public class Frontendlogin extends baseClass {
	public String username, password;
	int colNum=6;
	
	public static void loginToApp(String username, String password) throws InterruptedException{
		
		frontpagelogin login= new frontpagelogin();
		try{
		//click on login tap on present Home page
		login.loginbuttonOnHome.click();
		login.loginChildwindow.click();
		}catch(Exception e){
			System.out.println("Exception: "+e.getMessage());
		}
		
		//enter username and password and click on Login button
		login.username.clear();
		login.username.sendKeys(username);
		
		login.password.clear();
		login.password.sendKeys(password);
		login.loginbutton.click();
		
	}
	
	
	@Test(priority=1)
	
	public void loginwithvalidCredential() throws InterruptedException, IOException{
		try{
		username=username("Login", 1, 1);
		password=password("Login", 1, 2);
		loginToApp(username, password);
		
		//Assert.assertTrue(driver.findElement(By.xpath("//a[text()='"+username+"']")).getText().contains(username));
		logoutFromApp();
		writedatainExcel("Login", 2, colNum, "Pass");
		}catch(Exception e){
			e.getMessage();
			writedatainExcel("Login", 2, colNum, "Fail");
			throw e;
		}
	}
	
	
	@Test(priority=2)
	public void loginwithinvalidUsername() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		username=username("Login", 2, 1);
		password=password("Login", 2, 2);
		String errorMsg=readExcel("Login").getRow(2).getCell(3).getStringCellValue();
		loginToApp(username, password);
		
		Assert.assertTrue(login.errorMsgforinvalidCredential.getText().contains(errorMsg));
		
		//login.CancelbuttonOnLoginPage.click();
		driver.navigate().back();
		writedatainExcel("Login", 3, colNum, "Pass");
	}catch(Exception e){
		e.getMessage();
		writedatainExcel("Login", 3, colNum, "Fail");
		throw e;
	}
	}
	
	
	@Test(priority=3)
	public void loginwithinvalidPassword() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{String errorMsg=readExcel("Login").getRow(3).getCell(3).getStringCellValue();
		username=username("Login", 3, 1);
		password=password("Login", 3, 2);
		loginToApp(username, password);
		
		Assert.assertTrue(login.errorMsgforinvalidCredential.getText().contains(errorMsg));
		
		driver.navigate().back();
		writedatainExcel("Login", 4, colNum, "Pass");
		}catch(Exception e){
			e.getMessage();
			writedatainExcel("Login", 4, colNum, "Fail");
			throw e;
		}
	}
	
	
	@Test(priority=4)
	public void loginwithblankdata() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		String errorMsg=readExcel("Login").getRow(4).getCell(3).getStringCellValue();
		try{username=username("Login", 4, 1);
		
		}catch(Exception e){
			e.getMessage();
			username="";
		}
		try{password=password("Login", 4, 2);
		}catch(Exception e){
			e.getMessage();
			password="";
		}
		loginToApp(username, password);
		
		Assert.assertTrue(login.errorMsgforinvalidCredential.getText().contains(errorMsg));
		
		driver.navigate().back();
		writedatainExcel("Login", 5, colNum, "Pass");
		}catch(Exception e){
			e.getMessage();
			writedatainExcel("Login", 5, colNum, "Fail");
			throw e;
		}
	}
	
	@Test(priority=5)
	public void loginwithblankPassword() throws InterruptedException, IOException
	{
		frontpagelogin login= new frontpagelogin();
		try{
		username=username("Login", 5, 1);
		String errorMsg=readExcel("Login").getRow(5).getCell(3).getStringCellValue();
			try{password=password("Login", 5, 2);
			}catch(Exception e){
				e.getMessage();
				password="";
			}			
			loginToApp(username, password);
			
		Assert.assertTrue(login.errorMsgforinvalidCredential.getText().contains(errorMsg));
		
		driver.navigate().back();
		writedatainExcel("Login", 6, colNum, "Pass");
		
		}catch(Exception e){
			e.getMessage();
			writedatainExcel("Login", 6, colNum, "Fail");
			throw e;
		}
	}
	
	@Test(priority=6)
	public void loginwithEmailid() throws Exception{
		try{
			username=username("Login", 21, 1);
			password=password("Login", 21, 2);
				
		loginToApp(username, password);
		logoutFromApp();
		writedatainExcel("Login", 21, colNum, "Pass");
		
		}catch(Exception e){
			e.getMessage();
			writedatainExcel("Login", 21, colNum, "Fail");
			throw e;
		}
	}
	
	
	@Test(priority=7)
	public void loginwithFacebook() throws InterruptedException, IOException
	{
		try{
		username=readExcel("Login").getRow(6).getCell(1).getStringCellValue();
		password=readExcel("Login").getRow(6).getCell(2).getStringCellValue();
		frontpagelogin login= new frontpagelogin();
		//click on login tap on present Home page
		login.loginbuttonOnHome.click();
		
		String loginPage=driver.getWindowHandle();
		
		//click on Login with Facebook button present on Login pop up
		login.LoginwithFacebook.click();
		
		for(String FacebookPage : driver.getWindowHandles()){
			driver.switchTo().window(FacebookPage);
		}
		driver.manage().window().maximize();
		
		loginToFacebook(username, password);		
		
		driver.switchTo().window(loginPage);
				
		logoutFromApp();
		writedatainExcel("Login", 7, colNum, "Pass");
		}catch(Exception e){
			e.getMessage();
			writedatainExcel("Login", 7, colNum, "Fail");
			throw e;
		}

	}
	
	
	public static void logoutFromApp(){
		
		frontpagelogin login= new frontpagelogin();
		login.userAccountPanel.click();
		login.logoutbutton.click();
		
	}
	
	public static void loginToFacebook(String username, String password) throws InterruptedException{
		frontpagelogin login= new frontpagelogin();
		login.facebookEmail.sendKeys(username);
		login.facebookPassword.sendKeys(password);
		login.facebookLogin.click();
	}
	
	
	@AfterMethod
	// perform action to reach on Home page after failure any test script
	public static void afterMethod(ITestResult testResult) throws Exception {

		if (testResult.getStatus() == ITestResult.FAILURE) {
			driver.navigate().refresh();
			if(verifyPresenceOfElement(By.id("private_message_notification"))){
				logoutFromApp();
				Thread.sleep(3000);
			}
			driver.navigate().to((String) Credential.get("FrontendURL"));
			
		}
	}
	
}
