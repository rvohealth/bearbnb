export interface paths {
    "/v1/guest/places": {
        parameters: {
            query?: {
                /** @description Scroll pagination cursor */
                cursor?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Place index endpoint for Guests */
        get: {
            parameters: {
                query?: {
                    /** @description Scroll pagination cursor */
                    cursor?: string | null;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            cursor: string | null;
                            results: components["schemas"]["PlaceSummaryForGuests"][];
                        };
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/guest/places/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        /** @description Place show endpoint for Guests */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PlaceForGuests"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/host/localized-texts/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Destroy a LocalizedText */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success, no content */
                204: components["responses"]["NoContent"];
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        options?: never;
        head?: never;
        /** @description Update a LocalizedText */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        /** @enum {string} */
                        locale?: "en-US" | "es-ES";
                        markdown?: string | null;
                        title?: string | null;
                    };
                };
            };
            responses: {
                /** @description Success, no content */
                204: components["responses"]["NoContent"];
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        trace?: never;
    };
    "/v1/host/places": {
        parameters: {
            query?: {
                /** @description Scroll pagination cursor */
                cursor?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Paginated index of Places */
        get: {
            parameters: {
                query?: {
                    /** @description Scroll pagination cursor */
                    cursor?: string | null;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            cursor: string | null;
                            results: components["schemas"]["PlaceSummary"][];
                        };
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        put?: never;
        /** @description Create a Place */
        post: {
            parameters: {
                query?: {
                    /** @description Scroll pagination cursor */
                    cursor?: string | null;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                        sleeps?: number;
                        /** @enum {string} */
                        style?: "cabin" | "cave" | "cottage" | "dump" | "lean_to" | "tent" | "treehouse";
                    };
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Place"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/host/places/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        /** @description Fetch a Place */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Place"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        put?: never;
        post?: never;
        /** @description Destroy a Place */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success, no content */
                204: components["responses"]["NoContent"];
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        options?: never;
        head?: never;
        /** @description Update a Place */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                        sleeps?: number;
                        /** @enum {string} */
                        style?: "cabin" | "cave" | "cottage" | "dump" | "lean_to" | "tent" | "treehouse";
                    };
                };
            };
            responses: {
                /** @description Success, no content */
                204: components["responses"]["NoContent"];
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        trace?: never;
    };
    "/v1/host/places/{placeId}/rooms": {
        parameters: {
            query?: {
                /** @description Scroll pagination cursor */
                cursor?: string | null;
            };
            header?: never;
            path: {
                placeId: string;
            };
            cookie?: never;
        };
        /** @description Paginated index of Rooms */
        get: {
            parameters: {
                query?: {
                    /** @description Scroll pagination cursor */
                    cursor?: string | null;
                };
                header?: never;
                path: {
                    placeId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            cursor: string | null;
                            results: (components["schemas"]["RoomBathroomSummary"] | components["schemas"]["RoomBedroomSummary"] | components["schemas"]["RoomDenSummary"] | components["schemas"]["RoomKitchenSummary"] | components["schemas"]["RoomLivingRoomSummary"])[];
                        };
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        put?: never;
        /** @description Create a Room */
        post: {
            parameters: {
                query?: {
                    /** @description Scroll pagination cursor */
                    cursor?: string | null;
                };
                header?: never;
                path: {
                    placeId: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        appliances?: ("dishwasher" | "microwave" | "oven" | "stove")[];
                        /** @enum {string|null} */
                        bathOrShowerStyle?: "bath" | "bath_and_shower" | "none" | "shower" | null;
                        bedTypes?: ("bunk" | "cot" | "king" | "queen" | "sofabed" | "twin")[];
                        position?: number | null;
                        /** @enum {string} */
                        type?: "Bathroom" | "Bedroom" | "Den" | "Kitchen" | "LivingRoom";
                    };
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["RoomBathroom"] | components["schemas"]["RoomBedroom"] | components["schemas"]["RoomDen"] | components["schemas"]["RoomKitchen"] | components["schemas"]["RoomLivingRoom"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/host/places/{placeId}/rooms/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                placeId: string;
                id: string;
            };
            cookie?: never;
        };
        /** @description Fetch a Room */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    placeId: string;
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["RoomBathroom"] | components["schemas"]["RoomBedroom"] | components["schemas"]["RoomDen"] | components["schemas"]["RoomKitchen"] | components["schemas"]["RoomLivingRoom"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        put?: never;
        post?: never;
        /** @description Destroy a Room */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    placeId: string;
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success, no content */
                204: components["responses"]["NoContent"];
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        options?: never;
        head?: never;
        /** @description Update a Room */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    placeId: string;
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        appliances?: ("dishwasher" | "microwave" | "oven" | "stove")[];
                        /** @enum {string|null} */
                        bathOrShowerStyle?: "bath" | "bath_and_shower" | "none" | "shower" | null;
                        bedTypes?: ("bunk" | "cot" | "king" | "queen" | "sofabed" | "twin")[];
                        position?: number | null;
                    };
                };
            };
            responses: {
                /** @description Success, no content */
                204: components["responses"]["NoContent"];
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                404: components["responses"]["NotFound"];
                409: components["responses"]["Conflict"];
                422: components["responses"]["ValidationErrors"];
                500: components["responses"]["InternalServerError"];
            };
        };
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Appliance: {
            label: string;
            /** @enum {string} */
            value: "dishwasher" | "microwave" | "oven" | "stove";
        };
        BathOrShowerStyle: {
            label: string;
            /** @enum {string} */
            value: "bath" | "bath_and_shower" | "none" | "shower";
        };
        BedType: {
            label: string;
            /** @enum {string} */
            value: "bunk" | "cot" | "king" | "queen" | "sofabed" | "twin";
        };
        OpenapiValidationErrors: {
            /** @enum {string} */
            type: "openapi";
            /** @enum {string} */
            target: "requestBody" | "query" | "headers" | "responseBody";
            errors: {
                instancePath: string;
                schemaPath: string;
                keyword: string;
                message: string;
                params: Record<string, never>;
            }[];
        };
        Place: {
            /** Format: date-time */
            deletedAt: string | null;
            /** Format: bigint */
            id: string | number | bigint;
            name: string;
            sleeps: number;
            /** @enum {string} */
            style: "cabin" | "cave" | "cottage" | "dump" | "lean_to" | "tent" | "treehouse";
        };
        PlaceForGuests: {
            displayStyle: string;
            /** Format: bigint */
            id: string | number | bigint;
            rooms: (components["schemas"]["RoomBathroomForGuests"] | components["schemas"]["RoomBedroomForGuests"] | components["schemas"]["RoomDenForGuests"] | components["schemas"]["RoomKitchenForGuests"] | components["schemas"]["RoomLivingRoomForGuests"])[];
            sleeps: number;
            /** @enum {string} */
            style: "cabin" | "cave" | "cottage" | "dump" | "lean_to" | "tent" | "treehouse";
            title: string;
        };
        PlaceSummary: {
            /** Format: bigint */
            id: string | number | bigint;
            name: string;
        };
        PlaceSummaryForGuests: {
            /** Format: bigint */
            id: string | number | bigint;
            title: string;
        };
        RoomBathroom: {
            /** @enum {string|null} */
            bathOrShowerStyle: "bath" | "bath_and_shower" | "none" | "shower" | null;
            /** Format: date-time */
            deletedAt: string | null;
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "Bathroom";
        };
        RoomBathroomForGuests: {
            bathOrShowerStyle: components["schemas"]["BathOrShowerStyle"];
            displayType: string;
            /** Format: bigint */
            id: string | number | bigint;
            title: string;
            /** @enum {string} */
            type: "Bathroom" | "Bedroom" | "Den" | "Kitchen" | "LivingRoom";
        };
        RoomBathroomSummary: {
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "Bathroom";
        };
        RoomBedroom: {
            bedTypes: ("bunk" | "cot" | "king" | "queen" | "sofabed" | "twin")[];
            /** Format: date-time */
            deletedAt: string | null;
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "Bedroom";
        };
        RoomBedroomForGuests: {
            bedTypes: components["schemas"]["BedType"][];
            displayType: string;
            /** Format: bigint */
            id: string | number | bigint;
            title: string;
            /** @enum {string} */
            type: "Bathroom" | "Bedroom" | "Den" | "Kitchen" | "LivingRoom";
        };
        RoomBedroomSummary: {
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "Bedroom";
        };
        RoomDen: {
            /** Format: date-time */
            deletedAt: string | null;
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "Den";
        };
        RoomDenForGuests: {
            displayType: string;
            /** Format: bigint */
            id: string | number | bigint;
            title: string;
            /** @enum {string} */
            type: "Bathroom" | "Bedroom" | "Den" | "Kitchen" | "LivingRoom";
        };
        RoomDenSummary: {
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "Den";
        };
        RoomKitchen: {
            appliances: ("dishwasher" | "microwave" | "oven" | "stove")[];
            /** Format: date-time */
            deletedAt: string | null;
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "Kitchen";
        };
        RoomKitchenForGuests: {
            appliances: components["schemas"]["Appliance"][];
            displayType: string;
            /** Format: bigint */
            id: string | number | bigint;
            title: string;
            /** @enum {string} */
            type: "Bathroom" | "Bedroom" | "Den" | "Kitchen" | "LivingRoom";
        };
        RoomKitchenSummary: {
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "Kitchen";
        };
        RoomLivingRoom: {
            /** Format: date-time */
            deletedAt: string | null;
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "LivingRoom";
        };
        RoomLivingRoomForGuests: {
            displayType: string;
            /** Format: bigint */
            id: string | number | bigint;
            title: string;
            /** @enum {string} */
            type: "Bathroom" | "Bedroom" | "Den" | "Kitchen" | "LivingRoom";
        };
        RoomLivingRoomSummary: {
            /** Format: bigint */
            id: string | number | bigint;
            position: number | null;
            /** @enum {string} */
            type: "LivingRoom";
        };
        ValidationErrors: {
            /** @enum {string} */
            type: "validation";
            errors: {
                [key: string]: string[];
            };
        };
    };
    responses: {
        /** @description The request has succeeded, but there is no content to render */
        NoContent: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The server would not process the request due to something the server considered to be a client error */
        BadRequest: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The request was not successful because it lacks valid authentication credentials for the requested resource */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Understood the request, but refused to process it */
        Forbidden: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The specified resource was not found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The request failed because a conflict was detected with the given request params */
        Conflict: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The request failed to process due to validation errors with the provided values */
        ValidationErrors: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ValidationErrors"];
            };
        };
        /** @description the server encountered an unexpected condition that prevented it from fulfilling the request */
        InternalServerError: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
