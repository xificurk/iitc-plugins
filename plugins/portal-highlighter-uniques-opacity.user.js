// ==UserScript==
// @id             iitc-plugin-portal-highlighter-uniques-opacity@xificurk
// @name           IITC plugin: Highlight unique visits/captures using opacity
// @category       Highlighter
// @version        0.1.1.@@DATETIMEVERSION@@
// @namespace      https://github.com/xificurk/iitc-plugins
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Use stroke and fill opacity to denote player's unique visits and captures. Requires uniques plugin.
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


//use own namespace for plugin
window.plugin.portalHighlighterUniquesOpacity = function () {};


window.plugin.portalHighlighterUniquesOpacity.highlighter = {
  highlight: function(data) {
    var portalData = data.portal.options.ent[2]
    var uniqueInfo = null;

    if (portalData[18]) {
      uniqueInfo = {
        captured: ((portalData[18] & 0b10) === 2),
        visited: ((portalData[18] & 0b1) === 1)
      };
    }

    var style = {};

    if(uniqueInfo) {
      if(uniqueInfo.captured) {
        // captured (and, implied, visited too) - hide
        style.fillOpacity = 0;
        style.opacity = 0.25;

      } else if(uniqueInfo.visited) {
        style.fillOpacity = 0.2;
        style.opacity = 1;
      }
    } else {
      // no visit data at all
      style.fillOpacity = 0.8;
      style.opacity = 1;
    }

    data.portal.setStyle(style);
  }
}


var setup = function() {
  window.addPortalHighlighter('Uniques (opacity)', window.plugin.portalHighlighterUniquesOpacity.highlighter);
}

//PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@
