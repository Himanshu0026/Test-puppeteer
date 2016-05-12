package Com.Utilities;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;

import Com.backendpages.AppearancePageObjects;
import Com.backendpages.BackendSettingspageObjects;
import Com.testcases.Login.Backendlogin;

public class baseClass {

	//private static Logger log = Logger.getLogger(Logger.class.getName());
	
	public static WebDriver driver;
	public static WebElement element;
	public static Properties Credential = null;
	public static String testDataPath="testData.xlsx";
	public static String forumTitle;

	@SuppressWarnings("unused")
	@BeforeTest
	public void init() throws IOException, InterruptedException {
		//DOMConfigurator is used to configure logger from xml configuration file
		//DOMConfigurator.configure("log4j.xml");
		Credential = new Properties();
		FileInputStream ip = new FileInputStream(new File(
				"Credential.properties"));
		Credential.load(ip);

		if (Credential.get("Browser").toString().equals("firefox")) {
			  
			driver = new FirefoxDriver();


		} else if (Credential.get("Browser").toString().equals("chrome")) {

			System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
			driver = new ChromeDriver();

		} else // if(Credential.get("Browser").toString().equals("IE"))
		{
			System.setProperty("webdriver.ie.driver", "IEDriverServer.exe");

			driver = new InternetExplorerDriver();

			if (driver.getPageSource().contains("certificate")) {
				driver.navigate()
						.to("javascript:document.getElementById('overridelink').click()");
			}
		}
		// maximize the window after after opening browser
		driver.manage().window().maximize();
		driver.navigate().to((String) Credential.get("BackendURL"));
		//log.info("Backend URL has been launched successfully");
		driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
		
		//forumTitle=forumTitle();
		String backendPage = driver.getWindowHandle();

		driver.findElement(By.cssSelector("body")).sendKeys(Keys.CONTROL + "t");

		for (String frontendPage : driver.getWindowHandles()) {
			driver.switchTo().window(frontendPage);
		}
		driver.navigate().to((String) Credential.get("FrontendURL"));
		//log.info("Frontend URL has been launched successfully in new tab");

	}	


	public String forumTitle() throws InterruptedException{
		BackendSettingspageObjects backend=new BackendSettingspageObjects();
		Backendlogin.LoginToAPP((String)Credential.get("portalUser"), (String)Credential.get("portalPwd"));
		//log.info("User has logged in to backend app by entering valid username and password");
		backend.settings.click();
		Thread.sleep(2000);
		backend.display.click();
		//log.info("User has clicked on Settings tab then clicked on Display sub menu");
		String forumTitle=backend.forumTitletextfield.getAttribute("value");
		Thread.sleep(3000);
		//log.info("Title of frontend URL should be "+forumTitle);
		//setForumtheme((String)Credential.get("ForumTheme"));
		Backendlogin.logoutFromApp();
		return forumTitle;
		
	}

	 public void setForumtheme(String theme) throws InterruptedException{
		 AppearancePageObjects backend=new AppearancePageObjects();
		 backend.Appearance.click();
		 backend.Themes.click();
		 Thread.sleep(3000);
		 backend.FreshArrivals.click();
		 Thread.sleep(3000);
		 if(!(backend.ActivatedTheme.getText().contains(theme))){
			 clickElement(driver.findElement(By.xpath("//*[contains(@onclick,'"+theme+"') and contains(@class,'button')]")));
			 Thread.sleep(2000);
			 driver.switchTo().alert().accept();
			 Thread.sleep(5000);
		 }
		 
	 }
	


	@AfterTest
	public void kill() {

		driver.quit();
	}

	@SuppressWarnings("unused")
	public static void switchtoFrontendURL() throws InterruptedException {
		if (!(driver.getTitle().contains(forumTitle))) {
			String backendPage = driver.getWindowHandle();
			driver.findElement(By.cssSelector("body")).sendKeys(
					Keys.CONTROL + "\t");
			for (String frontendPage : driver.getWindowHandles()) {
				driver.switchTo().window(frontendPage);
			}
		}
	}

