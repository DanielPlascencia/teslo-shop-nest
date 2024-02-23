import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ User ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
        imports: [ ConfigModule ], // Se necesita IMPORTAR el MÓDULO
        inject: [ ConfigService ], // Y después INYECTAR el SERVICIO
        useFactory: ( configService: ConfigService ) => { // Para poder utilizar sus métodos y propiedades
          // console.log('asd', process.env.JWT_SECRET);
          // console.log('secret', configService.get('JWT_SECRET'));
          return {
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: '2h',
            },
          }
        }
    }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '2h',
    //   },
    // }),
  ],
  exports: [ TypeOrmModule, JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}
