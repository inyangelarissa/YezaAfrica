// Advanced chart handling for Hydroponic Vision app

// Keep chart references in a module-level object to better manage them
const chartRegistry = {
    temperatureChart: null,
    
    // Helper to safely destroy a chart
    destroyChart: function(chartKey) {
      try {
        if (this[chartKey] instanceof Chart) {
          this[chartKey].destroy();
        }
        this[chartKey] = null;
      } catch (error) {
        console.warn(`Failed to destroy chart "${chartKey}":`, error);
        this[chartKey] = null;
      }
    }
  };
  
  /**
   * Create a temperature vs growth stage chart
   * @param {Array} data - Chart data
   */
  function createTemperatureChart(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("Invalid data for temperature chart:", data);
      return;
    }
    
    console.log("Creating temperature chart with data for", data.length, "stages");
    
    // Get canvas element
    const canvas = document.getElementById('temperatureChart');
    if (!canvas) {
      console.error("Temperature chart canvas not found");
      return;
    }
    
    try {
      // 1. Clean up any existing chart
      chartRegistry.destroyChart('temperatureChart');
      
      // 2. Prepare the data
      const labels = data.map(item => item.stage);
      const optimalTemps = data.map(item => parseFloat(item.optimal_temp));
      const minTemps = data.map(item => parseFloat(item.min_temp));
      const maxTemps = data.map(item => parseFloat(item.max_temp));
      
      // Get temperature unit
      const tempUnit = data[0]?.unit || '°C';
      
      // 3. Create gradient fills for optimal temperature line
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, 'rgba(40, 167, 69, 0.8)');
      gradient.addColorStop(1, 'rgba(40, 167, 69, 0.1)');
      
      // 4. Configure chart
      const chartConfig = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Optimal Temperature',
              data: optimalTemps,
              backgroundColor: gradient,
              borderColor: 'rgba(40, 167, 69, 1)',
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 9,
              pointBackgroundColor: 'rgba(40, 167, 69, 1)',
              tension: 0.3,
              fill: true
            },
            {
              label: 'Min Temperature',
              data: minTemps,
              backgroundColor: 'rgba(108, 117, 125, 0)',
              borderColor: 'rgba(108, 117, 125, 0.7)',
              borderWidth: 2,
              borderDash: [5, 5],
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.2,
              fill: false
            },
            {
              label: 'Max Temperature',
              data: maxTemps,
              backgroundColor: 'rgba(108, 117, 125, 0)',
              borderColor: 'rgba(108, 117, 125, 0.7)',
              borderWidth: 2,
              borderDash: [5, 5],
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.2,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 13
              },
              padding: 12,
              cornerRadius: 6,
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw + tempUnit;
                }
              }
            },
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 15,
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: 'Temperature Requirements by Growth Stage',
              font: {
                size: 16,
                weight: 'bold'
              },
              padding: {
                top: 10,
                bottom: 20
              }
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: `Temperature (${tempUnit})`,
                font: {
                  size: 14
                },
                padding: 10
              },
              ticks: {
                precision: 1
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Growth Stage',
                font: {
                  size: 14
                },
                padding: 10
              },
              grid: {
                display: false
              }
            }
          },
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear'
            }
          }
        }
      };
      
      // 5. Create the chart with error handling
      chartRegistry.temperatureChart = new Chart(ctx, chartConfig);
      
      // 6. Add annotation feature
      enableChartAnnotations(canvas, chartRegistry.temperatureChart, data);
      
      console.log("Temperature chart created successfully");
      
      // 7. Add legend explaining the chart
      addChartLegend(data);
      
      return chartRegistry.temperatureChart;
    } catch (error) {
      console.error("Error creating temperature chart:", error);
      showTemperatureAsFallback(data);
    }
  }
  
  /**
   * Enable interactive annotations for the chart
   * @param {HTMLCanvasElement} canvas - Chart canvas element
   * @param {Chart} chart - Chart.js instance
   * @param {Array} data - Original data for the chart
   */
  function enableChartAnnotations(canvas, chart, data) {
    if (!canvas || !chart) return;
    
    canvas.onclick = function(evt) {
      try {
        const points = chart.getElementsAtEventForMode(
          evt, 'nearest', { intersect: true }, true
        );
        
        if (points && points.length) {
          const firstPoint = points[0];
          const stageIndex = firstPoint.index;
          const stageData = data[stageIndex];
          
          // Show info about the selected growth stage
          showGrowthStageInfo(stageData.stage, stageData);
        }
      } catch (error) {
        console.warn("Error handling chart click:", error);
      }
    };
    
    // Add tooltip to explain the interaction
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
      let tooltipEl = document.getElementById('chartTooltip');
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartTooltip';
        tooltipEl.className = 'chart-tooltip small text-muted mt-2';
        tooltipEl.innerHTML = 'Click on any data point to see detailed information for that growth stage';
        chartContainer.appendChild(tooltipEl);
      }
    }
  }
  
  /**
   * Add explanatory legend below the chart
   * @param {Array} data - Chart data
   */
  function addChartLegend(data) {
    if (!data || data.length === 0) return;
    
    const chartContainer = document.getElementById('chartContainer');
    if (!chartContainer) return;
    
    let legendEl = document.getElementById('chartLegend');
    if (!legendEl) {
      legendEl = document.createElement('div');
      legendEl.id = 'chartLegend';
      legendEl.className = 'chart-legend mt-3 p-3 border rounded bg-light';
      chartContainer.appendChild(legendEl);
    }
    
    // Calculate average values for reference
    const avgMin = data.reduce((sum, item) => sum + parseFloat(item.min_temp), 0) / data.length;
    const avgMax = data.reduce((sum, item) => sum + parseFloat(item.max_temp), 0) / data.length;
    const tempRange = `${avgMin.toFixed(1)}${data[0].unit} - ${avgMax.toFixed(1)}${data[0].unit}`;
    
    legendEl.innerHTML = `
      <div class="row">
        <div class="col-md-6">
          <h6>About This Chart</h6>
          <p class="small mb-0">This chart shows optimal temperature ranges across different 
          growth stages. The solid green line represents ideal temperatures, while dotted 
          lines show acceptable minimum and maximum bounds.</p>
        </div>
        <div class="col-md-6">
          <h6>Temperature Summary</h6>
          <p class="small mb-0">Average temperature range: <strong>${tempRange}</strong><br>
          Critical stages: ${data[0].stage} (germination) and ${data[2].stage} (active growth)</p>
        </div>
      </div>
    `;
  }
  
  /**
   * Show information about a specific growth stage
   * @param {String} stageName - Name of the growth stage
   * @param {Object} stageData - Data for the growth stage
   */
  function showGrowthStageInfo(stageName, stageData) {
    const chartContainer = document.getElementById('chartContainer');
    if (!chartContainer) return;
    
    let infoEl = document.getElementById('growthStageInfo');
    if (!infoEl) {
      infoEl = document.createElement('div');
      infoEl.id = 'growthStageInfo';
      infoEl.className = 'growth-stage-info mt-3 p-3 border-left border-success bg-light';
      chartContainer.appendChild(infoEl);
    }
    
    // Generate descriptions based on the stage
    let stageDescription = "Important growth phase requiring careful monitoring.";
    let careTip = "Monitor temperature and humidity regularly.";
    
    switch(stageName.toLowerCase()) {
      case 'germination':
        stageDescription = "Critical early phase where seeds sprout and develop initial roots.";
        careTip = "Keep temperature stable and ensure high humidity.";
        break;
      case 'seedling':
        stageDescription = "Young plants developing their first true leaves and establishing.";
        careTip = "Gradually introduce nutrients and maintain consistent moisture.";
        break;
      case 'vegetative':
        stageDescription = "Period of rapid growth as the plant builds structure and foliage.";
        careTip = "Increase nutrient concentration and ensure adequate spacing.";
        break;
      case 'flowering/fruiting':
        stageDescription = "Reproductive phase where flowers and fruits develop.";
        careTip = "Adjust nutrient balance with less nitrogen and more phosphorus/potassium.";
        break;
      case 'maturity':
        stageDescription = "Final phase where the plant reaches its full productive capacity.";
        careTip = "Monitor for harvest readiness and maintain stable conditions.";
        break;
    }
    
    // Display enhanced information
    infoEl.innerHTML = `
      <div class="d-flex align-items-center mb-2">
        <div class="stage-icon me-2 bg-success text-white rounded-circle d-flex align-items-center justify-content-center" 
             style="width: 32px; height: 32px;">
          <i class="fas fa-leaf"></i>
        </div>
        <h5 class="mb-0">${stageName} Stage</h5>
      </div>
      <p class="small mb-2">${stageDescription}</p>
      <div class="row">
        <div class="col-md-6">
          <h6 class="small font-weight-bold">Temperature Requirements</h6>
          <ul class="small mb-0">
            <li><span class="text-success">Optimal:</span> ${stageData.optimal_temp}${stageData.unit}</li>
            <li><span class="text-muted">Range:</span> ${stageData.min_temp}${stageData.unit} - ${stageData.max_temp}${stageData.unit}</li>
          </ul>
        </div>
        <div class="col-md-6">
          <h6 class="small font-weight-bold">Care Tip</h6>
          <p class="small mb-0">${careTip}</p>
        </div>
      </div>
    `;
    
    // Smooth scroll to the info
    infoEl.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
  
  /**
   * Display temperature data as text when chart creation fails
   * @param {Array} data - Temperature data
   */
  function showTemperatureAsFallback(data) {
    if (!data || !Array.isArray(data)) return;
    
    const chartContainer = document.getElementById('chartContainer');
    if (!chartContainer) return;
    
    let fallbackContent = `
      <div class="alert alert-warning">
        <h6>Temperature Data</h6>
        <p class="mb-2">The interactive chart couldn't be displayed. Here's the temperature information:</p>
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Growth Stage</th>
              <th>Min Temp</th>
              <th>Optimal Temp</th>
              <th>Max Temp</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    data.forEach(item => {
      fallbackContent += `
        <tr>
          <td>${item.stage}</td>
          <td>${item.min_temp}${item.unit}</td>
          <td><strong>${item.optimal_temp}${item.unit}</strong></td>
          <td>${item.max_temp}${item.unit}</td>
        </tr>
      `;
    });
    
    fallbackContent += `
          </tbody>
        </table>
      </div>
    `;
    
    chartContainer.innerHTML = fallbackContent;
  }