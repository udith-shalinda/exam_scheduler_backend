import { IAv_Time } from "@functions/av_time/av_time.interface";
import { Hall } from "src/models";

export interface IAv_Date{
    id?: number;
    date: Date;
    hallId?: number;
    hall?: Hall;
    all_Av_Times?: IAv_Time[];
}