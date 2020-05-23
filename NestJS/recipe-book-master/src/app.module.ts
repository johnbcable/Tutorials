import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/recipe-app',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }),
    RecipeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

