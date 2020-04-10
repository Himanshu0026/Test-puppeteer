var loginBackendSel = module.exports = {};
loginBackendSel.username = 'input[name="username"]';
loginBackendSel.password = 'input[name="password"]';
loginBackendSel.login_Submit_Button = ".button.btn-m.btn-blue"
loginBackendSel.NETWORK_TIMEOUT= "90000";
loginBackendSel.login_Toggle_Button ='a[data-tooltip-elm="ddAccount"]';
loginBackendSel.logout_Button ='a[href="/tool/members/login?action=logout"]';
loginBackendSel.user_tab = 'a[data-tooltip-elm="ddUsers"]';
loginBackendSel.user_tab_title = 'a[href = "/tool/members/mb/titles"]';
loginBackendSel.user_tab_usergroup = 'a[href="/tool/members/mb/usergroup"]';
loginBackendSel.user_tab_newuser = 'a[href="/tool/members/mb/addusers"]';
loginBackendSel.addMembertitle_button = 'a[href="titles?action=edit"]';
loginBackendSel.newTitle = 'input[name="title"]';
loginBackendSel.postCount = 'input[name="min_posts"]';
loginBackendSel.saveTitleButton = '.button.btn-m.btn-blue';
loginBackendSel.saveButton = '.button.btn-m.btn-blue';
loginBackendSel.settings_Tab = 'a[data-tooltip-elm="ddSettings"]'
loginBackendSel.settings_Tab_General = 'a[href="/tool/members/mb/settings?tab=General"]'
loginBackendSel.settings_Tab_Security = 'a[href="/tool/members/mb/settings?tab=Security"]'