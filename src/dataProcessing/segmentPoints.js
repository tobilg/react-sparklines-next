// Segments an array of points into continuous valid segments
// Points with valid=false create gaps between segments
export default (points) => {
    const segments = [];
    let currentSegment = [];

    for (let i = 0; i < points.length; i++) {
        const point = points[i];

        if (point.valid) {
            currentSegment.push(point);
        } else {
            // Invalid point - end current segment if it has points
            if (currentSegment.length > 0) {
                segments.push(currentSegment);
                currentSegment = [];
            }
        }
    }

    // Add final segment if it has points
    if (currentSegment.length > 0) {
        segments.push(currentSegment);
    }

    return segments;
};
