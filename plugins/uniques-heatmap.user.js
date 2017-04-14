// ==UserScript==
// @id             iitc-plugin-uniques-heatmap@xificurk
// @name           IITC plugin: Unique visits/captures heatmap
// @category       Layer
// @version        0.1.3.@@DATETIMEVERSION@@
// @namespace      https://github.com/xificurk/iitc-plugins
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Display heatmap of all portals that the player did NOT visit/capture. Requires uniques plugin.
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
window.plugin.uniquesHeatmap = function() {};

window.plugin.uniquesHeatmap.original_highlighter = window._no_highlighter;

window.plugin.uniquesHeatmap.HEAT_RADIUS = 60;
window.plugin.uniquesHeatmap.HEAT_BLUR = 90;
window.plugin.uniquesHeatmap.HEAT_MAX_ZOOM = 17;


window.plugin.uniquesHeatmap.hidePortalsHightlighter = {
  highlight: function(data) {
    data.portal.setStyle({
      opacity: 0,
      fillOpacity: 0
    });
  }
}


window.plugin.uniquesHeatmap.updateHeatmap = function(layer) {

  // as this is called every time layers are toggled, there's no point in doing it when the layer is off
  if(!map.hasLayer(layer)) {
    if(window._current_highlighter === 'Hide portals' && !map.hasLayer(window.plugin.uniquesHeatmap.explorerHeatLayer) && !map.hasLayer(window.plugin.uniquesHeatmap.pioneerHeatLayer)) {
      $('#portal_highlight_select').val(window.plugin.uniquesHeatmap.original_highlighter).trigger('change');
    }
    return;
  }

  if(window._current_highlighter !== 'Hide portals') {
    window.plugin.uniquesHeatmap.original_highlighter = window._current_highlighter;
    $('#portal_highlight_select').val('Hide portals').trigger('change');
  }

  var points = [];
  for(var guid in window.portals) {
    var p = window.portals[guid];
    var uniqueInfo = window.plugin.uniques.uniques[guid];
    if(p._map && (!uniqueInfo || !uniqueInfo.visited || (layer === window.plugin.uniquesHeatmap.pioneerHeatLayer && !uniqueInfo.captured))) {
      points.push(p.getLatLng());
    }
  }

  layer.setLatLngs(points);

}


// as calculating heatmap can take some time when there's lots of portals shown, we'll do it on
// a short timer. this way it doesn't get repeated so much
window.plugin.uniquesHeatmap.delayedUpdateHeatmap = function(layer, wait) {
  if(window.plugin.uniquesHeatmap.timer === undefined) {
    window.plugin.uniquesHeatmap.timer = setTimeout(function() {
      window.plugin.uniquesHeatmap.timer = undefined;
      window.plugin.uniquesHeatmap.updateHeatmap(window.plugin.uniquesHeatmap.pioneerHeatLayer);
      window.plugin.uniquesHeatmap.updateHeatmap(window.plugin.uniquesHeatmap.explorerHeatLayer);
    }, wait * 1000);
  }
}


var setup = function() {
  // Load leaflet-heat.js
  // Note: It seems that on mobile the plugin is loaded before leaflet code, so we need to load leaflet-heat.js here in setup.
  @@INCLUDERAW:external/leaflet-heat.js@@

  if(window.plugin.uniques === undefined) {
    alert("'Portal Highlighter Uniques Opacity' requires 'uniques'");
    return;
  }

  // Fix Heatmap layer z-index
  $("<style>").prop("type", "text/css").html('canvas.leaflet-heatmap-layer {z-index: 1;}').appendTo("head");

  window.addPortalHighlighter('Hide portals', window.plugin.uniquesHeatmap.hidePortalsHightlighter);

  // Pioneer heatmap
  window.plugin.uniquesHeatmap.pioneerHeatLayer = L.heatLayer([], {
    radius: window.plugin.uniquesHeatmap.HEAT_RADIUS,
    blur: window.plugin.uniquesHeatmap.HEAT_BLUR,
    maxZoom: window.plugin.uniquesHeatmap.HEAT_MAX_ZOOM
  });
  window.addLayerGroup('Pioneer heatmap', window.plugin.uniquesHeatmap.pioneerHeatLayer, false);

  // Explorer heatmap
  window.plugin.uniquesHeatmap.explorerHeatLayer = L.heatLayer([], {
    radius: window.plugin.uniquesHeatmap.HEAT_RADIUS,
    blur: window.plugin.uniquesHeatmap.HEAT_BLUR,
    maxZoom: window.plugin.uniquesHeatmap.HEAT_MAX_ZOOM
  });
  window.addLayerGroup('Explorer heatmap', window.plugin.uniquesHeatmap.explorerHeatLayer, false);

  // Update hooks
  window.addHook('requestFinished', function() {
    window.plugin.uniquesHeatmap.delayedUpdateHeatmap(3.0);
  });
  window.addHook('mapDataRefreshEnd', function() {
    window.plugin.uniquesHeatmap.delayedUpdateHeatmap(0.5);
  });
  window.map.on('overlayadd overlayremove', function() {
    window.plugin.uniquesHeatmap.delayedUpdateHeatmap(1.0);
  });

}

//PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@
