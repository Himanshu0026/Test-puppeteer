package Com.testcases.editpage;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.Backendusersdropdownobjects;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.testcases.Login.Backendlogin;

// verify delete account on group permessions page registered users , pending email users, Adminsrators, Change Users Group  
public class DeleteAccounts_GroupPermissions extends baseClass {

	// Verify delete account on Change a User's User Group

	// @Test(priority = 1)
	public void verifyDeleteAccountonUserGroup() throws InterruptedException, IOException {
		String username = readExcel("Editpage").getRow(46).getCell(1)
				.getStringCellValue();
		String errormsg = readExcel("Editpage").getRow(46).getCell(4)
				.getStringCellValue();

		Backendusersdropdownobjects DeleteAccount = new Backendusersdropdownobjects();

		AccountDelete();

		DeleteAccount.username.sendKeys(username + Keys.ENTER);
		Thread.sleep(5000);
		for (String winHandle : driver.getWindowHandles()) {
			driver.switchTo().window(winHandle);
			Thread.sleep(5000);
			DeleteAccount.Deletebutton.click();
			Thread.sleep(5000);
			driver.switchTo().alert().accept();

			DeleteAccount.username.sendKeys(username + Keys.ENTER);
			Assert.assertTrue(driver.switchTo().alert().getText()
					.contains(errormsg));
			driver.switchTo().alert().accept();
			Backendlogin.logoutFromApp();

		}
	}

	// verify delete account As the  registered users
	// @Test(priority=2)
	public void verifyDeleteAccountRegisterUsers() throws InterruptedException,
			IOException {

		String username = readExcel("Editpage").getRow(47).getCell(1)
				.getStringCellValue();
		Backendusersdropdownobjects DeleteAccount = new Backendusersdropdownobjects();

		AccountDelete();
		DeleteAccount.RegisterprimaryUsers.click();
		driver.findElement(
				By.xpath("//*[text()='" + username
						+ "']/parent::td/parent::tr/td/input")).click();

		AccountDeleteDropDown("Delete");
		Thread.sleep(5000);
		driver.switchTo().alert().accept();

		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[text()='"
				+ username + "']")));

		Backendlogin.logoutFromApp();

	}

	// verify delete account As The PendingEmailUsers
	// @Test(priority=3)
	public void verifyDeleteAccountPendingEmailUsers()
			throws InterruptedException, IOException {
		String username = readExcel("Editpage").getRow(48).getCell(1)
				.getStringCellValue();
		Backendusersdropdownobjects DeleteAccount = new Backendusersdropdownobjects();

		AccountDelete();
		DeleteAccount.PendingEmailPrimaryUsers.click();
		driver.findElement(
				By.xpath("//*[text()='" + username
						+ "']/parent::td/parent::tr/td/input")).click();

		AccountDeleteDropDown("Delete");
		Thread.sleep(5000);
		driver.switchTo().alert().accept();
		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[text()='"
				+ username + "']")));

		Backendlogin.logoutFromApp();

	}

	// verify delete account As the   Adminsrators

	@Test(priority = 4)
	public void verifyDeleteAccountAdministrators()
			throws InterruptedException, IOException {
		String username = readExcel("Editpage").getRow(49).getCell(1)
				.getStringCellValue();
		Backendusersdropdownobjects DeleteAccount = new Backendusersdropdownobjects();

		AccountDelete();
		DeleteAccount.AdminstratorPrimaryUsers.click();
		driver.findElement(
				By.xpath("//*[text()='" + username
						+ "']/parent::td/parent::tr/td/input")).click();

		AccountDeleteDropDown("Delete");
		Thread.sleep(5000);
		driver.switchTo().alert().accept();
		Assert.assertFalse(verifyPresenceOfElement(By.xpath("//*[text()='"
				+ username + "']")));

		Backendlogin.logoutFromApp();

	}

	@SuppressWarnings("unused")
	public static void AccountDelete() throws InterruptedException, IOException {

		String portalUser = readExcel("BackendLogin").getRow(1).getCell(1)
				.getStringCellValue();
		String portalPwd = readExcel("BackendLogin").getRow(1).getCell(2)
				.getStringCellValue();

		String portalUpdationMessage = readExcel("BackendLogin").getRow(1)
				.getCell(3).getStringCellValue();
		Backendusersdropdownobjects DeleteAccount = new Backendusersdropdownobjects();

		UsersGroupPermissionspageObject userPermission = new UsersGroupPermissionspageObject();
		switchtoBackendendURL();
		Backendlogin.LoginToAPP(portalUser, portalPwd);

		DeleteAccount.Users.click();
		DeleteAccount.Groupspermissions.click();
	}

	public static void AccountDeleteDropDown(String Delete) {
		Backendusersdropdownobjects DeleteAccount = new Backendusersdropdownobjects();
		Select Deleted = new Select(DeleteAccount.SelectedDropDown);
		Deleted.selectByVisibleText(Delete);
	}
}
