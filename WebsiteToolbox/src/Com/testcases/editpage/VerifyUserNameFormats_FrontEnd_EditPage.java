package Com.testcases.editpage;

import java.io.IOException;

import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.BackendSettingspageObjects;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Backendlogin;
import Com.testcases.Login.Frontendlogin;



public class VerifyUserNameFormats_FrontEnd_EditPage extends baseClass
{
	
	public  String username, password,usernameformate;  

	@Test(priority=1)
	
	public void UsernameFormateUppercaseA_Z() throws InterruptedException, IOException{
		
		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
		
		
		@SuppressWarnings("unused")
		BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
	  username = readExcel("Editpage").getRow(32).getCell(1).getStringCellValue();
	  password = readExcel("Editpage").getRow(32).getCell(2).getStringCellValue();
		 usernameformate=readExcel("Editpage").getRow(32).getCell(3).getStringCellValue();
	
		 UserNameFormate("Uppercase letters from A-Z only");
	
	     Editpage(username, password );
	     EditUsername.UserNameEditText.sendKeys(usernameformate);
	     Thread.sleep(5000);
	     EditUsername.UserNameEditOkButton.click();
	     driver.switchTo().alert().accept();
	     Frontendlogin.logoutFromApp();
		 Thread.sleep(3000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
    @Test(priority=2)
	
	public void UsernameFormateLowercasea_z() throws InterruptedException, IOException{
		
		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
		
		@SuppressWarnings("unused")
		BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
	    username = readExcel("Editpage").getRow(33).getCell(1).getStringCellValue();
	     password = readExcel("Editpage").getRow(33).getCell(2).getStringCellValue();
		 usernameformate=readExcel("Editpage").getRow(33).getCell(3).getStringCellValue();
	
		 UserNameFormate("Lowercase letters from a-z only");
	
	     Editpage(username, password );
	     EditUsername.UserNameEditText.sendKeys(usernameformate);
	     Thread.sleep(5000);
	     EditUsername.UserNameEditOkButton.click();
	     driver.switchTo().alert().accept();
	     Thread.sleep(5000);
	     Frontendlogin.logoutFromApp();
		 Thread.sleep(3000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }
		 
    @Test(priority=3)
	
   	public void UsernameFormateLowercase_Uppercase() throws InterruptedException, IOException{
   		
   		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
   		
		@SuppressWarnings("unused")
		BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
   	    username = readExcel("Editpage").getRow(34).getCell(1).getStringCellValue();
   	     password = readExcel("Editpage").getRow(34).getCell(2).getStringCellValue();
   		 usernameformate=readExcel("Editpage").getRow(34).getCell(3).getStringCellValue();
   	
   		 UserNameFormate("Lower and upper case letters");
   	
   	     Editpage(username, password );
   	     EditUsername.UserNameEditText.sendKeys(usernameformate);
   	     Thread.sleep(5000);
   	     EditUsername.UserNameEditOkButton.click();
   	     driver.switchTo().alert().accept();
   	     Thread.sleep(5000);
   	     Frontendlogin.logoutFromApp();
   		 Thread.sleep(3000);
   		 driver.navigate().to((String) Credential.get("FrontendURL"));
   		 }
    
    @Test(priority=4)
	
   	public void UsernameFormateAlphanumeric_charactersonly() throws InterruptedException, IOException{
   		
   		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
   		
		@SuppressWarnings("unused")
		BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
   	    username = readExcel("Editpage").getRow(35).getCell(1).getStringCellValue();
   	     password = readExcel("Editpage").getRow(35).getCell(2).getStringCellValue();
   		 usernameformate=readExcel("Editpage").getRow(35).getCell(3).getStringCellValue();
   	
   		 UserNameFormate("Alphanumeric characters only");
   	
   	     Editpage(username, password );
   	     EditUsername.UserNameEditText.sendKeys(usernameformate);
   	     Thread.sleep(5000);
   	     EditUsername.UserNameEditOkButton.click();
   	     driver.switchTo().alert().accept();
   	     Thread.sleep(5000);
   	     Frontendlogin.logoutFromApp();
   		 Thread.sleep(3000);
   		 driver.navigate().to((String) Credential.get("FrontendURL"));
   		 }
 @Test(priority=5)
	
   	public void UsernameFormateUppercase_lettersfromA_Zincluding_spaces() throws InterruptedException, IOException{
   		
   		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();

		@SuppressWarnings("unused")
		BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
   	    username = readExcel("Editpage").getRow(36).getCell(1).getStringCellValue();
   	     password = readExcel("Editpage").getRow(36).getCell(2).getStringCellValue();
   		 usernameformate=readExcel("Editpage").getRow(36).getCell(3).getStringCellValue();
   	
   		 UserNameFormate("Uppercase letters from A-Z including spaces");
   	
   	     Editpage(username, password );
   	     EditUsername.UserNameEditText.sendKeys(usernameformate);
   	     Thread.sleep(5000);
   	     EditUsername.UserNameEditOkButton.click();
   	     Thread.sleep(5000);
   	     driver.switchTo().alert().accept();
   	     Thread.sleep(5000);
   	     Frontendlogin.logoutFromApp();
   		 Thread.sleep(3000);
   		 driver.navigate().to((String) Credential.get("FrontendURL"));
   		 }	
 
    @Test(priority=6)
	
	public void UsernameFormateLowercaselettersfroma_zincluding_spaces() throws InterruptedException, IOException{
		
		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
		
		@SuppressWarnings("unused")
		BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
	    username = readExcel("Editpage").getRow(37).getCell(1).getStringCellValue();
	     password = readExcel("Editpage").getRow(37).getCell(2).getStringCellValue();
		 usernameformate=readExcel("Editpage").getRow(37).getCell(3).getStringCellValue();
	
		 UserNameFormate("Lowercase letters from a-z including spaces");
	
	     Editpage(username, password );
	     EditUsername.UserNameEditText.sendKeys(usernameformate);
	     Thread.sleep(5000);
	     EditUsername.UserNameEditOkButton.click();
	     Thread.sleep(5000);
	     driver.switchTo().alert().accept();
	     Thread.sleep(5000);
	     Frontendlogin.logoutFromApp();
		 Thread.sleep(3000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		 }	
     
      @Test(priority=7)
	
	public void UsernameFormate_Loweranduppercase_letters_including_underscores() throws InterruptedException, IOException{
		
		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
	
		@SuppressWarnings("unused")
		BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
	    username = readExcel("Editpage").getRow(38).getCell(1).getStringCellValue();
	     password = readExcel("Editpage").getRow(38).getCell(2).getStringCellValue();
		 usernameformate=readExcel("Editpage").getRow(38).getCell(3).getStringCellValue();
	
		 UserNameFormate("Lower and upper case letters including underscores");
	
	     Editpage(username, password );
	     EditUsername.UserNameEditText.sendKeys(usernameformate);
	     Thread.sleep(5000);
	     EditUsername.UserNameEditOkButton.click();
	     Thread.sleep(5000);
	     driver.switchTo().alert().accept();
	     Thread.sleep(5000);
	     Frontendlogin.logoutFromApp();
		 Thread.sleep(3000);
		 driver.navigate().to((String) Credential.get("FrontendURL"));
		
		 }	
      
      @Test(priority=8)
  	
  	public void UsernameFormate_Alphanumeric_characters_including_spaces() throws InterruptedException, IOException{
  		
  		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
  		
  		@SuppressWarnings("unused")
		BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
  	    username = readExcel("Editpage").getRow(39).getCell(1).getStringCellValue();
  	     password = readExcel("Editpage").getRow(39).getCell(2).getStringCellValue();
  		 usernameformate=readExcel("Editpage").getRow(39).getCell(3).getStringCellValue();
  	
  		 UserNameFormate("Lower and upper case letters including underscores");
  	
  	     Editpage(username, password );
  	     EditUsername.UserNameEditText.sendKeys(usernameformate);
  	     Thread.sleep(5000);
  	     EditUsername.UserNameEditOkButton.click();
  	     Thread.sleep(5000);
  	     driver.switchTo().alert().accept();
  	     Thread.sleep(5000);
  	     Frontendlogin.logoutFromApp();
  		 Thread.sleep(3000);
  		 driver.navigate().to((String) Credential.get("FrontendURL"));
  		
  		 }	
      @Test(priority=9)
      
    	
    	public void UserFormate_Alphanumeric_Character_IncludingunderScores() throws InterruptedException, IOException{
    		
    		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
    		
    		@SuppressWarnings("unused")
			BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
    	    username = readExcel("Editpage").getRow(40).getCell(1).getStringCellValue();
    	     password = readExcel("Editpage").getRow(40).getCell(2).getStringCellValue();
    		 usernameformate=readExcel("Editpage").getRow(40).getCell(3).getStringCellValue();
    	
    		 UserNameFormate("Alphanumeric characters including spaces");
    	
    	     Editpage(username, password );
    	     EditUsername.UserNameEditText.sendKeys(usernameformate);
    	     Thread.sleep(5000);
    	     EditUsername.UserNameEditOkButton.click();
    	     Thread.sleep(5000);
    	     driver.switchTo().alert().accept();
    	     Thread.sleep(5000);
    	     Frontendlogin.logoutFromApp();
    		 Thread.sleep(3000);
    		 driver.navigate().to((String) Credential.get("FrontendURL"));
    		
    		 }	
      @Test(priority=10)
    	
    	public void UsernameFormat_Alphanumeric_characters_including_underscoresandspaces() throws InterruptedException, IOException{
    		
    		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
    		
    		@SuppressWarnings("unused")
			BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
    	    username = readExcel("Editpage").getRow(41).getCell(1).getStringCellValue();
    	     password = readExcel("Editpage").getRow(41).getCell(2).getStringCellValue();
    		 usernameformate=readExcel("Editpage").getRow(41).getCell(3).getStringCellValue();
    	
    		 UserNameFormate("Alphanumeric characters including underscores");
    	
    	     Editpage(username, password );
    	     EditUsername.UserNameEditText.sendKeys(usernameformate);
    	     Thread.sleep(5000);
    	     EditUsername.UserNameEditOkButton.click();
    	     Thread.sleep(5000);
    	     driver.switchTo().alert().accept();
    	     Thread.sleep(5000);
    	     Frontendlogin.logoutFromApp();
    		 Thread.sleep(3000);
    		 driver.navigate().to((String) Credential.get("FrontendURL"));
    		
    		 }	
      @Test(priority=11)
    	
    	public void UserNameFormate_Alphanumeric_charactersincludingunderscoresandspaces() throws InterruptedException, IOException{
    		
    		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();
    		
    		@SuppressWarnings("unused")
			BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
    	    username = readExcel("Editpage").getRow(42).getCell(1).getStringCellValue();
    	     password = readExcel("Editpage").getRow(42).getCell(2).getStringCellValue();
    		 usernameformate=readExcel("Editpage").getRow(42).getCell(3).getStringCellValue();
    	
    		 UserNameFormate("Alphanumeric characters including underscores and spaces");
    	
    	     Editpage(username, password );
    	     EditUsername.UserNameEditText.sendKeys(usernameformate);
    	     Thread.sleep(5000);
    	     EditUsername.UserNameEditOkButton.click();
    	     Thread.sleep(5000);
    	     driver.switchTo().alert().accept();
    	     Thread.sleep(5000);
    	     Frontendlogin.logoutFromApp();
    		 Thread.sleep(3000);
    		 driver.navigate().to((String) Credential.get("FrontendURL"));
    		
    		 }	
      @Test(priority=12)
  	
     	public void UserNameFormate_Acustom_regular_expression() throws InterruptedException, IOException{
  		
  		AccountSettingsPageObjects EditUsername=new AccountSettingsPageObjects();

  		@SuppressWarnings("unused")
		BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
  	    username = readExcel("Editpage").getRow(43).getCell(1).getStringCellValue();
  	     password = readExcel("Editpage").getRow(43).getCell(2).getStringCellValue();
  		 usernameformate=readExcel("Editpage").getRow(43).getCell(3).getStringCellValue();
  	
  		 UserNameFormate("A custom regular expression");
  	
  	     Editpage(username, password );
  	     EditUsername.UserNameEditText.sendKeys(usernameformate);
  	     Thread.sleep(5000);
  	     EditUsername.UserNameEditOkButton.click();
  	     Thread.sleep(5000);
  	     driver.switchTo().alert().accept();
  	     Thread.sleep(5000);
  	     Frontendlogin.logoutFromApp();
  		 Thread.sleep(3000);
  		 driver.navigate().to((String) Credential.get("FrontendURL"));
  		
  		 }	
	
	public static void Editpage(String username, String password) throws IOException, InterruptedException
	{
	
		AccountSettingsPageObjects SettingsEdit=new AccountSettingsPageObjects();
		switchtoFrontendURL();
	
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(5000);
		Valid_Invalid_Inputsfor_Editpage.Editpagesettings();
		Thread.sleep(5000);
		mousehover(SettingsEdit.Editusername, SettingsEdit.UserNamemousehoverEditButton);
		Thread.sleep(5000);
	    SettingsEdit.UserNameEditText.clear();
	    
	}
	
	@SuppressWarnings("unused")
	//Methhod to UserNameFormat
		public static void UserNameFormate(String Usernameformate)
				throws InterruptedException, IOException {
			
			String portalUser = readExcel("BackendLogin").getRow(1).getCell(1).getStringCellValue();
			String portalPwd = readExcel("BackendLogin").getRow(1).getCell(2).getStringCellValue();
			String portalUpdationMessage = readExcel("BackendLogin").getRow(1).getCell(3).getStringCellValue();
			
	        BackendSettingspageObjects UsernameFormate=new BackendSettingspageObjects();
			
	        switchtab();
			Backendlogin.LoginToAPP(portalUser, portalPwd);
			UsernameFormate.settings.click();
			Thread.sleep(5000);
			UsernameFormate.SecuritySubMenu.click();
			Thread.sleep(5000);
//		   UsernameFormate.UserNameFormat.click();
//		    Thread.sleep(5000);
			Select Required = new Select(UsernameFormate.UserNameFormat);
		    Required.selectByVisibleText(Usernameformate);
			Thread.sleep(5000);
			UsernameFormate.SaveButton.click();
			Thread.sleep(5000);
			Backendlogin.logoutFromApp();

		

		}

}
