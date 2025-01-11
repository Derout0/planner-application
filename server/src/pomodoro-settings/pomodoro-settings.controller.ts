import { Controller } from '@nestjs/common';
import { PomodoroSettingsService } from './pomodoro-settings.service';

@Controller('pomodoro-settings')
export class PomodoroSettingsController {
  constructor(private readonly pomodoroSettingsService: PomodoroSettingsService) {}
}
