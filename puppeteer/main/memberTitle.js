const memberTitleInfo = require('../userdata/memberTitle_Info.json')
const memberTitle = require('../testsuite_modules/memberTitle.js')

class memberTitleTest {
  memberTitle() {
    describe("Member Title", () => {
      //Verify Add Member Title
      //Verify Edit Member Title
      //Verify Delete Member Title
      memberTitle.modifyMemberTitle(memberTitleInfo.memberTitle, memberTitleInfo.numberOfPosts, memberTitleInfo.newMemberTitle)
    });
  }
}
module.exports = new memberTitleTest()