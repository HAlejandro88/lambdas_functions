exports.handler = async (event, context) => {
    const s3 = new AWS.S3();

    const bucketName = 'nombre-del-bucket'; // Cambia esto al nombre de tu 
bucket
    const maxSpaceGB = 7;
    const maxSpaceBytes = maxSpaceGB * 1024 * 1024 * 1024;

    try {
        const response = await s3.headBucket({ Bucket: bucketName 
}).promise();
        const spaceUsedBytes = response.ContentLength;

        const spaceUsedGB = spaceUsedBytes / (1024 * 1024 * 1024);
        const spaceUsedPercentage = (spaceUsedBytes / maxSpaceBytes) * 
100;

        return {
            statusCode: 200,
            body: JSON.stringify({
                spaceUsedGB: spaceUsedGB.toFixed(2),
                spaceUsedPercentage: spaceUsedPercentage.toFixed(2)
            })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al obtener el espacio 
utilizado de S3' })
        };
    }
};

