package Com.testcases.Login;


import java.io.IOException;

import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.Reporter;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.frontpagelogin;

public class FrontendForgotPassword extends baseClass {
	String username, email, ExpectedMessage1, ExpectedMessage2;
	int colNum=6;
	
	public void forgotPassword( String username, String email) throws InterruptedException{
		
		switchtoFrontendURL();
		frontpagelogin login= new frontpagelogin();
		
		login.loginbuttonOnHome.click();
		
		login.forgotPassword.click();
		login.forgotPwdUsernametextfield.clear();	
		login.forgotPwdUsernametextfield.sendKeys(username);
		Thread.sleep(2000);
		login.forgotPwdEmailtextfield.clear();
		login.forgotPwdEmailtextfield.sendKeys(email);
	
		login.forgotPwdSubmitbutton.click();
		Thread.sleep(5000);
		
	}
	
	
	
	@Test(priority=1)
	public void forgotPasswordwithValidUsername() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		username=readExcel("Login").getRow(10).getCell(1).getStringCellValue();
		ExpectedMessage1 = readExcel("Login").getRow(10).getCell(3).getStringCellValue();
		ExpectedMessage2 = readExcel("Login").getRow(10).getCell(4).getStringCellValue();
		
		forgotPassword(username, "");
		
		Assert.assertTrue((login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage1))||(login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage2)));
		
		login.BacktoCategory.click();
		
		writedatainExcel("Login", 11, colNum, "Pass");
		}catch(Exception e){
			writedatainExcel("Login", 11, colNum, "Fail");
			Reporter.log(e.getMessage());
			throw e;
		}
	}
	
	
	@Test(priority=2)
	public void forgotPasswordwithValidEmail() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		email=readExcel("Login").getRow(12).getCell(2).getStringCellValue();
		ExpectedMessage1 = readExcel("Login").getRow(12).getCell(3).getStringCellValue();
		ExpectedMessage2 = readExcel("Login").getRow(12).getCell(4).getStringCellValue();
		
		forgotPassword( "", email);
		
		Assert.assertTrue((login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage1))||(login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage2)));
		
		login.BacktoCategory.click();
		writedatainExcel("Login", 13, colNum, "Pass");
		}catch(Exception e){
			writedatainExcel("Login", 13, colNum, "Fail");
			Reporter.log(e.getMessage());
			throw e;
		}
	}

	
	@Test(priority=3)
	public void forgotPasswordwithInvalidEmail() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		email=readExcel("Login").getRow(11).getCell(2).getStringCellValue();
		ExpectedMessage1=readExcel("Login").getRow(11).getCell(3).getStringCellValue();
		forgotPassword("", email);
		System.out.println(login.forgotPwdErrorMsg.getText());
		Assert.assertTrue((login.forgotPwdErrorMsg.getText().contains(ExpectedMessage1)));
		
		login.CancelPasswordbutton.click();
		writedatainExcel("Login", 12, colNum, "Pass");
		}catch(Exception e){
		writedatainExcel("Login", 12, colNum, "Fail");
		Reporter.log(e.getMessage());
		throw e;
		}
	}
	
	
	@Test(priority=4)
	public void forgotPasswordwithInvalidusername() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		username=readExcel("Login").getRow(9).getCell(1).getStringCellValue();
		ExpectedMessage1 = readExcel("Login").getRow(9).getCell(3).getStringCellValue();
		
		forgotPassword(username, "");
		
		Assert.assertTrue((login.forgotPwdErrorMsg.getText().contains(ExpectedMessage1)));
		
		login.CancelPasswordbutton.click();
		writedatainExcel("Login", 10, colNum, "Pass");
		}catch(Exception e){
			writedatainExcel("Login", 10, colNum, "Fail");
			Reporter.log(e.getMessage());
			throw e;
		}
	}
	
	@Test(priority=0)
	public void forgotPasswordwithBlankdata() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		ExpectedMessage1=readExcel("Login").getRow(16).getCell(3).getStringCellValue();
		
		forgotPassword("", "");
		
		Assert.assertEquals(login.forgotPwdUsernametextfield.getAttribute("data-original-title"), ExpectedMessage1);
		
		login.CancelPasswordbutton.click();
		Thread.sleep(5000);
		writedatainExcel("Login", 17, colNum, "Pass");
		}catch(Exception e){
			Reporter.log(e.getMessage());
			writedatainExcel("Login", 17, colNum, "Fail");
			throw e;
		}
	}
	
	
	@Test(priority=6)
	public void forgotPasswordwithMismatchValidEmailandUsername() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		username=readExcel("Login").getRow(13).getCell(1).getStringCellValue();
		email=readExcel("Login").getRow(13).getCell(2).getStringCellValue();
		ExpectedMessage1 = readExcel("Login").getRow(13).getCell(3).getStringCellValue();
		ExpectedMessage2 = readExcel("Login").getRow(13).getCell(4).getStringCellValue();
		
		forgotPassword(username, email);
		
		Assert.assertTrue((login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage1))||(login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage2)));
		
		login.BacktoCategory.click();
		writedatainExcel("Login", 14, colNum, "Pass");
		}catch(Exception e){
		writedatainExcel("Login", 14, colNum, "Fail");
		Reporter.log(e.getMessage());
		throw e;
		}
	}
	
	@Test(priority=7)
	public void forgotPasswordwithInvalidUsernameandValidEmail() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		username=readExcel("Login").getRow(14).getCell(1).getStringCellValue();
		email=readExcel("Login").getRow(14).getCell(2).getStringCellValue();
		ExpectedMessage1 = readExcel("Login").getRow(12).getCell(3).getStringCellValue();
		ExpectedMessage2 = readExcel("Login").getRow(12).getCell(4).getStringCellValue();
		
		forgotPassword(username, email);
		
		Assert.assertTrue((login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage1))||(login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage2)));
		
		login.BacktoCategory.click();
		writedatainExcel("Login", 15, colNum, "Pass");
		}catch(Exception e){
			writedatainExcel("Login", 15, colNum, "Fail");
			Reporter.log(e.getMessage());
			throw e;
		}
	}
	
	@Test(priority=8)
	public void forgotPasswordwithvalidUsernameandInvalidEmail() throws InterruptedException, IOException{
		frontpagelogin login= new frontpagelogin();
		try{
		username=readExcel("Login").getRow(15).getCell(1).getStringCellValue();
		email=readExcel("Login").getRow(15).getCell(2).getStringCellValue();
		ExpectedMessage1 = readExcel("Login").getRow(15).getCell(3).getStringCellValue();
		ExpectedMessage2 = readExcel("Login").getRow(15).getCell(4).getStringCellValue();
		
		forgotPassword(username, email);
		
		Assert.assertTrue((login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage1))||(login.forgotPwdSuccessMsg.getText().contains(ExpectedMessage2)));
		
		login.BacktoCategory.click();
		writedatainExcel("Login", 16, colNum, "Pass");
		}catch(Exception e){
			writedatainExcel("Login", 17,colNum, "Fail");
			Reporter.log(e.getMessage());
			throw e;
		}
	}

	
	@AfterMethod
	// perform action to reach on Home page after failure any test script
	public static void afterMethod(ITestResult testResult) throws Exception {

		if (testResult.getStatus() == ITestResult.FAILURE) {
			driver.navigate().to((String) Credential.get("FrontendURL"));
			Thread.sleep(3000);
		}
	}

}
