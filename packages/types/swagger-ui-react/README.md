# Installation
> `npm install --save @types/swagger-ui-react`

# Summary
This package contains type definitions for swagger-ui-react (https://github.com/swagger-api/swagger-ui#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/swagger-ui-react.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/swagger-ui-react/index.d.ts)
````ts
import * as React from "react";

interface Request {
    [k: string]: any;
}
interface Response {
    [k: string]: any;
}
type System = any;

type PluginGenerator = (system: System) => object;

type Plugin = object | PluginGenerator;

type Preset = () => unknown;

export interface SwaggerUIProps {
    spec?: object | string | undefined;
    url?: string | undefined;
    layout?: string | undefined;
    onComplete?: ((system: System) => void) | undefined;
    requestInterceptor?: ((req: Request) => Request | Promise<Request>) | undefined;
    responseInterceptor?: ((res: Response) => Response | Promise<Response>) | undefined;
    docExpansion?: "list" | "full" | "none" | undefined;
    defaultModelExpandDepth?: number | undefined;
    defaultModelsExpandDepth?: number | undefined;
    defaultModelRendering?: "example" | "model";
    queryConfigEnabled?: boolean;
    plugins?: Plugin[] | undefined;
    supportedSubmitMethods?: string[] | undefined;
    deepLinking?: boolean | undefined;
    showMutatedRequest?: boolean | undefined;
    showExtensions?: boolean | undefined;
    showCommonExtensions?: boolean | undefined;
    presets?: Preset[] | undefined;
    filter?: string | boolean | undefined;
    requestSnippetsEnabled?: boolean | undefined;
    requestSnippets?: object | undefined;
    displayOperationId?: boolean | undefined;
    tryItOutEnabled?: boolean | undefined;
    displayRequestDuration?: boolean;
    persistAuthorization?: boolean;
    withCredentials?: boolean;
    oauth2RedirectUrl?: string;
}

declare class SwaggerUI extends React.PureComponent<SwaggerUIProps> {}
export default SwaggerUI;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 15:11:36 GMT
 * Dependencies: [@types/react](https://npmjs.com/package/@types/react)

# Credits
These definitions were written by [viki.green](https://github.com/VictoriaGreen93), and [afrkorsakow](https://github.com/afrkorsakow).
