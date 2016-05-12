package Com.testcases.Login;

import org.junit.Assert;
import org.openqa.selenium.interactions.Actions;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Betahomepageobjects;

public class Backendlogin extends baseClass {
	

public static void 	LoginToAPP(String username, String password) throws InterruptedException{
			
			
	Betahomepageobjects login= new Betahomepageobjects();
			try{
			//click on login tap on present Home page
			login.backendlogbutton.click();
		
			}catch(Exception e){
				e.getMessage();
			}
			//enter username and password and click on Login button
			login.uid.clear();
			login.uid.sendKeys(username);
			
			login.paw.clear();
			login.paw.sendKeys(password);
			login.backendloginbutton2.click();
			
			
			}
		
		@Test(priority=1)
		
		public void loginwithvalidCredential() throws InterruptedException
		{
			switchtoBackendendURL();
			String username="beta11";
			LoginToAPP(username, "test");
			
			//Assert.assertTrue(driver.findElement(By.xpath("//a[text()='"+username+"']")).getText().contains(username));
	
		}
		
		
		@Test(priority=2)
		public void loginwithinvalidUsername() throws InterruptedException
		{
			Betahomepageobjects login= new Betahomepageobjects();
			
			LoginToAPP("bet11", "test");
			
			Assert.assertTrue(login.errorMsgforinvalidCredential.getText().contains("account with the username you specified"));
			
			//login.CancelbuttonOnLoginPage.click();
			driver.navigate().back();
		}
		
		
		@Test(priority=3)
		public void loginwithinvalidPassword() throws InterruptedException
		{
			Betahomepageobjects login= new Betahomepageobjects();
			
			LoginToAPP("bata11", "text");
			
			Assert.assertTrue(login.errorMsgforinvalidCredential.getText().contains("password you entered is incorrect"));
			
			driver.navigate().back();
		}
		
		
		@Test(priority=4)
		public void loginwithblankdata() throws InterruptedException
		{
			Betahomepageobjects login= new Betahomepageobjects();
			
			LoginToAPP("", "");
			
			Assert.assertTrue(login.errorMsgforinvalidCredential.getText().contains("enter your username"));
			
			driver.navigate().back();
		}
		
		@Test(priority=5)
		public void loginwithblankPassword() throws InterruptedException
		{
			Betahomepageobjects login= new Betahomepageobjects();
			
			LoginToAPP("bata11", "");
			
			Assert.assertTrue(login.errorMsgforinvalidCredential.getText().contains("enter your password"));
			
			driver.navigate().back();
		}
	
		public static void logoutFromApp() throws InterruptedException{
			   
			   Betahomepageobjects login= new Betahomepageobjects();
			   clickElement(login.userAccount);
			   Thread.sleep(3000);
			   Actions action=new Actions(driver);
			   action.moveToElement(login.logout).click();
			   action.build().perform();
			   Thread.sleep(2000);
			   driver.navigate().to((String) Credential.get("BackendURL"));
			  }

}
