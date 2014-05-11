/** Tests for wikipedia mobile app */
(function(win){
    alert("wikitest start!");
    Ash.noNetwork().then(function(msg){
      alert("no network !!!");
    })
})(window);