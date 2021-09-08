// FUNCTIONS

// fn changePronouns
//    nominative : String 
//      examples: he/she/they
//    accusative : String 
//      examples: him/her/them
//    genitive : String
//      examples: his/her/theirs
//    reflexive : String
//      examples: himself/herself/themself
//
//  Description: 
//    Changes all pronouns on the page to the forms given
//  return : () -> ()
const change_pronouns = ( nominative
                        , accusative
                        , genitive
                        , reflexive) => {
  // It's Dumb that javascript doesn't have this by default
  const zip = (a, b) => Array.from(Array(Math.min(b.length, a.length)), (_, i) => [a[i], b[i]]);

  // Generate all of the cases where words have Capitalization 
  // and not
  function to_all_cases(inital) {
    var new_cases = [];
    var lower = inital.toLowerCase();
    var upper = lower[0].toUpperCase() + lower.substring(1);
    [ lower, upper ].forEach(y_case => {
      new_cases.push(y_case);
    });
    return new_cases;
  }


  function my_replace (assumed_cases,to_case) {
    assumed_cases.forEach(from_case => {
      var ziped = zip( to_all_cases(from_case)
                     , to_all_cases(to_case));
      ziped.forEach(tuple => {
        from = tuple[0];
        to   = tuple[1];
        document.body.innerHTML = 
          document.body.innerHTML.replace(new RegExp('\\b'+from+'\\b', "g"), to);
      });
    });
  };
  var assumed_nominative_cases = [ "he", "she" ];
  var assumed_accusative_cases = [ "his", "her" ];
  var assumed_genitive_cases   = [ "him", "her" ];
  var assumed_reflexive_cases  = [ "himself", "herself" ];
  my_replace(assumed_nominative_cases,nominative);
  my_replace(assumed_accusative_cases,accusative);
  my_replace(assumed_genitive_cases,genitive);
  my_replace(assumed_reflexive_cases,reflexive);
}

// Main
chrome.runtime.onMessage.addListener(main);
function main(message){
  var nominative = message.nominative;
  var accusative = message.accusative;
  var genitive   = message.genitive;
  var reflexive  = message.reflexive;
  change_pronouns(nominative,accusative,genitive,reflexive);
  chrome.runtime.onMessage.removeListener(main);  //optional
}
