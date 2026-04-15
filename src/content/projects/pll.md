---
title: "Fully Differential Quarter Rate CDR @ 40GB/s in 22nm"
description: "Design of a clock-data recovery circuit for NRZ data at 40 Gbaud in 22nm from Global Foundries. Built 4 stage ring oscillator for 8 phase clock. CML latches, XORs and Charge Pumps for 50mW power draw pre-layout."
imageUrl: "/images/Ring-Oscillator-Top-Level.webp"
order: 2
---

# Fully Differential Quarter Rate CDR

Design of a high-performance **Clock and Data Recovery (CDR)** circuit optimized for NRZ data streams at **40 Gbaud** utilizing the **22nm FDSOI** process node from GlobalFoundries. 

## Architectural Highlights

The system leverages a quarter-rate architecture to mitigate power consumption while maintaining stringent phase alignment requirements at high data rates.

### 8-Phase Clock Generation
Built a high-linearity **4-stage Ring Oscillator** designed to generate an **8-phase clock** signal. This multi-phase approach allows the phase detector to operate at a fraction of the primary data rate, significantly easing the timing constraints on individual components.

### High-Speed Building Blocks
The implementation features a suite of custom-designed Current-Mode Logic (CML) components to ensure robust performance.

<div style="display: flex; gap: 2rem; margin-top: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <img src="/images/Ring-Oscillator-Top-Level.webp" alt="Ring Oscillator" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
    <p style="text-align: center; font-size: 0.85rem; color: #8d9978; margin-top: 0.5rem; font-family: var(--font-special);">4-Stage Differential Ring Oscillator (VCO)</p>
  </div>
  <div style="flex: 1; min-width: 300px;">
    <img src="/images/Oscillator-Stage.webp" alt="Oscillator Stage" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
    <p style="text-align: center; font-size: 0.85rem; color: #8d9978; margin-top: 0.5rem; font-family: var(--font-special);">Single Delay Stage Architecture</p>
  </div>
</div>

<div style="display: flex; gap: 2rem; margin-top: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <img src="/images/XOR.webp" alt="XOR Phase Detector" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
    <p style="text-align: center; font-size: 0.85rem; color: #8d9978; margin-top: 0.5rem; font-family: var(--font-special);">CML XOR Phase Detector Block</p>
  </div>
  <div style="flex: 1; min-width: 300px;">
    <img src="/images/Charge-Pump.webp" alt="Charge Pump" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
    <p style="text-align: center; font-size: 0.85rem; color: #8d9978; margin-top: 0.5rem; font-family: var(--font-special);">High-Swing Matching Charge Pump</p>
  </div>
</div>

![CML Latches](/images/Latches_4Phase.webp)


## Performance & Analysis

### Loop Dynamics
Conducted extensive **PSS + PNOISE** analysis in SpectreRF to characterize the integrated jitter and phase noise. The pre-layout power consumption is strictly contained within a **50mW** envelope, meeting aggressive efficiency targets for next-gen wireline interfaces.

![Charge Pump](/images/Charge-Pump.webp)
![Frequency Control Loop](/images/Freq-Ctrl-Full.webp)

### Signal Integrity: Eye Diagrams
Validation of the CDR lock was confirmed through recovered data samples at the final quarter-rate output stages.

![Eye Diagram Analysis](/images/Eye-75-100.webp)
