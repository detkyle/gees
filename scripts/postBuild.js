var fs = require("fs-extra");

async function foo() {
  const manifest = await fs.readJson("./build/asset-manifest.json");
  const package = await fs.readJson("package.json");
  const mainPath = "./build/" + manifest["main.js"];
  const jsCode = await fs.readFile(mainPath);
  const fileContents = getUserScriptContent(jsCode, package);
  const geesPath = "./install/gees.js";

  await fs.ensureFile(geesPath);

  fs.writeFile(geesPath, fileContents, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log(`${geesPath} has been updated!`);
  });
}

foo();

function getUserScriptContent(jsAppCode, package) {
  return `
// ==UserScript==
// @name     ${package.description}
// @version  ${package.version}
// @homepage ${package.homepage}
// @include  https://aall.space/*
// @grant    GM_addStyle
// @grant GM_getValue
// ==/UserScript==
//--- The @grant directive is used to restore the proper sandbox.

$("body").append("<div id='gees-root' />");

$(document).ready(function(){
${jsAppCode}    
});
`;
}
