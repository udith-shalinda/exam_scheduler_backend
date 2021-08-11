import { IAv_Date } from "@functions/av_date/av_date.interface";
import { IExam } from "@functions/exam/exam.interface";

export interface IHall{
    id?: number;
    name: string;
    seats_count: number;
    examId: number;
    exam?: IExam;
    all_Av_Dates?: IAv_Date[];
}

export interface IHallAvDateTime{
    name: string;
    seats_count: number;
    date: Date;
    hall_id: number;
    av_date_id: number;
    start: Date;
    end: Date;
}