import { URLSearchParams } from '@angular/http';
import { environment } from './environments/environment';

class Configuration {
    private static _instance: Configuration;

    static getInstance(): Configuration {
        if (Configuration._instance == null) {
            this._instance = new Configuration();
        }
        return this._instance;
    }

    getApiAddress(): string {
        return environment.apiUrl;
    }

    urlencode(data: Object): string {
        const urlSearchParams = new URLSearchParams();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                urlSearchParams.append(key, data[key]);
            }
        }
        return urlSearchParams.toString();
    }
}

export let config: Configuration = Configuration.getInstance()