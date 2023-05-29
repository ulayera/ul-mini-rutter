import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04';
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
import { ShopifyWrapper } from './shopify-wrapper/shopify-wrapper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: ShopifyWrapper,
      useFactory: () => {
        return {
          shopify: shopifyApi({
            apiKey: process.env.SHOPIFY_CLIENT_ID,
            apiSecretKey: process.env.SHOPIFY_CLIENT_SECRET,
            hostName: 'localhost',
            scopes: ['read_products', 'read_all_orders'],
            apiVersion: ApiVersion.April23,
            isEmbeddedApp: false,
            restResources,
          }),
        };
      },
    },
  ],
})
export class AppModule {}
