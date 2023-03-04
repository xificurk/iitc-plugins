// ==UserScript==
// @id             iitc-plugin-portal-highlighter-uniques-opacity@xificurk
// @name           IITC plugin: Highlight unique visits/captures using opacity
// @category       Highlighter
// @version        0.2.1.@@DATETIMEVERSION@@
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


window.plugin.portalHighlighterUniquesOpacity.highlight = function(data, styles) {
  var portalData = data.portal.options.ent[2]
  var uniqueInfo = null;

  if (portalData[18]) {
    uniqueInfo = {
      captured: ((portalData[18] & 0b10) !== 0),
      visited: ((portalData[18] & 0b11) !== 0)
    };
  }

  var style = {};

  if(uniqueInfo) {
    if(uniqueInfo.captured) {
      // captured (and, implied, visited too) - hide
      style = styles.captured;

    } else if(uniqueInfo.visited) {
      style = styles.visited;
    }
  } else {
    // no visit data at all
    style = styles.unvisited;
  }

  data.portal.setStyle(style);
}


window.plugin.portalHighlighterUniquesOpacity.highlighter = {
  highlight: function(data) {
    window.plugin.portalHighlighterUniquesOpacity.highlight(
      data,
      {
        captured: {
          fillOpacity: 0,
          opacity: 0.25,
        },
        visited: {
          fillOpacity: 0.2,
          opacity: 1,
        },
        unvisited: {
          fillOpacity: 0.8,
          opacity: 1,
        },
      }
    );
  }
}

window.plugin.portalHighlighterUniquesOpacity.highlighterInverted = {
    highlight: function(data) {
      window.plugin.portalHighlighterUniquesOpacity.highlight(
        data,
        {
          captured: {
            fillOpacity: 0.8,
            opacity: 1,
          },
          visited: {
            fillOpacity: 0.2,
            opacity: 1,
          },
          unvisited: {
            fillOpacity: 0,
            opacity: 0.25,
          },
        }
      );
    }
}


var setup = function() {
  window.addPortalHighlighter('Uniques (opacity)', window.plugin.portalHighlighterUniquesOpacity.highlighter);
  window.addPortalHighlighter('Uniques (opacity inverted)', window.plugin.portalHighlighterUniquesOpacity.highlighterInverted);
}

//PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@
