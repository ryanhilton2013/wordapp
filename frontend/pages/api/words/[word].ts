export default function handler(req: any, res: any) {
    const { word } = req.query; 
    const baseUrl = process.env.WORDAPP_BACKEND_API_URL;
    const apiKey = process.env.WORDAPP_BACKEND_API_KEY;
    const url = `${baseUrl}/${word}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `ApiKey ${apiKey}`
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                res.status(response.status).json(error);
            });
        }
        return response.json(); 
    })
    .then(data => {
        let definitions: string[] = [];
        if (data.results) {
            for (const result of data.results) {
                definitions.push(result.definition);
            }
        }
        const responseData = { 'definitions': definitions };
        res.status(200).json(responseData); 
    })
    .catch(error => {
        let errorMessage : string = "Unknown Error"
        if (error instanceof TypeError) {
            errorMessage = `Unable to perform request (${error.message}), contact support.`;
        } else if (error instanceof Response) {
            error.text().then(errorText => {
                errorMessage = `Unable to perform request (${errorText}), contact support.`;
            });
        }     
        res.status(500).json({ error: errorMessage }); 
    });
}
