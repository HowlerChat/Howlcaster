import { getConfig } from "../config/config";

export const getServerToken = function(token: string) {
    return () => fetch("https://gateway.howler.chat/oauth2/token",
        {
          method: "POST",
          mode: "cors",
          headers:
          {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({"serverId": "3ec22786-bc0d-4adf-b1f7-69c65c00f162"})}).then(response => {
            return response.json()
          });
}
export const getSpace = function(spaceId: string, token: string) {
    return () => fetch(getConfig().howlerApiUrl + `/v1/spaces/${spaceId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
};

export const getLocalization = function(langId: string) {
    return () => {
        function remap(pair: any[]): (vars: any) => string {
            return (vars: any): string => {
                let template = pair[0] as string;
                
                for (let name of (pair[1] as string[]))
                {
                    template = template.replace("${" + name + "}", vars[name]);
                }

                return template;
            }
        };

        return {
            "direction": "ltr",
            "langId": langId,
            "localizations": {
                "ADVANCED_SETTINGS": remap(["Advanced Settings", []]),
                "COMMUNITY_GUIDELINES": remap(["Community Guidelines", []]),
                "CREATE_SPACE": remap(["Create Space", []]),
                "CREATE_SPACE_PROMPT": remap(["Choose a name for your Space", []]),
                "CREATE_SPACE_TITLE": remap(["Create a Space", []]),
                "JOIN_SPACE": remap(["Join Space", []]),
                "JOIN_SPACE_PROMPT": remap(["Enter the vanity URL or invite URL to join", []]),
                "JOIN_SPACE_TITLE": remap(["Join a Space", []]),
                "SPACE_BANNER_ATTACHMENT": remap(["Drag and drop or click to add a Space banner", []]),
                "SPACE_CREATE_AGREEMENT_LEFT": remap(["By creating a hosted Space you agree to Howler's ", []]),
                "SPACE_CREATE_AGREEMENT_RIGHT": remap([".", []]),
                "SPACE_ICON_ATTACHMENT": remap(["Drag and drop or click to add a Space icon", []]),
                "SPACE_JOIN_AGREEMENT_LEFT": remap(["By joining a hosted Space you agree to Howler's ", []]),
                "SPACE_JOIN_AGREEMENT_RIGHT": remap([".", []]),
                "TOOLTIP_ADD_SPACE": remap(["Add a Space", []]),
                "TOOLTIP_JOIN_SPACE": remap(["Join an existing Space", []]),
                "TOOLTIP_SEARCH_SPACES": remap(["Search for Public Spaces", []]),
            }
        };
    };
}