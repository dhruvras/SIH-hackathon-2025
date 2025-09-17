// utils/convertSensors.js

const ADC_MAX = 1023;

// conversion helper
function linearMap(adc, min, max) {
  const val = min + (adc / ADC_MAX) * (max - min);
  return val;
}

// -------------- ranges (change if you want) --------------
const RANGES = {
  N: { min: 0, max: 200 },    // ppm
  P: { min: 0, max: 100 },    // ppm
  K: { min: 0, max: 300 },    // ppm
  moisture: { min: 0, max: 100 } // percent
};

// -------------- converters --------------
export function adcToNitrogen(adc) {
  const v = linearMap(adc, RANGES.N.min, RANGES.N.max);
  return Math.round(v); // ppm integer
}

export function adcToPhosphorus(adc) {
  const v = linearMap(adc, RANGES.P.min, RANGES.P.max);
  return Math.round(v);
}

export function adcToPotassium(adc) {
  const v = linearMap(adc, RANGES.K.min, RANGES.K.max);
  return Math.round(v);
}

// Soil moisture: two variants provided.
// 1) normal: adc=0 -> 0% (dry), adc=1023 -> 100% (wet)
// 2) inverted: adc=0 -> 100% (wet), adc=1023 -> 0% (dry)
// Test which matches your sensor and pick accordingly.
export function adcToSoilMoisture(adc, { inverted = false } = {}) {
  const raw = linearMap(adc, RANGES.moisture.min, RANGES.moisture.max);
  const val = inverted ? (100 - raw) : raw;
  return Math.round(val); // percent
}

// -------------- simple level classification --------------
export function classifyN(ppm) {
  if (ppm < 40) return "Low";
  if (ppm <= 120) return "Ideal";
  return "High";
}
export function classifyP(ppm) {
  if (ppm < 10) return "Low";
  if (ppm <= 40) return "Ideal";
  return "High";
}
export function classifyK(ppm) {
  if (ppm < 50) return "Low";
  if (ppm <= 200) return "Ideal";
  return "High";
}
export function classifyMoisture(percent) {
  if (percent < 20) return "Dry";
  if (percent <= 70) return "Ideal";
  return "Wet";
}

// Example helper that converts a full sensor reading object
export function convertAll(adcObj, opts = { moistureInverted: false }) {
  // adcObj = { n: 512, p: 512, k: 512, moisture: 512 }
  const n = adcToNitrogen(adcObj.n);
  const p = adcToPhosphorus(adcObj.p);
  const k = adcToPotassium(adcObj.k);
  const moisture = adcToSoilMoisture(adcObj.moisture, { inverted: opts.moistureInverted });

  return {
    N: { value: n, level: classifyN(n) },
    P: { value: p, level: classifyP(p) },
    K: { value: k, level: classifyK(k) },
    moisture: { value: moisture, level: classifyMoisture(moisture) }
  };
}
