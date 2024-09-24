// Define interfaces for the configuration
interface ColorConfig {
    color: string;
    enabled: boolean;
}

export interface Config {
    colors: ColorConfig[];
    speed: number;
    horizontalPressure: number;
    verticalPressure: number;
    waveFrequencyX: number;
    waveFrequencyY: number;
    waveAmplitude: number;
    shadows: number;
    highlights: number;
    colorBrightness: number;
    colorSaturation: number;
    wireframe: boolean;
    colorBlending: number;
    backgroundColor: string;
    backgroundAlpha: number;
    resolution: number;
}
