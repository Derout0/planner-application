import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PomodoroSettingsService {
	constructor(private prisma: PrismaService) {}

	async getPomodoroSettingsByUserId(userId: string) {
		return this.prisma.userPomodoroSettings.findFirst({
			where: {
				userId
			}
		})
	}
}
