
function showSecondCard(){
    hideElement($('.home-page-card'));
          showFlexElement($('.cmp-ready-to-play'));
          showFlexElement($('.cmp-greet'));
          $('.greet-text').text(userName);
  }
  function showFirstCard(){
    hideElement($('.cmp-ready-to-play'));
    hideElement($('.cmp-greet'));
}
  