# Selected Works

Detailed documentation of academic and personal engineering projects.

## Social Network Simulation Framework
**2024** · *Python, NumPy, Matplotlib, NetworkX*

### Abstract
This project implements a simulation engine to model information propagation across various network topologies. By simulating the "Six Degrees of Separation" phenomenon and other network dynamics, the framework allows for the analysis of structural efficiency in communication networks.

### Technical Implementation
The core engine was built in Python, leveraging NumPy for efficient matrix operations representing adjacency matrices.
*   **Topology Generation**: Implemented generators for Ring Lattices, Erdős–Rényi random graphs, and Watts–Strogatz small-world networks.
*   **Metrics Analysis**: Algorithms to calculate the Clustering Coefficient (C) and Average Path Length (L) for each generated graph.
*   **Visualization**: Created a real-time visualizer using Matplotlib to display node states (Susceptible, Infected, Recovered) during propagation simulations.

> "The small-world phenomenon is not just a curiosity of social networks, but a fundamental property of efficient information transfer in decentralized systems."

## Automatic Adaptive Lamp Post
**2024** · *Analogue Electronics, Embedded Systems (RP2040), Python*
PDF: https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf

### 1. Aim
Design and optimize an automatic lamp post circuit that detects the proximity of subjects and automatically illuminates the lamp post. The system was further expanded to interface with a Raspberry Pi Pico microcontroller for digital counting and display.

### 2. Analogue Circuit Design

#### Proximity Sensor
The core detection mechanism relies on an infrared transmitter and receiver pair.
*   **Transmitter**: Uses a TSHF5210 IR LED. The series resistance R1 was calculated using Ohm’s Law to limit current.
    *   `V = V_supply - V_LED = 9 - 1.4 = 7.6V`
    *   `R = 7.6V / 0.1A = 76Ω`
*   **Receiver**: Uses a BPV10NF photodiode and a BC548B BJT amplifier. Through experimental measurement of output voltage vs distance, optimal resistance values were selected (`Re = 0.38kΩ`, `RR = 48kΩ`) to maximize sensitivity between 5-10cm.

#### Threshold Comparator
An LM358 Operational Amplifier was configured as a comparator.
*   When the sensor voltage (`V_in`) exceeds the reference voltage (`V_ref`), the output swings to the positive rail (`V_H`), turning on the lamp.
*   **Hysteresis**: To prevent oscillation at the switching threshold, a Schmitt trigger configuration was implemented.

#### Lamp-Post Driver
High-brightness LEDs (C503D) were driven by the comparator output. A `300Ω` resistor was selected to set the relative luminous intensity to 0.5, balancing brightness and power consumption.

### 3. Microcontroller Integration (Raspberry Pi Pico)

#### Interface Electronics
To safely interface the 9V analogue circuit with the 3.3V logic of the Pico:
1.  **Signal Buffer**: An LM358 unity-gain buffer isolates the sensor circuit.
2.  **Voltage Divider**: Steps down the 9V signal to <3.3V.

#### Digital Logic
*   **Interrupts**: An Interrupt Service Routine (ISR) triggers on the rising edge of the sensor signal to increment a counter.
*   **Display**: A dual-digit 7-segment display (HDSP-523E) shows the count (00-99). The display is multiplexed using a Python script running on the Pico.

### 4. Experimental Results
*   **Sensor Response**: The sensor exhibited a sharp voltage change (approx. 2V to 6V) when an object was introduced at 10cm, providing a clear signal for the comparator.
*   **Stability**: The Schmitt trigger successfully eliminated noise-induced switching during slow approach speeds.
*   **System Integration**: The MCU successfully counted passing objects and updated the display in real-time without interfering with the analogue lighting operation.

### 5. Conclusion
The final circuit successfully integrates analogue sensing with digital processing.

**Final Fixed Resistor Values**:
*   `R1 = 76Ω`
*   `R2 = 48.0kΩ`
*   `R3 = 75.0kΩ`
*   `R4 = 300Ω`

## FPGA Digital Clock
**2023** · *Verilog, Intel Quartus*

Designed a synchronous digital clock system on a Cyclone IV FPGA. The system utilizes a cascade of frequency dividers to step down the 50MHz onboard oscillator to a 1Hz timebase. The display logic multiplexes four 7-segment displays to show hours and minutes, featuring user-settable time controls.