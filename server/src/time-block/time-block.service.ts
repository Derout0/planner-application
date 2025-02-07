import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TimeBlockDTO } from 'src/time-block/dto/time-block.dto'

@Injectable()
export class TimeBlockService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.timeBlock.findMany({
			where: { userId },
			orderBy: {
				order: 'asc'
			}
		})
	}

	async create(userId: string, dto: TimeBlockDTO) {
		return this.prisma.timeBlock.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async update(
		userId: string,
		timeBlockId: string,
		dto: Partial<TimeBlockDTO>
	) {
		return this.prisma.timeBlock.update({
			where: {
				id: timeBlockId,
				userId
			},
			data: dto
		})
	}

	async delete(userId: string, timeBlockId: string) {
		return this.prisma.timeBlock.delete({
			where: {
				id: timeBlockId,
				userId
			}
		})
	}

	async updateOrder(ids: string[]) {
		return this.prisma.$transaction(
			ids.map((id, order) =>
				this.prisma.timeBlock.update({
					where: { id },
					data: { order }
				})
			)
		)
	}
}
