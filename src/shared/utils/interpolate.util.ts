interface Interpolate {
    source: string;
    values: {
        [index: string]: string | number | boolean;
    };
}

export const interpolate = ({ source, values }: Interpolate): string =>
    source.replace(/\{(\w+)\}/g, (_, expr) => (values[expr] ?? expr).toString());
