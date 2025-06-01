class SpotDraftClient {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;
  private headers: { [key: string]: string };

  constructor(clientId: string, clientSecret: string, baseUrl?: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseUrl = baseUrl !== undefined ? baseUrl : 'https://api.in.spotdraft.com/api';

    this.headers = {
      'Client-ID': this.clientId,
      'Client-Secret': this.clientSecret,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async get(endpoint: string, queryParams?: URLSearchParams) {
    const url = queryParams ? `${this.baseUrl}${endpoint}?${queryParams.toString()}` : `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`SpotDraft API Error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const json = await response.json();
    // console.log("**************", JSON.stringify(json, null, 2));
    return json;
  }

  async post(endpoint: string, body?: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`SpotDraft API Error: ${response.status} ${response.statusText} - ${errorBody}`);
    }
    // For 204 No Content, response.json() will fail.
    if (response.status === 204) {
      return null;
    }
    return response.json();
  }
}

const spotdraftClientId = process.env.SPOTDRAFT_CLIENT_ID;
const spotdraftClientSecret = process.env.SPOTDRAFT_CLIENT_SECRET;
const spotdraftBaseUrl = process.env.SPOTDRAFT_BASE_URL;

if (!spotdraftClientId || !spotdraftClientSecret) {
  console.error('Please set SPOTDRAFT_CLIENT_ID and SPOTDRAFT_CLIENT_SECRET environment variables');
  process.exit(1);
}

const spotdraftClient = new SpotDraftClient(spotdraftClientId, spotdraftClientSecret, spotdraftBaseUrl);
export default spotdraftClient;
