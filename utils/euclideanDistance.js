function calculateVectorDifference(vector1, vector2) {
    if (vector1.length !== vector2.length) {
        throw new Error("Vectors must be of the same length");
    }

    let sumOfSquares = 0;

    for (let i = 0; i < vector1.length; i++) {
        sumOfSquares += Math.pow(vector1[i] - vector2[i], 2);
    }

    return Math.sqrt(sumOfSquares);
}

module.exports = calculateVectorDifference;