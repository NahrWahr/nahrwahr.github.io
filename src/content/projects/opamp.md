---
title: "550 GHz GBW Op-Amp (Cadence)"
description: "A three-stage fully differential operational amplifier designed in Cadence. Features CMFB, high-swing current mirrors, and optimized feed-forward/back paths to achieve 550 GHz GBW."
imageUrl: "/images/Magnum_Opus_Schematic.webp"
order: 3
---

## Wideband Op-Amp Architecture

Designed a high-speed three-stage fully differential amplifier from transistor-level to layout evaluation natively in **Cadence Virtuoso**. The design focuses on maximizing bandwidth through a combination of Feed-Forward and Feed-Back compensation strategies.

### Core Topology Breakdown

The architecture utilizes advanced mixed-signal optimization strategies to meet stringent performance requirements:
* **Gain Stage (Triple Cascode NMOS):** Provides massive open-loop gain while maintaining a dominant pole for stability.
* **Swing Stage (Sooch-Current PMOS):** Engineered to handle large output voltage excursions without compromising linearity.
* **Output Buffer (Source Follower):** Designed to drive capacitive loads while minimizing output impedance.
* **Biasing Networks:** Precision high-swing current mirrors ensure stable operating points across PVT corners.

### Topology Highlights & Stabilization

Because the three stages accumulated significant internal phase delays, strict hierarchical control loops were established:
1. **Local & Global CMFB:** Dedicated high-speed loops monitor tail integrity and global output $V_{out}$ balance.
2. **Nested Compensation:** Employs Ahuja buffers and a high-speed Feedforward path to manipulate phase before gain crossover.

![Full Circuit Schematic](/images/Magnum_Opus_Schematic.webp)

### Performance Verification

Simulated against full PVT corners and Monte-Carlo extraction parameters:
- **Gain Bandwidth Product:** $550\text{ GHz}$
- **Phase Margin:** $>60^{\circ}$
- **Closed Loop Gain:** $\approx 66\text{ dB}$
- **Architectural Depth:** Includes full biasing, CMFB, and compensation networks.

<div style="display: flex; gap: 2rem; margin-top: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <img src="/images/Magnum_Opus_Closed_Loop_Freq_AC_Sim.webp" alt="AC Sim" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
    <p style="text-align: center; font-size: 0.85rem; color: #8b7969; margin-top: 0.5rem; font-family: var(--font-special);">Loop Gain & Phase Margin Analysis</p>
  </div>
  <div style="flex: 1; min-width: 300px;">
    <img src="/images/Magnum_Opus_Closed_Loop_Freq_Transient_Sim.webp" alt="Transient Sim" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
    <p style="text-align: center; font-size: 0.85rem; color: #8b7969; margin-top: 0.5rem; font-family: var(--font-special);">Transient simulation results.</p>
  </div>
</div>
