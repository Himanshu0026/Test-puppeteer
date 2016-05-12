package Com.testcases.Topic;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.frontendpages.AddNewTopicandReplyTopic;
import Com.frontendpages.EditorPageObjects;
import Com.testcases.Login.Frontendlogin;

public class verifyFontStyleandColorofText extends baseClass {

	String username, password;
	String subject, message, category, color;
	int rowNum=28;

	@BeforeClass
	public void loginToApp() throws IOException, InterruptedException{

		username=username("UploadFile&Editor", rowNum, 1);
		password=password("UploadFile&Editor", rowNum, 2);
		
		Frontendlogin.loginToApp(username, password);

	}
	
	@Test(priority=0)
	// Bold the entered message and also verify style of text after adding new Topic
	public void boldEnteredTextandVerifyText() throws IOException,
			InterruptedException {

		subject = readExcel("UploadFile&Editor").getRow(rowNum).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum).getCell(5)
				.getStringCellValue();

		changeFontStyle(subject, message, category, "Bold");
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//strong[text()='"
				+ message + "']")));
		Thread.sleep(2000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);

	}

	 @Test(priority=1)
	// Underlined the entered message and also verify style of text after addingnew Topic
	public void UnderlinedEnteredTextandVerifyText() throws IOException,
			InterruptedException {

		int rowNum1 = rowNum+1;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		changeFontStyle(subject, message, category, "Underline");
		Assert.assertTrue(verifyPresenceOfElement(By
				.xpath("//*[(@style='text-decoration: underline;') and (text()='"
						+ message + "')]")));
		Thread.sleep(2000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);

	}

	@Test(priority=2)
	// Italic the entered message and also verify style of text after adding new Topic
	public void ItalicEnteredTextandVerifyText() throws IOException,
			InterruptedException {

		int rowNum1 = rowNum+2;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();

		changeFontStyle(subject, message, category, "Italic");
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//em[text()='"
				+ message + "']")));

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);

	}

	 @Test(priority=3)
	// Bold,Italic and Underlined the entered message and also verify style of text after adding new Topic
	public void BoldItalicUnderlinedEnteredTextandVerifyStyle()
			throws IOException, InterruptedException {
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();

		int rowNum1 = rowNum+3;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL, "a");
		driver.switchTo().defaultContent();
		editor.BoldText.click();
		Thread.sleep(2000);
		editor.ItalicText.click();
		Thread.sleep(2000);
		editor.UnderlinedText.click();
		Thread.sleep(2000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(editor.UnderlinedItalicBoldText.getText()
				.contentEquals(message));
		Thread.sleep(3000);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(5000);

	}

	@Test(priority=4)
	// Change the color of entered message and verify color in message field and also verify color after adding new Topic
	public void changeTextColorandVerifyselectedColor() throws IOException,
			InterruptedException {
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		int rowNum1 = rowNum+4;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		color = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();
		String newMessage = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(7)
				.getStringCellValue();
		String newColor = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(8)
				.getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL, "a");
		driver.switchTo().defaultContent();
		selectColor(color);
		Thread.sleep(2000);
		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.RIGHT);
		topic.messagetextfield.sendKeys(Keys.ENTER);
		driver.switchTo().defaultContent();

		selectColor(newColor);
		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(newMessage);
		driver.switchTo().defaultContent();
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);

		Assert.assertTrue(verifyPresenceOfElement(By
				.xpath("//*[(@style='color: " + color.toLowerCase()
						+ ";') and (text()='" + message + "')]")));
		Assert.assertTrue(verifyPresenceOfElement(By
				.xpath("//*[(@style='color: " + newColor.toLowerCase()
						+ ";') and (text()='" + newMessage + "')]")));

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	}

	@Test(priority=5)
	// Change the color of entered message from more color option and verify color in message field and also verify color after adding new Topic
	public void changeTextColorfromMoreColoroptions() throws IOException,
			InterruptedException {
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();

		int rowNum1 = rowNum+5;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		color = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL, "a");
		driver.switchTo().defaultContent();

		String parentWindow = driver.getWindowHandle();
		editor.selectTextColorarrow_icon.click();
		editor.moreColor.click();
		for (String childWindow : driver.getWindowHandles()) {
			driver.switchTo().window(childWindow);
		}
		driver.findElement(
				By.xpath("//*[@bgcolor='" + color.toLowerCase() + "']"))
				.click();
		driver.switchTo().window(parentWindow);
		topic.postNewTopicbutton.click();

		Assert.assertTrue(verifyPresenceOfElement(By
				.xpath("//*[(@style='color: " + color.toLowerCase()
						+ ";') and (text()='" + message + "')]")));

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	}

	@Test(priority = 6)
	// Change font family from bottom in the list of entered message and verify color in message field and also verify font style after adding new Topic
	public void ChangeFontFamilyfromTopinlistandVerifyText()
			throws IOException, InterruptedException {

		int rowNum1 = rowNum+6;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		String fontStyle = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		changefontFamily(fontStyle);
		System.out.println(fontStyle);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	}

	@Test(priority = 7)
	// Change font family from top in the list of entered message and verify color in message field and also verify font style after adding new Topic
	public void ChangeFontFamilyfromBottominlistandVerifyText()
			throws IOException, InterruptedException {

		int rowNum1 = rowNum+7;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		String fontStyle = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		changefontFamily(fontStyle);
		System.out.println(fontStyle);
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	} 
	
	@Test(priority = 8)
	// First Select font family and then  enter text and verify text in message field and also verify font style after adding new Topic
	public void enterTextafterSelecingFontFamilyandVerifyStyle()
			throws IOException, InterruptedException {
		AddNewTopicandReplyTopic topic =  new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();

		int rowNum1 = rowNum+8;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		String fontStyle = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message+Keys.ENTER, category);
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");
		editor.fontFamily.click();
		WebElement fontFamily = driver.findElement(By.xpath("//*[@title='"
				+ fontStyle + "']/parent::a"));
		fontFamily.click();
		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.ENTER);
		topic.messagetextfield.sendKeys(message);
		driver.switchTo().defaultContent();
		Thread.sleep(3000);
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		
		Assert.assertTrue(verifyPresenceOfElement(By.xpath("//*[contains(@style,'" + fontStyle.toLowerCase()+ "') and (text()='" + message + "')]")));

		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
	}

	@Test(priority=9)
	//Select font size of text after entering text in message text field and verify size of text after adding new topic
	public void changeFontSizeofText_smallandVerifyit() throws InterruptedException, IOException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		int rowNum1 = rowNum+10;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		String fontSize = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL, "a");
		driver.switchTo().defaultContent();
		
		By fontSize_xpath=selectFontSize(fontSize, message);
		
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(fontSize_xpath));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}
	
	@Test(priority=10)
	//Select font size of text first then enter text in message text field and verify size of text after adding new topic
	public void changeFontSizeofText_largeandVerifyit() throws InterruptedException, IOException{
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();

		int rowNum1 = rowNum+11;
		subject = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(3)
				.getStringCellValue();
		message = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(4)
				.getStringCellValue();
		category = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(5)
				.getStringCellValue();
		String fontSize = readExcel("UploadFile&Editor").getRow(rowNum1).getCell(6)
				.getStringCellValue();

		FrontendaddNewTopic.gotoNewTopicpage();
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");

		By fontSize_xpath=selectFontSize(fontSize, message);
		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.ENTER);
		topic.messagetextfield.sendKeys(message);
		driver.switchTo().defaultContent();
		
		topic.postNewTopicbutton.click();
		Thread.sleep(3000);
		Assert.assertTrue(verifyPresenceOfElement(fontSize_xpath));
		
		driver.navigate().to((String) Credential.get("FrontendURL"));
		Thread.sleep(3000);
		
	}

	
	public void changeFontStyle(String subject, String message,
			String category, String style) throws InterruptedException {

		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		FrontendaddNewTopic.gotoNewTopicpage();
		Thread.sleep(3000);
		FrontendaddNewTopic.enterSubjectnMessage(subject, message, category);
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL, "a");
		driver.switchTo().defaultContent();
		if (style.equalsIgnoreCase("Bold")) {
			editor.BoldText.click();
		}
		if (style.equalsIgnoreCase("Underline")) {
			editor.UnderlinedText.click();
		}
		if (style.equalsIgnoreCase("Italic")) {
			editor.ItalicText.click();
		}
		Thread.sleep(2000);
		topic.postNewTopicbutton.click();
		Thread.sleep(5000);

	}

	public void selectColor(String color) throws InterruptedException {
		EditorPageObjects editor =  new EditorPageObjects();
		editor.selectTextColorarrow_icon.click();
		Thread.sleep(2000);
		driver.findElement(By.xpath("//*[@data-mce-color='" + color + "']"))
				.click();
		Thread.sleep(3000);
	}

	public void changefontFamily(String fontStyle) {
		AddNewTopicandReplyTopic topic = new AddNewTopicandReplyTopic();
		EditorPageObjects editor =  new EditorPageObjects();
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("window.scrollTo(250, 0)");

		driver.switchTo().frame(topic.messageBody);
		topic.messagetextfield.sendKeys(Keys.CONTROL, "a");
		driver.switchTo().defaultContent();

		editor.fontFamily.click();
		WebElement fontFamily = driver.findElement(By.xpath("//*[@title='"
				+ fontStyle + "']/parent::a"));
		fontFamily.click();
		/*
		 * if(fontFamily.isDisplayed()){ fontFamily.click(); }else{ do{
		 * //WebElement
		 * scroll=driver.findElement(By.id("menu_message_message_fontselect_menu_co"
		 * )); executor.executeScript("window.scrollTo(0,250)");
		 * }while(fontFamily.isDisplayed()); fontFamily.click(); }
		 */
		topic.postNewTopicbutton.click();
		Assert.assertTrue(verifyPresenceOfElement(By
				.xpath("//*[contains(@style,'" + fontStyle.toLowerCase()+ "') and (text()='" + message + "')]")));

	}
	
	public By selectFontSize(String fontSize, String message){
		EditorPageObjects editor =  new EditorPageObjects();
		editor.fontSize.click();
		By fontSize_xpath = null;
		switch (fontSize){
		case "1 (8pt)":
			driver.findElement(By.xpath("//*[(@style='font-size:xx-small')]")).click();
			fontSize_xpath = By.xpath("//*[contains(@style,'xx-small') and (text()='"+message+"')]");
			return fontSize_xpath;
		case "2 (10pt)" :
			driver.findElement(By.xpath("//*[@style='font-size:x-small']")).click();
			fontSize_xpath = By.xpath("//*[contains(@style,'x-small') and (text()='"+message+"')]");
			return fontSize_xpath;
		case "3 (12pt)" :
			driver.findElement(By.xpath("//*[@style='font-size:small']")).click();
			fontSize_xpath = By.xpath("//*[contains(@style,'small') and (text()='"+message+"')]");
			return fontSize_xpath;
		case "4 (14pt)" :
			driver.findElement(By.xpath("//*[@style='font-size:medium']")).click();
			fontSize_xpath = By.xpath("//*[contains(@style,'medium') and (text()='"+message+"')]");
			return fontSize_xpath;
		case "5 (18pt)" :
			driver.findElement(By.xpath("//*[@style='font-size:large']")).click();
			fontSize_xpath = By.xpath("//*[contains(@style,'large') and (text()='"+message+"')]");
			return fontSize_xpath;
		case "6 (24pt)" :
			//*[@style='font-size: x-large;']
		case "7 (36pt)" :
			driver.findElement(By.xpath("//*[(@style='font-size:xx-large')]")).click();
			fontSize_xpath = By.xpath("//*[contains(@style,'xx-large') and (text()='"+message+"')]");
			return fontSize_xpath;
		}
		return fontSize_xpath;
		
	}
	
	
	@AfterClass
	public void logoutFromApp(){
		Frontendlogin.logoutFromApp();
	}
	
	@AfterMethod
	// perform action to reach on Home page after failure any test script
	public static void afterMethod(ITestResult testResult) throws Exception {

		if (testResult.getStatus() == ITestResult.FAILURE) {
			driver.navigate().refresh();
			driver.navigate().to((String) Credential.get("FrontendURL"));
			
		}
	}

}
