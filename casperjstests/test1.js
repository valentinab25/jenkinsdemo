
/*==============================================================================*/
/* Casper generated Tue Oct 24 2017 10:53:20 GMT+0300 (GTB Daylight Time) */
/*==============================================================================*/

var x = require('casper').selectXPath;
casper.options.viewportSize = {width: 1920, height: 974};
casper.options.pageSettings = {
    userName: 'admin',
    password: 'admin'
};
casper.on('page.error', function(msg, trace) {
   this.echo('Error: ' + msg, 'ERROR');
   for(var i=0; i<trace.length; i++) {
       var step = trace[i];
       this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
   }
});


var port = 80;

if (casper.cli.has("port")) {
port = casper.cli.get("port");
}
else {
return -1;
}

var host = "localhost";

if (casper.cli.has("host"))  {
host = casper.cli.get("host");
}

casper.echo("Port"+port+" host"+host);

casper.test.begin('Resurrectio test', function(test) {
   casper.start("http://" + host + ":" + port + "/");
   casper.waitForSelector("form#add-plone-site input[type=submit][value='Create a new Plone site']",
       function success() {
           test.assertExists("form#add-plone-site input[type=submit][value='Create a new Plone site']");
           this.click("form#add-plone-site input[type=submit][value='Create a new Plone site']");
       },
       function fail() {
           test.assertExists("form#add-plone-site input[type=submit][value='Create a new Plone site']");
   });
   /* submit form */
   casper.waitForSelector("form input[value='eea.progressbar:default']",
       function success() {
           test.assertExists("form input[value='eea.progressbar:default']");
           this.click("form input[value='eea.progressbar:default']");
       },
       function fail() {
           test.assertExists("form input[value='eea.progressbar:default']");
   });
   casper.waitForSelector("form input[type=submit][value='Create Plone Site']",
       function success() {
           test.assertExists("form input[type=submit][value='Create Plone Site']");
           this.click("form input[type=submit][value='Create Plone Site']");
       },
       function fail() {
           test.assertExists("form input[type=submit][value='Create Plone Site']");
   });

   casper.wait(1000);   
   casper.then(function() {
          this.captureSelector("screenshot1.png", "html");
   });

   casper.waitForSelector(".progressbar-viewlet.percentage",
          function success() {
              test.assertExists(".progressbar-viewlet.percentage");
          },
          function fail() {
              test.assertExists(".progressbar-viewlet.percentage");
   });
   casper.waitForSelector(".progressbar-viewlet.trail",
             function success() {
                 test.assertExists(".progressbar-viewlet.trail");
             },
             function fail() {
                 test.assertExists(".progressbar-viewlet.trail");
    });   

   casper.run(function() {test.done();});
});


