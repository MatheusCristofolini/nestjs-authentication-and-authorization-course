import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { IamModule } from './iam/iam.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', //process.env.DATABASE_HOST, // database host
      port: 5432, //+process.env.DATABASE_PORT, // database host
      username: 'postgres', //process.env.DATABASE_USER, // username
      password: 'admin', //process.env.DATABASE_PASSWORD, // user password
      database: 'postgres', //process.env.DATABASE_NAME, // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)  })],
    }),
    IamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
