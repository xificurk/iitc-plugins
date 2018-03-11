// ==UserScript==
// @id             iitc-plugin-basemap-seznam@xificurk
// @name           IITC plugin: Seznam map tiles
// @category       Map Tiles
// @version        0.1.2.20180311.161817
// @namespace      https://github.com/xificurk/iitc-plugins
// @updateURL      https://raw.githubusercontent.com/xificurk/iitc-plugins/master/dist/basemap-seznam.meta.js
// @downloadURL    https://raw.githubusercontent.com/xificurk/iitc-plugins/master/dist/basemap-seznam.user.js
// @description    [xificurk-2018-03-11-161817] Seznam map tiles.
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'xificurk';
plugin_info.dateTimeVersion = '20180311.161817';
plugin_info.pluginId = 'basemap-seznam';
//END PLUGIN AUTHORS NOTE


//PLUGIN START ////////////////////////////////////////////////////////


var setup = function() {
  var attribution = '<a href="http://mapy.cz"><img src="http://mapy.cz/img/logo-small.svg"/></a>© Seznam.cz,a.s, © Přispěvatelé <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, © NASA';

  var baseLayer = new L.TileLayer('http://m{s}.mapserver.mapy.cz/base-m/{z}-{x}-{y}.png', {
    attribution: attribution,
    subdomains: '1234',
    maxNativeZoom: 18,
    maxZoom: 22
  });

  var hikingLayer = new L.TileLayer('http://m{s}.mapserver.mapy.cz/turist-m/{z}-{x}-{y}.png', {
    attribution: attribution,
    subdomains: '1234',
    maxNativeZoom: 18,
    maxZoom: 22
  });

  layerChooser.addBaseLayer(baseLayer, 'Mapy.cz základní');
  layerChooser.addBaseLayer(hikingLayer, 'Mapy.cz cykloturist.');
}

//PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