	@SuppressWarnings("unused")
	public static void switchtoBackendendURL() throws InterruptedException {
		if (!(driver.getTitle().contains("Website Toolbox"))) {
			String frontendPage = driver.getWindowHandle();

			driver.findElement(By.cssSelector("body")).sendKeys(
					Keys.CONTROL + "\t");

			for (String backendPage : driver.getWindowHandles()) {
				driver.switchTo().window(backendPage);
			}
		}

	}

	public static void switchtab() {

		@SuppressWarnings("unused")
		String parentWindow = driver.getWindowHandle();
		driver.findElement(By.cssSelector("body"))
				.sendKeys(Keys.CONTROL + "\t");
		for (String childWindow : driver.getWindowHandles()) {
			driver.switchTo().window(childWindow);
		}
	}
	
	//read data from excel sheet
	public static XSSFSheet readExcel(String sheetName) throws IOException{
		FileInputStream fil=new FileInputStream(new File(testDataPath));
		XSSFWorkbook workbook=new XSSFWorkbook(fil);
		XSSFSheet sheet=workbook.getSheet(sheetName);
		return sheet;
	}
	
	 public static void writedatainExcel(String sheetname, int rowNum, int colNum, String data) throws IOException{ 
			// Specify the file path which you want to create or write 
			  File src=new File(testDataPath); 
			 
			  	// Load the file 
			  	FileInputStream fis=new FileInputStream(src); 
			 
			   // load the workbook 
			   XSSFWorkbook wb=new XSSFWorkbook(fis); 
			 
			   // get the sheet which you want to modify or create 
			   XSSFSheet sheet= wb.getSheet(sheetname); 
			 
			   // here createCell will create column 
			   // and setCellvalue will set the value 
			   XSSFRow row = sheet.getRow(rowNum-1); 
				if (row == null) 
					row = sheet.createRow(rowNum-1); 
				 
				XSSFCell col = row.getCell(colNum-1);	 
				if (col == null) 
					col = row.createCell(colNum-1); 
				col.setCellValue(data); 
				
				XSSFCellStyle style = wb.createCellStyle();

				Font font = wb.createFont();
				((XSSFFont) font).setBold(true);
				//font.setColor(IndexedColors.BLACK.getIndex());
				style.setFont(font);
				 col.setCellStyle(style);
				 
				if(data.equalsIgnoreCase("Fail")){
					style.setFillBackgroundColor(HSSFColor.RED.index);
					style.setFillPattern(HSSFCellStyle.ALIGN_FILL);
					col.setCellStyle(style);
				}if(data.equalsIgnoreCase("Pass")){
					style.setFillBackgroundColor(HSSFColor.GREEN.index);
					style.setFillPattern(HSSFCellStyle.ALIGN_FILL);
					col.setCellStyle(style);
				}
				// here we need to specify where you want to save file 
				FileOutputStream fout=new FileOutputStream(new File(testDataPath)); 
				 
				// finally write content 
				wb.write(fout); 
			 
				// close the file 
				fout.close(); 
		} 


	// method for select element from drop down
	public static void selectElementfromDropdown(WebElement element, String value) throws InterruptedException {
		element.click();
		Thread.sleep(3000);
		Select list = new Select(element);
		list.selectByVisibleText(value);
		Thread.sleep(2000);
		element.click();
	}

	// Enable or disable check by sending element and boolean value to check or un-check
	public static void EnableorDisable_Checkbox(WebElement element, Boolean status) {

		Boolean value = element.isSelected();
		if (value == true) {
			if (value = !status) {
				clickElement(element);
			}
		} else {
			if (value = status) {
				clickElement(element);
			}
		}
	}
	
	// Method for clicking on any element just after mousehover
	public static void mousehover(WebElement mousehover, WebElement click){
		  
		  Actions action=new Actions(driver);
		  action.moveToElement(mousehover).build().perform();
		  click.click();
		 }
	
