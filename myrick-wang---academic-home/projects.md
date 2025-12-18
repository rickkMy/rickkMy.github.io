# Projects

Detailed documentation of selected academic and personal projects, focusing on hardware-software integration and system analysis.

---

## Social Network Simulation Framework
**2024** · *Python, NumPy, Matplotlib, NetworkX*

### Overview
A comprehensive simulation engine designed to model and visualize information propagation across various network topologies. The project focuses on understanding how structural properties of a network—such as clustering coefficient and average path length—affect the speed and reach of information spreading.

### Key Features
*   **Topology Generation**: Algorithms to generate Ring Lattice, Random Graph (Erdős–Rényi), and Small-World (Watts–Strogatz) networks.
*   **Visualisation**: Real-time rendering of network states using Matplotlib and D3.js integration prototypes.
*   **Analysis**: Calculation of spectral properties and robustness testing against node failures.

> *"The elegance of a network lies not in its nodes, but in the hidden architecture of its connections."*

---

## Automatic Adaptive Lamp Post
**2023** · *Embedded C++, Analog Circuit Design*

### Overview
Addressed energy wastage in municipal street lighting systems. Designed a sensor-based control circuit that adjusts light intensity based on ambient light levels and detected motion.

### Technical Implementation
*   **Sensing**: Utilized phototransistors in a voltage divider configuration feeding into an operational amplifier comparator.
*   **Hysteresis**: Implemented positive feedback in the analog stage to prevent oscillation (flickering) at threshold light levels.
*   **Control**: ATmega328P (Arduino) based PWM control for LED brightness modulation.

### Circuit Schematics
The design features a dual-stage amplification process to filter high-frequency noise from the sensor inputs before digitization.

---

## FPGA-Based Digital Clock
**2023** · *Verilog, Intel Quartus*

Designed a synchronous digital clock system on a Cyclone IV FPGA. Implemented frequency dividers to derive 1Hz signals from the 50MHz onboard oscillator, driving a multiplexed 7-segment display.