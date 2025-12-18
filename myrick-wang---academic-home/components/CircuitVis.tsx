import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircuitVis: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const WIDTH = 400;
  const HEIGHT = 300;
  
  // Reduced top margin from 60 to 40 for tighter fit
  const MARGIN = { top: 40, right: 30, bottom: 40, left: 40 };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
    const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
    
    // Split height: Top 60% for Analog, Bottom 25% for Digital
    const analogHeight = innerHeight * 0.6;
    const gap = 25;
    const digitalHeight = innerHeight * 0.25;
    const digitalY = analogHeight + gap;

    const g = svg.append("g")
      .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    // --- Grid / Axes ---
    // Use tailwind classes for coloring: neutral-200 in light, neutral-800 in dark
    const axisClass = "stroke-neutral-200 dark:stroke-neutral-800";
    
    const createAxis = (yPos: number) => {
        g.append("line")
            .attr("x1", 0)
            .attr("x2", innerWidth)
            .attr("y1", yPos)
            .attr("y2", yPos)
            .attr("class", axisClass)
            .attr("stroke-width", 1);
    };
    
    createAxis(analogHeight);
    createAxis(digitalY + digitalHeight);

    // Labels
    const labelClass = "font-sans font-medium text-[9px] fill-neutral-400 dark:fill-neutral-500";
    
    g.append("text")
        .attr("x", -10)
        .attr("y", analogHeight / 2)
        .attr("text-anchor", "end")
        .attr("class", labelClass)
        .text("V_in");
        
    g.append("text")
        .attr("x", -10)
        .attr("y", digitalY + digitalHeight / 2)
        .attr("text-anchor", "end")
        .attr("class", labelClass)
        .text("V_out");

    // --- Threshold Line (V_ref) ---
    const thresholdVal = 0.45; 
    const thresholdY = analogHeight * (1 - thresholdVal); 

    g.append("line")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", thresholdY)
        .attr("y2", thresholdY)
        .attr("class", "stroke-neutral-900 dark:stroke-neutral-300 opacity-30 dark:opacity-60") // Increased contrast
        .attr("stroke-dasharray", "3 3") 
        .attr("stroke-width", 1);

    g.append("text")
        .attr("x", innerWidth + 5)
        .attr("y", thresholdY + 3)
        .attr("class", labelClass)
        .style("opacity", 0.6)
        .text("V_ref");

    // --- Data Simulation ---
    // High resolution for smooth rendering
    const n = 200;
    const x = d3.scaleLinear().domain([0, n - 1]).range([0, innerWidth]);
    
    const yAnalog = d3.scaleLinear().domain([-0.1, 1.1]).range([analogHeight, 0]);
    const yDigital = d3.scaleLinear().domain([0, 1]).range([digitalY + digitalHeight, digitalY]);

    const lineAnalog = d3.line<number>()
        .x((d, i) => x(i))
        .y(d => yAnalog(d))
        .curve(d3.curveBasis);

    const lineDigital = d3.line<number>()
        .x((d, i) => x(i))
        .y(d => yDigital(d < thresholdVal ? 1 : 0)) 
        .curve(d3.curveStepAfter);

    const initialData = new Array(n).fill(0.5);

    // Path Style: neutral-900 (blackish) in light, neutral-50 (whitish) in dark
    // Increased stroke-width to 1.5 for better visibility
    const pathClass = "stroke-neutral-900 dark:stroke-neutral-50 fill-none";

    const pathAnalog = g.append("path")
        .datum(initialData)
        .attr("class", pathClass)
        .attr("stroke-width", 1.5)
        .attr("d", lineAnalog);

    const pathDigital = g.append("path")
        .datum(initialData)
        .attr("class", pathClass)
        .attr("stroke-width", 1.5)
        .attr("d", lineDigital);

    let time = 0;
    let animationFrameId: number;

    const animate = () => {
        time += 0.02; 
        
        const newData = new Array(n);
        for(let i=0; i<n; i++) {
            // Base signal: Smooth sine wave combination
            const t = time + (i * 0.03);
            let val = (Math.sin(t) * 0.35 + 0.5) + (Math.cos(t * 2.3) * 0.12);
            
            // Add subtle texture (reduced noise for cleaner visual)
            val += Math.sin(t * 15) * 0.005; 
            
            newData[i] = Math.max(0, Math.min(1, val));
        }

        pathAnalog.datum(newData).attr("d", lineAnalog);
        pathDigital.datum(newData).attr("d", lineDigital);
        
        animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);

  }, []);

  return (
    <div className="w-full h-full relative group">
        <div className="absolute top-0 left-0 text-[10px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest pointer-events-none p-1 font-medium transition-colors">
            FIG 1.2—Hysteresis
        </div>
      <svg 
        ref={svgRef} 
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full" 
        style={{ overflow: 'visible' }}
      />
    </div>
  );
};

export default CircuitVis;