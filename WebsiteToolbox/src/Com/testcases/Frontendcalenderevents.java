package Com.testcases;





import org.testng.annotations.Test;

import Com.Utilities.baseClass;

import Com.frontendpages.verifycalenderfrontpage;



public class Frontendcalenderevents extends baseClass
{
   @Test
	public Frontendcalenderevents() 
	{
	verifycalenderfrontpage frontpage=new verifycalenderfrontpage();
	frontpage.calender.click();
	frontpage.calendermode.sendKeys("ayyappa");
	
	
	
	
	}
	

}
