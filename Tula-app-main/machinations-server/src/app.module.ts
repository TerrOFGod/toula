import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { PoolModule } from './pool/pool.module';
import { TeamModule } from './team/team.module';
import { GameSessionModule } from './game-session/game-session.module';
import { GameSimulationModule } from './game-simulation/game-simulation.module';
import { UserEntity } from './user/entities/user.entity';
import { BoardEntity } from './board/entities/board.entity';
import { PoolEntity } from './pool/entities/pool.entity';
import { TeamEntity } from './team/entities/team.entity';
import { GameSessionEntity } from './game-session/entities/game-session.entity';
import { GameSimulationEntity } from './game-simulation/entities/game-simulation.entity';
import { StatisticsModule } from './statistics/statistics.module';
import { GameIterationModule } from './game-iteration/game-iteration.module';
import { DataParserService } from './data-parser/data-parser.service';
import { DataParserController } from './data-parser/data-parser.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Vselord2002',
      database: 'tula',
      entities: [UserEntity, BoardEntity, PoolEntity, TeamEntity, GameSessionEntity, GameSimulationEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BoardModule,
    UserModule,
    PoolModule,
    TeamModule,
    GameSessionModule,
    GameSimulationModule,
    StatisticsModule,
    GameIterationModule,],
  controllers: [AppController, DataParserController],
  providers: [AppService, DataParserService],
})
export class AppModule { }
