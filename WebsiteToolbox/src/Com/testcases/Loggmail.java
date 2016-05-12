package Com.testcases;



import org.openqa.selenium.By;
import org.openqa.selenium.interactions.Actions;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.backendpages.Betahomepageobjects;



	public class Loggmail extends baseClass
	{
	   @Test
		public void  Frontendregister() throws InterruptedException
		{


Betahomepageobjects page=new Betahomepageobjects();

page.backendlogbutton.click();
page.uid.sendKeys("beta9");
page.paw.sendKeys("test");
page.backendloginbutton2.click();
}

@Test(priority=1)
public  void facebookpage() throws InterruptedException
{
	BackendSettingspageObjects page2=new BackendSettingspageObjects();
	 Actions builder = new Actions(driver); 
	builder.moveToElement(driver.findElement(By.xpath(".//*[@id='my_account_forum_menu']/ul/li[7]/a"))).build().perform();
	Thread.sleep(5000);
	
	page2.settings.click();
	Thread.sleep(5000);
   builder.moveToElement(driver.findElement(By.xpath(".//*[@id='ddSettings']/div/a[8]"))).build().perform();
   Thread.sleep(5000);
	page2.pageon.click();
	Thread.sleep(5000);
	page2.logingmailpage.sendKeys("Gmail.com");
	Thread.sleep(5000);
	page2.SaveButton.click();
	
	}

	}

