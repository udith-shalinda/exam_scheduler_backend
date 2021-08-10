import { IExam } from "@functions/exam/exam.interface";

export interface ISubject{
    id?: number;
    name: string;
    mainYear: number;
    repeatedYears?: string;
    time: number;
    stu_count: number;
    examId: number;
    exam?: IExam;
}