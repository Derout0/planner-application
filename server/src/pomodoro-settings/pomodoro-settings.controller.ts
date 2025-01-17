import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PomodoroSettingsService } from './pomodoro-settings.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { PomodoroSettingsDTO } from 'src/pomodoro-settings/dto/pomodoro-settings.dto'

@Controller('pomodoro-settings')
export class PomodoroSettingsController {
	constructor(
		private readonly pomodoroSettingsService: PomodoroSettingsService
	) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('update')
	@Auth()
	async updateUser(
		@CurrentUser('id') id: string,
		@Body() dto: PomodoroSettingsDTO
	) {
		return this.pomodoroSettingsService.update(id, dto)
	}
}
