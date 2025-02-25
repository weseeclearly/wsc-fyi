// Create nodes for each letter
const text = "weseeclearly";
const nodes = text.split('').map((letter, i) => ({
    id: i,
    letter: letter,
    group: letter === 'e' ? 1 : 0  // Group 'e's together
}));

// Create links between consecutive letters
const links = [];
for (let i = 0; i < nodes.length - 1; i++) {
    links.push({
        source: i,
        target: i + 1,
        value: 1
    });
}

// Add some cross-links between same letters (e's)
const eIndices = nodes
    .map((node, i) => node.letter === 'e' ? i : -1)
    .filter(i => i !== -1);

eIndices.forEach((i, idx) => {
    if (idx < eIndices.length - 1) {
        links.push({
            source: i,
            target: eIndices[idx + 1],
            value: 0.5
        });
    }
});

// Set up the SVG
const width = 400;
const height = 100;

const svg = d3.select("#force-graph")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .call(d3.drag()
        .subject(event => {
            const point = d3.pointer(event, svg.node());
            const [x, y] = point;
            // Find the closest node within bounds
            const padding = 10;
            const nodes = simulation.nodes();
            const closest = nodes.find(n => 
                Math.abs(n.x - x) < 30 && 
                Math.abs(n.y - y) < 30 &&
                x >= padding && 
                x <= width - padding && 
                y >= padding && 
                y <= height - padding
            );
            if (closest) {
                closest.x = x;
                closest.y = y;
                return closest;
            }
        })
        .on("drag", dragged));

// Create the force simulation
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links)
        .id(d => d.id)
        .distance(20)
        .strength(link => link.value))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(25))
    .force("bounds", () => {
        const horizontalPadding = 10;
        const verticalPadding = 15;  // Slightly more vertical padding
        for (let node of nodes) {
            node.x = Math.max(horizontalPadding, Math.min(width - horizontalPadding, node.x));
            node.y = Math.max(verticalPadding, Math.min(height - verticalPadding, node.y));
        }
    });

// Function to create diamond path
function diamondPath(size) {
    const s = size;
    // Creates a more contracted diamond shape
    return `M 0,-${s/2} L ${s/3},0 L 0,${s/2} L -${s/3},0 Z`;
}

// Create the links
const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", d => d.value === 1 ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.45)")
    .attr("stroke-width", d => d.value === 1 ? 1.5 : 0.8)
    .attr("stroke-dasharray", d => d.value === 1 ? "none" : "2,2");

// Create the nodes
const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "letter-node");

// Add stars behind letters
node.append("path")
    .attr("d", diamondPath(36))
    .attr("fill", "none")
    .attr("stroke", "rgba(103, 169, 247, 0.6)")
    .attr("stroke-width", 1.5)
    .attr("transform", "rotate(45)");

// Add the letters
node.append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("fill", "rgba(255, 255, 255, 0.95)")
    .attr("font-family", "Lugrasimo")
    .attr("font-size", "24px")
    .attr("filter", "drop-shadow(0 0 2px rgba(103, 169, 247, 0.2))")
    .text(d => d.letter);

// Update function
function ticked() {
    // Enforce bounds during tick
    const horizontalPadding = 10;
    const verticalPadding = 15;  // Slightly more vertical padding
    nodes.forEach(node => {
        node.x = Math.max(horizontalPadding, Math.min(width - horizontalPadding, node.x));
        node.y = Math.max(verticalPadding, Math.min(height - verticalPadding, node.y));
    });

    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
}

simulation.on("tick", ticked);

// Drag function
function dragged(event) {
    const horizontalPadding = 10;
    const verticalPadding = 15;  // Slightly more vertical padding
    event.subject.x = Math.max(horizontalPadding, Math.min(width - horizontalPadding, event.x));
    event.subject.y = Math.max(verticalPadding, Math.min(height - verticalPadding, event.y));
    simulation.alpha(1).restart();
}

// Animation loop
setInterval(() => {
    simulation.alpha(0.3).restart();
}, 3000);
