package Com.testcases.editpage;


import java.io.IOException;

import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.Startnewtropicandpoll;
import Com.testcases.Login.Frontendlogin;


public class frontpagestartnewpost extends baseClass {
	public String username, password,Pollquestiontext,pollquestiontext1,pollquestiontext2,Titletext;
	
	 @Test(priority=0)
	 
   public  void loginfrontpage() throws InterruptedException, IOException{
			
		 username = readExcel("Editpage").getRow(1).getCell(1)
					.getStringCellValue();
	      password = readExcel("Editpage").getRow(1).getCell(2)
					.getStringCellValue();
	     
	      Frontendlogin.loginToApp(username, password);
			
		}
	 @Test(priority=1)
	 
	   public  void startnewtropicpoll() throws InterruptedException, IOException {
		 Startnewtropicandpoll pollsend=new Startnewtropicandpoll();
		 Pollquestiontext = readExcel("Editpage").getRow(1).getCell(3)
					.getStringCellValue();
		 pollquestiontext1 = readExcel("Editpage").getRow(1).getCell(4)
					.getStringCellValue();
		 pollquestiontext2 = readExcel("Editpage").getRow(1).getCell(5)
						.getStringCellValue();
         Titletext = readExcel("Editpage").getRow(1).getCell(6)
						.getStringCellValue(); 
		 pollsend.Startnewtropicbutton.click();
		 Thread.sleep(5000);
		 pollsend.Clickonpollbutton.click();
		 Thread.sleep(5000);
		 pollsend.Pollquestiontext.sendKeys(Pollquestiontext);
		 Thread.sleep(5000);
		 pollsend.pollquestiontext1.sendKeys(pollquestiontext1);
		 Thread.sleep(5000);
		 pollsend.pollquestiontext2.sendKeys(pollquestiontext2);
		 Thread.sleep(5000);
		 pollsend.clicksavepollbutton.click();
		 Thread.sleep(5000);
		 pollsend.Titletext.sendKeys(Titletext);
		 Thread.sleep(5000);
		 //pollsend.Contenttext.sendKeys("hemaparasuram");
		 Select dropdown = new Select(pollsend.Selectcategory);
			Thread.sleep(5000);
			dropdown.selectByIndex(1);
			Thread.sleep(5000);
			pollsend.Postsubmitbutton.click();
		 
	 }
	 }