	// method to attach file any type of file while adding new Topic as logged in user
		public static void attachfile(WebElement element, String filePath) throws AWTException {
			
			element.click();

			// put path to your image in a clipboard
			StringSelection fil = new StringSelection(filePath);
			Toolkit.getDefaultToolkit().getSystemClipboard().setContents(fil, null);

			// imitate mouse events like ENTER, CTRL+C, CTRL+V
			Robot robot = new Robot();
			robot.delay(1000);
			robot.keyPress(KeyEvent.VK_ENTER);
			robot.keyRelease(KeyEvent.VK_ENTER);
			robot.keyPress(KeyEvent.VK_CONTROL);
			robot.keyPress(KeyEvent.VK_V);
			robot.keyRelease(KeyEvent.VK_V);
			robot.keyRelease(KeyEvent.VK_CONTROL);
			robot.keyPress(KeyEvent.VK_ENTER);
			robot.delay(1000);
			robot.keyRelease(KeyEvent.VK_ENTER);
			robot.keyPress(KeyEvent.VK_ENTER);
			robot.keyRelease(KeyEvent.VK_ENTER);

		}

		// method to insert photo while adding new Topic as logged in user
		public static void attachPicture(WebElement insertPhotoIcon,WebElement insertPhotoPopup, WebElement browserbutton, WebElement insertImagebutton, String filePath) throws AWTException,
				InterruptedException {

			insertPhotoIcon.click();
			insertPhotoPopup.click();
			browserbutton.click();
			// put path to your image in a clipboard
			StringSelection fil = new StringSelection(filePath);
			Toolkit.getDefaultToolkit().getSystemClipboard().setContents(fil, null);

			// imitate mouse events like ENTER, CTRL+C, CTRL+V
			Robot robot = new Robot();
			robot.delay(1000);
			robot.keyPress(KeyEvent.VK_ENTER);
			robot.keyRelease(KeyEvent.VK_ENTER);
			robot.keyPress(KeyEvent.VK_CONTROL);
			robot.keyPress(KeyEvent.VK_V);
			robot.keyRelease(KeyEvent.VK_V);
			robot.keyRelease(KeyEvent.VK_CONTROL);
			robot.keyPress(KeyEvent.VK_ENTER);
			robot.delay(3000);
			robot.keyRelease(KeyEvent.VK_ENTER);
			robot.keyPress(KeyEvent.VK_ENTER);
			robot.keyRelease(KeyEvent.VK_ENTER);

			Thread.sleep(5000);
			
			insertImagebutton.click();


		}
		
		public static boolean verifyPresenceOfElement(By by) {
			try{
				WebDriverWait wait=new WebDriverWait(driver, 15);
			wait.until(ExpectedConditions.visibilityOfElementLocated(by));
			return true;
			}catch(Exception e){
			e.getMessage();
			return false;
			}

		}
		//method to perfor click event using javascript executor
		public static void clickElement(WebElement element){
			JavascriptExecutor executor=(JavascriptExecutor)driver;
			executor.executeScript("arguments[0].click();", element);
		}
		
		//Check checkbox shown against any topic in the topic list
		public static String checkCheckboxagainstTopic_inTopiclist(WebElement topic_href) throws InterruptedException{

			String topicurl=topic_href.getAttribute("href");
			String[] topicUrl_id=topicurl.split("\\?(?!\\?)");
			String[] topic_id=topicUrl_id[0].split("-");
			driver.findElement(By.xpath("//input[@value='"+topic_id[topic_id.length-1]+"']")).click();			
			return topic_id[topic_id.length-1];
		}
		
		public static String username(String sheetname, int rowNum, int colNum) throws IOException{ 
			String username=null; 
			Cell cell=readExcel(sheetname).getRow(rowNum).getCell(colNum); 
			 
			if(cell.getCellType()==Cell.CELL_TYPE_STRING){ 
				username=cell.getStringCellValue();	 
			} 
			else if (cell.getCellType()==Cell.CELL_TYPE_NUMERIC){ 
				 username=String.valueOf((long) cell.getNumericCellValue()); 
			} 
			return username; 
			 
		} 
		 
		public static String password(String sheetname, int rowNum, int colNum) throws IOException{ 
			String password=null; 

			Cell cell=readExcel(sheetname).getRow(rowNum).getCell(colNum); 
			if(cell.getCellType()==Cell.CELL_TYPE_STRING){ 
				password=cell.getStringCellValue();	 
			} 
			else if (cell.getCellType()==Cell.CELL_TYPE_NUMERIC){ 
				 password=String.valueOf((int) cell.getNumericCellValue()); 
			} 
			 
			return password; 
		} 
		
		
}
