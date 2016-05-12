package Com.testcases;

import org.openqa.selenium.By;
import org.openqa.selenium.interactions.Actions;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;

import Com.backendpages.Betaservices;


public class bankendtofrontendviewforum  extends baseClass 
{
	 @Test
		public static void  backendhomepagelogin() throws InterruptedException
		{
  
		 switchtoBackendendURL();
		  Loginbetap.loginbackendregister();
				Thread.sleep(5000);
  }
@Test
	public void  backendtofrontendforword() throws InterruptedException
	{

  Betaservices servicespage=new Betaservices();
    Actions builder = new Actions(driver); 
	builder.moveToElement(driver.findElement(By.xpath(".//*[@id='account_sub_menu']/a[1]"))).build().perform();
	servicespage.services.click();
	Thread.sleep(5000);
    builder.moveToElement(driver.findElement(By.xpath(".//*[@id='ddServices']/a[1]"))).build().perform();
    servicespage.forum.click();
    servicespage.Viewyourforum.click();

}}
