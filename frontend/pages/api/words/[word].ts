export default async function handler(req: any, res: any) {
    const { word } = req.query; 
    try {    
        const baseUrl =  process.env.WORDAPP_BACKEND_API_URL
        const apiKey = process.env.WORDAPP_BACKEND_API_KEY
        const url = `${baseUrl}/${word}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${apiKey}`                
            },
        });
        if (!response.ok) {
            res.status(response.status).json(response)
        } else {            
            const data = await response.json();
            let definitions: string[]= []
            if(data.results){
                for( const result of data.results) {
                    definitions.push(result.definition)
                }
            } 
            const responseData = {'definitions': definitions }
            res.status(200).json(responseData);    
        }
      } catch (error) {
        res.status(500)
      }    
}