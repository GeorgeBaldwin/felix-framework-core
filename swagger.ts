import * as swaggerUiExpress from 'swagger-ui-express';
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { routingControllersOptions } from './routingControllerOptions';


export function initSwagger(_app: any ){
    const { defaultMetadataStorage } = require('class-transformer/cjs/storage')

    // Parse class-validator classes into JSON Schema:
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    })
    
    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        description: 'This service is used to retrive, update, and modify user data`',
        title: 'User Service',
        version: '1.0.0',
      },
    });
    _app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));    
}
 