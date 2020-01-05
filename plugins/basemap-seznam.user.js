// ==UserScript==
// @id             iitc-plugin-basemap-seznam@xificurk
// @name           IITC plugin: Seznam map tiles
// @category       Map Tiles
// @version        0.1.3.@@DATETIMEVERSION@@
// @namespace      https://github.com/xificurk/iitc-plugins
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Seznam map tiles.
// @include        https://intel.ingress.com/*
// @include        http://intel.ingress.com/*
// @match          https://intel.ingress.com/*
// @match          http://intel.ingress.com/*
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

@@PLUGINSTART@@
//PLUGIN START ////////////////////////////////////////////////////////


var setup = function() {
  var attribution = '<a href="https://mapy.cz"><img src="https://mapy.cz/img/logo-small.svg"/></a>© Seznam.cz,a.s, © Přispěvatelé <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, © NASA';

  var baseLayer = new L.TileLayer('https://m{s}.mapserver.mapy.cz/base-m/{z}-{x}-{y}.png', {
    attribution: attribution,
    subdomains: '1234',
    maxNativeZoom: 18,
    maxZoom: 22
  });

  var hikingLayer = new L.TileLayer('https://m{s}.mapserver.mapy.cz/turist-m/{z}-{x}-{y}.png', {
    attribution: attribution,
    subdomains: '1234',
    maxNativeZoom: 18,
    maxZoom: 22
  });

  layerChooser.addBaseLayer(baseLayer, 'Mapy.cz základní');
  layerChooser.addBaseLayer(hikingLayer, 'Mapy.cz cykloturist.');
}

//PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@
