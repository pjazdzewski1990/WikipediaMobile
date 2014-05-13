/** Tests for wikipedia mobile app */
(function(win){
    
    // --------------- SETUP ---------------------
    var loadWaitTime = 5000;
    var conf = {app: "Wikipedia Mobile", appVersion: "1.4", desc: "Testing Wikipedia Mobile with Ash", key: "wiki"};
    
    window.onerror = function(errorMsg, url, lineNumber) {
        alert("Error " + url + ":" + lineNumber + "\n" + errorMsg);
    };
    
    var wikiPage = {
        validate: function(){
            var searchText = $("#searchParam");
            var search = $("#search");
            return searchText && search;
        },
        goto: function(){
            if(!wikiPage.validate()){
                ($(".titlebarIcon")[0]).click();
            }
            return true;
        }
    };
    
    // -------------- PAGES --------------------
    
    var mainPage = {
        validate: function(){
            var content = $("#content");
            return wikiPage.validate() && content;
        },
        goto: function(){
            return wikiPage.goto();
        }
    };
    
    var errorPage = {
        validate: function(){
            var error = $(".error-overlay");
            return wikiPage.validate() && error.size()>0;
        },
        goto: function(){
            return true;
        }
    };
    
    // -------------- STEPS --------------------
    
    var randomWalkStep = {
       name: "Choose random link",
       where: mainPage,
       what: [function(){
           var links = $("#content p a");
           Ash.assert(links);
           chosenLink = links[0];
           $(chosenLink).click();
           Ash.endTest();
       }],
       howLong: loadWaitTime + 5000
    };
    
    var randomWalkCheckStep = {
       name: "We landed on specific page",
       where: mainPage,
       what: [function(){
           setTimeout(function(){
               var linkText = chosenLink.innerHTML;
               Ash.assert(linkText);
               //Wiki mobile renders content in a strange way
               var content = $("body").text();
               var contains = content.indexOf(linkText);
               
               Ash.assert(contains != -1);
               Ash.endTest();
           }, loadWaitTime);
       }],
       howLong: loadWaitTime + 5000
    };
    
    // -------------- SCENARIOS --------------------
    
    var chosenLink;
    var linkWalkScenario = [
    randomWalkStep,
    randomWalkCheckStep,
    randomWalkStep,
    randomWalkCheckStep,
    {
       name: "We can go back via W button",
       where: mainPage,
       what: [function(){
           var back = $("#searchFormHolder .titlebarIcon");
           //alert("Fooo! " + back);
           back.click();
           Ash.endTest();
       }],
       howLong: loadWaitTime + 5000
    }
  ];

    // -------------- RUN --------------------
        
  setTimeout(function(){
    Ash.config(conf).play(linkWalkScenario, function(errorData){
        alert("Test failed " + JSON.stringify(errorData));
    }, function(successData){
        console.log("Test success " + JSON.stringify(successData));
    });
  }, loadWaitTime);
    
})(window);