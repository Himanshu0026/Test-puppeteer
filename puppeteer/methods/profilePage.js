const browser = require('../browser.js');
const profileSel=require('../selector/profileSelector.js');

class ProfileMethods {
  async postShare() {
    await browser.page.waitFor(2000);
    await browser.page.click(profileSel.postMenu);
    await browser.page.click('.openShareDialog > span');
    await browser.page.waitForSelector("#share-modal .modal-dialog .modal-content", {visible: true});
    await browser.page.click('#twitter_share');
    var twitterEle = await browser.page.$('#twitter_share');
    const link = await browser.page.evaluate(twitterEle => twitterEle.href, twitterEle);
    const linkchk=await (link.includes(profileSel.webLink) || link.includes(profileSel.webLink2));
    await browser.page.waitFor(1000)
    await browser.page.click('#share-modal .modal-header button');
  }
  async postEdit(anyEditing) {
    await browser.page.waitFor(1500);
    let post = await browser.page.$('.post-body-wrapper .post-body-content span');
    let earlierPost = await browser.page.evaluate(post => post.textContent, post);
    await browser.page.click(profileSel.postMenu);
    await browser.page.click('.post-edit .dropdown-menu #search_edit_post');
    await browser.page.waitForSelector("#message1_ifr");
    const elementHandle = await browser.page.$('#message1_ifr');
    const frame = await elementHandle.contentFrame();
    await frame.waitForSelector('#tinymce');
    const bodycontent = await frame.$('#tinymce');
    await bodycontent.type(anyEditing);
    await browser.page.click('#posts-list .form-group #edit_btn_save_cancel .btn');
    await browser.page.waitFor(2000);
    post = await browser.page.$('.post-body-wrapper .post-body-content span');
    let editedPost = await browser.page.evaluate(post => post.textContent, post);
    if(earlierPost===editedPost){
      await console.error("Post cann't edit.");
    }
  }
  async postDelete() {
    browser.page.on('dialog', async dialog => {
      dialog.accept();
    });
    await browser.page.waitFor(1000);
    await browser.page.click(profileSel.postMenu);
    await browser.page.waitFor(1000);
    let post = await browser.page.$('.post-body-wrapper .post-body-content span');
    let earlierPost = await browser.page.evaluate(post => post.textContent, post);
    await browser.page.waitForSelector('#search_delete_post',{visible:true});
    await browser.page.click('#search_delete_post');
    await browser.page.waitFor(2000);
    post = await browser.page.$('.post-body-wrapper .post-body-content span');
    let deletePost = await browser.page.evaluate(post => post.textContent, post);
    if(earlierPost===deletePost){
      await console.error("Post cann't delete.");
    }
  }

  async profileOpen(){
    await browser.page.click(profileSel.profileDropDown);
    await browser.page.click(profileSel.profile);
    await browser.page.waitForSelector(profileSel.msgBtnInProfile, {visible: true});
  }
  async postCreate(i,postion) {
    await browser.page.waitFor(2000)
    await browser.page.click(profileSel.newTopic);
    await browser.page.waitForSelector(profileSel.title);
    await browser.page.type(profileSel.title,`Any Thing ...${i}.`);
    await browser.page.waitForSelector("iframe");
    const elementHandle = await browser.page.$('#message_ifr');
    const frame = await elementHandle.contentFrame();
    await frame.waitForSelector('#tinymce')
    const bodycontent = await frame.$('#tinymce');
    await browser.page.waitFor(1000)
    await bodycontent.type( `Any Thing ...${i}...` );
    await browser.page.click('#all_forums_dropdown');
    for(let j=1;j<=postion;j++){
      await browser.page.keyboard.press('ArrowDown');
    }
    await browser.page.keyboard.press('Enter');
    await browser.page.click('#post_submit');
    await browser.page.waitFor(1500);
    await browser.page.click('#logo_or_title');
  }
  async postApproval(value) {
    await browser.page.click('#my_account_forum_menu li:nth-child(3) a');
    await browser.page.waitForSelector('#ddSettings a:nth-child(3)');
    await browser.page.click('#ddSettings a:nth-child(3)');
    await browser.page.waitFor(1000);
    await browser.page.select('#post_approval', value);
    await browser.page.waitFor(1000);
    await browser.page.click('button[type="submit"]');
  }
}
module.exports = new ProfileMethods();
