// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Encapsules the behavior for creating a progress chart in Moodle.
 *
 * Manages the UI.
 *
 * @module     block_completion_progress/chart_renderer
 * @class      chart_renderer
 * @package    block_completion_progress
 * @copyright  2017 Ian Wild
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @since      3.1
 */

define(['jquery'], function($) {    
	var t = {
	
        drawLineChart: function(labelset, dataset) {

			// Add a helper to format timestamp data
			Date.prototype.formatMMDDYYYY = function() {
				return (this.getMonth() + 1) +
				"/" +  this.getDate() +
				"/" +  this.getFullYear();
			}

			// Create the chart.js data structure using 'labelset' and 'dataset'
			var data = $.parseJSON(dataset);
			var labels = $.parseJSON(labelset);
			
			var tempData = {
			
			
				labels: labels,
				datasets:[
					{
						label: "Total Bills",
						fillColor: "rgba(220,220,220,0.2)",
						strokeColor: "rgba(220,220,220,1)",
						pointColor: "rgba(220,220,220,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220,220,220,1)",
						data: data
				    }
				]
			};

    	    // Get the context of the canvas element we want to select
    	    var ctx = document.getElementById("myLineChart").getContext("2d");

    	    // Instantiate a new chart
    	    var myLineChart = new Chart(ctx, {type: 'line', data: tempData});	
        },
	};
	
	return t;
});

