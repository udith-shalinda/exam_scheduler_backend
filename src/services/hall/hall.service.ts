import { IHall, IHallAvDateTime } from "@functions/hall/hall.interface";
import {
  DbConnection,
  DbContext,
  Repository,
} from "src/shared/dbContext/_dbContext";
import {
  BadRequestException,
  InternalServerException,
} from "src/shared/exceptionManager";
import { Av_Date, Av_Time, Hall } from "src/models";

export class HallService {
  private readonly _dbContext: DbContext = this._dbConnection.dbContext;

  constructor(private readonly _dbConnection: DbConnection) {
  }

  public async createHall(HallInput: IHall): Promise<IHall | null> {
    
    const _HallRepo: Repository<Hall> = await this._dbContext.getRepository(
      Hall
    );
    const body: any = HallInput;
    console.log(body, HallInput);
    
    try {
      return await (await _HallRepo.create(body, {
        include: [{
          model: Av_Date,
          as: 'all_Av_Dates',
          include: [{
            model: Av_Time,
            as: 'all_Av_Times'
          }]
        }]
      })).save();
    } catch (error) {
      throw new InternalServerException("Creating Hall Failed");
    }
  }
  public async updateHall(HallInput: IHall): Promise<boolean> {
    if (!HallInput.id) {
      throw new BadRequestException("Invalid body");
    }
    const _HallRepo: Repository<Hall> = await this._dbContext.getRepository(
      Hall
    );
    try {
      const body: any = {
        ...HallInput,
        id: undefined
      };
      await await _HallRepo.update(body, {
        where: { id: HallInput.id },
      });
      return true;
    } catch (error) {
      throw new InternalServerException("Updating Hall Failed");
    }
  }
  public async deleteHall(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException("Invalid body");
    }
    const _HallRepo: Repository<Hall> = await this._dbContext.getRepository(
      Hall
    );
    try {
      await await _HallRepo.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new InternalServerException("Deleting Hall Failed");
    }
  }
  public async getAllHallsByExam(id: number): Promise<any[]> {
    
    // const _HallRepo: Repository<Hall> = await this._dbContext.getRepository(
    //   Hall
    // );
    try {
      const [results, metadata] = await this._dbContext.query(`select a.name, a.seats_count, a.date, a.hall_id, a.av_date_id, av_time.id as av_time_id, av_time.start, av_time.end from (SELECT hall.name, hall.seats_count, av_date.date, av_date.hall_id, av_date.id as av_date_id from hall left join av_date on hall.id = av_date.hall_id  where hall.exam_id = ${id} ) as a left join av_time on a.av_date_id = av_time.av_date_id
      order by a.seats_count asc, a.date asc;`)
      console.log(results)
      return results;
      // return await await _HallRepo.findAll({ where: { examId: id }, include: [{
      //   model: Av_Date,
      //   as: 'all_Av_Dates',
        
      //   include: [{
      //     model: Av_Time,
      //     as: 'all_Av_Times'
      //   }]
      // }]});
    } catch (error) {
      throw new InternalServerException("Finding all Halls failed");
    }
  }
  public async getOneHallById(id: number): Promise<any> {
    
    const _HallRepo: Repository<Hall> = await this._dbContext.getRepository(
      Hall
    );
    try {
      return await _HallRepo.findOne({ where: { id: id }
        , include: [{
        model: Av_Date,
        as: 'all_Av_Dates',
        
        include: [{
          model: Av_Time,
          as: 'all_Av_Times'
        }]
      }]
    });
    } catch (error) {
      console.log(error);
      throw new InternalServerException("Finding Hall by id failed");
    }
  }
}
