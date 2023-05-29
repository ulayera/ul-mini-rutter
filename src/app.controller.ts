import { Controller, Get, Query, Req } from '@nestjs/common';
import { ShopifyWrapper } from './shopify-wrapper/shopify-wrapper';

@Controller()
export class AppController {
  constructor(
    private readonly wrapper: ShopifyWrapper,
  ) {}

  @Get()
  async getShopifyHelloWorld(@Req() request: any): Promise<boolean> {
    return await this.wrapper.shopify.utils.validateHmac(request.query).catch((error) => false);
  }
}
