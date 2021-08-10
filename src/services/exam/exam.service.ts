import { IExam } from "@functions/exam/exam.interface";
import {
  DbConnection,
  DbContext,
  Repository,
} from "src/shared/dbContext/_dbContext";
import {
  BadRequestException,
  InternalServerException,
} from "src/shared/exceptionManager";
import { Exam } from "src/models";

export class ExamService {
  private readonly _dbContext: DbContext = this._dbConnection.dbContext;

  constructor(private readonly _dbConnection: DbConnection) {
  }

  public async createExam(examInput: IExam): Promise<IExam | null> {
    if (!examInput.name) {
      throw new BadRequestException("Invalid body");
    }
    const examRepo: Repository<Exam> = await this._dbContext.getRepository(
      Exam
    );
    const body: any = {
      name: examInput.name,
    };
    try {
      return await (await examRepo.create(body)).save();
    } catch (error) {
      throw new InternalServerException("Creating Exam Failed");
    }
  }
  public async updateExam(examInput: IExam): Promise<boolean> {
    if (!examInput.name && !examInput.id) {
      throw new BadRequestException("Invalid body");
    }
    const examRepo: Repository<Exam> = await this._dbContext.getRepository(
      Exam
    );
    try {
      const body: any = {
        name: examInput.name,
      };
      await await examRepo.update(body, {
        where: { id: examInput.id },
      });
      return true;
    } catch (error) {
      throw new InternalServerException("Updating Exam Failed");
    }
  }
  public async deleteExam(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException("Invalid body");
    }
    const examRepo: Repository<Exam> = await this._dbContext.getRepository(
      Exam
    );
    try {
      await await examRepo.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new InternalServerException("Deleting Exam Failed");
    }
  }
  public async getAllExams(): Promise<IExam[]> {
    
    const examRepo: Repository<Exam> = await this._dbContext.getRepository(
      Exam
    );
    try {
      return await await examRepo.findAll();
    } catch (error) {
      throw new InternalServerException("Finding all exams failed");
    }
  }
}
