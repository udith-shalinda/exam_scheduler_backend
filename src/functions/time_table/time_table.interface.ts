import { IExam } from "@functions/exam/exam.interface";
import { IHall } from "@functions/hall/hall.interface";
import { ISubject } from "@functions/subject/subject.interface";

export interface ICreateTimeTable{
    date: Date;
    start: string;
    end: string;
    examId: number;
    hallId: number;
    subjectId: number;
}

export interface ITimeTable{
    id: number;
    date: Date;
    start: string;
    end: string;
    examId: number;
    hallId: number;
    subjectId: number;
    exam?: IExam;
    subject?: ISubject;
    hall?: IHall;
}