describe('Twitter API query webpage', function(){
   it('should query ABC twitter account', function(){
      browser.get('http://localhost:8000/twitterApp/');

      // query for ABC news twitter id
      element(by.model('queryTerm')).sendKeys('abc');
      element(by.css('input[type="submit"]')).click();

      // verify ABC twitter name
      var queryDataName = element(by.binding('queryData.name'));
      expect(queryDataName.getText()).toEqual('ABC News');

      // verify that after a valid Twitter id is found,
      // 'Get latest tweet' button become available
      var latestTweetButton = element(by.buttonText('Get latest tweet'));
      expect(latestTweetButton.isDisplayed()).toBeTruthy();

      latestTweetButton.click();
      var embedStatus = element(by.binding('embedStatus'));
      expect(embedStatus.isDisplayed()).toBeTruthy();
   });
});
