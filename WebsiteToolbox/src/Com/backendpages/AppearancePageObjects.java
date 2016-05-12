package Com.backendpages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import Com.Utilities.baseClass;

public class AppearancePageObjects extends baseClass {

	public AppearancePageObjects() {

		AjaxElementLocatorFactory element = new AjaxElementLocatorFactory(
				driver, 15);
		PageFactory.initElements(element, this);

	}

	/* ---locators for all Top menus */
	@FindBy(how = How.XPATH, using = "//*[text()='Appearance']")
	@CacheLookup
	public WebElement Appearance;

	@FindBy(how = How.XPATH, using = "//*[text()='Themes']")
	@CacheLookup
	public WebElement Themes;

	@FindBy(how = How.XPATH, using = "//div[@class='skin_title']")
	@CacheLookup
	public WebElement ActivatedTheme;

	@FindBy(how = How.XPATH, using = "//td[@class='skin_title']")
	@CacheLookup
	public WebElement CustomiseTheme;

	@FindBy(how = How.XPATH, using = "//a[text()='Fresh Arrivals']")
	@CacheLookup
	public WebElement FreshArrivals;

}
