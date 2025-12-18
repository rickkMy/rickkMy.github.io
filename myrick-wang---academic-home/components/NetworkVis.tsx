import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NetworkVis: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  const LOGIC_WIDTH = 400;
  const LOGIC_HEIGHT = 300;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    // Generate dummy small-world data
    const nodes = Array.from({ length: 20 }, (_, i) => ({ id: i }));
    const links: { source: number; target: number }[] = [];
    
    // Create a ring lattice + random rewiring
    for (let i = 0; i < nodes.length; i++) {
        links.push({ source: i, target: (i + 1) % nodes.length });
        links.push({ source: i, target: (i + 2) % nodes.length });
        if (Math.random() < 0.1) {
            links.push({ source: i, target: Math.floor(Math.random() * nodes.length) });
        }
    }

    // Shift center down slightly (0.55 * HEIGHT) to avoid overlap with top-left label
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(30))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(LOGIC_WIDTH / 2, LOGIC_HEIGHT * 0.55));

    // Links: Light gray in light mode, Dark gray in dark mode
    const link = svg.append("g")
      .attr("class", "stroke-neutral-200 dark:stroke-neutral-700") 
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 0.8);

    // Nodes: Black fill in light mode, White fill in dark mode
    // Border: White stroke in light mode, Black stroke in dark mode (for contrast against links)
    const node = svg.append("g")
      .attr("class", "stroke-white dark:stroke-neutral-900")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 3) // Reduced radius slightly
      .attr("class", "fill-neutral-900 dark:fill-neutral-100");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="w-full h-full relative group">
        <div className="absolute top-0 left-0 text-[10px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest pointer-events-none p-1 font-medium transition-colors">
            FIG 1.0—Topology
        </div>
      <svg 
        ref={svgRef} 
        viewBox={`0 0 ${LOGIC_WIDTH} ${LOGIC_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full" 
        style={{ overflow: 'visible' }}
      />
    </div>
  );
};

export default NetworkVis;