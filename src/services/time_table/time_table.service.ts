import {
  ICreateTimeTable,
  ITimeTable,
} from "@functions/time_table/time_table.interface";
import { TimeTable } from "src/models/time_table.model";
import {
  DbConnection,
  DbContext,
  Repository,
} from "src/shared/dbContext/_dbContext";
import {
  BadRequestException,
  InternalServerException,
} from "src/shared/exceptionManager";

export class TimeTableService {
  private readonly _dbContext: DbContext = this._dbConnection.dbContext;

  constructor(private readonly _dbConnection: DbConnection) {}

  public async createTimeTable(
    TimeTableInput: ICreateTimeTable[]
  ): Promise<ITimeTable[] | null> {
    // if (!TimeTableInput.date || !TimeTableInput.start || !TimeTableInput.end) {
    //   throw new BadRequestException("Invalid body");
    // }
    const TimeTableRepo: Repository<TimeTable> =
      await this._dbContext.getRepository(TimeTable);
    const body: any[] = TimeTableInput.map((input: any) => {
      return {
        date: input.date,
      start: input.start,
      end: input.end,
      examId: input.examId,
      subjectId: input.subjectId,
      hallId: input.hallId,}
    }) ;
    try {
      return (await TimeTableRepo.bulkCreate(body));
    } catch (error) {
      console.log(error);
      throw new InternalServerException("Creating TimeTable Failed");
    }
  }
  public async updateTimeTable(TimeTableInput: ITimeTable): Promise<boolean> {
    if (!TimeTableInput.id) {
      throw new BadRequestException("Invalid body");
    }
    const TimeTableRepo: Repository<TimeTable> =
      await this._dbContext.getRepository(TimeTable);
    try {
      const body: any = {
        date: TimeTableInput.date,
        start: TimeTableInput.start,
        end: TimeTableInput.end,
        examId: TimeTableInput.examId,
        subjectId: TimeTableInput.subjectId,
        hallId: TimeTableInput.hallId,
      };
      await await TimeTableRepo.update(body, {
        where: { id: TimeTableInput.id },
      });
      return true;
    } catch (error) {
      throw new InternalServerException("Updating TimeTable Failed");
    }
  }
  public async deleteTimeTable(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException("Invalid body");
    }
    const TimeTableRepo: Repository<TimeTable> =
      await this._dbContext.getRepository(TimeTable);
    try {
      await await TimeTableRepo.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new InternalServerException("Deleting TimeTable Failed");
    }
  }
  public async getAllTimeTablesByExam(examId: number): Promise<ITimeTable[] | any> {
    const TimeTableRepo: Repository<TimeTable> =
      await this._dbContext.getRepository(TimeTable);
    try {
      return await TimeTableRepo.findAll({ where: {examId}});
    } catch (error) {
      throw new InternalServerException("Finding all TimeTables failed");
    }
  }
}
