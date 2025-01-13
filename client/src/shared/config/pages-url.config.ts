export class AppPaths {
	private ROOT = '/app'

	HOME = this.ROOT
	TASKS = `${this.ROOT}/tasks`
	HABITS = `${this.ROOT}/habits`
	TIMER = `${this.ROOT}/timer`
	TIME_BLOCKING = `${this.ROOT}/time-blocking`
	SETTINGS = `${this.ROOT}/settings`
}

export const AppRoutes = new AppPaths()
