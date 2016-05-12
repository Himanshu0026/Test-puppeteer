package Com.frontendpages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import Com.Utilities.baseClass;

public class EditorPageObjects extends baseClass {
	
public EditorPageObjects(){
		
		AjaxElementLocatorFactory element= new AjaxElementLocatorFactory(driver, 15);
		PageFactory.initElements(element, this);
		
	}

/*   Locator on Editor while add new Topic     */
@FindBy(how=How.XPATH, using="//*[@title='Insert Photo']")
@CacheLookup
public WebElement insertPhotoIcon_Editor;

public By UploadTab_InsertPhotoPopup=By.xpath("//*[@href='#upload']");

@FindBy(how=How.ID, using="message_customlink")
@CacheLookup
public WebElement insertLink_Editor;

@FindBy(how=How.ID, using="message_videobutton")
@CacheLookup
public WebElement insertVideo_Editor;

@FindBy(how=How.XPATH, using=".//*[@id='video_popup']/div/div")
@CacheLookup
public WebElement insertVideo_popUp;

@FindBy(how=How.ID, using="dialog_input_value")
@CacheLookup
public WebElement insertVideo_textfield;

@FindBy(how=How.ID, using="insert_video_url")
@CacheLookup
public WebElement insertURL_button;

@FindBy(how=How.ID, using="bootstrap_close_insert_url")
@CacheLookup
public WebElement Cancelbutton_insertVideoPopUp;

@FindBy(how=How.XPATH, using="//*[@id='message_wrapcodebutton']/span[1]")
@CacheLookup
public WebElement insertCode_icon;

@FindBy(how=How.XPATH, using="//*[@id='code_popup']/div")
@CacheLookup
public WebElement insertCode_popUp;

@FindBy(how=How.ID, using="dialog_input_code_value")
@CacheLookup
public WebElement insertCode_textfield;

@FindBy(how=How.ID, using="code_button_tce")
@CacheLookup
public WebElement insertCode_OKbutton;

@FindBy(how=How.XPATH, using="//*[@class='prettyprint']")
@CacheLookup
public WebElement CodeRectangularbox;

@FindBy(how=How.XPATH, using="//*[@id='message_wrapquotebutton']/span[1]")
@CacheLookup
public WebElement wrapQuotetag_icon;

@FindBy(how=How.XPATH, using="//*[@class='quoted']")
@CacheLookup
public WebElement QuotedMessage;

@FindBy(how=How.ID, using="message_emotions")
@CacheLookup
public WebElement insertEmotionsIcon;

@FindBy(how=How.XPATH, using="//*[@id='smilie_popup']/div")
@CacheLookup
public WebElement EmotionPopUp;

@FindBy(how=How.ID, using="bootstrap_close_emoticons_modal")
@CacheLookup
public WebElement closeEmotionPopUp;

@FindBy(how=How.XPATH, using="//*[@id='tinymce']/img[1]")
@CacheLookup
public WebElement emotion1;

@FindBy(how=How.XPATH, using="//*[@id='tinymce']/img[2]")
@CacheLookup
public WebElement emotion2;

@FindBy(how=How.XPATH, using="//*[contains(@id,'post_message_')]/img[1]")
@CacheLookup
public WebElement postedEmotion1;

@FindBy(how=How.XPATH, using="//*[contains(@id,'post_message_')]/img[2]")
@CacheLookup
public WebElement postedEmotion2;

@FindBy(how=How.XPATH, using="//*[@class='mceIcon mce_bold']")
@CacheLookup
public WebElement BoldText;

@FindBy(how=How.XPATH, using="//*[@class='mceIcon mce_underline']")
@CacheLookup
public WebElement UnderlinedText;

@FindBy(how=How.XPATH, using="//*[@class='mceIcon mce_italic']")
@CacheLookup
public WebElement ItalicText;

@FindBy(how=How.XPATH, using="//*[@style='text-decoration: underline;']/em/strong")
@CacheLookup
public WebElement UnderlinedItalicBoldText;

@FindBy(how=How.ID, using="message_forecolor_open")
@CacheLookup
public WebElement selectTextColorarrow_icon;

@FindBy(how=How.ID, using="message_forecolor_more")
@CacheLookup
public WebElement moreColor;

@FindBy(how=How.ID, using="message_fontselect_open")
@CacheLookup
public WebElement fontFamily;

@FindBy(how=How.ID, using="message_fontsizeselect_text")
@CacheLookup
public WebElement fontSize;

@FindBy(how=How.ID, using="message_justifyleft")
@CacheLookup
public WebElement LeftAlign_icon;

@FindBy(how=How.ID, using="message_justifycenter")
@CacheLookup
public WebElement CenterAlign_icon;

@FindBy(how=How.ID, using="message_justifyright")
@CacheLookup
public WebElement RightAlign_icon;

@FindBy(how=How.ID, using="message_bullist")
@CacheLookup
public WebElement BulletedList_icon;

@FindBy(how=How.ID, using="message_numlist")
@CacheLookup
public WebElement NumberedList_icon;

@FindBy(how=How.ID, using="message1_bullist")
@CacheLookup
public WebElement BulletedListIcon_Edit;

@FindBy(how=How.ID, using="message1_numlist")
@CacheLookup
public WebElement NumberedList_Edit;

public By NumberedListonPost = By.xpath("//*[contains(@id,'post_message')]/ol/li");

public By BulletedListonPost = By.xpath("//*[contains(@id,'post_message')]/ul/li");



}
