import arrayMin from './min';
import arrayMax from './max';

// Helper function to check if a value is valid (not null, NaN, or Infinity)
const isValidValue = (value) => {
    return value !== null &&
           value !== undefined &&
           typeof value === 'number' &&
           !isNaN(value) &&
           isFinite(value);
};

export default ({ data, limit, width = 1, height = 1, margin = 0, max = arrayMax(data), min = arrayMin(data) }) => {

    const len = data.length;

    if (limit && limit < len) {
        data = data.slice(len - limit);
    }

    const vfactor = (height - margin * 2) / ((max - min) || 2);
    const hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0));

    return data.map((d, i) => {
        const valid = isValidValue(d);
        return {
            x: i * hfactor + margin,
            y: valid ? (max === min ? 1 : (max - d)) * vfactor + margin : null,
            valid: valid
        };
    });
};
