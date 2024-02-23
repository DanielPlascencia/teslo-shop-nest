import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";


export const RawHeaders = createParamDecorator( 
  ( data: string, ctx: ExecutionContext ) => {
    // const req = ctx.switchToHttp().getRequest();

    if( !ctx.switchToHttp().getRequest().rawHeaders ) 
      throw new InternalServerErrorException('rawHeaders does not exist');

    return ctx.switchToHttp().getRequest().rawHeaders;    
  }
);