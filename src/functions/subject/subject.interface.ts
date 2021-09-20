import { IExam } from "@functions/exam/exam.interface";
import { ITimeTable } from "@functions/time_table/time_table.interface";

export interface ISubject{
    id?: number;
    name: string;
    mainYear: number;
    repeatedYears?: string;
    time: number;
    stu_count: number;
    examId: number;
    exam?: IExam;
    timetable?: ITimeTable;
}