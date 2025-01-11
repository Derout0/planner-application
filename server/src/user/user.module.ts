import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TasksService } from 'src/tasks/tasks.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, TasksService],
	exports: [UserService]
})
export class UserModule {}
