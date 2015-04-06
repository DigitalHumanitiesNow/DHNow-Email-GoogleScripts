//Changes to this script were made in July 2014 when google updated and the way some functions were called changed. // 
//The onOpen function had to be revised as a result.  //
//At the same time the sendInstructions and the sendFollowup functions were integrated into one script.  //
//Additionally, a dropdown was added rather than two seperate buttons for each function.  //

function sendInstructions() {
  var myapp = UiApp.createApplication().setTitle('Send Instructional Email');
  
  var message = "Dear Editors-at-Large,\n\n"
  +"Thank you for volunteering to help Digital Humanities Now. You have signed up to be an Editor-at-Large next week, from Saturday through Friday. You may review additional material, but please make sure to cover these particular days."
  +"\n\nYou should have already received an email from our WordPress installation with login information for digitalhumanitiesnow.org. If you don't see it, please check your spam filter first, and then email us if you need your credentials sent again."
  +"\n\nDetailed instructions for nominating content can be found at http://digitalhumanitiesnow.org/editors-corner/instructions/."
  +"\n\nPlease email us at dhnow@pressforward.org with any questions or concerns during this process."
  +"\n\nSincerely,"
  +"\n\nThe Editors.";
  
  var form = myapp.createFormPanel();
  var panel = myapp.createVerticalPanel();
  panel.add(myapp.createLabel("Recipients bcc:"));
  panel.add(myapp.createTextBox().setName("emailAddresses").setTitle("Email Address").setWidth(250).setHeight(50));
  panel.add(myapp.createLabel("Subject:"));
  panel.add(myapp.createTextBox().setName("subject").setTitle("Subject Line").setText("Editor-at-Large Instructions").setWidth(250));
  panel.add(myapp.createLabel("Message:"));
  panel.add(myapp.createTextArea().setName("body").setTitle("Email Body").setText(message).setWidth(500).setHeight(150));
  panel.add(myapp.createSubmitButton("Submit"));
  
  form.add(panel);
  myapp.add(form);
    
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadsheet.show(myapp);
}


function sendFollowup() {
  var myapp = UiApp.createApplication().setTitle('Follow-Up Email');
  
  var message = "Dear Editors-at-Large,\n\n"
  +"Thank you so much for your work last week for Digital Humanities Now."
  +"\n\nWe would love to hear back from you about your experience as an Editor-at-Large. You can find our feedback form at http://digitalhumanitiesnow.org/editors-corner/feedback/"
  +"\n\nSincerely,"
  +"\n\nThe Editors.";
  
  var form = myapp.createFormPanel();
  var panel = myapp.createVerticalPanel();
  panel.add(myapp.createLabel("Recipients bcc:"));
  panel.add(myapp.createTextBox().setName("emailAddresses").setTitle("Email Address").setWidth(250).setHeight(50));
  panel.add(myapp.createLabel("Subject:"));
  panel.add(myapp.createTextBox().setName("subject").setTitle("Subject Line").setText("Thank you for editing Digital Humanities Now!").setWidth(250));
  panel.add(myapp.createLabel("Message:"));
  panel.add(myapp.createTextArea().setName("body").setTitle("Email Body").setText(message).setWidth(500).setHeight(150));
  panel.add(myapp.createSubmitButton("Submit"));
  
  form.add(panel);
  myapp.add(form);
    
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadsheet.show(myapp);
}
//New function added July 2014. // 
//Adds a dropdown menu called 'Send Emails'. The options within this email are: //
//'Send Instructional Email' which pulls from the sendInstruction function beginning on line 3//
//'Send Follow Up' Email which pulls frm the SendFollowup function beginning on line 32.//
//changes adapted from Google Documentation here: https://developers.google.com/apps-script/guides/menus  //
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Send Emails')
    .addItem('Send Instructional Email', 'sendInstructions')
    .addSeparator()
    .addItem('Send Follow Up', 'sendFollowup')
    .addToUi();
} 
//Old Function removed July 2014
//function onOpen(){
  //var sheet = SpreadsheetApp.getActiveSpreadsheet();
  //var entries = [{
  //  name : "Send Instructional Email",
  //  functionName : "sendInstructions"
 // }];
 // sheet.addMenu("Send Instructional Email", entries);
//};

function doPost(eventInfo){
  var myapp = UiApp.getActiveApplication();
  var email = eventInfo.parameter.emailAddresses;
  var subject = eventInfo.parameter.subject;
  var message = eventInfo.parameter.body;
  
  MailApp.sendEmail ("", subject, message, {bcc:email});
  Browser.msgBox("Email with Editor-at-Large instructions has been sent.");
  myapp.close();
  return myapp;

}

