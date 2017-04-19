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
	
	var links = [];
	
	var t = {
		
        drawChart: function(dataset) {
        	
			// Create the chart.js data structure using 'labelset' and 'dataset'
			var completion_data = $.parseJSON(dataset);
			var array_len = completion_data.activities.length;
			
			var labels = [];
			var data = [];
			var background = [];
			
			// only handle complete and incomplete at the moment
			var col_complete = completion_data.colors.completed_colour;
			var col_incomplete = completion_data.colors.notCompleted_colour;
			var col_submitted = completion_data.colors.submittednotcomplete_colour;
			var col_failed = completion_data.colors.futureNotCompleted_colour;
			
			for (var i = 0; i < array_len; i++) {
				labels.push(completion_data.activities[i].name);
				// Note that the pie chart segments will all be the same size
				data.push('1'); 
				links.push(completion_data.activities[i].link);
				var status = completion_data.activities[i].status;
				switch (status) {
					case 'complete':
						background.push(col_complete);
						break;
					case 'passed':
						background.push(col_complete);
						break;
					case 'failed':
						background.push(col_failed);
						break;
					case 'submitted':
						background.push(col_submitted);
						break;
					default:
						background.push(col_incomplete);
						break;
				}
			}
			
			var chartData = {
				labels: labels,
				datasets:[
					{
						label: "Completions",
						data: data,
						backgroundColor: background
				    }
				]
			};

    	    // Get the context of the canvas element we want to select
    	    var ctx = document.getElementById("myChart").getContext("2d");

    	    // Instantiate a new chart
    	    var myChart = new Chart(ctx, {
				type: 'pie',
				data: chartData,
				options: {
					legend: {
						display: false
					},
				    tooltips: {
			            callbacks: {
			                label: function(tooltipItem, data) {
			                	String.prototype.trunc = 
			                	      function(n){
			                	          return this.substr(0,n-1)+(this.length>n?'...':'');
			                	      };
			                	      
			                    var allData = data.datasets[tooltipItem.datasetIndex].data;
			                    var tooltipLabel = data.labels[tooltipItem.index];
			                    // truncate the label to 15 characters plus an ellipsis if necessary:
			                    return tooltipLabel.trunc(15);
			                }
			            }
			        }
				}
			});
    	    
    	    $(document).ready(
    		  function () {
    		    var canvas = document.getElementById("myChart");
    		    
    		    canvas.onclick = function (evt) {
    		      var activePoints = myChart.getElementsAtEvent(evt);
    		      var chartData = activePoints[0]['_chart'].config.data;
    		      var idx = activePoints[0]['_index'];

    		      var url = links[idx];
    		      window.location.href = url;
    		      return false;
    		    };
    		  });
        },
        
	};
	
	return t;
});

