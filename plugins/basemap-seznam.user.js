// ==UserScript==
// @id             iitc-plugin-basemap-seznam@xificurk
// @name           IITC plugin: Seznam map tiles
// @category       Map Tiles
// @version        0.1.0.@@DATETIMEVERSION@@
// @namespace      https://github.com/xificurk/iitc-plugins
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Seznam map tiles.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @include        https://www.ingress.com/mission/*
// @include        http://www.ingress.com/mission/*
// @match          https://www.ingress.com/mission/*
// @match          http://www.ingress.com/mission/*
// @grant          none
// ==/UserScript==

@@PLUGINSTART@@
//PLUGIN START ////////////////////////////////////////////////////////


var setup = function() {
  var attribution = '<a href="http://mapy.cz"><img src="http://mapy.cz/img/logo-small.svg"/></a>© Seznam.cz,a.s, © Přispěvatelé <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, © NASA';

  var baseLayer = new L.TileLayer('http://m{s}.mapserver.mapy.cz/base-m/{z}-{x}-{y}.png', {
    attribution: attribution,
    subdomains: '1234',
    maxNativeZoom: 18,
    maxZoom: 22
  });

  var hikingLayer = new L.TileLayer('http://m{s}.mapserver.mapy.cz/turist_trail_bike-m/{z}-{x}-{y}.png', {
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
