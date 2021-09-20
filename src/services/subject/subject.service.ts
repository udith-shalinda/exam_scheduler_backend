import { ISubject } from "@functions/subject/subject.interface";
import {
  DbConnection,
  DbContext,
  Repository,
} from "src/shared/dbContext/_dbContext";
import {
  BadRequestException,
  InternalServerException,
} from "src/shared/exceptionManager";
import { Subject } from "src/models";

export class SubjectService {
  private readonly _dbContext: DbContext = this._dbConnection.dbContext;

  constructor(private readonly _dbConnection: DbConnection) {
  }

  public async createSubject(SubjectInput: ISubject): Promise<ISubject | null> {
    
    const SubjectRepo: Repository<Subject> = await this._dbContext.getRepository(
      Subject
    );
    const body: any = SubjectInput;
    try {
      return await (await SubjectRepo.create(body)).save();
    } catch (error) {
      throw new InternalServerException("Creating Subject Failed");
    }
  }
  public async updateSubject(SubjectInput: ISubject): Promise<boolean> {
    if (!SubjectInput.id) {
      throw new BadRequestException("Invalid body");
    }
    const SubjectRepo: Repository<Subject> = await this._dbContext.getRepository(
      Subject
    );
    try {
      const body: any = {
        ...SubjectInput,
        id: undefined
      };
      await await SubjectRepo.update(body, {
        where: { id: SubjectInput.id },
      });
      return true;
    } catch (error) {
      throw new InternalServerException("Updating Subject Failed");
    }
  }
  public async deleteSubject(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException("Invalid body");
    }
    const SubjectRepo: Repository<Subject> = await this._dbContext.getRepository(
      Subject
    );
    try {
      await await SubjectRepo.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new InternalServerException("Deleting Subject Failed");
    }
  }
  public async getAllSubjectsByExam(id: number): Promise<ISubject[]> {
    
    const SubjectRepo: Repository<Subject> = await this._dbContext.getRepository(
      Subject
    );
    try {
      return await await SubjectRepo.findAll({ where: { examId: id }, order: [['time', 'ASC']] } );
    } catch (error) {
      throw new InternalServerException("Finding all Subjects failed");
    }
  }
}
